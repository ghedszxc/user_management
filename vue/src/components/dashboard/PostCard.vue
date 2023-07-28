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
                    <v-flex xs12 class="title text-uppercase">
                        {{form.title}}
                    </v-flex>
                    <v-flex xs12 class="caption">
                        Type: {{form.type}}
                    </v-flex>
                    <v-flex xs12 class="caption">
                        Author: {{form.author}}
                    </v-flex>
                </v-layout>
                <v-spacer></v-spacer>
                <v-btn icon @click="updateCardDisplay(true)">
                    <v-icon color="orange">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider class="mb-2"></v-divider>
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
            title: 'songs',
            message: 'this is my message for myself',
            type: 'News',
            author: 'ghed'
        }
    }),
    methods: {
        updateCardDisplay(data){
            this.editPost = data
        }
    }
}
</script>