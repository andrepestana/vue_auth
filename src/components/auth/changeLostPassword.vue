<template>
    <div>
        
        <div class="change-lost-password-form">
            <form @submit.prevent="onSubmit">
                <h1>Change lost password</h1>
                <messages></messages>
                <div class="input">
                    <label for="new-password">New Password</label>
                    <input
                            type="password"
                            id="new-password"
                            name="newPassword   "
                            v-model="newPassword"
                            @focus="clearMessageById($event)"
                            :disabled="disableSubmission">
                    <validation-message messageForId="new-password"></validation-message>  
                </div>
                <div class="input">
                    <label for="confirm-password">Confirm Password</label>
                    <input
                            type="password"
                            id="confirm-password"
                            v-model="confirmPassword"
                            @focus="clearMessageById($event)"
                            :disabled="disableSubmission">
                    <validation-message messageForId="confirm-password"></validation-message>  
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
                newPassword: '',
                confirmPassword: '',
                disableSubmission: false
            }
        },
        methods: {
            onSubmit () {
                this.$nextTick(()=> {
                    this.disableSubmission = true
                })
                const formData = {
                    retrievePasswordToken: this.$route.query.retrievePasswordToken,
                    newPassword: this.newPassword,
                    confirmPassword: this.confirmPassword
                }
                this.$store.dispatch('changeLostPassword', formData)
                    .then(() => this.disableSubmission = true)
                    .catch(() => this.disableSubmission = false)
            }
        },
        components: {
            messages,
            validationMessage
        }
    }    
</script>
<style scoped>
  .change-lost-password-form {
    max-width: 600px;
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

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #000000;
    background-color: #eee;
  }

</style>