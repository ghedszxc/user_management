<template>
    <div>
        <v-app-bar app class="primary">
            <v-spacer></v-spacer>
            <v-btn icon :class="$route.path == '/dashboard' ? 'primary hidden-sm-and-down' : 'hidden-sm-and-down'" @click="$router.push('/dashboard')">
                <v-icon :color="$route.path == '/dashboard' ? 'white' : ''">mdi-view-dashboard</v-icon>
            </v-btn>

            <v-btn icon :class="$route.path == '/user' ? 'primary hidden-sm-and-down' : 'hidden-sm-and-down'" @click="$router.push('/user')">
                <v-icon :color="$route.path == '/user' ? 'white' : ''">mdi-account-multiple</v-icon>
            </v-btn>

            <v-spacer></v-spacer>
            <v-menu offset-y open-on-hover bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn rounded text class="primary darken-1"
                        style="position: absolute; right: 10px;" v-bind="attrs" v-on="on">
                        <v-icon class="mr-2" size="20">mdi-account</v-icon>
                        {{authUser.email}}
                        <v-icon class="ml-2">mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="logOutUser()">
                        <v-list-item-avatar>
                            <v-icon>mdi-exit-to-app</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>Log out</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    methods:{
        logOutUser(){
            Vue.auth.destoryToken()
            this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `Logging out.` })
            setTimeout(() => { this.$router.push('/') }, 1000);
        }
    }
}
</script>