<template>
  <v-layout row wrap mw-700>
    <v-flex v-for="(element, i) in posts[focusPage - 1]" :key="i" xs12 sm12 px-3>
      <Post
        :date="element.created_at"
        :title="element.title"
        :content="element.content"
        :id="element.id"
      ></Post>
      <v-divider></v-divider>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5>
      <v-btn style="background-color:#ff6f61; color:#ffff" to="/postwriterpage" v-show="loggedIn">
        <v-icon size="25" class="mr-2 notranslate">fa-pencil</v-icon>글쓰기
      </v-btn>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-pagination v-model="focusPage" :length="totalPage" :total-visible="7" color="#ff6616"></v-pagination>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import Post from "@/components/Post";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PostList",
  data() {
    return {
      posts: [],
      focusPage: 1,
      perPage: 0,
      totalPage: 10
    };
  },
  components: {
    Post
  },
  props: {
    column: { type: Number, default: 1 },
    limits: { type: Number, default: 4 },
    loadMore: { type: Boolean, default: false }
  },
  mounted() {
    console.log("asdfasdfasdf");
    this.getPosts();
  },
  computed: mapState({
    loggedIn: state => state.user.loggedIn
  }),
  methods: {
    async getPosts() {
      let tempPosts = await FirebaseService.getPosts();
      let index = 0;
      this.totalPage = parseInt(tempPosts["length"] / 6);

      console.log(tempPosts);
      console.log(this.totalPage);

      for (let page = 0; page < this.totalPage; page++) {
        let pagePost = [];

        for (let count = 0; count < 6; count++)
          pagePost.push(tempPosts[index++]);

        console.log(pagePost);
        this.posts.push(pagePost);
      }
      console.log(this.posts);
    }
  }
};
</script>

<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
