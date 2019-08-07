<template>
  <div style="font-size:1.5vw">
    <ImgBanner>
      <div
        class="notranslate"
        style="line-height:1.2em; font-size: 2em; color:black;"
        slot="text"
      >122 : Want to do</div>
    </ImgBanner>

    <!-- About Team -->
    <GitlabUserProject></GitlabUserProject>

    <!-- Gitlab API -->
    <v-layout>
      <v-flex xs12>
        <GitlabAPI></GitlabAPI>
      </v-flex>
    </v-layout>

    <!-- Portfolio -->
    <v-layout justify row wrap>
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center font-weight-bold">Portfolio</h2>
      </v-flex>
    </v-layout>

    <GridImage></GridImage>

    <!-- Post -->
    <v-layout my-5 justify-center>
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center font-weight-bold">Post</h2>

        <v-card style="background-color:white" flat>
          <PostList :column="2"></PostList>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import GridImage from "../components/base/GridImages";
import PostList from "../components/post/PostList";

//Gitlab API
import GitlabAPI from "../components/gitlab/GitlabApi.vue";
import GitlabUserProject from "../components/gitlab/GitlabUserProjects";

export default {
  name: "HomePage",
  components: {
    ImgBanner,
    PostList,

    GridImage,
    GitlabAPI,
    GitlabUserProject
  }
};
</script>