import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioWriterPage from './views/PortfolioWriterPage.vue'
import PostWriterPage from './views/PostWriterPage.vue'
import PostViewPage from './views/PostViewPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '/home',
			name: 'home',
			component: HomePage
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
			component: PortfolioWriterPage
		},
		{
			path: '/postwriter',
			name: 'postwriter',
			component: PostWriterPage
		},
		{
			path: '/postview/:postIndex',
			name: 'postview',
			component: PostViewPage
		}
  ]
})
