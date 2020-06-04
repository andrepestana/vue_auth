<template>
  <div id="dashboard">
    <div class="dashboard-box">
      <h1>Dashboard</h1>
      <messages></messages>
      <p v-if="username">Logged as {{ username }}</p>
      
      <post v-for="(post,index) in posts" :key="index" :post="post"></post>
      
    </div>
  </div>
</template>

<script>
  import messages from '../messages/messages.vue'
  import post from '../post/post.vue'
  export default {
    computed: {
      username () {
        return !this.$store.getters.user ? false : this.$store.getters.user.username
      },
      posts () {
        return this.$store.getters.posts
      },
      showRefreshTokenMessage () {
        return !this.$store.getters.user ? false : this.$store.getters.user.showRefreshTokenMessage
      }
    },
    created () {
      this.$store.dispatch('fetchPosts')
    },
    components: {
      messages,
      post
    }
    
  }
</script>

<style scoped>
  .dashboard-box {
    margin: 20px;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }
  h1, p {
    text-align: center;
  }
</style>