<template>
    <div style="display: inline-block;">
        <v-btn @click="updateDialog(true)"
            icon>
            <v-icon color="orange">mdi-pencil</v-icon>
        </v-btn>

        <v-dialog v-model="update_account_dialog" max-width="500" persistent>
            <v-card>
                <v-card-title class="text-center">
                    Update Account
                    <v-spacer></v-spacer>
                    <v-btn icon @click="updateDialog(false)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider class="mb-4"></v-divider>
                <v-card-text>
                    <v-form ref="form">
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                    v-model="form.first_name"
                                    label="Given Name"
                                    placeholder="Given Name"
                                    outlined :disabled="formDisabled"
                                    :rules="[field_rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                    v-model="form.last_name"
                                    label="Surname"
                                    placeholder="Surname"
                                    outlined :disabled="formDisabled"
                                    :rules="[field_rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea
                                    v-model="form.address"
                                    label="Address"
                                    placeholder="Address" rows="2"
                                    outlined :disabled="formDisabled"
                                    :rules="[field_rules.required]"
                                ></v-textarea>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                    v-model="form.email"
                                    label="Email"
                                    placeholder="Email"
                                    outlined :disabled="formDisabled"
                                    :rules="[field_rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <!-- <v-flex xs12>
                                <v-text-field
                                    v-model="form.password"
                                    placeholder="Password"
                                    outlined :disabled="formDisabled"

                                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="show_password = !show_password"
                                    :type="show_password ? 'text' : 'password'"
                                    :rules="[field_rules.required]"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                    v-model="form.reconfirm_password"
                                    placeholder="Confirm Password"
                                    outlined :disabled="formDisabled"

                                    :append-icon="show_reconfirm_password ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="show_reconfirm_password = !show_reconfirm_password"
                                    :type="show_reconfirm_password ? 'text' : 'password'"
                                    
                                    :rules="[field_rules.required, (value) => (value === form.password) || 'Password confirmation does not match']"
                                ></v-text-field>
                            </v-flex> -->
                        </v-layout>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="primary mb-3" large block @click="updateAccount()">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: {
        selectedAccount: Object
    },
    data:() => ({
        update_account_dialog: false,

        form: {
            first_name: '',
            last_name: '',
            address: '',
            email: ''
        },

        // show_password: false,
        // show_reconfirm_password: false
    }),
    methods: {
        updateDialog(data) {
            this.update_account_dialog = data

            if (data) {
                
                this.form = {...this.selectedAccount}
            }
        },
        updateAccount(){
            if (this.$refs.form.validate()) {
                this.formDisabled = true

                this.$http.put(`api/auth/${this.selectedAccount.id}`, this.form).then(res => {
                    if (res.body.status) {
                        this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'error', timeout: 3000, message: res.body.message })
                        this.formDisabled = false
                    } else {
                        this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', timeout: 3000, message: `${this.selectedAccount.email} information is updated.` })
                        this.$store.commit('users/UPDATE_USER', {...this.form})
                        this.clearForm()
                    }
                })
            }
        },
        
        clearForm() {
            this.$refs.form.reset()
            this.formDisabled = false
            this.update_account_dialog = false

            this.form = {
                first_name: '',
                last_name: '',
                address: '',
                email: '',

                password: '',
                reconfirm_password: ''
            }
        }
    }
}
</script>