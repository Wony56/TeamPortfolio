import Router from 'vue-router'
import firebase from 'firebase'
import firebaseService from './services/FirebaseService'
import store from './store'

import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioWriterPage from './views/PortfolioWriterPage.vue'
import PostWriterPage from './views/PostWriterPage.vue'
import PostViewPage from './views/PostViewPage.vue'
import Adminpage from './views/AdminPage.vue'
import PortfolioViewPage from './views/PortfolioViewPage.vue'

export const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '*',
			redirect: '/'
		},
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/post',
			name: 'post',
			component: PostPage
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: PortfolioPage
		},
		{
			path: '/portfoliowriter',
			name: 'portfoliowriter',
			component: PortfolioWriterPage,
			meta: {
				writeAuth: true
			}
		},
		{
			path: '/postwriterpage',
			name: 'postwriterpage',
			component: PostWriterPage,
			meta: {
				writeAuth: true
			}
		},
		{
			path: '/postview/:postIndex',
			name: 'postview',
			component: PostViewPage
		},
		{
			path: '/adminpage',
			name: 'adminpage',
			component: Adminpage,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/portfolioview/:articleId',
			name: 'portfolioview',
			component: PortfolioViewPage
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	}
})

router.beforeEach(async (to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const writeAuth = to.matched.some(record => record.meta.writeAuth);

	
	if(currentUser){
		store.state.user.user = await firebaseService.getUser(currentUser);
		store.state.user.loggedIn = true;
	}else{
		store.state.user.user = {};
		store.state.user.loggedIn = false;
	}

	if((requiresAuth && !currentUser) || (writeAuth && !currentUser)){
		store.commit("showLockingBar");
	}else if(requiresAuth && currentUser){
		if(store.state.user.user.tier !== 'diamond'){
			store.commit("showLockingBar");
			next("home");
		}else{
			next();
		}
	}else if(writeAuth && currentUser){
		if(store.state.user.user.tier === 'bronze'){
			store.commit("showLockingBar");
		}else{
			next();
		}
	}else{
		next();
	}
})
