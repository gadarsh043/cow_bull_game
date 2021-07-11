import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'CowBullGame',
      storage: window.sessionStorage
    })
  ],
  state: {
    randomNumber: [],
    logs: []
  },
  getters: {
    getRandomNumber: state => state.randomNumber,
    getLogs: state => state.logs
  },
  mutations: {
    setRandomNumber (state, value) {
      state.randomNumber = value
    },
    setLogs (state, value) {
      state.logs = value
    }
  },
  actions: {
  }
})
