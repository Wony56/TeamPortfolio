<template>
  <div>
    <ImgBanner>
     <span slot="text" style="color:#ff6f61">Detail</span>
    </ImgBanner>
    <v-container grid-list-md wrap id="magi2" justify-center>
      <v-layout justify-end>
      <v-btn color="#ff6f61" flat @click="$router.go(-1)"><i class="material-icons">undo</i></v-btn>
      </v-layout>
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 sm8 md8 px-0 py-0>
            <v-card flat>
              <v-carousel continuous cycle show-arrows-on-hover hide-delimiter-background delimiter-icon="mdi-minus">
                <v-carousel-item
                  v-for="(img,index) in portfolioInfo.img"
                  :key="index"
                  :src="img"
                >
                <img :src="img" style="width:100%; height:100%;"/>
                </v-carousel-item>
              </v-carousel>

              

            <v-card-text style="background-color:#bababa; color:#fff; text-align:right;">
              작성자 : {{portfolioInfo.author.name}} 작성일 : {{portfolioInfo.created_at}}
            </v-card-text>
            <v-card-text style="text-align:center;" class="headline">
              {{portfolioInfo.title}}
            </v-card-text>
            <v-divider></v-divider>

            <VueMarkdown :source="portfolioInfo.content" style="height:80px; overflow-y:auto;"></VueMarkdown>
            <v-card-title>
              <v-layout justify-end>
              <v-btn v-if="!modifyFlag" outline color="#ff6f61" @click="checkAuthentication()">수정</v-btn>
              <v-btn v-if="modifyFlag" outline color="#ff6f61" @click="modifyPortfolio()">수정완료</v-btn>
              <!-- <v-btn v-if="!modifyFlag" outline color="#ff6f61" @click="$router.go(0)">취소</v-btn> -->
              <v-btn v-if="modifyFlag" outline color="#ff6f61" @click="modifyFlag = false">취소</v-btn>
              <v-btn outline color="#ff6f61" @click="deletePortfoilo()">삭제</v-btn>
              </v-layout>
            </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 md4 style="padding-top:0; padding-left:0;">
          <PortfolioComment
            :articleId="id"
          ></PortfolioComment>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>

    <!--=========================================MODAL====================================================-->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{modalTitle}}</v-card-title>
        <v-card-text>{{modalContent}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="movePage == 1" color="green darken-1" flat @click="$router.go(0)">Close</v-btn>
          <v-btn v-else-if="movePage == 2" color="green darken-1" flat to="/portfolio">Close</v-btn>
          <v-btn v-else color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--=================================================================================================-->
    <v-layout justify-center>
      <v-dialog v-model="modifyFlag" fullscreen hide-overlay transition="dialog-bottom-transition">

        <v-card>
          <v-toolbar flat dark color="#ff6f61">
            <v-btn icon dark @click="modifyFlag = false">
              <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title>글 수정 하기</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn flat @click="modifyPortfolio()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-list three-line subheader>

            <MarkdownEditor v-model="modifyContent"></MarkdownEditor>

        <v-layout row style="margin: 30px;">
          <v-flex v-for="(img, index) in portfolioInfo.img" :key="index">
            <v-img class="white--text" width="200px" height="200px" :src="img">
              <v-btn  v-if="modifyFlag" text icon color="yellow" @click="deletePicture(index, img)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-img>
          </v-flex>
        </v-layout>

            <UploadForm></UploadForm>
          </v-list>
        </v-card>
      </v-dialog>
    </v-layout>
  <!--===================================================================================================================--> 
  </div>
</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import MarkdownEditor from "vue-simplemde/src/markdown-editor";
import UploadForm from "../components/base/UploadForm";
import FirebaseService from "@/services/FirebaseService";

// Comment Component
import PortfolioComment from "../components/portfolio/PortfolioComment";

// Get Logined User Info
import { mapState } from "vuex";

// Imgur API
import { mapActions } from "vuex";

// Markdown Viewer
import VueMarkdown from 'vue-markdown'

export default {
  data: () => ({

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
    modifyContent: "",

    movePage: 0,

    modalTitle: "",
    modalContent: ""
  }),
  components: {
    ImgBanner,
    PortfolioComment,
    MarkdownEditor,
    UploadForm,
    VueMarkdown
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
      this.portfolioInfo.title = ret.title;

      this.loadMore = true;
    },    
    setModalContent(title, content) {

        this.modalTitle = title;
        this.modalContent = content;
        this.dialog = !this.dialog;
    },
    checkAuthentication() {

      if (this.loggedIn == true && (this.authorUid == this.user.uid || this.user.tier == "diamond")) {

        this.modifyFlag = true;
        this.modifyContent = this.portfolioInfo.content;

      } else {

        this.movePage = 0;
        this.setModalContent("ERROR", "권한이 없습니다.");
        this.dialog = true;
      }
    },
    modifyPortfolio() {

      console.log(this.imgurLink);
      for(let i = 0; i < this.imgurLink.length; i++) {
        
        this.portfolioInfo.img.push(this.imgurLink[i]);
      }
      this.portfolioInfo.content = this.modifyContent;

      console.log(this.portfolioInfo);

      FirebaseService.modifyPortfoilo(this.id, this.portfolioInfo);

      this.$store.state.images.imgurLinks = [];
      this.$store.state.images.images = [];

      this.setModalContent("수정완료", "포트폴리오 수정을 완료하였습니다.");
      this.flag = true;
      this.dialog = true;
      this.modifyFlag = false;
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
#magi2
{
  margin-top: -150px;
}
@media (min-width: 768px) 
{
  #magi2 
  {
    margin-top: -250px;
  }
}
@media (min-width: 1024px) 
{
  #magi2  
  {
    margin-top: -855px;
  }
}

</style>