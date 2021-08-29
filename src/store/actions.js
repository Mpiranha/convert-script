// import Vue from 'vue'
import axios from 'axios'

export default {
    login({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios.post('http://convertscriptbackend.herokuapp.com/api/v1/user/login', user, {})
                .then(resp => {
                    const token = resp.data.token
                    // const data = resp.user
                    console.log(resp)
                    console.log('User: ')
                    // console.log(data)
                    console.log('token: '+ token)
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', {
                        token: token,
                        // user: data
                    })
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error')
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
            axios.post('http://convertscriptbackend.herokuapp.com/api/v1/user/register', user, {}).then(resp => {
                const token = resp.token
                // const data = resp.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', {
                    token: token,
                    // user: data
                })
                resolve(resp)
            }).catch(err => {
                commit('auth_error', err)
                localStorage.removeItem('token')
                reject(err)
            })
        })
    },
    logout({
        commit
    }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}