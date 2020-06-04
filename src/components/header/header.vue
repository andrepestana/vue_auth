<template>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item to="/" exact-active-class="active">Home</b-nav-item>
          <b-nav-item v-if="!auth" to="/signup" active-class="active">Sign Up</b-nav-item>
          <b-nav-item v-if="!auth" to="/signin" active-class="active">Sign In</b-nav-item>
          <b-nav-item-dropdown v-if="auth">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <strong>User</strong>
            </template>
            <b-dropdown-item active-class="active" to="/userSessions">User Sessions</b-dropdown-item>
            <b-dropdown-item active-class="active" to="/changePassword">Change Password</b-dropdown-item>
            <b-dropdown-item active-class="active" @click="onLogout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout', this.$store.getters.user.refreshToken)
          .then(() => this.$router.push('/signin'))
          .catch(() => {})
      }
    }
  }
</script>

<style>

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  .dropdown-item.active, .dropdown-item:active {
    color: #000 ; 
    text-decoration: none;
    background-color: transparent;
    font-weight: bold;
  }
  .nav-link.active {
    font-weight: bold;
  }
</style>