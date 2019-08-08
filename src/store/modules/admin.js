import firebaseService from '@/services/FirebaseService'

const state = {
    postCount: 0,
    portfolioCount: 0,
    memberCount: 0,

    postTables: [],
    portfolioTables: [],
    dailyMembers: [],
    dailyPosts: [],
    dailyPortfolios: []
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

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();

            let row = {
              id: post.id,
              author: post.author.name,
              title: post.title,
              date:
              year +
              "년 " +
              month +
              "월 " +
              day +
              "일 " +
              hour +
              "시 " +
              min +
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
    
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();

            let row = {
              id: portfolio.id,
              author: portfolio.author.name,
              title: portfolio.title,
              date:
                year +
                "년 " +
                month +
                "월 " +
                day +
                "일 " +
                hour +
                "시 " +
                min +
                "분"
            };
    
            state.portfolioTables.push(row);
          });
    },
    setDailyMembers: async function(state){
        const users = await firebaseService.getUsers();
        let memberCount = [];

        state.dailyMembers = [];
        users.forEach(user => {
            let date = user.created_at;

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            let key = year + "-" + month + "-" + day;

            if (memberCount[key]) {
                memberCount[key] += 1;
            } else {
                memberCount[key] = 1;
            }
        });

        for (let i = 5; i >= 0; i--) {
            let today = new Date();

            today.setDate(today.getDate() - i);

            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            let key = year + "-" + month + "-" + day;

            if (memberCount[key]) {
                state.dailyMembers.push({
                    date: key,
                    counts: memberCount[key]
                });
            } else {
                state.dailyMembers.push({
                    date: key,
                    counts: 0
                 });
            }
        }
    },
    setDailyPortfolios: async function(state){
        const portfolios = await firebaseService.getPortfolios();

        let portfolioCount = [];

        state.dailyPortfolios = [];
        portfolios.forEach(portfolio => {
            let date = portfolio.created_at;

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            let key = year + "-" + month + "-" + day;

            if (portfolioCount[key]) {
                portfolioCount[key] += 1;
            } else {
                portfolioCount[key] = 1;
            }
        });

        for (let i = 5; i >= 0; i--) {
            let today = new Date();

            today.setDate(today.getDate() - i);

            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            let key = year + "-" + month + "-" + day;

            if (portfolioCount[key]) {
                state.dailyPortfolios.push({
                    date: key,
                    counts: portfolioCount[key]
                });
            } else {
                state.dailyPortfolios.push({
                    date: key,
                    counts: 0
                });
            }
        }
    },
    setDailyPosts: async function(state){
        const posts = await firebaseService.getPosts();

        let postCount = [];

        state.dailyPosts = [];
        posts.forEach(post => {
            let date = post.created_at;

            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            let key = year + "-" + month + "-" + day;

            if (postCount[key]) {
                postCount[key] += 1;
            } else {
                postCount[key] = 1;
            }
        });

        for (let i = 5; i >= 0; i--) {
            let today = new Date();

            today.setDate(today.getDate() - i);

            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            let key = year + "-" + month + "-" + day;

            if (postCount[key]) {
                state.dailyPosts.push({
                    date: key,
                    counts: postCount[key]
                });
            } else {
                state.dailyPosts.push({
                    date: key,
                    counts: 0
                });
            }
        }
    }
}

export default{
    state,
    mutations
}