import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import baseUrl from '../api/url'



Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {

    },
    actions: {
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
    },
    setters: {

    },
    getters: {

    },
    mutations: {

    }
})