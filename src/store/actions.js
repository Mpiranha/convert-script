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

    // Tutorial

    getTutorialVideos({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/tutorials`)
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

    // Dashboard

    getDashboardInfo({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/dashboard`)
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

    // Agency

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

    // Reseller 

    getAllReseller({
        // commit,
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
    getOneCampaign({
        // commit,
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/campaigns/${id}`)
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
    getAgencyCampaign({
        // commit,
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



    getGeneratedScripts({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/scripts`)
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

    getScriptTypes({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/script-types`)
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

    getOneScriptType({
        // commit,
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/script-types/${id}`)
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
    getOneScriptTypeSelect({
        // commit,
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/user-select-script-type/${id}`)
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
        // commit,
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
        // commit,
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
        // commit,
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
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/favorite-script-responses`)
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

    generateScript({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/scripts`, data, {})
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
    exportOneScript({
        // commit,
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/text/script-response/${id}`)
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

    exportAllScript({
        // commit,
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/text/download/user/${id}/all-script-responses`)
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

    deleteScript({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/scripts/${id}`)
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

    getBonues({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/bonuses`)
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

    getAgencyFilesUser({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/agency-files`)
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

    // Market

    getMarket({
        // commit,
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/marketplace?page=${page.number}&per_page=${page.perPage}`)
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

    getSavedProject({
        // commit,
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

    deleteSavedProject({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/marketplace-saved/${id}`)
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

    // Script type preset



    // Admin Api's

    // 

    exportUsers({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/export/excel/model?model=User&type=Admin&export=UsersExport`)
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
    getAllUsers({
        // commit,
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/users?page=${page.number}&per_page=${page.perPage}`)
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
    getOneUser({
        // commit,
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/users/${id}`)
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
    addUser({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/users`, data, {})
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
    deleteUser({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/users/${id}`)
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

    // Script Type
    getOneScript({
        // commit,
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
        // commit,
        state
    }, page) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/script-type?page=${page.number}&per_page=${page.perPage}`)
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
    addScriptType({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/script-type`, data, {})
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
    deleteScriptType({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/script-type/${id}`)
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

    // Keywords

    getKeywords({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/freelancer-keyword`)
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
    addKeyword({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/freelancer-keyword`, data, {})
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
    deleteKeyword({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/freelancer-keyword/${id}`)
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


    // Upload Script type icon
    uploadIcon({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/share/upload`, data, {})
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
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/agency-files`)
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
            axios.post(`${baseUrl}/api/v1/admin/agency-files`, data, {})
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
            axios.put(`${baseUrl}/api/v1/admin/agency-files/${id}`, data)
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
            axios.delete(`${baseUrl}/api/v1/admin/agency-files/${id}`)
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
    getOneRole({
        // commit,
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/roles/${id}`)
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
    deleteRole({
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
    

    // Categories

    getAllCategories({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/script-type-categories`)
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
    addCategory({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/script-type-categories`, data, {})
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
    deleteCategory({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/script-type-categories/${id}`)
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

    // Languages

    getAllLanguages({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/languages`)
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
    addLanguage({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/languages`, data, {})
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
    deleteLanguage({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/languages/${id}`)
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

    // Tones

    getAllTones({
        // commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/tones`)
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
    addTone({
        state
    }, data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.post(`${baseUrl}/api/v1/admin/tones`, data, {})
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
    deleteTone({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/tones/${id}`)
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


    // Permissions
    getAllPermissions({
        // commit,
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
        // commit,
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
    deletePlan({
        state
    }, id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.delete(`${baseUrl}/api/v1/admin/plans/${id}`)
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
            axios.post(`${baseUrl}/api/v1/suggestions`, data, {})
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

    // Admin Dashboard
    getStatInfo({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/admin/dashboard`)
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

    // Shared Plan
    getSharedPlan({
        state
    }) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = "Bearer " + state.token
            axios.get(`${baseUrl}/api/v1/share/plans`)
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

    // Transactions

    getAllTransactions({
        // commit,
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


    // Third Party Platform Integration

    getAllPlatformIntegration({
        // commit,
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