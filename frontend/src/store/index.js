import { createStore } from 'vuex';
import { API } from '@/services/API.js';
import router from '@/router/index';

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
    },
    DISCONNECT: function (state) {
      state.token = -1;
    },
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
              commit('SET_STATUS', response.error);
              reject(response);
            }
          })
          .catch(function (error) {
            commit('SET_STATUS', error.error);
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
              commit('SET_STATUS', response.error);
              reject(response);
            }
          })
          .catch(function (error) {
            commit('SET_STATUS', error.error);
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        API.post('/auth/signup', userInfos)
          .then(function (response) {
            if (!response.error) {
              commit('SET_STATUS', 'created');
              resolve(response);
            } else {
              commit('SET_STATUS', response.error);
              reject(response);
            }
          })
          .catch(function (error) {
            commit('SET_STATUS', error.error);
            reject(error);
          });
      });
    },
    disconnect: ({ commit }) => {
      commit('DISCONNECT');
      router.push('/login');
      localStorage.removeItem('token');
    },
  }
})
export default store;