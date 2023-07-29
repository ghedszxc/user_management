import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import posts from './posts'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    'users': users,
    'posts': posts
  },
  state: {
    // GLOBAL
    authUser: {},
    snackBar: { snackbar: false, color: '', timeout: 3000, message: '' }
  },
  mutations: {
    // GLOBAL
    GET_AUTH_USER: (state, payload) => {
      state.authUser = payload
    },
    UPDATE_SNACKBAR: (state, payload) => {
      state.snackBar = payload
    },

    // // ATTENDEES
    // GET_ATTENDEE_LIST: (state, payload) => {
    //   state.attendeeList = payload
    // },
  },
  actions: {
    // DISCIPLES
    addNewDisciple({commit, state},payload) {
      state.discipleList.push(payload)
      commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `${payload.last_name}, ${payload.first_name} is registered.` })
    },
    updateDisciple({commit, state},payload) {
      let find_disciple = state.discipleList.findIndex(find => find.id == payload.id)
      if (find_disciple != -1) {
        state.discipleList[find_disciple] = payload
        commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `${payload.last_name}, ${payload.first_name} information is updated.` })
      }
    },
    updateDiscipleStatus({commit, state},payload) {
      let find_disciple = state.discipleList.findIndex(find => find.id == payload.id)
      
      if (find_disciple != -1) {
        state.discipleList[find_disciple].status = payload.status
      }

      let find_event = state.eventList.find(find => find.id == payload.event_id)
      commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `${find_event.name} attendees is updated.` })
    },
    updateDiscipleList({commit, state},payload) {
      let selected_list = payload.is_archive ? state.discipleList : state.archivedDiscipleList
      let reversed_selected_list = payload.is_archive ? state.archivedDiscipleList : state.discipleList
      let find_disciple = selected_list.findIndex(find => find.id == payload.id)
      
      if (find_disciple != -1) {
        selected_list.splice(find_disciple,1)
        reversed_selected_list.push(payload)

        commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `${selected_list[find_disciple].last_name}, ${selected_list[find_disciple].first_name} is ${payload.is_archive ? 'inactive' : 'active'}.` })
      }
    },

    // EVENTS
    addNewEvent({commit, state},payload) {
      state.eventList.push(payload)
      commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `${payload.name} is created.` })
    },
    
    // ATTENDEES
    clearAttendee({state}) {
      state.attendeeList = []
    },
    removeAttendeeRow({state}, payload) {
      let find_index = state.attendeeList.findIndex(find => find.id == payload)
      find_index != -1 ? state.attendeeList.splice(find_index, 1) : null
    },
    addNewAttendee({state}, payload) {
      state.attendeeList.splice(0,0, { id: payload })


      // state.attendeeList.push({ id: payload })
      // state.eventList.push(payload)
      // commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `${payload.name} is created.` })
    },
  },
})
