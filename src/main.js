import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'font-awesome/css/font-awesome.min.css'
import VueMq from 'vue-mq'
import lineClamp from 'vue-line-clamp'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from 'firebase';
import firebaseService from './services/FirebaseService';
import FlagIcon from 'vue-flag-icon'
import VueScrollProgress from 'vue-scroll-progress'
import ToggleButton from 'vue-js-toggle-button'
import Autocomplete from 'v-autocomplete'
import { Laue } from 'laue';
import {VueMasonryPlugin} from 'vue-masonry';

// VueSmoothScrollbar
import SmoothScrollbar from 'vue-smooth-scrollbar'

Vue.use(VueMasonryPlugin)
Vue.use(VueScrollProgress);
Vue.use(SmoothScrollbar)
Vue.use(ToggleButton)
Vue.config.productionTip = false
Vue.use(FlagIcon);
Vue.use(Vuetify, 
{
	iconfont: 'fa',
	theme: {
		primary: '#3f51b5',
		secondary: '#b0bec5',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})
Vue.use(Laue);
Vue.use(VueSimplemde)

Vue.use(Autocomplete)

Vue.use(VueMq,{
	breakpoints:{
		mobile: 600,
		tablet: 900,
		laptop: 1250,
		desktop: Infinity,
	}
})

Vue.use(lineClamp,{

})

router.beforeEach(async (to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if(currentUser){
		store.state.user.user = await firebaseService.getUser(currentUser);
		store.state.user.loggedIn = true;
	}else{
		store.state.user.user = {};
		store.state.user.loggedIn = false;
	}

	if(requiresAuth && !currentUser){
		alert("접근권한이 없습니다.");
		next("home");
	}else if(requiresAuth && currentUser){
		if(store.state.user.user.tier !== 'diamond'){
			alert("접근권한이 없습니다.");
			next("home");
		}else{
			next();
		}
	}else{
		next();
	}
})

firebase.auth().onAuthStateChanged(async user => {
	
	if(user){
		store.state.user.loggedIn = true;
	}else{
		store.state.user.loggedIn = false;
	}


	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})