<template>
    <div class="recover-password-form">
        <div class="signin-form">
            <form @submit.prevent="onSubmit">
                <h1>Recover password</h1>
                <messages></messages>
                <div class="input">
                    <label for="username">Email</label>
                    <input
                            type="username"
                            id="username"
                            v-model="username"
                            @focus="clearMessageById($event)"
                            :disabled="disableSubmission">
                    <validation-message messageForId="username"></validation-message>
                </div>
                <div class="submit">
                    <button type="submit" 
                            class="btn btn-dark"
                            :disabled="disableSubmission">
                            Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import messages from '../messages/messages.vue'
    import validationMessage from '../messages/validationMessage.vue'
    import messagesMixin from '../messages/messagesMixin'
    export default {
        mixins: [messagesMixin],
        data () {
            return {
                username: '',
                disableSubmission: false    
            }
        },
        methods: {
            onSubmit () {
                this.$nextTick(()=> {
                    this.disableSubmission = true
                })
                const formData = {
                    username: this.username
                }
                this.$store.dispatch('sendEmailToRetrievePassword', formData)
                    .then(() => this.disableSubmission = true)
                    .catch(() => this.disableSubmission = false)
                    .finally()
            }
        },    
        components: {
            messages,
            validationMessage
        }
    }
</script>
<style scoped>
  .recover-password-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #000000;
    background-color: #eee;
  }

</style>