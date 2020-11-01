import Api from './Api';

export default {
  getActivites(params) {
    return Api().get('/activities', { params });
  },
  getLatestActivities() {
    return Api().get('/activities/latest');
  },
  getActivity(id) {
    return Api().get(`/activities/${id}`);
  }
};
