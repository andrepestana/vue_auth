<template>
  <div id="signup">
    
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <h1>Sign up</h1>
        <messages></messages>
        <div class="input">
          <label for="username">Email</label>
          <input  refs="username"
                  type="text"
                  id="username"
                  v-model="username"
                  @focus="clearMessageById($event)">
          <validation-message messageForId="username"></validation-message>
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password"
                  @focus="clearMessageById($event)">
          <validation-message messageForId="password"></validation-message>
        </div>
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword"
                  @focus="clearMessageById($event)">
          <validation-message messageForId="confirm-password"></validation-message>  
        </div>
        <div class="input">
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  v-model.number="age"
                  @focus="clearMessageById($event)">
          <validation-message messageForId="age"></validation-message>
        </div>
        <div class="input inline">
          <input  type="checkbox" 
                  id="terms" 
                  v-model="terms"
                  @click="clearMessageById($event)">
          <label for="terms">Accept Terms of Use</label>
          <validation-message messageForId="terms"></validation-message>
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
        age: null,
        password: '',
        confirmPassword: '',
        terms: false,
        disableSubmission: false
      }
    },
    methods: {
      onSubmit () {
        this.disableSubmission = true
        const formData = {
          username: this.username,
          password: this.password,
          confirmPassword: this.confirmPassword,
          age: this.age,
          terms: this.terms
        }
        this.$store.dispatch('signup', formData)
          .then(() => this.$router.push('/'))
          .catch(() => this.disableSubmission = false)
      }
    },
    created() {
      if(this.$store.getters.isAuthenticated) {
        this.$router.push('/dashboard')
      }
    },
    components: {
        messages,
        validationMessage
    }
  }
</script>

<style scoped>
  .signup-form {
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

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

</style>