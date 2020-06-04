<template>
  <div id="signin">
    
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <h1>Sign in</h1>
        <messages></messages>
        <div class="input">
          <label for="username">Username</label>
          <input
                  type="username"
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
        <div class="submit">
          <button type="submit" class="btn btn-dark">Submit</button>
        </div>
        <div><router-link to="/recoverPassword">Recover password</router-link></div>
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
        password: ''     
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          username: this.username,
          password: this.password,
        }
        this.$store.dispatch('login', formData)
          .then(() => this.$router.push('/'))
          .catch(() => {})
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
  .message {
    padding: auto;
    margin: 10px;
  }
  .signin-form {
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