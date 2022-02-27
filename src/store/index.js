import { createStore } from 'vuex'

import { regions } from './regions'
import { user } from './authenticate'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },

  actions: {
    async GetFbUserDate ({ commit }, userData) {
      console.log(userData);

      commit('USER_DATA', userData);
    }


  },
  modules: {
    user,
    Region: regions,
  }
})
