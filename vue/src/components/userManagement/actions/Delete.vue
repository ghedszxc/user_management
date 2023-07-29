<template>
    <div style="display: inline-block;">
        <v-btn
            :disabled="authUser.email == selectedAccount.email"
            @click="deleteAccount()"
            icon>
            <v-icon color="red">
                mdi-delete
            </v-icon>
        </v-btn>
    </div>
</template>
<script>
export default {
    props: {
        selectedAccount: Object
    },
    methods: {
        deleteAccount(){
            this.$http.delete(`api/auth/${this.selectedAccount.id}`).then(res => {
                if (res.status == 200) {
                    this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'success', message: `${this.selectedAccount.email} is deleted from user list` })
                    this.$store.commit('users/DELETE_USER', this.selectedAccount.id)
                } else {
                    this.$store.commit('UPDATE_SNACKBAR', { snackbar: true, color: 'error', message: `${res.body}` })

                }
            })
        }
    }

}
</script>