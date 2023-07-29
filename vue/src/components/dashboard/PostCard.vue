<template>
    <div class="pb-4">
        <v-card v-if="editPost">
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
                <v-btn class="success px-5" @click="updatePost()">
                    Update
                </v-btn>
                <v-btn class="error px-5" @click="updateCardDisplay(false)">
                    Discard
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card v-else>
            <v-card-title>
                <v-layout wrap>
                    <v-flex xs12 class="title text-uppercase font-weight-bold">
                        {{form.title}}
                    </v-flex>
                    <v-flex xs12 class="caption">
                        <b>Type:</b> {{form.type}}
                    </v-flex>
                    <v-flex xs12 class="caption">
                        <b>Author:</b> {{form.author}}
                    </v-flex>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon @click="updateCardDisplay(true)" v-if="`${authUser.first_name} ${authUser.last_name}` == form.author">
                    <v-icon color="orange">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deletePost()" v-if="`${authUser.first_name} ${authUser.last_name}` == form.author">
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="text-truncate">
                {{form.message}}
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    props: {
        selectedPost: Object
    },
    data:() => ({
        editPost: false,
        post_type: ['News', 'Update', 'Task'],

        form: {
            title: '',
            message: '',
            type: '',
            author: ''
        }
    }),
    mounted(){
        this.form = {...this.selectedPost}
    },
    methods: {
        updateCardDisplay(data){
            this.editPost = data
        },

        updatePost(){
            if (this.$refs.form.validate()) {
                this.formDisabled = true

                this.$http.put(`api/post/${this.selectedPost.id}`, this.form).then(res => {
                    if (res.body.status) {
                        this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'error', timeout: 3000, message: res.body.message })
                        this.formDisabled = false
                    } else {
                        this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', timeout: 3000, message: `Post information is updated.` })
                        this.$store.commit('posts/UPDATE_POST', {...this.form})
                        this.updateCardDisplay(false)
                    }
                })
            }
        },
        deletePost(){
            this.$http.delete(`api/post/${this.selectedPost.id}`).then(res => {
                if (res.status == 200) {
                    this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `Post was successfully deleted` })
                    this.$store.commit('posts/DELETE_POST', this.selectedPost.id)
                } else {
                    this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'error', message: `${res.body}` })

                }
            })
        }
    }
}
</script>