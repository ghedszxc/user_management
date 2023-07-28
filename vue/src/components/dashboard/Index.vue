<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 class="d-flex justify-center">
        <create-post></create-post>
      </v-flex>
      <v-flex xs12 class="text-center title pt-5">
        Dashboard
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Add from './actions/Add.vue'
// import Edit from './actions/Edit.vue'
// import ChangePassword from './actions/ChangePassword.vue'
// import Delete from './actions/Delete.vue'
export default {
  components: {
    'create-post': Add,
    // 'edit-account': Edit,
    // 'change-password': ChangePassword,
    // 'delete-account': Delete,
  },
  data:() => ({
    search: '',

    headers: [
      { text: 'Given Name', value: 'first_name', sortable: false },
      { text: 'Surname', value: 'last_name', sortable: false },
      { text: 'Address', value: 'address', sortable: false },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ]
  }),
  computed:{
    userList(){
      return this.$store.state.users.userList.filter(value => {
        return value.first_name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted(){
    this.$http.get('api/auth').then(res => {
      this.$store.commit('users/GET_USER_LIST', res.body)
    })
  }
}
</script>