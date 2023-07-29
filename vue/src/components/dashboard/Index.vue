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
          <v-flex xs12
            class="d-flex justify-center"
            v-for="(data, key) in postList"
            :key="key">
            <post-card style="width: 52%;" :selectedPost="data"></post-card>
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
  computed:{
    postList(){
      return this.$store.state.posts.postList
    }
  },
  mounted(){
    this.$http.get('api/post').then(res => {
      this.$store.commit('posts/GET_POST_LIST', res.body)
    })
  }
}
</script>