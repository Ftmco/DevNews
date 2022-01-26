export default {
    authenticationToken() {
        return localStorage.getItem("Token") ?? "";
    },
    isAuthenticated() {
        const token = this.authenticationToken()
        return token != ""
    },
};
