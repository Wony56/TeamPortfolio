const state = {
    loginBar: false,
    loginErrorBar: false,
    logoutBar: false,
    tierBar: false,
    lockBar: false,
    errorMessage: ''
}

const mutations = {
    showLoginBar(state){
        state.loginBar = true;
    },
    showLogoutBar(state){
        state.logoutBar = true;
    },
    showTierBar(state){
        state.tierBar = true;
    },
    showLoginErrorBar(state, payload){
        state.errorMessage = payload.message;
        state.loginErrorBar = true;
    },
    showLockingBar(state){
        state.lockBar = true;
    }
}

export default{
    state,
    mutations
}