import firebaseService from '@/services/FirebaseService'

const state = {
    postCount: 0,
    portfolioCount: 0,
    memberCount: 0,

    postTables: [],
    portfolioTables: []
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
    },
    setPostTables: async function(state){
        let posts = await firebaseService.getPosts();

        state.postTables = [];
        posts.forEach(post => {
            const date = new Date(post.created_at);

            let row = {
              id: post.id,
              author: post.author.name,
              title: post.title,
              date:
                date.getFullYear() +
                "년 " +
                date.getMonth() +
                "월 " +
                date.getDate() +
                "일 " +
                date.getHours() +
                "시 " +
                date.getMinutes() +
                "분"
            };
    
            state.postTables.push(row);
          });
    },
    setPortfolioTables: async function(state){
        let portfolios = await firebaseService.getPortfolios();
        
        state.portfolioTables = [];
        portfolios.forEach(portfolio => {
            const date = new Date(portfolio.created_at);
    
            let row = {
              id: portfolio.id,
              author: portfolio.author.name,
              title: portfolio.title,
              date:
                date.getFullYear() +
                "년 " +
                date.getMonth() +
                "월 " +
                date.getDate() +
                "일 " +
                date.getHours() +
                "시 " +
                date.getMinutes() +
                "분"
            };
    
            state.portfolioTables.push(row);
          });
    }
}

export default{
    state,
    mutations
}