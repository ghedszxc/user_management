<template>
    <div>
        <v-card class="grey lighten-4">
            <v-card-text class="pb-0">
                <v-form ref="form">
                    <v-layout wrap>
                        <v-flex xs12 md9 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
                            <v-text-field
                                v-model="form.title"
                                placeholder="Title"
                                dense outlined :disabled="formDisabled"
                                :rules="[field_rules.required]"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3>
                            <v-select
                                v-model="form.type"
                                :items="post_type"
                                placeholder="Type"
                                
                                dense outlined :disabled="formDisabled"
                                :rules="[field_rules.required]"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                v-model="form.message"
                                placeholder="Message" rows="2"
                                outlined :disabled="formDisabled"
                                :rules="[field_rules.required]"
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <v-btn class="primary px-5" @click="createPost()">
                    Post
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
export default {
    data:() => ({
        form: {
            title: '',
            message: '',
            type: '',
            author: ''
        },

        post_type: ['News', 'Update', 'Task']
    }),
    methods: {
        createPost(){

            this.form.author = `${this.authUser.first_name} ${this.authUser.last_name}`
            if (this.$refs.form.validate()) {
                this.formDisabled = true

                this.$http.post('api/post', this.form).then(res => {
                    if (res.body.status) {
                        this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'error', timeout: 3000, message: res.body.message })
                        this.formDisabled = false
                    } else {
                        this.clearForm()
                        this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', timeout: 3000, message: `Post is successfully created.` })
                        this.$store.commit('posts/ADD_NEW_POST', res.body)
                    }
                })
            }
        },
        
        clearForm() {
            this.$refs.form.reset()
            this.formDisabled = false

            this.form = {
                title: '',
                message: '',
                type: '',
                author: ''
            }
        }
    }
}
</script>