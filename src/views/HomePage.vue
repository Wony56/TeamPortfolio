<template>
  <div style="font-size:1.5vw">
    <ImgBanner></ImgBanner>
    <!-- About Team -->
    <GitlabUserProject></GitlabUserProject>

    <!-- Gitlab API -->
    <v-layout>
      <v-flex class="hidden-xs-only" xs12>
        <GitlabAPI></GitlabAPI>
      </v-flex>
    </v-layout>

    <!-- Git Commit Line -->
    <v-layout class="hidden-xs-only" justify row wrap>
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center font-weight-bold">Repository</h2>
      </v-flex>
    </v-layout>

    <v-flex class="hidden-xs-only" align-center>
      <v-card flat>
        <div id="scroll-area">
          <smooth-scrollbar>
            <div id="example-content">
              <GitCommitLine></GitCommitLine>
            </div>
          </smooth-scrollbar>
        </div>
      </v-card>
    </v-flex>

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
import GitCommitLine from "../components/gitlab/GitCommitLine.vue";
import PostList from "../components/post/PostList";

// Gitlab API
import GitlabAPI from "../components/gitlab/GitlabApi.vue";
import GitlabUserProject from "../components/gitlab/GitlabUserProjects";

export default {
  name: "HomePage",
  data() {
    return {
      result: null
    };
  },
  components: {
    ImgBanner,
    PostList,

    GridImage,
    GitlabAPI,
    GitlabUserProject,
    GitCommitLine
  }
};
</script>

<style>
#scroll-area {
  margin: 70px;
  width: 100%;
  height: 700px;
}

#example-content {
  width: 90%;
  height: 2000px;
}
</style>
