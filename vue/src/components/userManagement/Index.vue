<template>
    <div>
    <v-card flat>
      <v-card-title>
        User Management
        <v-spacer></v-spacer>
        <create-account class="mt-2" :title_text="'Register User'"></create-account>
      </v-card-title>

      <v-card-text>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="search"
              label="Search by first name ..."

              outlined dense
              :full-width="false" style="display: inline-block; width: 300px;"

              @click:append="search = ''"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table :headers="headers" :items="userList">
          <template v-slot:item.actions="{ item }">
            <edit-account :selectedAccount="item"></edit-account>
            <delete-account :selectedAccount="item"></delete-account>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    </div>
</template>
<script>
import Add from './actions/Add.vue'
import Edit from './actions/Edit.vue'
import Delete from './actions/Delete.vue'
export default {
  components: {
    'create-account': Add,
    'edit-account': Edit,
    'delete-account': Delete,
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