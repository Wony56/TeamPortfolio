const state = {
    loginDialog: false,
    signupDialog: false
}

const mutations = {
    openLoginModal: function(state) {
        state.loginDialog = true;
    },
    closeLoginModal: function(state) {
        state.loginDialog = false;
    },
    openSignupModal: function(state) {
        state.signupDialog = true;
    },
    closeSignupModal: function(state){
        state.signupDialog = false;
    }
}

export default{
    state,
    mutations
}