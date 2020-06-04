export default {
    destroyed() {
        this.$store.commit('clearAllMessages')
    },
    methods: {
        clearAllMessages() {
            this.$store.commit('clearAllMessages')
        },
        clearMessageById(e){
            this.$store.commit('clearMessagesById', e.target.id)
        }
    }
  }