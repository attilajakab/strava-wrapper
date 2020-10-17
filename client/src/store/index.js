import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '../services/AuthService';
import StravaService from '../services/StravaService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    activities: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setActivities(state, activities) {
      state.activities = activities;
    }
  },
  actions: {
    async getUser({ commit }) {
      const { data: user } = await AuthService.getUser();
      commit('setUser', user);
    },
    async getActivities({ commit }) {
      const result = await StravaService.getActivities();
      commit('setActivities', result.data);
    }
  },
  modules: {}
});
