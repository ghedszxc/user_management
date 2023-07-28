<template>
  <v-app style="background: #F0F2F5;">
    <v-snackbar top
      v-model="snackBar.snackbar"
      :timeout="snackBar.timeout"
      :color="snackBar.color">
      {{ snackBar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn small icon v-bind="attrs" @click="hideSnackBar()">
          <v-icon small color="white">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- style="background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);" -->
    <router-view></router-view>
  </v-app>
</template>
<script>
export default {
  data:() => ({
    //
  }),
  methods:{
    hideSnackBar(){
      this.$store.commit('UPDATE_SNACKBAR', { snackbar: false, color: '', timeout: -1, message: '' })
    }
  }
}
</script>
<style>
::-webkit-scrollbar {
  height:0;
  width:0;
  border-radius: 4px;
  background: transparent;
  transition: all 0.3s ease;
}

::-webkit-scrollbar:hover {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background:transparent;
  border-radius: 4px;
}
</style>
