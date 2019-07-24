<template>
  <div style="margin: 150px;">
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span style="color:black;">Portfolio</span>
      </div>
    </ImgBanner>

    <v-card>
      <PostList :limits="6" :load-more="true"></PostList>
    </v-card>
  </div>
</template>

<script>
import PostList from "../components/PostList";
import ImgBanner from "../components/ImgBanner";

export default {
  name: "PostPage",
  components: {
    PostList,
    ImgBanner
  }
};
</script>
