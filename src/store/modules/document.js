const state = {
    type: '',
    document: ''
}

const mutations = {
    setType: function(state, payload){
        state.type = payload.type;
    },
    setDocument: function(state, payload){
        state.type = payload.type;
        state.document = payload.document;
    },
    resetDocument: function(state){
        state.document = '';
    }
}

export default{
    state,
    mutations
}