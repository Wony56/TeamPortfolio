const state = {
    loginDialog: false,
    signupDialog: false,
    deleteDialog: false,
    deleteAllowed: false
}

const getters = {
    getDeleteAllowed: function(state){
        return state.deleteAllowed;
    }
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
        state.deleteAllowed = false;
    },
    closeDeleteDialog: function(state, payload){
        state.deleteDialog = false;
        state.deleteAllowed = payload.allowed;
    }
}

export default{
    state,
    getters,
    mutations
}