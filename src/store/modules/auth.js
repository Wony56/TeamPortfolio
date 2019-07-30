
const state = {
  token: '63790bdb4f81a92a40f46088ef9c4334ec9c0d1b'
};

const getters = {
  isLoggedIn: state => !!state.token
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  mutations
};
