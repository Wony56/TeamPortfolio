const state = {
    signDialog: false,
    deleteDialog: false,
    gitDialog: false,
    skillDialog: false
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
    },
    openGitDialog: function(state){
        state.gitDialog = true;
    },
    closeGitDialog: function(state){
        state.gitDialog = false;
    },
    openSkillDialog: function(state){
        state.skillDialog = true;
    },
    closeSkillDialog: function(state){
        state.skillDialog = false;
    }
}

export default{
    state,
    mutations
}