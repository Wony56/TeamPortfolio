const state = {
    loginDialog: false,
    signupDialog: false,
    deleteDialog: false
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
    },
    openDeleteDialog: function(state){
        state.deleteDialog = true;
    },
    closeDeleteDialog: function(state){
        state.deleteDialog = false;
    }
}

export default{
    state,
    mutations
}