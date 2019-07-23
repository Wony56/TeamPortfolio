<template>
  <v-layout row wrap mw-700>
    <v-flex v-for="i in posts.length > limits ? limits : posts.length" :key="i" xs12 sm6 px-3>
      <Post
              :date="posts[i - 1].created_at"
              :title="posts[i - 1].title"
              :content="posts[i - 1].content"></Post>
      <v-divider></v-divider>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
		<v-btn style="background-color:#ff6f61; color:#ffff" to="/postwriterpage"><v-icon size="25" class="mr-2 notranslate">fa-pencil</v-icon>글쓰기</v-btn>
    	<v-btn style="background-color:#ff6f61; color:#ffff" dark v-on:click="loadMorePosts"><v-icon size="25" class="mr-2 notranslate">fa-plus</v-icon> 더 보기</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Post from '@/components/Post'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PostList',
	data() {
		return {
			posts: []
		}
	},
	components: {
		Post
	},
	props: {
		column: {type: Number, default: 1},
		limits: {type: Number, default: 4},
		loadMore: {type: Boolean, default: false}
	},
	mounted() {
		this.getPosts()
	},
	methods: {
		async getPosts() {
			this.posts = await FirebaseService.getPosts()
			console.log(this.posts);
		},
		loadMorePosts() {

			// this.posts = await FirebaseService.loadMorePosts();
			// console.log(this.posts);
    	}
	}
}
</script>

<style>
  .mw-700 {
    max-width: 700px;
    margin: auto;
  }
</style>
