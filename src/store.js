import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./store/modules/auth";
import images from "./store/modules/images";
import user from './store/modules/user';
import modal from './store/modules/modal';
import notification from './store/modules/notification';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    images,
    user,
    modal,
    notification
  }
});
