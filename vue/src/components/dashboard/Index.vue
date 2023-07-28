<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 class="d-flex justify-center">
        <create-post></create-post>
      </v-flex>
      <v-flex xs12 class="text-center title py-5 font-weight-black text-uppercase">
        Dashboard
      </v-flex>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex xs12 class="d-flex justify-center">
            <post-card style="width: 52%;"></post-card>
          </v-flex>
          <v-flex xs12 class="d-flex justify-center">
            <post-card style="width: 52%;"></post-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import PostCard from './PostCard.vue'
import Add from './actions/Add.vue'
export default {
  components: {
    'post-card': PostCard,
    'create-post': Add
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