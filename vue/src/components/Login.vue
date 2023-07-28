<template>
    <div v-resize="onGlobalResize">
        <v-card :style="{ margin: '15% auto auto auto', width: `${windowSize.height/2}px`}">
            <v-card-text>
                <v-form ref="form">
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="email"
                                placeholder="Email"
                                prepend-inner-icon="mdi-account"
                                outlined :disabled="formDisabled"
                                :rules="[field_rules.required]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="password"
                                placeholder="Password"
                                prepend-inner-icon="mdi-lock"
                                :append-icon="show_passowrd ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show_passowrd ? 'text' : 'password'"
                                @click:append="show_passowrd = !show_passowrd"
                                outlined :disabled="formDisabled"
                                :rules="[field_rules.required]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 class="mb-4">
                            <create-account></create-account>
                            <forgot-password></forgot-password>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn block class="primary py-6" @click="login()" :disabled="formDisabled">
                                Login
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import Vue from 'vue'
import CreateAccount from './userManagement/actions/Add.vue'
import ForgotPassword from './ForgotPassword.vue'
export default {
    components: {
        CreateAccount,
        ForgotPassword
    },
    data:() => ({
        email: '',
        password: '',
        show_passowrd: false
    }),
    methods:{
        login(){
            if (this.$refs.form.validate()) {
                this.formDisabled = true
                this.$http.post('api/auth/authLogin', { email: this.email, password: this.password }).then(res => {
                    if (typeof res.body == 'object') {
                        let today = new Date()
                        today.setTime(today.getTime() + (24*60*60*1000))
                        Vue.auth.setToken(res.body, today.getTime())

                        this.$router.push('/user')
                        this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `Login success` })
                        
                    } else {
                        this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'error', message: `${res.body}` })
                        this.formDisabled = false
                    }
                })
            }
        }
    }
}
</script>