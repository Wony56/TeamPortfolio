import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./store/modules/auth";
import images from "./store/modules/images";
import firebaseService from './services/FirebaseService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		accessToken: '',
    user: '',
    imageToggle: false,
    banner: '',
    logon: false,
    loginDialog: false,
    signupDialog: false,
    snackbar: false,
    snackbarText: '',

    memberData: [
      {
        position: "Project Manager",
        name: "Ryu Hojin",
        birth: "1990.12.26",
        imgUrl: "hojin.jpg",
        dialogNumber: "dialog0",

        id: "ryuhojin",
        token: "ZVEyzUs6pWXdv44x2Qxk",
        color: "pink"
      },
      {
        position: "Developer/Designer",
        name: "Eom Yoonju",
        birth: "1990.07.01",
        imgUrl: "yeonju.jpg",
        dialogNumber: "dialog1",

        id: "Eomazing",
        token: "fNzX96z-yzcyNyuR8TTU",
        color: "purple"
      },
      {
        position: "Developer",
        name: "Lee Seokwon",
        birth: "1992.05.06",
        imgUrl: "seokwon.jpg",
        dialogNumber: "dialog2",

        id: "blackmonkey9256",
        token: "-5QLJ3LQoXHNZ43fZhQn",
        color: "#429f9e"
      },
      {
        position: "Developer",
        name: "Kim Changyoon",
        birth: "1992.11.22",
        imgUrl: "changyoon.jpg",
        dialogNumber: "dialog3",

        id: "Taylous",
        token: "J7kwFVv-7zWVHD3_zuU1",
        color: "blue"
      },
      {
        position: "Developer",
        name: "Cho Hyeonjin",
        birth: "1993.06.18",
        imgUrl: "hyeonjin.jpg",
        dialogNumber: "dialog4",

        id: "hyeonjin23",
        token: "ScV9uvQp_a6E5dgZzGYd",
        color: "black"
      }
    ],
  },
  modules: {
    auth,
    images
  },
  getters: {
    getLoginDialog: function(state) {
      return state.loginDialog;
    },
    getSignupDialog: function(state) {
      return state.signupDialog;
    },
    getLogState: function(state) {
      return state.logon;
    },
    getSnackbar: function(state){
      return state.snackbar;
    },
    getSnackText: function(state){
      return state.snackbarText;
    }
  },
  mutations: {
    openLoginModal: function(state) {
      state.loginDialog = true;
    },
    closeLoginModal: function(state) {
      state.loginDialog = false;
    },
    openSignupModal: function(state) {
      state.signupDialog = true;
    },
    closeSignupModal: function(state) {
      state.signupDialog = false;
    },
    closeSnackbar: function(state){
      state.snackbar = false;
    },
    loginWithGoogle: async function(state) {
      let result = await firebaseService.loginWithGoogle();

      if (result) {
        state.accessToken = result.credential.accessToken;
        state.user = result.user;

        state.loginDialog = false;

        state.logon = true;

        state.snackbarText = state.user.displayName +"님, 환영합니다."

        state.snackbar = true;

        await firebaseService.postLogData(state.user, 'Log in');
      }
    },
    loginWithFacebook: async function(state) {
      let result = await firebaseService.loginWithFacebook();

      if (result) {
        state.accessToken = result.credential.accessToken;
        state.user = result.user;

        state.loginDialog = false;

        state.logon = true;

        state.snackbarText = state.user.displayName +"님, 환영합니다."

        state.snackbar = true;

        await firebaseService.postLogData(state.user, 'Log in');
      }
    },
    loginWithEmail: async function(state, payload) {
      let result = await firebaseService.loginWithEmail(
        payload.email,
        payload.password
      );

      if (result) {
        state.user = result.user;

        state.loginDialog = false;

        state.logon = true;

        state.snackbarText = state.user.displayName +"님, 환영합니다."

        state.snackbar = true;

        await firebaseService.postLogData(state.user, 'Log in');
      }
    },
    signupWithEmail: async function(state, payload){
      let result = await firebaseService.signUpEmail(
        payload.email,
        payload.name,
        payload.password
      );

      if(result){
        state.user = result.user;

        state.signupDialog = false;

        state.logon = true;

        state.snackbarText = payload.name +"님, 환영합니다."

        state.snackbar = true;

        await firebaseService.postLogData(state.user, 'Log in');
      }
    },
    logout: async function(state) {
      if(state.user){
        await firebaseService.postLogData(state.user, 'Log out');

        state.logon = false;
        state.user = null;
        state.accessToken = null;
        state.snackbar = true;
        state.snackbarText = "로그아웃되었습니다.";

        await firebaseService.logout();
      }
    },
    checkLogState: function(state, payload){
      state.logon = payload.status;
      state.user = payload.user;
    },
  }
});
