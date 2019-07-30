<template>
  <div style="margin: 150px;">
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span style="color:black;">Post</span>
      </div>
    </ImgBanner>

    <v-card>
      <PostList :limits="6" :load-more="true"></PostList>
    </v-card>
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
