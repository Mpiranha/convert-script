export default {
  // State
  // --------------------------------------------------
  // The current user
  user: {},
  token: localStorage.getItem('user-token') || '',
  status: '',
}