import axios from 'axios'
import messageUtil from '../messages/messageUtil'

const state = {
  user: null,
  userSessions: []
}

const getters = {
  user(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.user && state.user.accessToken !== null
  },
  userSessions(state) {
    return state.userSessions
  }
}

const mutations = {
  storeAuthUser(state, userData) {
    state.user = userData
  },
  clearAuthData(state) {
    state.user = null
  },
  storeUserSessions(state, userSessions) {
    state.userSessions = userSessions
  }
}

const actions = {
  getUserSessions({commit}) {
    commit('clearAllMessages')
    return new Promise((resolve, reject) => {
      axios.get('/api/auth/userSessions')
      .then(response => {
        commit('storeUserSessions', response.data)
        resolve()
      })
      .catch(error => {
        commit('addMessages', messageUtil.errorFromResponseMessages(error, 'userSessionsError'))
        reject()
      })
    })
  },
  changePassword({commit}, authData) {
    commit('clearAllMessages')
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/changePassword', authData)
        .then(resp => {
          commit('addMessages', resp.data.messages)
          resolve()
        })
        .catch(error => {
          commit('addMessages', messageUtil.errorFromResponseMessages(error, 'changePasswordError'))
          reject()
        })
    })  
  },
  setLogoutTimer({ dispatch }, { refreshToken, expirationTimeInMilli }) {
    setTimeout(() => {
      dispatch('logout', refreshToken)
    }, expirationTimeInMilli)
  },
  setRefreshTokenTimer({ dispatch }, expirationTimeInMilli) {
    setTimeout(() => {
      if (state.user) {
        axios.post('/api/auth/token', {
          refreshToken: state.user.refreshToken
        })
        .then(res => {
          dispatch('registerLoggedUser', res)
        })
        .catch(error => {
          try{
            //dispatch('logout', state.user.refreshToken)
          } catch(e) { console.log('setRefreshTOken', e)}
        })
      }
    }, expirationTimeInMilli - process.env.VUE_APP_TIME_TO_REFRESH_TOKEN_BEFORE_ACCESS_TOKEN_EXP_IN_MILLI)
  },

  signup({ commit, dispatch }, authData) {
    commit('clearAllMessages')
    return new Promise( (resolve,reject) => {
      axios.post('/api/auth/signup', authData)
        .then(resp => {
          commit('addMessages', resp.data.messages )
          dispatch('registerLoggedUser', resp)
          resolve()
        })
        .catch(error => {
          commit('addMessages', messageUtil.errorFromResponseMessages(error, 'signupError'))
          reject()
        })
    })
  },

  login({ commit, dispatch }, authData) {
    commit('clearAllMessages')
    return new Promise((resolve, rejection) => {
      axios.post('/api/auth/login', {
        username: authData.username,
        password: authData.password,
        returnSecureToken: true
      })
        .then(resp => {
          commit('addMessages', resp.data.messages )
          dispatch('registerLoggedUser', resp)
          resolve()
        })
        .catch(error => {
            commit('addMessages', messageUtil.errorFromResponseMessages(error, 'loginError'))
            rejection()
        })
    })
  },

  registerLoggedUser({ commit, dispatch }, res) {
    const accessTokenExpirationDate = res.data.accessTokenExpirationDate
    const refreshTokenExpirationDate = res.data.refreshTokenExpirationDate
    const milliSecsToExpire = accessTokenExpirationDate - new Date().getTime()
    let authUserData = {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      username: res.data.username,
      accessTokenExpirationDateInMilli: accessTokenExpirationDate,
      refreshTokenExpirationDateInMilli: refreshTokenExpirationDate,
      timeToRefreshAccessTokenBeforeExpirationInMilli: process.env.VUE_APP_TIME_TO_REFRESH_TOKEN_BEFORE_ACCESS_TOKEN_EXP_IN_MILLI
    }
    commit('storeAuthUser', authUserData)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.user.accessToken
    saveAuthDataToLocalStorage(authUserData)
    dispatch('setRefreshTokenTimer', milliSecsToExpire)
  },

  tryAutoLogin({ commit, dispatch }) {
    const refreshToken = localStorage.getItem('refreshToken')
    return axios.post('/api/auth/token', {
      refreshToken: refreshToken
    })
  },

  deregisterLoggedUser({ commit }) {
    commit('clearAuthData')
    removeAuthDataFromLocalStorage(localStorage)
    delete axios.defaults.headers.common["Authorization"]
  },
  logItOut({ commit, dispatch }, refreshToken) {
    commit('clearAllMessages')
    return new Promise((resolve, reject) => {
      axios.delete('/api/auth/logout', {
        params: { refreshToken: refreshToken }
      })
      .then(resp => {
        commit('addMessages', resp.data.messages )
        dispatch('getUserSessions')
        resolve()
      })
      .catch(error => {
        commit('addMessages', messageUtil.errorFromResponseMessages(error, 'logItOutError'))
        reject()
      })
    })
  },
  logout({ commit, dispatch }, refreshToken) {
    commit('clearAllMessages')
    return new Promise((resolve, reject) => {
      axios.delete('/api/auth/logout', {
        params: { refreshToken }
      })
      .then(response => {
        dispatch('deregisterLoggedUser')
        resolve()
      })
      .catch(error => {
        commit('addMessages', messageUtil.errorFromResponseMessages(error, 'logOutError'))
        reject()
      })
    })
  },
  confirmEmail({ commit, dispatch }, emailConfirmationToken) {
    commit('clearAllMessages')
    return new Promise((resolve, reject) => {
        axios.get('/api/auth/confirmEmail', {
          params: { emailConfirmationToken }
        })
        .then(response => {
          commit('addMessages', response.data.messages)
          resolve()
        })
        .catch(error => {
          commit('addMessages', messageUtil.errorFromResponseMessages(error, 'confirmEmailError'))
          reject()
        }) 
    })
  },
  sendEmailToRetrievePassword({ commit, dispatch }, formData) {
    commit('clearAllMessages')
    return new Promise(( res, rej ) => {
      axios.post('/api/auth/sendEmailToRetrievePassword', formData)
        .then(resp => {
          commit('addMessages', resp.data.messages)
          res()
        })
        .catch(error => {
          commit('addMessages', messageUtil.errorFromResponseMessages(error, 'sendEmailToRetrievePasswordError'))
          rej()
        })
    })
  },
  changeLostPassword({ commit, dispatch }, formData) {
    commit('clearAllMessages')
    return new Promise((res, rej) => {
        axios.post('/api/auth/changeLostPassword', formData)
          .then(resp => {
            commit('addMessages', resp.data.messages )
            res()
          })
          .catch(error => {
            commit('addMessages', messageUtil.errorFromResponseMessages(error, 'changeLostPasswordError'))
            rej()
          })
    })
  }      
}

function saveAuthDataToLocalStorage(authUserData) {
  localStorage.setItem('accessToken', authUserData.accessToken)
  localStorage.setItem('refreshToken', authUserData.refreshToken)
  localStorage.setItem('username', authUserData.username)
  localStorage.setItem('accessTokenExpirationDateInMilli', authUserData.accessTokenExpirationDateInMilli)
  localStorage.setItem('refreshTokenExpirationDateInMilli', authUserData.refreshTokenExpirationDateInMilli)
}
function removeAuthDataFromLocalStorage(localStorage) {
  localStorage.removeItem('refreshTokenExpirationDateInMilli')
  localStorage.removeItem('accessTokenExpirationDateInMilli')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('username')
}

export default {
  state,
  mutations,
  actions,
  getters
}