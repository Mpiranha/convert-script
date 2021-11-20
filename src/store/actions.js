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
                    // localStorage.setItem('user', JSON.stringify(resp.data.data))
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
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },

    getAllAgency({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/agencies`)
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
    },
    addAgency({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/agencies`, data, {})
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
    },
    editAgency({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/agencies/${id}`, data)
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
    },
    deleteAgency({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/agencies/${id}`)
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
    },
    getCampaigns({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/campaigns`)
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
    },
    addCampaign({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/campaigns`, data, {})
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
    },
    editCampaign({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/campaigns/${id}`, data)
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
    },
    deleteCampaign({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/campaigns/${id}`)
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
    },
    // Admin Api's

    // Users
    getAllUsers({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/users`)
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
    },

    // Tutorials
    getAllVideos({
        // commit,
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/tutorials?page=${page.number}&per_page=${page.perPage}`)
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
    },
    addVideo({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/tutorials`, data, {})
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
    },
    editVideo({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/tutorials/${id}`, data)
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
    },
    deleteVideo({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/tutorials/${id}`)
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
    },

    // Agency Files
    getAllAgencyFiles({
        // commit,
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/agencies?page=${page.number}&per_page=${page.perPage}`)
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
    },
    addAgencyFile({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/agencies`, data, {})
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
    },
    editAgencyFile({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/agencies/${id}`, data)
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
    },
    deleteAgencyFile({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/agencies/${id}`)
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
    },

    // Bonuses
    getAllBonuses({
        // commit,
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/bonuses?page=${page.number}&per_page=${page.perPage}`)
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
    },
    addBonuses({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/bonuses`, data, {})
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
    },
    editBonuses({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/bonuses/${id}`, data)
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
    },
    deleteBonuses({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/bonuses/${id}`)
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
    },

    // Roles And Permission
    getAllRoles({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/roles`)
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
    },
    addRole({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/roles`, data, {})
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
    },
    editRoles({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/roles/${id}`, data)
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
    },
    deleteRoles({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/roles/${id}`)
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
    },

    // Suggestions
    getAllSuggestions({
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/suggestions?page=${page.number}&per_page=${page.perPage}`)
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
    },
    addSuggestion({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/agencies`, data, {})
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
    },


}