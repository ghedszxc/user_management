import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    userList: []
  },
  mutations: {
    GET_USER_LIST: (state, payload) => {
      state.userList = payload
    },
    ADD_NEW_USER: (state, payload) => {
      state.userList.push(payload)
    },
    DELETE_USER: (state, payload) => {
      let find_user = state.userList.findIndex(find => find.id == payload)
      if (find_user != -1) {
        state.userList.splice(find_user, 1)
      }
    },
    UPDATE_USER: (state, payload) => {
      let find_user = state.userList.findIndex(find => find.id == payload.id)

      if (find_user != -1) {
        Vue.set(state.userList, find_user, payload)
      }
    },
  },
  actions: {

  }
}
