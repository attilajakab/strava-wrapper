import Api from './Api';

export default {
  getActivities() {
    return Api().get('/activities');
  }
};
