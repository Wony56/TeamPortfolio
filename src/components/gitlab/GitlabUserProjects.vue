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
                </div>
              </span>
              <figure class="highlight__figure">
                <v-img :src="getImgUrl(element.imgUrl)" aspect-ratio="1" width="200" height="280"></v-img>
              </figure>
              <div>
              <v-btn flat style="backgroundcolor:#ff6f61; color:#fff" @click="showSkill(index)">SKILL</v-btn>
              <v-btn flat style="backgroundcolor:#ff6f61; color:#fff" @click="showGit(index)">GIT</v-btn>
              </div>
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

            <v-btn style="background-color:#ff6f61; color:#fff" flat text @click="showRepoPage(data.web_url)">OPEN</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
<!-- ============================================================================================================= -->
    <v-layout justify-center>
      <v-dialog v-model="dialog2" max-width="500">
        <v-card>
          <v-card-title style="background-color:#ff6f61; color:#fff" class="headline">SKILL</v-card-title>

          <v-card-text>
            <article class="skillrow">
              <ul>
                <li class="html">
                  <em>HTML/HTML5</em>
                  <div>
                    <span class="animated fadeInLeft"></span>
                  </div>
                </li>
                <li class="css">
                  <em>CSS/CSS3</em>
                  <div>
                    <span class="animated fadeInLeft"></span>
                  </div>
                </li>
                <li class="php">
                  <em>PHP/OOP</em>
                  <div>
                    <span class="animated fadeInLeft"></span>
                  </div>
                </li>
                <li class="mysql">
                  <em>MYSQL</em>
                  <div>
                    <span class="animated fadeInLeft"></span>
                  </div>
                </li>
              </ul>
            </article>
            <article class="skillrow">
              <ul>
                <li class="jquery">
                  <em>JQUERY</em>
                  <div>
                    <span class="animated fadeInLeft"></span>
                  </div>
                </li>
                <li class="javascript">
                  <em>JAVASCRIPT</em>
                  <div>
                    <span class="animated fadeInLeft"></span>
                  </div>
                </li>
                <li class="seo">
                  <em>SEO</em>
                  <div>
                    <span class="animated fadeInLeft"></span>
                  </div>
                </li>
                <li class="unix">
                  <em>UNIX</em>
                  <div>
                    <span class="animated fadeInLeft"></span>
                  </div>
                </li>
              </ul>
            </article>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn flat style="background-color:#ff6f61; color:#fff" @click="dialog2 = false">CLOSE</v-btn>
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
    showGit(index) {
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
    showSkill() {

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
<style>
.skillrow{
  width: 50%;
  min-height: 1px;
  position: relative;
  display: inline-block;
}.skillrow ul {
  margin: 0 20px 0 0 !important;
  text-align: left !important;
  padding: 0;
}.skillrow ul li{
  list-style: none !important;
  
}.skillrow ul li em{
  display: block;
  margin-bottom: 15px;
}.skillrow ul li div{
  margin-bottom: 35px;
  border-radius: 3px 3px 3px 3px;
  -webkit-border-radius: 3px 3px 3px 3px;
  background: #fafafa;
  height: 42px;
  overflow: hidden;
}.skillrow ul li div span{
  height: 42px;
  width: 10%;
  display: block;
  border-radius: 3px 3px 3px 3px;
  -webkit-border-radius: 3px 3px 3px 3px;
}
.skillrow ul li.html div span { background: #E13C4C; width: 90%; }
.skillrow ul li.css div span { background: #ffdb43; width: 90%; }
.skillrow ul li.php div span { background: #9D2027; width: 80%; }
.skillrow ul li.mysql div span { background: #3498db; width: 75%; }
.skillrow ul li.jquery div span { background: #2ecc71; width: 60%; }
.skillrow ul li.javascript div span { background: #A94034 }
.skillrow ul li.seo div span { background: #FF8137; width: 60%; }
.skillrow ul li.unix div span { width: 65%; background: #0CBFB3; }

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}
@-webkit-keyframes fadeInLeft {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    -ms-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
  }
}

</style>

