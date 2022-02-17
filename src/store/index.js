import { createStore } from 'vuex'

import { regions } from './regions'

export default createStore({
  state: {
    facebookUserData: '',
  },
  getters: {
  },
  mutations: {
    USER_DATA (state, payload) {
      return state.facebookUserData = payload;
    }

  },

  actions: {
    async GetFbUserDate ({ commit }, userData) {
      console.log(userData);

      commit('USER_DATA', userData);
    }


  },
  modules: {
    Region: regions
  }
})
