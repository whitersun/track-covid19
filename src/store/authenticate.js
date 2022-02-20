export const user = {
  namespaced: true,

  state: {
    facebookUserData: '',
    loginPlatform: ''
  },

  mutations: {
    USER_DATA (state, payload) {
      return state.facebookUserData = payload;
    },
    USER_PLATFORM (state, payload) {
      return state.loginPlatform = payload;
    },
  },

  actions: {
    async GetFbUserDate ({ commit }, userData) {
      console.log(userData);

      commit('USER_DATA', userData);
    },

    async LoginPlatform ({ commit }, platform) {
        console.log(platform);

        commit('USER_PLATFORM', platform);
    }
  }
}
