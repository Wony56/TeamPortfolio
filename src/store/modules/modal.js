const state = {
    signDialog: false,
    deleteDialog: false
}

const mutations = {
    openSignModal: function(state) {
        state.signDialog = true;
    },
    closeSignModal: function(state) {
        state.signDialog = false;
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