import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
import firebaseService from './services/FirebaseService';

import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioWriterPage from './views/PortfolioWriterPage.vue'
import PostWriterPage from './views/PostWriterPage.vue'
import PostViewPage from './views/PostViewPage.vue'
import Adminpage from './views/AdminPage.vue'

Vue.use(Router)

export default new Router({
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
			component: PostPage,
			children: 
			[
				{
					path: "write",
					component: PostWriterPage
				}
			]
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: PortfolioPage,
			children: 
			[
				{
					path: "write",
					component: PortfolioWriterPage
				}
			]
		},
		{
			path: '/portfoliowriter',
			name: 'portfoliowriter',
			component: PortfolioWriterPage
		},
		{
			path: '/postwriterpage',
			name: 'postwriterpage',
			component: PostWriterPage
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
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	}
})


