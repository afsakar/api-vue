import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
        errors: []
    }),
    actions: {
        async login(user) {
            return new Promise((resolve, reject) => {
                this.auth_request()
                axios.get('sanctum/csrf-cookie').then(() => {
                    axios({url: 'api/auth/login', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        console.log(resp.data.user)
                        localStorage.setItem('token', token)
                        localStorage.setItem('userInfo', JSON.stringify(user))
                        axios.defaults.headers.common['Authorization'] = token
                        this.auth_success(token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        this.auth_error(err.response.data)
                        console.log(err)
                        reject(err)
                        return err
                    })
                })
            })
        },
        logout(){
            this.initlogout()
            delete axios.defaults.headers.common['Authorization']
            axios.get('api/auth/logout').then(resp => {
                return this.router.push('/login')
            })
        },
        auth_request(){
            this.status = 'loading'
        },
        auth_success(token, user){
            this.status = 'success'
            this.token = token
            this.user = user
        },
        auth_error(err){
            this.status = 'error'
            this.errors = err.errors
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        },
        initlogout(){
            this.status = ''
            this.token = ''
            this.userInfo = ''
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        },
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        getUser: state => state.userInfo
    }
})