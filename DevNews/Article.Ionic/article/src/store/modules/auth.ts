const state = () => ({
    authData: {
        token: localStorage.getItem("Token"),
        isLogin: localStorage.getItem("Token") != null
    },
});

const getters = {
    auth(state: any) {
        return state.authData
    }
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
};