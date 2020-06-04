<template>
  <div id="welcome">
    <messages></messages>
    <h1>Front Page</h1>
    <div class="cta">
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
    </div>
  </div>
</template>
<script>
  import messages from '../messages/messages.vue'
  
  export default {
    created() {
      if(this.$store.getters.isAuthenticated) {
        this.$router.push('/dashboard')
      }
    },
    components: {
      messages
    }
  }
</script>
<style scoped>
  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }

  .cta {
    width: 300px;
    margin: auto;
    text-align: center;
  }

  .cta a {
    margin: 10px;
    text-decoration: none;
    display: inline-block;
    border: 1px solid #343a40;
    border-radius: 3px;
    width: 100px;
    padding: 10px;
    box-sizing: border-box;
    color: #521751;
  }

  .cta a:hover,
  .cta a:active {
    background-color: #343a40;
    color: white;
  }
</style>