<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span color="#fff">Post</span>
      </div>
    </ImgBanner>
    <v-layout align-center
          justify-center>
    <v-card >
      <PostList  :limits="6" :load-more="true"></PostList>
    </v-card>
    </v-layout>
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
<style>
*{
font-family: 'Nanum Gothic', sans-serif;
}
</style>