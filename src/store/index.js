import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from '../components/auth/store'
import messages from '../components/messages/store'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: null    
  },
  mutations: {
    storePosts (state, posts) {
      state.posts = posts
    }
  },
  actions: {
    fetchPosts ({commit, state}) {
      axios.get('/posts')
      .then(res => {
 
        commit('storePosts', res.data)
        
      })
      .catch(error => console.log(error))
    }
  },
  getters: {
    posts (state) {
      return state.posts
    }
   },
  modules: {
    auth,
    messages
  }
})
