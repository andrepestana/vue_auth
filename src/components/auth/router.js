import SigninPage from './signin.vue'
import SignupPage from './signup.vue'
import UserSessions from './userSessions.vue'
import ChangePassword from './changePassword.vue'
import ConfirmEmail from './confirmEmail.vue'
import RecoverPassword from './recoverPassword.vue'
import ChangeLostPassword from './changeLostPassword.vue'

import authUtil from './authUtil'


let routes = [
    { 
        path: '/signup', 
        component: SignupPage,
        meta: { public: true }
    },
    { 
        path: '/signin', 
        component: SigninPage,
        meta: { public: true }
    },
    { 
        path: '/userSessions', 
        component: UserSessions
    },
    { 
        path: '/changePassword', 
        component: ChangePassword
    },
    { 
        path: '/confirmEmail', 
        component: ConfirmEmail,
        meta: { public: true }
    },
    { 
        path: '/recoverPassword', 
        component: RecoverPassword,
        meta: { public: true }  
    },
    {   
        path: '/changeLostPassword', 
        component: ChangeLostPassword,
        meta: { public: true }
    }
]

export default routes