export default {
  // updatePassword: function (state, payload) {
  //     state.password = payload
  // },
  reset_password_success(state) {
    state.passwordResetStatus = 'success'
  },
  reset_password_error(state, ) {
    state.passwordResetStatus = 'failed'
  },
  auth_request(state) {
    state.status = 'loading'
  },
  //   google_auth_request (state) {
  //     state.status = 'loading'
  //   },
  auth_success(state, {
    token,
    user
  }) {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error(state) {
    state.status = 'error'
  },
  login_attempt(state, payload) { //<<<<<<<<<<<<<<HERE
    state.loggedIn = payload
  },
  logout(state) {
    state.status = ''
    state.token = ''
  },
}