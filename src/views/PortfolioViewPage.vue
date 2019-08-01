<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em; color:black;" slot="text">Portfolio</div>
    </ImgBanner>

    <v-container>
      <form>
        <v-text-field v-model="title" color="#ff6f61" readonly placeholder="제목을 입력해주세요." required></v-text-field>
        <v-text-field
          v-model="authorName"
          color="#ff6f61"
          readonly
          placeholder="제목을 입력해주세요."
          required
        ></v-text-field>
        <v-text-field v-model="created_at" color="#ff6f61" readonly required></v-text-field>

        <div v-if="!modifyFlag">
          <VueMarkdown :source="body"></VueMarkdown>
        </div>
        <div v-else>
          <markdown-editor v-model="body" ref="MarkdownEditor"></markdown-editor>
        </div>

        <v-spacer></v-spacer>

        <v-layout row style="margin: 30px;">
          <v-flex v-for="(img, index) in imgs" :key="index">
            <v-img class="white--text" width="200px" height="200px" :src="img">
              <v-btn  v-if="modifyFlag" text icon color="yellow" @click="deletePicture(index, img)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-img>
          </v-flex>
        </v-layout>

        <div v-if="modifyFlag">
          <v-spacer></v-spacer>

          <UploadForm></UploadForm>
        </div>

        <v-spacer></v-spacer>
        <v-layout justify-center>
          <v-btn v-if="!modifyFlag" style="background-color:#ff6f61; color:#ffff" @click="checkAuthentication()">수정</v-btn>

          <v-btn v-if="modifyFlag" style="background-color:black; color:#ffff" @click="modifyPortfolio()">수정완료</v-btn>

          <v-btn v-if="!modifyFlag" style="background-color:#ff6f61; color:#ffff" @click="$router.go(-1)">취소</v-btn>
          <v-btn v-if="modifyFlag" style="background-color:#ff6f61; color:#ffff" @click="modifyFlag = false">취소</v-btn>
        </v-layout>
      </form>
    </v-container>

    <!--=========================================MODAL====================================================-->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{dialogTitle}}</v-card-title>
        <v-card-text>{{dialogContent}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="flag" color="green darken-1" flat to="/portfolio">Close</v-btn>
          <v-btn v-else color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--=================================================================================================-->
  </div>
</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import MarkdownEditor from "vue-simplemde/src/markdown-editor";
import UploadForm from "../components/base/UploadForm";
import FirebaseService from "@/services/FirebaseService";

// Get Logined User Info
import { mapState } from "vuex";

// Imgur API
import { mapActions } from "vuex";

// Markdown Viewer
import VueMarkdown from 'vue-markdown'

export default {
  data: () => ({
    articleId: "",
    author: {},
    body: {},
    created_at: "",
    imgs: [],

    authorUid: "",
    title: "",
    authorName: "",

    dialog: false,
    flag: true,
    modifyFlag: false,

    dialogTitle: "",
    dialogContent: ""
  }),
  components: {
    ImgBanner,
    MarkdownEditor,
    UploadForm,
    VueMarkdown
  },  
  computed: {
    ...mapState({
      user: state => state.user.user,
      imgurLink: state => state.images.imgurLinks
    })
  },
  mounted() {
    this.articleId = this.$route.params.portfolioInfo;
    this.getPortfolio();
  },
  methods: {
    checkAuthentication() {

      if (this.authorUid == this.user.uid || this.user.tier == "diamond") {
        this.modifyFlag = true;
      } else {
        this.dialogTitle = "ERROR";
        this.dialogContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    modifyPortfolio() {

      console.log(this.imgurLink);
      for(let i = 0; i < this.imgurLink.length; i++) {
        
        this.imgs.push(this.imgurLink[i]);
      }
      FirebaseService.modifyPortfoilo(this.articleId, this.title, this.body, this.imgs);

      this.$store.state.images.imgurLinks = [];
      this.$store.state.images.images = [];

      this.dialogTitle = "수정완료";
      this.dialogContent = "글 수정을 완료하였습니다.";
      this.flag = true;
      this.dialog = true;
    },

    async postPortfolio() {
      if (this.title === "") {
        this.dialogTitle = "WARNING";
        this.dialogContent = "제목을 입력해주세요.";
        this.dialog = true;
        this.flag = false;
      } else if (this.content === "") {
        this.dialogTitle = "WARNING";
        this.dialogContent = "내용을 입력해주세요.";
        this.dialog = true;
        this.flag = false;
      } else if (this.image === "") {
        this.dialogTitle = "WARNING";
        this.dialogContent = "이미지를 한 개 이상 첨부해주세요.";
        this.dialog = true;
        this.flag = false;
      } else {
        try {
          await FirebaseService.postPortfolio(
            {
              uid: this.$store.state.user.user.uid,
              name: this.$store.state.user.user.displayName
            },
            this.title,
            this.content,
            this.$store.state.images.imgurLinks
          );
          this.$store.state.images.imgurLinks = [];

          this.dialog = true;
          this.flag = true;
          this.dialogTitle = "성공";
          this.dialogContent = "글을 성공적으로 작성하였습니다.";
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getPortfolio() {
      let ret = await FirebaseService.getPortfolioById(this.articleId);

      console.log("RET> ", ret);

      this.author = ret.author;
      this.body = ret.body;
      this.created_at = ret.created_at;
      this.imgs = ret.img;
      this.title = ret.title;

      this.authorName = this.author.name;
      this.authorUid = this.author.uid;
    },
    async deletePicture(index, src) {
      let start = src.lastIndexOf("/");
      let end = src.lastIndexOf(".");
      let imageDeleteHash = src.substring(start + 1, end);

      console.log(imageDeleteHash);
      
      console.log("BEFORE DELETE ", this.imgs);

      let flag = await this.deleteImage(imageDeleteHash);
      this.imgs.splice(index, 1);

      console.log(this.imgs);
      FirebaseService.modifyPortfolioImage(this.articleId, this.imgs);

      console.log("flag> ", flag);
    },
    ...mapActions(["deleteImage"])
  }
};
</script>

<style>
#upload {
  font-family: "Nanum Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0000;
}
</style>
