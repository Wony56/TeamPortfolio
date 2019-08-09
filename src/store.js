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
import loading from './store/modules/loading';
import member from './store/modules/member';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    imageToggle: false,
    banner: ''
  },
  modules: {
    member,
    auth,
    images,
    user,
    modal,
    notification,
    admin,
    article,
    message,
    document,
    loading
  }
});
