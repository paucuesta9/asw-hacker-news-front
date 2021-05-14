import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import module1 from './module1';

const store = new Vuex.Store({

  modules: {
    module1,
  },

  state: {
  },

  mutations: {
  },

  actions: {
  },

  getters: {
  },

plugins: [createPersistedState()]

});

export default store;
