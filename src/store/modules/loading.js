const state = {
    loadingShow: false
}

const mutations  = {
    onLoading: function(state){
        state.loadingShow = true;
    },
    offLoading: function(state){
        state.loadingShow = false;
    }
}

export default{
    state,
    mutations
}