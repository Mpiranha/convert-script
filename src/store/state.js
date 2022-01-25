export default {
  // State
  // --------------------------------------------------
  // The current user
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || '',
  status: '',
  loggedIn: false,
  // loading: true,
  passwordResetStatus: '',
  allAgencies: {},
  triggerEdit: false,
  editId: null,
}