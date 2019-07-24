<template>
  <div style="margin: 150px;">
  <v-card>
    <PostList :limits="6" :load-more="true"></PostList>
  </v-card>
  </div>
</template>

<script>
import PostList from "../components/PostList";

export default {
  name: "PostPage",
  components: {

    PostList
  }
};
</script>
