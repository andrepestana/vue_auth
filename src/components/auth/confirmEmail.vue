<template>
    <div>
        
        <div class="confirm-email-form">
            <form @submit.prevent="onSubmit">
                <h1>Email confirmation</h1>
                <messages></messages>
                <div class="submit">
                    <button type="submit" class="btn btn-dark" to="/">Ok</button>
                </div>
            </form>
        </div>    
    </div>
</template>
<script>
    import messages from '../messages/messages.vue'
    import messagesMixin from '../messages/messagesMixin'

    export default {
        mixins: [messagesMixin],
        data() {
            return {
                emailConfirmationToken: ''
            }
        },
        methods: {
            onSubmit () {
                this.$router.push('/')
            }
        },
        created() {
            this.emailConfirmationToken = this.$route.query.emailConfirmationToken;
            this.$store.dispatch('confirmEmail', this.emailConfirmationToken)
        },
        components: {
            messages
        },
        watch: {
            $route(to, from) {
                this.clearAllMessages()
            }
        }
    }
</script>
<style scoped>
  .confirm-email-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  </style>