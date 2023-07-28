<template>
    <v-app>
        <v-main>
            <tool-bar></tool-bar>
            <router-view class="pa-5"></router-view>
        </v-main>
    </v-app>
</template>
<script>
import toolbar from './Toolbar.vue'
export default {
    components: {
        'tool-bar': toolbar
    },
    mounted(){
        this.$http.get(`api/auth/getAuthuser/${sessionStorage.getItem("email")}`).then(res => { this.$store.commit('GET_AUTH_USER', res.body) })
    }
}
</script>