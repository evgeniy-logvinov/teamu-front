import { ActionContext } from 'vuex';
import RegistrationState from '@/entities/states/RegistrationState';
import RootState from '@/entities/states/RootState';
import RegistrationService from '@/services/RegistrationService';
import SignUpEntity from '@/entities/SignUpEntity';
import AuthInfoEntity from '@/entities/AuthInfoEntity';
import LoginEntity from '@/entities/LoginEntity';

export const state = (): RegistrationState => ({
  signup: {
    email: '',
    name: '',
    openLandProfileLink: '',
    password: '',
    userRole: '',
    verifyPassword: '',
  },
  authInfo: {
    expiresAt: '',
    string: '',
    userID: 0,
  },
});

export const actions : any = {
  async postSignUp(context: ActionContext<RegistrationState, RootState>, signup: SignUpEntity) {
    const authInfo: AuthInfoEntity = await RegistrationService.postSignUp(signup);

    context.commit('setSignUpInfo', authInfo);
    await context.dispatch('user/login', authInfo, { root: true });

    if (context.rootState.user.toAfterLogin) {
      await this.$router.push(context.rootState.user.toAfterLogin);
    }
  },

  async postLogin(context: ActionContext<RegistrationState, RootState>, login: LoginEntity) {
    const authInfo: AuthInfoEntity = await RegistrationService.postLogin(login);

    context.commit('setSignUpInfo', authInfo);
    await context.dispatch('user/login', authInfo, { root: true });

    if (context.rootState.user.toAfterLogin) {
      await this.$router.push(context.rootState.user.toAfterLogin);
    }
  },
};

export const mutations = {
  setSignUpInfo(currentState: RegistrationState, authInfo: AuthInfoEntity): void {
    currentState.authInfo = authInfo;
  },
};
