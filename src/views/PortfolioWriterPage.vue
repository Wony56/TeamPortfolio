<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em; color:black;" slot="text">Portfolio</div>
    </ImgBanner>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">글쓰기 성공</v-card-title>
        <v-card-text>정상적으로 등록 되었습니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat to="/portfolio">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
    dialog: false
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

      console.log("IMAGE?? ", this.image);

      if (this.title === "") {
        this.setModalContent("알림", "제목을 입력해주세요.");
      } else if (this.content === "") {
        this.setModalContent("알림", "내용을 입력해주세요.");
      } else if (this.image === "") {
        this.setModalContent("알림", "이미지를 하나라도 업로드 해주세요.");
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
          this.setModalContent("성공", "포트폴리오 작성 성공하였습니다.");
          this.dialog = true;

        } catch (error) {
          console.log(error);
        }
      }
      this.$store.state.images.imgurLinks = [];
      this.$store.state.images.images = [];
      
    },
    setModalContent(title, content) {

      this.modalTitle = title;
      this.modalContent = content;
    }
  }
};
</script>

<style scoped>
#upload {
  font-family: "Nanum Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0000;
}
</style>
