
const state = {
  token: 'a4eef47da13c83137b8263754b5cbd89d2bee652'
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
