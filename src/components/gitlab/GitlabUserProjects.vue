<template>
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

                <div>
                  <br>
                  <font @mouseover="mouseOver2()" color="black">CLICK</font>
                  <br>
                </div>
              </span>
              <figure class="highlight__figure" @mouseover="mouseOver1(index)">
                <v-img :src="getImgUrl(element.imgUrl)" aspect-ratio="1" width="200" height="280"></v-img>
              </figure>
            </div>
          </a>
        </v-flex>
      </v-layout>
    </v-container>

<!-- ============================================================================================================= -->
    <v-layout justify-center>
      <v-dialog v-model="dialog1" max-width="500">
        <v-card v-for="(data, index) in datas" :key="index">
          <v-card-title class="headline">{{data.name_with_namespace}}</v-card-title>

          <v-card-text>{{data.created_at}}</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text @click="showRepoPage(data.web_url)">CLOSE</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
<!-- ============================================================================================================= -->
    <v-layout justify-center>
      <v-dialog v-model="dialog2" max-width="500">
        <v-card>
          <v-card-title class="headline">MODAL2</v-card-title>

          <v-card-text>MODAL2</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red darken-1" text @click="dialog2 = false">CLOSE</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
<!-- ============================================================================================================= -->
</template>

<script>
const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
  name: "GitlabUserProjects",
  data() {
    return {
      datas: [],
      focus: 0,
      dialog1: false,
      dialog2: false
    };
  },
  methods: {
    getImgUrl(img) {
      return require("../../assets/" + img);
    },
    async getRepositories(userId, token, color) {
      return await fetch(
        `${BASE_URL}/users/${userId}/projects?private_token=${token}`
      ).then(res => {
        return res.json();
      });
    },
    showRepoPage(url) {
      window.open(url, "_blank");
    },
    mouseOver1(index) {
      this.getRepositories(
        this.$store.state.memberData[index].id,
        this.$store.state.memberData[index].token,
        this.$store.state.memberData[index].color
      ).then(data => {
        console.log(data);
        this.datas = data;
      });
      this.dialog1 = true;
    },
    mouseOver2() {

      this.dialog2 = true;
    }
  }
};
</script>

<style>
* {
  font-family: "Nanum Gothic", sans-serif;
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
