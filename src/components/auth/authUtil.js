import store from '../../store' //main store
import messageUtil from '../messages/messageUtil'

const authUtil = {
    authRouteAccess(to, from, next) {
        if (to.matched.some(record => record.meta.public)) {
            next()
        } else if (store && store.state.auth && 
            !store.state.auth.user) {
                // Vue store state has not auth credentials
                // let's check localStorage
            store.dispatch('tryAutoLogin')
                .then(res => {
                    store.dispatch('registerLoggedUser', res)
                    .then(res => {
                        next()
                    })
                    .catch(error => {
                        const refreshToken = localStorage.getItem('refreshToken')
                        if(refreshToken) { 
                            store.dispatch('logout', refreshToken)
                                .then(() => {
                                    store.commit('addMessage', messageUtil.errorMessage('autoLogin', 'Something wrong happened when trying to auto login:' + error))
                                })
                                .catch(() => {})
                        }
                        next('/signin')
                    })
                })
                .catch(error => {
                    const refreshToken = localStorage.getItem('refreshToken')
                    if(refreshToken) {
                        store.dispatch('logout', refreshToken)
                            .then(() => {
                                store.commit('addMessage', messageUtil.errorMessage('autoLogin', 'Something wrong happened when trying to auto login:' + error))
                            })
                            .catch(() => {})
                    }
                    next('/signin')
                })
            
        } else if (store.state.auth && 
            store.state.auth.user && 
            store.state.auth.user.accessToken) {
                // already logged
                // proceed to the resource requested
            next()
        } 
    }, 
    authRouteForRetrievingPassword(to, next) {
        if (to.query.retrievePasswordToken) {
            next()
        } else {
            next('/signin')
        }
    }
}

export default authUtil