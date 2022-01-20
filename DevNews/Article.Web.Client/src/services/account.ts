export default {
    authenticationToken() {
        return localStorage.getItem("Token") ?? "";
    },
    isAuthenticated() {
        let token = this.authenticationToken()
        return token != ""
    },
};
