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

        <div v-if="modifyFlag">
            <v-card-text>{{body}}</v-card-text>
          </div>
          <div v-else>
            <markdown-editor v-model="body" ref="MarkdownEditor"></markdown-editor>
          </div>

        <!-- <MarkdownEditor v-model="body" ref="markdownEditor"></MarkdownEditor> -->

        <v-spacer></v-spacer>

        <v-layout row style="margin: 30px;">
          <v-flex v-for="(img, index) in imgs" :key="index">
            <v-img class="white--text" width="200px" height="200px" :src="img">
              <v-btn text icon color="yellow" @click="deletePicture(index, img)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-img>
          </v-flex>
        </v-layout>

        <v-spacer></v-spacer>

        <UploadForm></UploadForm>
        <v-spacer></v-spacer>
        <v-layout justify-center>
          <v-btn style="background-color:#ff6f61; color:#ffff" @click="postPortfolio">submit</v-btn>
          <v-btn style="background-color:#ff6f61; color:#ffff" @click="$router.go(-1)">cancel</v-btn>
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

// Imgur API
import {mapActions} from "vuex";


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
    modifyFlag: true,

    dialogTitle: "",
    dialogContent: ""
  }),
  components: {
    ImgBanner,
    MarkdownEditor,
    UploadForm
  },
  mounted() {
    this.articleId = this.$route.params.portfolioInfo;
    this.getPortfolio();
  },
  methods: {
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

        let start = src.lastIndexOf('/');
        let end = src.lastIndexOf('.');
        let imageDeleteHash = src.substring(start + 1, end);

        console.log(imageDeleteHash);
        
        let flag = await this.deleteImage(imageDeleteHash);
        this.imgs.splice(index, 1);

        console.log("flag> ", flag);
    },
    ...mapActions(['deleteImage'])
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
