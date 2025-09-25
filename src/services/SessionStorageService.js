export default {
    isAdmin() {
        let roleName = sessionStorage.getItem('roleName')
        return roleName === 'admin'
    },

    isLoggedIn() {
        let roleName = sessionStorage.getItem('roleName')
        return roleName !== null;
    },
    getUsername() {
        return sessionStorage.getItem('username') || '' }

}