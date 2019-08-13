<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em; color:black;" slot="text">Portfolio</div>
    </ImgBanner>

    <v-container>
      <form>
        <v-text-field v-model="title" color="#ff6f61" placeholder="제목을 입력해주세요." required></v-text-field>
        <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
        <uploadform />
        <v-spacer></v-spacer>
        <v-layout justify-center>
          <v-btn style="background-color:#ff6f61; color:#ffff" @click="postPortfolio">submit</v-btn>
          <v-btn style="background-color:#ff6f61; color:#ffff" @click="$router.go(-1)">cancel</v-btn>
        </v-layout>
      </form>
    </v-container>

    <!--=======================================================================================================-->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{modalTitle}}</v-card-title>
        <v-card-text>{{modalContent}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!modifyFlag" color="green darken-1" flat to="/portfolio">Close</v-btn>
          <v-btn v-else color="green darken-1" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--=======================================================================================================-->

  </div>
</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import markdownEditor from "vue-simplemde/src/markdown-editor";
import UploadForm from "../components/base/UploadForm";
import FirebaseService from "@/services/FirebaseService";

export default {
  data: () => ({
    title: "",
    content: "",
    image: [],

    modalTitle: "",
    modalContent: "",
    dialog: false,
    modifyFlag: false
  }),
  components: {
    ImgBanner,
    markdownEditor,
    uploadform: UploadForm
  },
  mounted() {
    this.$store.state.images.imgurLinks = [];
    this.$store.state.images.images = [];
  },
  methods: {
    async postPortfolio() {

      this.image = this.$store.state.images.imgurLinks;

      console.log("IMAGE?? ", this.image.length);
      console.log(this.image.imgurLinks);

      if (this.title === "") {

        this.modifyFlag = true;
        this.setModalContent("알림", "제목을 입력해주세요.");
      } else if (this.content === "") {

        this.modifyFlag = true;
        this.setModalContent("알림", "내용을 입력해주세요.");
      } else if (this.image.length < 2) {
        
        this.modifyFlag = true;
        this.setModalContent("알림", "이미지를 두 개 이상 업로드 해주세요.");
      } else {
        try {
          await FirebaseService.postPortfolio(
            {
              uid: this.$store.state.user.user.uid,
              name: this.$store.state.user.user.displayName
            },
            this.title,
            this.content,
            this.image
          );
          this.dialog = true;
          this.modifyFlag = false;
          this.setModalContent("성공", "포트폴리오 작성 성공하였습니다.");

        } catch (error) {
          console.log(error);
        }
      }
      this.$store.state.images.imgurLinks = [];
      this.$store.state.images.images = [];
      
    },
    setModalContent(title, content) {

      this.dialog = true;
      this.modalTitle = title;
      this.modalContent = content;
    }
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
