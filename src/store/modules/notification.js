const state = {
    loginBar: false,
    loginErrorBar: false,
    logoutBar: false,
    signupBar: false,
    tierBar: false,
    lockBar: false,
    errorMessage: '',

    failCount: 0
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
    },
    showSignupBar(state){
        state.signupBar = true;
    }
}

export default{
    state,
    mutations
}