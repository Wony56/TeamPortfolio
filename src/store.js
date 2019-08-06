import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./store/modules/auth";
import images from "./store/modules/images";
import user from './store/modules/user';
import modal from './store/modules/modal';
import notification from './store/modules/notification';
import admin from './store/modules/admin';
import article from './store/articles/article'
import message from './store/pwa/pushMessage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    imageToggle: false,
    banner: '',

    memberData: [
      {
        position: "Project Manager",
        name: "Ryu Hojin",
        birth: "1990.12.26",
        imgUrl: "hojin.jpg",
        dialogNumber: "dialog0",

        id: "ryuhojin",
        token: "y4eoDG8jQ29sSs9_mpF2",
        color: "pink"
      },
      {
        position: "Developer/Designer",
        name: "Eom Yoonju",
        birth: "1990.07.01",
        imgUrl: "yeonju.jpg",
        dialogNumber: "dialog1",

        id: "Eomazing",
        token: "phLEf4A8LuBfkhsotEwg",
        color: "purple"
      },
      {
        position: "Developer",
        name: "Lee Seokwon",
        birth: "1992.05.06",
        imgUrl: "seokwon.jpg",
        dialogNumber: "dialog2",

        id: "blackmonkey9256",
        token: "HdXsmvT6hBR-mFJyN_YP",
        color: "#429f9e"
      },
      {
        position: "Developer",
        name: "Kim Changyoon",
        birth: "1992.11.22",
        imgUrl: "changyoon.jpg",
        dialogNumber: "dialog3",

        id: "Taylous",
        token: "zAw5-XwKyMhRkQJuQ4fQ",
        color: "blue"
      },
      {
        position: "Developer",
        name: "Cho Hyeonjin",
        birth: "1993.06.18",
        imgUrl: "hyeonjin.jpg",
        dialogNumber: "dialog4",

        id: "hyeonjin23",
        token: "kWsKbLKaDydDKBgguZnL",
        color: "black"
      }
    ],
  },
  modules: {
    auth,
    images,
    user,
    modal,
    notification,
    admin,
    article,
    message
  }
});
