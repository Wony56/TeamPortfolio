
const state = {
    portfolioList: [],
    postList: []
}
const getters = {
    getPortFolioList: state => state.portfolioList,
    getPostList: state => state.postList
  };

export default{
    state,
    getters
}