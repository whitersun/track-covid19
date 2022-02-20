import axios from 'axios'

export const regions = {
  namespaced: true,

  state: {
    errors: false,
    regions: [],
    UserInCurrent: '',

    TotalReports: '',

    loading: true
  },

  mutations: {
    GET_REGION: (state, payload) => {
      return state.regions = payload
    },

    GET_TOTAL_REPORTS: (state, payload) => {
      return state.TotalReports = payload;
    },

    GET_USER_IN_CURRENT_COUNTRY: (state, payload) => {
      return state.UserInCurrent = payload;
    }
  },

  actions: {
    CALL_REGIONS: async ({ commit, state }, countryName) => {

      const capitalize = (str, lower = false) => {
        return (lower ? str.toLowerCase() : str)
                  .replace(/(?:^|\s|["'([{])+\S/g,
                    match => match.toUpperCase());
      }

      const convertCountryName = capitalize(countryName)

      var options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params: { country: convertCountryName },
        headers: {
          'x-rapidapi-host': 'covid-193.p.rapidapi.com',
          'x-rapidapi-key': '8c7a059f13msh4c6f40d43aa46eap13a1f5jsn98c5631df848'
        }
      };

      const response = await axios.request(options);

      if (response.status === 400) {
        return state.errors = true;
      }

      console.log(response)

      commit('GET_REGION', response.data);
    },

    CALL_TOTAL_REPORT: async ({ commit, state }) => {
      var options = {
        method: 'GET',
        url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',
        headers: {
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
          'x-rapidapi-key': '8c7a059f13msh4c6f40d43aa46eap13a1f5jsn98c5631df848'
        }
      };

      const response = await axios.request(options);

      if (response.status === 200) {
        console.log(response.data[0])
        commit('GET_TOTAL_REPORTS', response.data[0]);

        state.loading = false;

        return state.loading;
      }
    },

    CALL_GET_CURRENT_COUNTRY: async ({ commit }) => {
      const response = await axios.get('https://ipapi.co/json/');

      if (response.status === 200) {
        // console.log(response);
        commit('GET_USER_IN_CURRENT_COUNTRY', response.data)
      }
    }
  }
}
