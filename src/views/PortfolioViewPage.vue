<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em; color:black;" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container id="magi">
              <!-- 뒤로가기 -->
    <v-layout justify-end>
      <v-btn color="#ff6f61" flat @click="$router.go(-1)">뒤로</v-btn>
    </v-layout>
    <v-layout column text-xs-center justify-center >
      <v-flex d-flex xs12 md10 sm10 >
        <v-card flat style="background-color:#ff6f61; color:#fff;">
          <v-card-text class="headline">글제목</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md10 sm10>
        <v-layout row>
          <v-flex d-flex xs12 sm4 md4>
            <v-card flat min-height=400 max-height=400>
              <v-card-text>
                사진
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm8 md8>
            <v-card flat>
              <v-card-title>
                내용
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout justify-end>
      <v-card-actions>
        <v-btn style="background-color:#ff6f61; color:#fff">
          수정
        </v-btn>
        <v-btn style="background-color:#ff6f61; color:#fff">
          수정완료
        </v-btn>
        <v-btn style="background-color:#ff6f61; color:#fff">
          취소
        </v-btn>
        <v-btn style="background-color:#ff6f61; color:#fff">
          삭제
        </v-btn>
      </v-card-actions>
    </v-layout>
    <v-layout justify-center text-xs-center>
      <v-flex row wrap>
        <v-card max-height="50">
          <v-card-text style="background-color:#ff6f61; color:#fff">Comments</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-end text-xs-right>
        <v-flex row wrap>
          <v-card min-height="50" max-height="170">
            <v-card-text>
              <v-textarea
                  v-model="replyContent"
                  label="댓글입력"
                  auto-grow
                  rows="1"
                  row-height="15"
                  flat
                  color="#ff6f61"
                >
              </v-textarea>
            </v-card-text>
            <v-card-text>
              <v-btn flat color="#ff6f61" @click="addReply()">댓글 추가</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
 <!--하나씩 카드로 나눠서 보여주는걸로 할 예정-->
      <v-layout v-for="(reply, index) in replies[focusPage - 1]" :key="index">
        <v-flex row wrap>
          <br />
          <v-card min-height="100">
          <v-text-field
                :id="index"
                v-model="reply.replyContent"
                :readonly="selectedIndex != index"
          >
          </v-text-field>
          <v-layout justify-end text-xs-right>
            <v-card-text style="color:gray">
                  {{reply.author}} |
                  {{reply.created_at}}
              <v-btn
                    v-if="!replyFlag"
                    text
                    flat
                    color="#ff6f61"
                    @click="checkReplyAuthority(index)"
              >수정
              </v-btn>
              <v-btn v-else text flat color="black" @click="modifyReply(index)">수정완료</v-btn>
              <v-btn v-if="replyFlag" text flat color="black" @click="replyFlag = false">취소</v-btn>
              <v-btn text flat color="#ff6f61" @click="removeReply(index)">삭제</v-btn>
            </v-card-text>
          </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
    replies: [],
    totalPage: 10,
    focusPage: 1,
    selectedIndex: -1,
    replyContent: "",

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

    replyFlag: false,
    loadMore: false,
    movePage: false,

    modalTitle: "",
    modalContent: ""
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
    this.articleId = this.$route.params.portfolioId;
    this.getPortfolio();
  },
  methods: {
    getReplyInfo() {
      return {
        author: this.user.displayName,
        uid: this.user.uid,
        replyContent: this.replyContent,
        created_at: { type: Date }
      };
    },
    getPostInfo() {
      return {
        author: this.user.displayName,
        content: this.content,
        created_at: this.created_at,
        authorUid: this.user.uid,
        reply: this.replies,
        title: this.title
      };
    },
    addReply() {
      if (this.user.uid == undefined) {
        this.modalTitle = "WARNING";
        this.modalContent = "로그인 해주세요.";
        this.dialog = true;
        return;
      }

      let reply = this.getReplyInfo();
      this.replies[this.focusPage - 1].push(reply);
      FirebaseService.addReply(this.articleId, reply, "PORTFOLIO");

      this.replyContent = "";
    },
    removeReply(index) {
      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        let reply = this.replies[this.focusPage - 1][index];

        FirebaseService.removeReply(this.articleId, reply, "PORTFOLIO");
        this.replies[this.focusPage - 1].splice(index, 1);
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    checkReplyAuthority(index) {
      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        if (this.selectedIndex == -1) this.selectedIndex = index;
        else this.selectedIndex = -1;

        this.replyFlag = true;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    modifyReply(index) {
      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        FirebaseService.modifyReply(
          this.articleId,
          index,
          document.getElementById(index).value,
          "PORTFOLIO"
        );
        this.selectedIndex = -1;
        this.replyFlag = false;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
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
        
        this.imgs.push(this.imgurLink[i]);
      }
      FirebaseService.modifyPortfoilo(this.articleId, this.author, this.title, this.body, this.imgs, this.replies);

      this.$store.state.images.imgurLinks = [];
      this.$store.state.images.images = [];

      this.modalTitle = "수정완료";
      this.modalContent = "글 수정을 완료하였습니다.";
      this.flag = true;
      this.dialog = true;
    },

    // async postPortfolio() {
    //   if (this.title === "") {
    //     this.modalTitle = "WARNING";
    //     this.modalContent = "제목을 입력해주세요.";
    //     this.dialog = true;
    //     this.flag = false;
    //   } else if (this.content === "") {
    //     this.modalTitle = "WARNING";
    //     this.modalContent = "내용을 입력해주세요.";
    //     this.dialog = true;
    //     this.flag = false;
    //   } else if (this.image === "") {
    //     this.modalTitle = "WARNING";
    //     this.modalContent = "이미지를 한 개 이상 첨부해주세요.";
    //     this.dialog = true;
    //     this.flag = false;
    //   } else {
    //     try {
    //       await FirebaseService.postPortfolio(
    //         {
    //           uid: this.$store.state.user.user.uid,
    //           name: this.$store.state.user.user.displayName
    //         },
    //         this.title,
    //         this.content,
    //         this.$store.state.images.imgurLinks
    //       );
    //       this.$store.state.images.imgurLinks = [];

    //       this.dialog = true;
    //       this.flag = true;
    //       this.modalTitle = "성공";
    //       this.modalContent = "글을 성공적으로 작성하였습니다.";
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // },
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

       let index = 0;

      this.loadMore = true;

      if(ret.reply !== undefined) {
      this.totalPage = parseInt(ret.reply.length / 5) + 1;

      console.log(this.totalPage);

      for (let page = 0; page <= this.totalPage; page++) {
        let temp = [];

        for (let count = 0; count < 5; count++) {
          if (ret.reply[index] === undefined) break;
          temp.push(ret.reply[index++]);
        }
        this.replies.push(temp);
      }
      }
      console.log(this.replies);
      this.articleId = this.$route.params.portfolioId;

      console.log("ARTICLE 받았나요? ", this.articleId);

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
