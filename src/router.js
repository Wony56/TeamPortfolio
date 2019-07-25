import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioWriterPage from './views/PortfolioWriterPage.vue'
import PostWriterPage from './views/PostWriterPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/post',
			name: 'post',
			component: PostPage,
			children: [
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
			children: [
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
		}
  ],
  scrollBehavior(to, from, savedPosition){
	  return {x:0, y:0};
  }
})
