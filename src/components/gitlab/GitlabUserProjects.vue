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
        <v-flex v-for="(element, index) in memberData" :key="index">
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
              <div>
                <v-btn
                  flat
                  style="backgroundcolor:#ff6f61; color:#fff"
                  @click="showSkill(index)"
                >SKILL</v-btn>
                <v-btn flat style="backgroundcolor:#ff6f61; color:#fff" @click="showGit(index)">GIT</v-btn>
              </div>
            </div>
          </a>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- ============================================================================================================= -->
    <v-layout justify-center>
      <GitDialog :members="datas" />
    </v-layout>
    <!-- ============================================================================================================= -->
    <v-layout justify-center>
      <SkillDialog :member="memberData[member]" />
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import GitDialog from "../modal/GitDialog";
import SkillDialog from "../modal/SkillDialog";

const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
  name: "GitlabUserProjects",
  components: {
    GitDialog,
    SkillDialog
  },
  data() {
    return {
      member: 0,
      datas: [],
      focus: 0,
      gitDialog: false
    };
  },
  computed: mapState({
    memberData: state => state.member.memberData
  }),
  methods: {
    ...mapMutations(["openGitDialog", "openSkillDialog"]),
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
        this.memberData[index].id,
        this.memberData[index].token,
        this.memberData[index].color
      ).then(data => {
        this.datas = data;
      });
      this.openGitDialog();
    },
    showSkill(member) {
      this.member = member;
      this.openSkillDialog();
    }
  }
};
</script>
