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
import FlagIcon from 'vue-flag-icon'
import VueScrollProgress from 'vue-scroll-progress'
import ToggleButton from 'vue-js-toggle-button'
import Autocomplete from 'v-autocomplete'
// VueSmoothScrollbar
import SmoothScrollbar from 'vue-smooth-scrollbar'

Vue.config.productionTip = false
Vue.use(VueScrollProgress)
Vue.use(SmoothScrollbar)
Vue.use(ToggleButton)
Vue.use(FlagIcon)
Vue.use(Vuetify, {
	iconfont: 'fa',
	theme: {
		primary: '#3f51b5',
		secondary: '#b0bec5',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})

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

new Vue({
  router,
  store,
  async created(){

	await firebase.auth().onAuthStateChanged(user=>{
		if(user){
			this.$store.commit('checkLogState', {
				status: true,
				user: user
			})
		}else{
			this.$store.commit('checkLogState', {
				status: false
			})
		}
	})
  },
  render: h => h(App)
}).$mount('#app')