const state = {
    loginBar: false,
    logoutBar: false
}

const mutations = {
    showLoginBar(){
        state.loginBar = true;
    },
    showLogoutBar(){
        state.logoutBar = true;
    }
}

export default{
    state,
    mutations
}