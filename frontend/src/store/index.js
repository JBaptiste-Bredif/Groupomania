import { createStore } from 'vuex';
import { API } from '@/services/API.js'

const store = createStore({
  state: {
    status: '',
    user: {
      pseudo: '',
      email: '',
      photoUrl: '',
      photoId: '',
      isAdmin: false
    },
    token: -1,
  },
  getters: {

  },
  mutations: {
    SET_STATUS: function (state, status) {
      state.status = status;
    },
    LOG_USER: function (state, user) {
      state.user = user.userData;
      state.token = user.token;
      localStorage.setItem('token', user.token);
    }
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        API.post('/auth/login', userInfos)
          .then(function (response) {
            if (!response.error) {
              commit('SET_STATUS', '');
              commit('LOG_USER', response);
              resolve(response);
            } else {
              commit('SET_STATUS', 'error_login');
              reject(response);
            }
          })
          .catch(function (error) {
            commit('SET_STATUS', 'error_login');
            reject(error);
          });
      });
    },
    relog: ({ commit }) => {
      return new Promise((resolve, reject) => {
        API.post('/auth/relog')
          .then(function (response) {
            if (!response.error) {
              commit('SET_STATUS', '');
              commit('LOG_USER', response);
              resolve(response);
            } else {
              commit('SET_STATUS', 'error_login');
              reject(response);
            }
          })
          .catch(function (error) {
            commit('SET_STATUS', 'error_login');
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        API.post('/auth/signup', userInfos)
          .then(function (response) {
            if (!response.error) {
              commit('SET_STATUS', 'created');
              resolve(response);
            } else {
              commit('SET_STATUS', 'error_create');
              reject(response);
            }
          })
          .catch(function (error) {
            commit('SET_STATUS', 'error_create');
            reject(error);
          });
      });
    },
  }
})

export default store;