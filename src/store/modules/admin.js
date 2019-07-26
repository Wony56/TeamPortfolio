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
        console.log('안되누');
        console.log(posts);
        state.postCount = posts['length'];
    },
    countPortfolio: async function(state){
        let portfolios = await firebaseService.getPortfolios();
        console.log('되누');
        console.log(portfolios)
        state.portfolioCount = portfolios['length'];
    }
}

export default{
    state,
    mutations
}