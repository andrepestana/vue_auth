<template>
    <div class="user-session-box">
        <h1 class="text-center">User sessions</h1>
        <messages></messages>
        <div>
            <div 
                v-for="(userSession,index) in userSessions" 
                :key="index"
                v-bind:class="{ 'alert-warning': isCurrentSession(index) }"
                class="user-sesion-item">
              <div v-if="isCurrentSession(index)">
                <div class="font-weight-bold bg-danger text-white text-center">Current Session</div>
              </div>
              <div>
                <div class="font-weight-bold d-md-table-cell label">Started at: </div>
                <div class="d-md-table-cell">{{ new Date(userSession.refreshTokenCreatedDate) | formatDateTime }}</div>
              </div>
              <div>  
                <div class="font-weight-bold d-md-table-cell label">Expires at:</div>
                <div class="d-md-table-cell">{{ new Date(userSession.refreshTokenExpirationDate) | formatDateTime }}</div>
              </div>
              <div>
                <div class="font-weight-bold d-md-table-cell label">User Agent:</div>
                <div class="d-md-table-cell">{{ userSession.clientInfo.userAgent }}</div>
              </div>
              <div>  
                <div class="font-weight-bold d-md-table-cell label">Remote Address:</div>
                <div class="d-md-table-cell">{{ userSession.remoteAddress }}</div>
              </div>
              <div>  
                <div class="font-weight-bold d-md-table-cell label">Revoked:</div>
                <div class="d-md-table-cell">{{ userSession.revoked | yesOrNo }}</div>
              </div>
              <div>  
                <div class="">
                  <button v-if="!userSession.revoked && !isCurrentSession(index)" 
                          @click="logItOut(index)"
                          class="btn btn-dark">
                    Log it out
                  </button></div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
  import messages from '../messages/messages.vue'
  export default {
      created() {
          this.$store.dispatch('getUserSessions')
      },
      computed: {
        userSessions () {
          return this.$store.getters.userSessions
        }      
      },
      methods: {
          logItOut(index) {
              this.$store.dispatch('logItOut', this.userSessions[index].refreshToken)
          },
          isCurrentSession(index) {
            if(this.userSessions && this.$store.getters.user)
              return this.userSessions[index].refreshToken === this.$store.getters.user.refreshToken 
          }
      },
      components: {
          messages
      }
  }
</script>
<style scoped>
  .user-session-box {
    margin: 20px;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }
  .user-sesion-item {
    max-width: 1000px;
    margin: 20px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }
  .label {
    width : 150px;
  }
</style>