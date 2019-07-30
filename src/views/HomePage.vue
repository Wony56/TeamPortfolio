<template>
  <div style="font-size:1.5vw">
        <ImgBanner>
          <div
            class="notranslate"
            style="line-height:1.2em; font-size: 2em; color:black;"
            slot="text"
          >
            122 : Want to do
          </div>
        </ImgBanner>
      <!-- </v-layout> -->
    <v-container fluid>
      <!-- About Me -->
      <v-layout justify row wrap>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center font-weight-bold">About Team</h2>
        </v-flex>
      </v-layout>

  <v-container grid-list-md fluid wrap class="py-0 px-0">
      <v-layout justify-center="center" row wrap>
        <v-flex v-for="(element, index) in this.$store.state.memberData" :key="index">
          <a class="highlight highlight--image-center change">
            <h2 class="roof-line highlight__roof-line notranslate">Member of Team 122</h2>
            <div class="highlight__item">
              <h3 class="highlight__title">
                <font class="notranslate" color="black">{{element.name}}</font>
              </h3>
              <span class="highlight__subtitle">
                <font class="notranslate" color="black">
                  {{element.position}},
                  {{element.birth}}
                </font>
              </span>
              <figure class="highlight__figure">
                <v-img :src="getImgUrl(element.imgUrl)" aspect-ratio="1" width="200" height="280"></v-img>
              </figure>
              <div class="highlight__text">
                <v-dialog :v-model="element.dialogNumber" width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn
                    class="notranslate"
                      color="white"
                      dark
                      v-on="on"
                      v-text="element.name"
                      flat
                      outline
                      @click="getRepositories(element.id, element.token, element.color)"
                    ></v-btn>
                  </template>

                    <v-card-title style="background-color:#ff6f61; color:#ffff">Git</v-card-title>
                      <v-card v-for="(data, i) in datas" :key="i">
                        <v-card-title>
                          <h1>{{data.name_with_namespace}}</h1>
                        </v-card-title>

                      <v-card-text>
                        {{data.created_at}}
                        <v-btn style="background-color:#ff6f61; color:#ffff" flat @click="showRepoPage(data.web_url)">open</v-btn>
                      </v-card-text>
                    </v-card>
                </v-dialog>
              </div>
              </div>
            </a>
          </v-flex>
        </v-layout>
      </v-container>
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

      <GridImage></Gridimage>

      <!-- Post -->
      <v-layout my-5 justify-center>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center font-weight-bold">Post</h2>

          <v-card style="background-color:white" flat>
            <PostList :column="2"></PostList>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import GridImage from "../components/base/GridImages";
import PostList from "../components/post/PostList";
//Gitlab API
import GitlabAPI from "../components/gitlab/GitlabApi.vue";

const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
  name: "HomePage",
  data() {
    return {
      datas: [],

      dialog0: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false
    };
  },
  components: {
    ImgBanner,
    PostList,

    GridImage,
    GitlabAPI
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    async getRepositories(userId, token, color) {
      console.log("토끈?> " + token);
      this.mainColor = color;
      this.datas = [];

      await fetch(`${BASE_URL}/users/${userId}/projects?private_token=${token}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          this.datas = data;
        });
    },
    showRepoPage(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style>
* {
  font-family: "Titillium Web", sans-serif;
}

.link-portfolio:hover {
  color: indigo;
}

.v-avatar.outlined {
  border: 1px solid #000;
}

/* About Team CSS */
.highlight {
  display: block;
  position: relative;
  margin-bottom: 30px;
  padding: 60px 30px 30px;
  border: 3px solid;
  border-color: #ff6f61;
  transition: background-color 0.3s;
}
a {
  font-family: "Lab Grotesque Bold", Arial, sans-serif;
  color: inherit;
  outline-color: transparent;
}
a {
  text-decoration: none;
  background-color: transparent;
}
.change:hover {
  background-color: #ff6f61;
}

.highlight__roof-line {
  position: absolute;
  top: 0;
  left: 50%;
  max-width: 100%;
  margin: -17px auto;
  padding: 10px 15px;
  line-height: 1;
  color: #000;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #fff;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.roof-line {
  overflow: hidden;
  display: block;
  max-width: 100%;
  margin-bottom: 20px;
  font-family: "Lab Grotesque Medium", Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  text-overflow: ellipsis;
}
.highlight__item {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: auto;
  text-align: center;
}
.h3,
h3 {
  font-size: 26px;
  line-height: 30px;
}
.highlight__subtitle {
  display: block;
  margin-bottom: 20px;
  font-family: "Lab Grotesque Bold", Arial, sans-serif;
  font-size: 0.95rem;
  transition-delay: 0.3s;
}
.highlight__figure {
  display: inline-flex;
  height: 15.5rem;
  margin-right: auto;
  margin-bottom: 30px;
  margin-left: auto;
}
figure {
  overflow: hidden;
  position: relative;
}

.subtitles::before {
  color: transparent;
}

.subtitles:hover {
  color: #ff6f61;
}
</style>
