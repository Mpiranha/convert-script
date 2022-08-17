// import Vue from 'vue'
import axios from 'axios'
const baseUrl = 'https://api.onecopy.ai';

// import {
//     resolve
// } from 'core-js/fn/promise'

export default {

    // Search
    search({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}${data.endpoint}?search=${data.keyword}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
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
    changePassword({
        commit
    }, data) {
        return new Promise((resolve, reject) => {

            axios.post(`${baseUrl}/api/v1/user/change/password`, data, {})
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
    updateUserDetails({
        commit,
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/user/update`, data, {})
                .then(resp => {
                    localStorage.setItem('user', JSON.stringify(resp.data.data))
                    commit("get_user_success", {
                        user: resp.data.data
                    })

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

    // Billing Page

    getUserPlanDetails({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/plans`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getPlanUpgradeLink({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/plan/${id}/upgrade`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


    // Tutorial

    getTutorialVideos({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/tutorials`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Dashboard

    getDashboardInfo({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/dashboard`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Agency

    getAllAgency({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/agencies`)
                .then(resp => {

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

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Reseller 

    getAllReseller({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/reseller`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addReseller({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/reseller`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editReseller({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/reseller/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteReseller({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/reseller/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    // Campaigns

    getCampaigns({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/campaigns`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getOneCampaign({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/campaigns/${id}`)
                .then(resp => {

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

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getAgencyCampaign({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/agency/${id}/campaign`)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addCampaignToAgency({
        state
    }, { id, data }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/agency/${id}/campaign`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Scripts


    editScript({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/script-responses/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },



    getGeneratedScripts({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/scripts`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getScriptTypes({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/script-types`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getOneScriptType({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/script-types/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getOneScriptTypeSelect({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/user-select-script-type/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    postScriptTypePresets({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/user-script-type-presets`, data, {})
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    editScriptTypePresets({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/user-script-type-presets/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addRemoveFavorite({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/favorite-script-responses`, data, {})
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    exportAllFavorites({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/text/download/user/${id}/all-script-responses`)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    exportAllCampaignScripts({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/text/download/user/${id}/favorite-script-responses`)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    exportAllGeneratedScripts({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/text/download/all-script-responses/${id}`)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getAllFavorites({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/favorite-script-responses`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    generateScript({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/scripts`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    exportOneScript({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/text/script-response/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    exportAllScript({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/text/download/user/${id}/all-script-responses`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    deleteScript({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/scripts/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Bonuses

    getBonues({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/bonuses`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Agency Files

    getAgencyFilesUser({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/agency-files`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Market

    getMarket({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/marketplace?page=${page.number}&per_page=${page.perPage}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getSavedProject({
       
        state
    }, page) {
        if (page) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
                axios.get(`${baseUrl}/api/v1/marketplace-saved?page=${page.number}&per_page=${page.perPage}`)
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
        } else {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
                axios.get(`${baseUrl}/api/v1/marketplace-saved`)
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
    },


    saveProject({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/marketplace-saved`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    deleteSavedProject({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/marketplace-saved/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Script type preset



    // Admin Api's

    // 

    exportUsers({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/excel/model?model=User&type=Admin&export=UsersExport`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getAllUsers({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/users?page=${page.number}&per_page=${page.perPage}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getOneUser({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/users/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addUser({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/users`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editUser({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/users/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteUser({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/users/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Script Type
    getOneScript({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/script-type/${id}`)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getAllScriptType({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/script-type?page=${page.number}&per_page=${page.perPage}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addScriptType({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/script-type`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editScriptType({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/script-type/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteScriptType({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/script-type/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Keywords

    getKeywords({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/freelancer-keyword`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addKeyword({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/freelancer-keyword`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editKeyword({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/freelancer-keyword/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteKeyword({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/freelancer-keyword/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


    // Upload Script type icon
    uploadIcon({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/share/upload`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


    // Tutorials
    getAllVideos({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/tutorials?page=${page.number}&per_page=${page.perPage}`)
                .then(resp => {

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

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Agency Files
    getAllAgencyFiles({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/agency-files`)
                .then(resp => {

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
            axios.post(`${baseUrl}/api/v1/admin/agency-files`, data, {})
                .then(resp => {

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
            axios.put(`${baseUrl}/api/v1/admin/agency-files/${id}`, data)
                .then(resp => {

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
            axios.delete(`${baseUrl}/api/v1/admin/agency-files/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Bonuses
    getAllBonuses({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token;
            if (page) {
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
            } else {
                axios.get(`${baseUrl}/api/v1/admin/bonuses`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            }
        })

    },
    addBonuses({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/bonuses`, data, {})
                .then(resp => {

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

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Roles And Permission
    // Role Cycle 
    getRoleCycle({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/role-cycles`)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getAllRoles({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/roles`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getOneRole({
       
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/roles/${id}`)
                .then(resp => {

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

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editRole({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/roles/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteRole({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/roles/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addPermissionsToRole({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/roles/${id}`, data)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    
     // Promo Code
     getAllPromoCodes({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/purchase-codes`)
                .then(resp => {
                  
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addPromoCode({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/purchase-code`, data, {})
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editPromoCode({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/purchase-code/${id}`, data)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deletePromoCode({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/purchase-code/${id}`)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


    // Used Code
    getAllUsedCode({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/purchase-codes/used`)
                .then(resp => {
                  
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


    // Categories

    getAllCategories({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/script-type-categories`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addCategory({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/script-type-categories`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editCategory({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/script-type-categories/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteCategory({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/script-type-categories/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Languages

    getAllLanguages({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/languages`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addLanguage({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/languages`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editLanguage({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/languages/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteLanguage({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/languages/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Tones

    getAllTones({
       
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/tones`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    addTone({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/tones`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editTone({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/tones/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteTone({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/tones/${id}`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


    // Permissions
    getAllPermissions({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            if (page) {
                axios.get(`${baseUrl}/api/v1/admin/permissions?page=${page.number}&per_page=${page.perPage}`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            } else {
                axios.get(`${baseUrl}/api/v1/admin/permissions`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            }
        })

    },

    // Plans
    getAllPlans({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            if (page) {
                axios.get(`${baseUrl}/api/v1/admin/plans?page=${page.number}&per_page=${page.perPage}`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            } else {
                axios.get(`${baseUrl}/api/v1/admin/plans`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            }
        })

    },
    addPlan({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/plans`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    editPlan({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/plans/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deletePlan({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/plans/${id}`)
                .then(resp => {

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
            axios.post(`${baseUrl}/api/v1/suggestions`, data, {})
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Admin Dashboard
    getStatInfo({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/dashboard`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Shared Plan
    getSharedPlan({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/share/plans`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getUsersAllPlan({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/plans?all=1`)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    // Transactions

    getAllTransactions({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token

            if (page) {
                axios.get(`${baseUrl}/api/v1/admin/transactions?page=${page.number}&per_page=${page.perPage}`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    });
            } else {
                axios.get(`${baseUrl}/api/v1/admin/transactions`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    });
            }
        })
    },

    updateTransaction({
        state
    }, {
        id,
        data
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.put(`${baseUrl}/api/v1/admin/transactions/${id}`, data)
                .then(resp => {

                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


    // Third Party Platform Integration

    getAllPlatformIntegration({
       
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token

            if (page) {
                axios.get(`${baseUrl}/api/v1/admin/third-party-platforms?page=${page.number}&per_page=${page.perPage}`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    });
            } else {
                axios.get(`${baseUrl}/api/v1/admin/third-party-platforms`)
                    .then(resp => {
                        // commit("get_all_agencies_success", {
                        //     agencies: resp.data
                        // });

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    });
            }
        })
    },
}