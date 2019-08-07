<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em; color:black;" slot="text">Portfolio</div>
    </ImgBanner>
  <v-container>
      <form>
        <v-text-field v-model="portfolioInfo.title" color="#ff6f61" readonly placeholder="제목을 입력해주세요." :required="!modifyFlag"></v-text-field>
        <v-text-field
          v-model="portfolioInfo.author.name"
          color="#ff6f61"
          readonly
          placeholder="제목을 입력해주세요."
          required
        ></v-text-field>
        <v-text-field v-model="portfolioInfo.created_at" color="#ff6f61" readonly required></v-text-field>

        <div v-if="!modifyFlag">
          <VueMarkdown :source="portfolioInfo.content"></VueMarkdown>
        </div>
        <div v-else>
          <markdown-editor v-model="portfolioInfo.content" ref="MarkdownEditor"></markdown-editor>
        </div>

        <v-spacer></v-spacer>

        <v-layout row style="margin: 30px;">
          <v-flex v-for="(img, index) in portfolioInfo.img" :key="index">
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

        <Comment
          :articleId="id"
        >
        </Comment>

        <v-layout justify-center>
          <v-btn v-if="!modifyFlag" style="background-color:#ff6f61; color:#ffff" @click="checkAuthentication()">수정</v-btn>
          <v-btn v-if="modifyFlag" style="background-color:black; color:#ffff" @click="modifyPortfolio()">수정완료</v-btn>
          <v-btn v-if="!modifyFlag" style="background-color:#ff6f61; color:#ffff" @click="$router.go(0)">취소</v-btn>
          <v-btn v-if="modifyFlag" style="background-color:#ff6f61; color:#ffff" @click="modifyFlag = false">취소</v-btn>
          <v-btn  style="background-color:#ff6f61; color:#ffff" @click="deletePortfoilo()">삭제</v-btn>
        </v-layout>
      </form>
    </v-container>

    <!--=========================================MODAL====================================================-->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{modalTitle}}</v-card-title>
        <v-card-text>{{modalContent}}</v-card-text>
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

// Comment Component
import Comment from "../components/base/Comment";

// Markdown Viewer
import VueMarkdown from 'vue-markdown'

export default {
  data: () => ({
    // replies: [],
    // totalPage: 10,
    // focusPage: 1,
    // selectedIndex: -1,
    // replyContent: "",

    id: "",
    portfolioInfo: {

      title: {type: String},
      author: {

        name: {type: String},
        uid: {type: String},
      },
      content: {type: String},
      created_at: { type: Date },
      img: { type: Array }
    },

    dialog: false,
    flag: true,
    modifyFlag: false,

    // replyFlag: false,
    // loadMore: false,
    movePage: false,

    modalTitle: "",
    modalContent: ""
  }),
  components: {
    ImgBanner,
    MarkdownEditor,
    UploadForm,
    VueMarkdown,
    Comment
  },  
  computed: {
    ...mapState({
      user: state => state.user.user,
      loggedIn: state => state.user.loggedIn,
      imgurLink: state => state.images.imgurLinks
    })
  },
  created() {

    this.id = this.$route.params.articleId;
  },
  mounted() {
    this.$store.state.images.imgurLinks = [];
    this.$store.state.images.images = [];

    this.getPortfolio();
  },
  methods: {

    async getPortfolio() {

      console.log(this.id);
      let ret = await FirebaseService.getPortfolioById(this.id);

      this.portfolioInfo.img = new Array();
      this.portfolioInfo.reply = new Array();

      for(let idx = 0; idx < ret.img.length; idx++) {

        console.log(ret.img[idx]);
        this.portfolioInfo.img.push(ret.img[idx]);
      }

      console.log(this.portfolioInfo.img);

      this.portfolioInfo.author = ret.author;
      this.portfolioInfo.content = ret.content;
      this.portfolioInfo.created_at = ret.created_at;
      this.portfolioInfo.img = ret.img;
      this.portfolioInfo.title = ret.title;

      this.loadMore = true;
    },

    authorizationCheck(select, index) {

      if (this.user === undefined || this.user.loggedIn == false) {

        this.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }

      if(select === "PORTFOLIO") {

        if ((this.loggedIn === true) && (this.authorUid == this.user.uid || this.user.tier == "diamond")) {
          
          this.postFlag = true;
          this.originContent = this.postInfo.content;

        } else {
          this.setModalContent("오류", "권한이 없습니다.");
        }
      }
      else {

        if (this.portfolioInfo.reply[this.focusPage - 1][index].uid == this.user.uid ||
          this.user.tier == "diamond"
        ) {
          if (this.selectedIndex == -1) 
            this.selectedIndex = index;
          else 
            this.selectedIndex = -1;

          this.replyFlag = true;
        } else {
          this.setModalContent("오류", "권한이 없습니다.");
        }
      }
    },
    checkAuthentication() {

      if (this.authorUid == this.user.uid || this.user.tier == "diamond") {
        this.modifyFlag = true;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    modifyPortfolio() {

      console.log(this.imgurLink);
      for(let i = 0; i < this.imgurLink.length; i++) {
        
        this.portfolioInfo.img.push(this.imgurLink[i]);
      }
      FirebaseService.modifyPortfoilo(this.id, this.portfolioInfo);

      this.$store.state.images.imgurLinks = [];
      this.$store.state.images.images = [];

      this.setModalContent("수정완료", "포트폴리오 수정을 완료하였습니다.");
      this.flag = true;
      this.dialog = true;
    },
    deletePortfoilo() {

      if ((this.loggedIn === true) && (this.portfolioInfo.author.uid == this.user.uid || this.user.tier == "diamond")) {
        this.movePage = 2;

        FirebaseService.deletePortfolio(this.id);
        FirebaseService.deleteAllComment(this.id);
        this.setModalContent("성공", "포트폴리오가 성공적으로 삭제 되었습니다.");
      } else {
        this.setModalContent("오류", "권한이 없습니다.");
      }
    },
    async deletePicture(index, src) {

      let start = src.lastIndexOf("/");
      let end = src.lastIndexOf(".");
      let imageDeleteHash = src.substring(start + 1, end);

      console.log(imageDeleteHash);
      
      console.log("BEFORE DELETE ", this.portfolioInfo.img);

      let flag = await this.deleteImage(imageDeleteHash);
      this.portfolioInfo.img.splice(index, 1);

      console.log(this.portfolioInfo.img);
      FirebaseService.modifyPortfolioImage(this.articleId, this.portfolioInfo.img);

      console.log("flag> ", flag);
    },
    setModalContent(title, content) {

        this.modalTitle = title;
        this.modalContent = content;
        this.dialog = !this.dialog;
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
#magi 
{
  margin-top: -150px;
}
@media (min-width: 768px) 
{
  #magi 
  {
    margin-top: -250px;
  }
}
@media (min-width: 1024px) 
{
  #magi 
  {
    margin-top: -650px;
  }
}

</style>
