<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span color="#fff">Post</span>
      </div>
    </ImgBanner>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card flat>
          <PostList></PostList>
          <div class="mr-2 text-xs-right justify-right">
            <v-btn color="#ff6f61" flat outline to="/postwriterpage">
              <v-icon size="25" class="notranslate">fa-pencil</v-icon>글쓰기
            </v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PostList from "../components/post/PostList";
import ImgBanner from "../components/base/ImgBanner";

export default {
  name: "PostPage",
  components: {
    PostList,
    ImgBanner
  }
};
</script>
<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>