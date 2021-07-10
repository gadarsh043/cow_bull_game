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
    randomNumber: []
  },
  getters: {
    getRandomNumber: state => state.randomNumber
  },
  mutations: {
    setRandomNumber (state, value) {
      state.randomNumber = value
    }
  },
  actions: {
  }
})
