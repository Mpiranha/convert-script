// import Vue from 'vue'
import axios from 'axios'

// import {
//     resolve
// } from 'core-js/fn/promise'

export default {
    login({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post('https://convertscriptbackend.herokuapp.com/api/v1/user/login', user, {})
                .then(resp => {
                    const token = resp.data.token
                    // const data = resp.user
                    // console.log(resp)
                    // console.log('User: ')
                    // console.log(data)
                    // console.log('token: '+ token)
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', {
                        token: token,
                        // user: data
                    })
                    commit('login_attempt', true)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err)

                    commit('login_attempt', false)
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    register({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post('https://convertscriptbackend.herokuapp.com/api/v1/user/register', user, {})
                .then(resp => {
                    const token = resp.data.token
                    // const data = resp.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', {
                        token: token,
                        // user: data
                    })
                    commit('login_attempt', true)
                    resolve(resp)
                }).catch(err => {
                    commit('auth_error', err)
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    resetPassword({
        commit
    }, email) {
        return new Promise((resolve, reject) => {

            axios.post('https://convertscriptbackend.herokuapp.com/api/v1/user/password/email', email, {})
                .then(resp => {
                    // const token = resp.data.token
                    // const data = resp.user
                    // localStorage.setItem('token', token)
                    //axios.defaults.headers.common['Authorization'] = token

                    commit('reset_password_success', resp)
                    resolve(resp)
                }).catch(err => {
                    // commit('auth_error', err)
                    // localStorage.removeItem('token')
                    commit('reset_password_error', err)
                    reject(err)
                })
        })
    },
    resendVerificationEmail({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get('https://convertscriptbackend.herokuapp.com/api/v1/user/email/resend')
                .then(resp => {
                    //commit()

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    logout({
        commit
    }) {
        return new Promise((resolve) => {
            commit('logout')
            commit('login_attempt', false)
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },

}