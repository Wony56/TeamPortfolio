import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./store/modules/auth";
import images from "./store/modules/images";
import user from './store/modules/user';
import modal from './store/modules/modal';
import notification from './store/modules/notification';
import admin from './store/modules/admin';
import article from './store/articles/article';
import message from './store/pwa/pushMessage';
import document from './store/modules/document';

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

        id: "ryuhojin",
        token: "y4eoDG8jQ29sSs9_mpF2",
        color: "pink"
      },
      {
        position: "Developer/Designer",
        name: "Eom Yoonju",
        birth: "1990.07.01",
        imgUrl: "yeonju.jpg",

        id: "Eomazing",
        token: "phLEf4A8LuBfkhsotEwg",
        color: "purple"
      },
      {
        position: "Developer",
        name: "Lee Seokwon",
        birth: "1992.05.06",
        imgUrl: "seokwon.jpg",

        id: "blackmonkey9256",
        token: "HdXsmvT6hBR-mFJyN_YP",
        color: "#429f9e"
      },
      {
        position: "Developer",
        name: "Kim Changyoon",
        birth: "1992.11.22",
        imgUrl: "changyoon.jpg",

        id: "Taylous",
        token: "zAw5-XwKyMhRkQJuQ4fQ",
        color: "blue"
      },
      {
        position: "Developer",
        name: "Cho Hyeonjin",
        birth: "1993.06.18",
        imgUrl: "hyeonjin.jpg",

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
    message,
    document
  }
});
