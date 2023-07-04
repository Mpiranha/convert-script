// import Vue from 'vue'
import axios from "axios";
//const baseUrl = "https://api.onecopy.ai";

const baseUrl = "https://dev.onecopy.ai";

// import {
//     resolve
// } from 'core-js/fn/promise'

export default {
  // Search
  search({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}${data.endpoint}?search=${data.keyword}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios
        .post(`${baseUrl}/api/v1/user/login`, user, {})
        .then((resp) => {
          const token = resp.data.token;
          // const data = resp.user
          // console.log(resp)
          // console.log('User: ')
          // console.log(data)
          // console.log('token: '+ token)
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", {
            token: token,
            // user: data
          });
          commit("login_attempt", true);
          //dispatch("getUser");
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error", err);

          commit("login_attempt", false);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  getGoogleSignURL({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/user/google/login/url`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  verifyGoogleToken({ commit }, auth_code) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios
        .post(
          `${baseUrl}/api/v1/user/google/auth/login?auth_code=${auth_code}`,
          {}
        )
        .then((resp) => {
          const token = resp.data.token;
          // const data = resp.user
          // console.log(resp)
          // console.log('User: ')
          // console.log(data)
          // console.log('token: '+ token)
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", {
            token: token,
            // user: data
          });
          commit("login_attempt", true);
          // dispatch("getUser")
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error", err);

          commit("login_attempt", false);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios
        .post(`${baseUrl}/api/v1/user/register`, user, {})
        .then((resp) => {
          const token = resp.data.token;
          // const data = resp.user
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", {
            token: token,
            // user: data
          });
          commit("login_attempt", true);
          // dispatch("getUser")
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  resetPassword({ commit }, email) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/api/v1/user/password/email`, email, {})
        .then((resp) => {
          // const token = resp.data.token
          // const data = resp.user
          // localStorage.setItem('token', token)
          //axios.defaults.headers.common['Authorization'] = token

          commit("reset_password_success", resp);
          resolve(resp);
        })
        .catch((err) => {
          // commit('auth_error', err)
          // localStorage.removeItem('token')
          commit("reset_password_error", err);
          reject(err);
        });
    });
  },
  verifyToken({ commit }, token) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/api/v1/user/password/verify-password-token/${token}`)
        .then((resp) => {
          commit("reset_password_success", resp);
          resolve(resp);
        })
        .catch((err) => {
          commit("reset_password_error", err);
          reject(err);
        });
    });
  },
  changePassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/api/v1/user/change/password`, data, {})
        .then((resp) => {
          // const token = resp.data.token
          // const data = resp.user
          // localStorage.setItem('token', token)
          //axios.defaults.headers.common['Authorization'] = token

          commit("reset_password_success", resp);
          resolve(resp);
        })
        .catch((err) => {
          // commit('auth_error', err)
          // localStorage.removeItem('token')
          commit("reset_password_error", err);
          reject(err);
        });
    });
  },
  resetUserPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/api/v1/user/password/reset`, data, {})
        .then((resp) => {
          // const token = resp.data.token
          // const data = resp.user
          // localStorage.setItem('token', token)
          //axios.defaults.headers.common['Authorization'] = token

          commit("reset_password_success", resp);
          resolve(resp);
        })
        .catch((err) => {
          // commit('auth_error', err)
          // localStorage.removeItem('token')
          commit("reset_password_error", err);
          reject(err);
        });
    });
  },
  getUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/user/profile`)
        .then((resp) => {
          localStorage.setItem("user", JSON.stringify(resp.data.data));
          commit("get_user_success", {
            user: resp.data.data,
          });
          //console.log(resp.data)
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateUserDetails({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/user/update`, data, {})
        .then((resp) => {
          localStorage.setItem("user", JSON.stringify(resp.data.data));
          commit("get_user_success", {
            user: resp.data.data,
          });

          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  resendVerificationEmail({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/user/email/resend`)
        .then((resp) => {
          //commit()

          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("logout");
      commit("login_attempt", false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },

  // Image AI
  getImageFiltersUser({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/filters`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getImageMediumUser({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/media`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getImageStyleUser({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/image_styles`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Billing Page

  getUserPlanDetails({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/plans`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getPlanUpgradeLink({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/plan/${id}/upgrade`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Tutorial

  getTutorialVideos({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/tutorials`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Dashboard

  getDashboardInfo({ state }, workspace_id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/dashboard/${workspace_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Agency

  getAllAgency({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/agencies`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addAgency({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/agencies`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editAgency({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/agencies/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteAgency({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/agencies/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Reseller

  getAllReseller({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/reseller`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addReseller({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/reseller`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editReseller({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/reseller/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteReseller({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/reseller/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // Campaigns

  getCampaigns({ state }, workspace_id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/campaigns/${workspace_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getOneCampaign({ state }, { id, page, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/campaigns/${id}/${workspace_id}?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addCampaign({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/campaigns`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editCampaign({ state }, { id, data, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/campaigns/${id}/${workspace_id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteCampaign({ state }, { id, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/campaigns/${id}/${workspace_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getAgencyCampaign({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/agency/${id}/campaign`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addCampaignToAgency({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/agency/${id}/campaign`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Scripts

  editScript({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/script-responses/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getGeneratedScripts({ state }, { page, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/scripts/${workspace_id}?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getScriptTypes({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/script-types`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOneScriptType({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/script-types/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getOneScriptTypeSelect({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/user-select-script-type/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  postScriptTypePresets({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/user-script-type-presets`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  editScriptTypePresets({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/user-script-type-presets/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addRemoveFavorite({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/favorite-script-responses`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  exportAllFavorites({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/export/text/download/user/${id}/all-script-responses`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  exportAllCampaignScripts({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/export/text/download/user/${id}/favorite-script-responses`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  exportAllGeneratedScripts({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/export/text/download/all-script-responses/${id}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getAllFavorites({ state }, { page, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/favorite-script-responses/${workspace_id}?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  generateScript({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/scripts`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  exportOneScript({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/export/text/script-response/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  exportAllScript({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/export/text/download/user/${id}/all-script-responses`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteScript({ state }, { id, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/scripts/${id}/${workspace_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Bonuses

  getBonues({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/bonuses`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Agency Files

  getAgencyFilesUser({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/agency-files`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Market

  getMarket({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/marketplace?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSavedProject({ state }, page) {
    if (page) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + state.token;
        axios
          .get(
            `${baseUrl}/api/v1/marketplace-saved?page=${page.number}&per_page=${page.perPage}`
          )
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + state.token;
        axios
          .get(`${baseUrl}/api/v1/marketplace-saved`)
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  },

  saveProject({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/marketplace-saved`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteSavedProject({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/marketplace-saved/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Script type preset

  // Admin Api's

  //

  exportUsers({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/export/excel/model?model=User&type=Admin&export=UsersExport`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getAllUsers({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/admin/users?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getOneUser({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/users/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addUser({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/users`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editUser({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/users/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteUser({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/users/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Script Type
  getOneScript({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/script-type/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getAllScriptType({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/admin/script-type?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addScriptType({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/script-type`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editScriptType({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/script-type/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteScriptType({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/script-type/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Keywords

  getKeywords({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/freelancer-keyword`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addKeyword({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/freelancer-keyword`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editKeyword({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/freelancer-keyword/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteKeyword({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/freelancer-keyword/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Upload Script type icon
  uploadIcon({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/share/upload`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Tutorials
  getAllVideos({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/admin/tutorials?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addVideo({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/tutorials`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editVideo({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/tutorials/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteVideo({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/tutorials/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Agency Files
  getAllAgencyFiles({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/agency-files`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addAgencyFile({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/agency-files`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editAgencyFile({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/agency-files/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteAgencyFile({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/agency-files/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Bonuses
  getAllBonuses({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      if (page) {
        axios
          .get(
            `${baseUrl}/api/v1/admin/bonuses?page=${page.number}&per_page=${page.perPage}`
          )
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios
          .get(`${baseUrl}/api/v1/admin/bonuses`)
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  addBonuses({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/bonuses`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editBonuses({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/bonuses/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteBonuses({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/bonuses/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Roles And Permission
  // Role Cycle
  getRoleCycle({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/role-cycles`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getAllRoles({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/roles`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getOneRole({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/roles/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addRole({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/roles`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editRole({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/roles/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteRole({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/roles/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addPermissionsToRole({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/roles/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Promo Code
  getAllPromoCodes({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/purchase-codes`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addPromoCode({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/purchase-code`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editPromoCode({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/purchase-code/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deletePromoCode({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/purchase-code/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Used Code
  getAllUsedCode({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/purchase-codes/used`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Categories

  getAllCategories({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/script-type-categories`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addCategory({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/script-type-categories`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editCategory({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/script-type-categories/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteCategory({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/script-type-categories/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Image Filters

  getAllFilters({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/ai_filter`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addFilter({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/ai_filter`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editFilter({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/ai_filter/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteFilter({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/ai_filter/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Image Medium

  getAllMedium({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/ai_medium`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addMedium({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/ai_medium`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editMedium({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/ai_medium/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteMedium({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/ai_medium/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Image Style

  getAllStyles({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/ai_image_style`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addStyle({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/ai_image_style`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editStyle({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/ai_image_style/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteStyle({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/ai_image_style/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // generate image

  generateImage({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/ai/image_creator`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  downloadImage({ state }, filename) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/download?filename=${filename}`, {
          responseType: "blob",
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getCycleType({ state }, name) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/plans/${name}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getRoleType({ state }, plan) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/role/${plan}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Voice Languages

  getAllVoiceLanguages({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      if (page) {
        axios
          .get(
            `${baseUrl}/api/v1/admin/voice-languages?page=${page.number}&per_page=${page.perPage}`
          )
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios
          .get(`${baseUrl}/api/v1/admin/voice-languages`)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  addVoiceLanguage({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/voice-language`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editVoiceLanguage({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/voice-language/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteVoiceLanguage({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/voice-language/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Voice Audio

  getAllVoices({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/admin/voices?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addVoice({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/voice`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editVoice({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/voice/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteVoice({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/voice/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Plagiarism Credit

  getAllPlagiarismCredits({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/plagiarism-credits`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addPlagiarismCredit({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/plagiarism-credit`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editPlagiarismCredit({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/plagiarism-credit/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deletePlagiarismCredit({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/plagiarism-credit/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Chat Prompt

  getChatPrompts({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      if (page) {
        axios
          .get(
            `${baseUrl}/api/v1/admin/chat-prompts?page=${page.number}&per_page=${page.perPage}`
          )
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios
          .get(`${baseUrl}/api/v1/admin/chat-prompts`)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  addChatPrompt({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/chat-prompt`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editChatPrompt({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/chat-prompt/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteChatPrompt({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/chat-prompt/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // upgrade with purchase code
  upgradeWithPurchaseCode({ state }, code) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/plan/upgrade_with_purchase_code/${code}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Workspace

  getOneWorkspace({ state }, { id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/workspace/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getWorkspaces({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/workspaces`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addWorkspace({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/workspace`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editWorkspace({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/workspace/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteWorkspace({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/workspace/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addTeamToWorkspace({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/workspace/invite_team`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editTeamWorkspace({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/team_member/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteTeamWorkspace({ state }, { id, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/team_member/${id}/${workspace_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addDefaultWorkspace({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/workspace_set_default`, data, {})
        .then((resp) => {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(resp.data.data));
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getTeamRoles({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/team_roles`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  resendInviteLink({ state }, team_id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/workspace/invite_team/resend_invite/${team_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Text to Speech

  exportAudios({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/ai/text_to_speech/export`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getLanguageTextToSpeech({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/text_to_speech/languages`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getVoiceTextToSpeech({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/text_to_speech/voices`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  initiateTextToSpeech({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/ai/text_to_speech`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // OneChat AI

  speechToText({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/ai/speech_to_text`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  startChat({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/ai/chat`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  continueChat({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/ai/chat/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateChatTitle({ state }, { chat_id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/ai/chat_title/${chat_id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  saveMessage({ state }, { chat_id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/ai/chat_message/save/${chat_id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getChatHistory({ state }, workspace_id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/chat/history/${workspace_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getPromptCategory({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/chat/prompt_categories`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getPrompts({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/chat/prompts/0`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  regenerateChat({ state }, { workspace_id, chat_id, message_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/ai/chat_regenerate/${workspace_id}/${chat_id}/${message_id}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOneChatHistory({ state }, { workspace_id, chat_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/ai/chat/${workspace_id}/${chat_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteChatHistory({ state }, { id, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/ai/chat/${workspace_id}/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  clearChat({ state }, { chat_id, workspace_id }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/ai/clear/chat/${chat_id}/${workspace_id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Long Form

  exportLongForm({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/export/text/long-form`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  generateOutline({ state }, { data, config }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/longform/gen_outlines`, data, config)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  savePost({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/longform/save`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fromOutlineGenSubsection({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(
          `${baseUrl}/api/v1/longform/from_outline_gen_subsections`,
          data,
          {}
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fromOutlineGenPost({ state }, { data, config }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/longform/from_outline_gen_post`, data, config)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  checkPlagiarism({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/ai/plagiarism_checker`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getPlagiarismPlan({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/plagiarism_plans`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  upgradePlagiarismPlan({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/plagiarism_plan/${id}/upgrade`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Languages

  getAllLanguages({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/languages`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addLanguage({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/languages`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editLanguage({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/languages/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteLanguage({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/languages/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Tones

  getAllTones({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/tones`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addTone({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/tones`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editTone({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/tones/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteTone({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/tones/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Permissions
  getAllPermissions({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      if (page) {
        axios
          .get(
            `${baseUrl}/api/v1/admin/permissions?page=${page.number}&per_page=${page.perPage}`
          )
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios
          .get(`${baseUrl}/api/v1/admin/permissions`)
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },

  // Plans
  getAllPlans({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      if (page) {
        axios
          .get(
            `${baseUrl}/api/v1/admin/plans?page=${page.number}&per_page=${page.perPage}`
          )
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios
          .get(`${baseUrl}/api/v1/admin/plans`)
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
  addPlan({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/admin/plans`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  editPlan({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/plans/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deletePlan({ state }, id) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .delete(`${baseUrl}/api/v1/admin/plans/${id}`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Suggestions
  getAllSuggestions({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(
          `${baseUrl}/api/v1/admin/suggestions?page=${page.number}&per_page=${page.perPage}`
        )
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addSuggestion({ state }, data) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .post(`${baseUrl}/api/v1/suggestions`, data, {})
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Admin Dashboard
  getStatInfo({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/admin/dashboard`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Shared Plan
  getSharedPlan({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/share/plans`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getUsersAllPlan({ state }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .get(`${baseUrl}/api/v1/plans?all=1`)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Transactions

  getAllTransactions({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;

      if (page) {
        axios
          .get(
            `${baseUrl}/api/v1/admin/transactions?page=${page.number}&per_page=${page.perPage}`
          )
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios
          .get(`${baseUrl}/api/v1/admin/transactions`)
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },

  updateTransaction({ state }, { id, data }) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;
      axios
        .put(`${baseUrl}/api/v1/admin/transactions/${id}`, data)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // Third Party Platform Integration

  getAllPlatformIntegration({ state }, page) {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + state.token;

      if (page) {
        axios
          .get(
            `${baseUrl}/api/v1/admin/third-party-platforms?page=${page.number}&per_page=${page.perPage}`
          )
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios
          .get(`${baseUrl}/api/v1/admin/third-party-platforms`)
          .then((resp) => {
            // commit("get_all_agencies_success", {
            //     agencies: resp.data
            // });

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  },
};
