import AuthService from '../services/AuthService';
import StravaService from '../services/StravaService';

export default {
  async getUser({ commit }) {
    const { data: user } = await AuthService.getUser();
    commit('setUser', user);
  },
  async getActivities({ commit }, params = {}) {
    const result = await StravaService.getActivites(params);
    commit('setActivities', result.data);
  },
  async getLatestActivities({ commit }) {
    const result = await StravaService.getLatestActivities();
    commit('setActivities', result.data);
  }
};
