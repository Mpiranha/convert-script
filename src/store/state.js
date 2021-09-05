export default {
  // State
  // --------------------------------------------------
  // The current user
  user: {},
  token: localStorage.getItem('token') || '',
  status: '',
  loggedIn: false,
  passwordResetStatus: '',
}