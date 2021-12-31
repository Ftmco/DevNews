export default {
    authenticationToken() {
        return localStorage.getItem("Token") ?? null;
    },
    isAuthenticated() {
        let token = this.authenticationToken()
        return token != null
    },
};
