// import Vue from 'vue'
import axios from 'axios'
const baseUrl = 'https://convertscriptbackend.herokuapp.com';

// import {
//     resolve
// } from 'core-js/fn/promise'

export default {
    login({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post(`${baseUrl}/api/v1/user/login`, user, {})
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
                    // dispatch("getUser")
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
            axios.post(`${baseUrl}/api/v1/user/register`, user, {})
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
                    // dispatch("getUser")
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

            axios.post(`${baseUrl}/api/v1/user/password/email`, email, {})
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
    getUser({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/user/profile`)
                .then(resp => {
                    localStorage.setItem('user', JSON.stringify(resp.data.data))
                    commit("get_user_success", {
                        user: resp.data.data
                    })
                    //console.log(resp.data)


                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    resendVerificationEmail({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/user/email/resend`)
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

    getAllAgency({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/agencies`)
                .then(resp => {
                    commit("get_all_agencies_success", {
                        agencies: resp.data
                    });

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addAgency({
        state
    },agency) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/agencies`, agency, {})
                .then(resp => {
                    // commit("get_all_agencies_success", {
                    //     agencies: resp.data
                    // });

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

}