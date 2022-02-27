import { Storage } from '@capacitor/storage'

export const user = {
  namespaced: true,

  state: {
    lineUserData: '',
    facebookUserData: '',
    loginPlatform: ''
  },

  mutations: {
    FACEBOOK_USER_DATA (state, payload) {
      return state.facebookUserData = payload;
    },
    LINE_USER_DATA (state, payload) {
      return state.lineUserData = payload;
    },
    USER_PLATFORM (state, payload) {
      return state.loginPlatform = payload;
    },
  },

  actions: {
    async GetFbUserDate ({ commit }, userData) {
      console.log(userData);

      commit('FACEBOOK_USER_DATA', userData);
    },

    async GetLineUserDate ({ commit }, userData) {
      console.log(userData);

      commit('LINE_USER_DATA', userData);
    },

    async LoginPlatform ({ commit }, platform) {
        console.log(platform);

        commit('USER_PLATFORM', platform);
    },

    async CheckFacebookUser ({ commit }) {
        const { value: facebookUser } = await Storage.get({ key: 'FacebookUser' });
    
        facebookUser && commit('FACEBOOK_USER_DATA', JSON.parse(facebookUser));
    },

    async CheckLineUser ({ commit }) {
        const { value: lineUser } = await Storage.get({ key: 'LineUser' });
    
        lineUser && commit('LINE_USER_DATA', JSON.parse(lineUser));
    }
  }
}
