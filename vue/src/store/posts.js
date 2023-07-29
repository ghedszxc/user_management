import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    postList: []
  },
  mutations: {
    GET_POST_LIST: (state, payload) => {
      state.postList = payload
    },
    ADD_NEW_POST: (state, payload) => {
      state.postList.push(payload)
      // state.postList.unshift(payload)
    },
    DELETE_POST: (state, payload) => {
      let find_post = state.postList.findIndex(find => find.id == payload)
      if (find_post != -1) {
        state.postList.splice(find_post, 1)
      }
    },
    UPDATE_POST: (state, payload) => {
      let find_post = state.postList.findIndex(find => find.id == payload.id)

      if (find_post != -1) {
        Vue.set(state.postList, find_post, payload)
      }
    }
  },
  actions: {

  }
}
