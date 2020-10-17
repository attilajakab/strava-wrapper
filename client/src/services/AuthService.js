import Api from './Api';

export default {
  getUser() {
    return Api().get('/user');
  }
};
