const state = {
    snackbar: false,
    snackbarText: ''
}

const mutations = {
    closeSnackbar: function(state){
        state.snackbar = false;
    }
}

export default{
    state,
    mutations
}