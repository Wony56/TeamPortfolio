
const state = {
    portfolioList: [],
    postList: []
}
const getters = {
    getPortFolioList: state => state.portfolioList,
    getPostList: state => state.postList
}

const mutations = {

    insertPortfolioList: function (state, portfolios) {
        return state.portfolioList = portfolios.ret;
    },
    insertPostList: function (state, posts) {
        return state.postList = posts.ret;
    }    
}

export default{
    state,
    getters,
    mutations
}