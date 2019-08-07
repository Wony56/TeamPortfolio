
const state = {
<<<<<<< HEAD
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
=======

    articleId: ""
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
}

export default{
    state,
<<<<<<< HEAD
    getters,
    mutations
=======
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
}