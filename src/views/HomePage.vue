<template>
  <div>
    <ImgBanner>
      <div slot="text" style="float:right">
       <p>
  <span>
    TEAM122 : WANT TO DO
  </span>
</p>
      </div>
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
<style lang="scss">
p {
	text-transform: uppercase;
	letter-spacing: .5em;
	display: inline-block;
  
  span {

  	font: 700 4em/1 "Oswald", sans-serif;
  	letter-spacing: 0;
  	padding: .25em 0 .325em;
	  display: block;
	  margin: 0 auto;
  	text-shadow: 0 0 80px rgba(255,255,255,.5);

/* Clip Background Image */

	  background: url(http://f.cl.ly/items/010q3E1u3p2Q0j1L1S1o/animated_text_fill.png) repeat-y;
	  -webkit-background-clip: text;
	  background-clip: text;

/* Animate Background Image */

	  -webkit-text-fill-color: transparent;
	  -webkit-animation: aitf 80s linear infinite;

/* Activate hardware acceleration for smoother animations */

	  -webkit-transform: translate3d(0,0,0);
	  -webkit-backface-visibility: hidden;

  }
}

/* Animate Background Image */

@-webkit-keyframes aitf {
	0% { background-position: 0% 50%; }
	100% { background-position: 100% 50%; }
}
</style>
