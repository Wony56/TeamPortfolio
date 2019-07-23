<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text"><span style="color:black;">Post</span></div>
    </ImgBanner>
  <v-card>
    <PostList :limits="6" :load-more="true"></PostList>
  </v-card>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PostList from "../components/PostList";

export default {
  name: "PostPage",
  components: {
    ImgBanner,
    PostList
  }
};
</script>
