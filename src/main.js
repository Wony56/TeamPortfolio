import Vue from 'vue'
import Vuetify from 'vuetify'
import VueSimplemde from 'vue-simplemde'
import VueMq from 'vue-mq'
import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'
import lineClamp from 'vue-line-clamp'
import App from './App.vue'
import Router from 'vue-router'
import {router} from './router'
import store from './store'
import './plugins/vuetify'
import './registerServiceWorker'
import 'simplemde/dist/simplemde.min.css'
import 'vuetify/dist/vuetify.min.css'
import 'font-awesome/css/font-awesome.min.css'
import firebase from 'firebase';
import FlagIcon from 'vue-flag-icon'
import VueScrollProgress from 'vue-scroll-progress'
import ToggleButton from 'vue-js-toggle-button'
import Autocomplete from 'v-autocomplete'
import { Laue } from 'laue';
import {VueMasonryPlugin} from 'vue-masonry';

// VueSmoothScrollbar
import SmoothScrollbar from 'vue-smooth-scrollbar'

Vue.use(Router);
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
Vue.use(Notifications, { velocity })
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

// if ('serviceWorker' in navigator){
//     navigator.serviceWorker.register('/sw.js')
//         .then((reg) => console.log('service worker registerd', reg))
//         .catch((err) => console.log('service worker registerd', err));
// }
