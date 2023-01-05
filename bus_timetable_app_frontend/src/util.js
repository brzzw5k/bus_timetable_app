exports.isLoggedIn = () => {
  return localStorage.getItem('token') !== null
}
