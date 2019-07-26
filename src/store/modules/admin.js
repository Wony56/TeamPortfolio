import firebaseService from '@/services/FirebaseService'

const state = {
    postCount: 0,
    portfolioCount: 0,
    memberCount: 0
}

const mutations = {
    countMember: async function(state){
        let users = await firebaseService.getUsers();
        state.memberCount = users['length'];
    },
    countPost: async function(state){
        let posts = await firebaseService.getPosts();
        state.postCount = posts['length'];
    },
    countPortfolio: async function(state){
        let portfolios = await firebaseService.getPortfolios();
        state.portfolioCount = portfolios['length'];
    }
}

export default{
    state,
    mutations
}