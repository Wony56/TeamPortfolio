<template>
  <div>
    <ImgBanner>
      <span slot="text" style="color:#ff6f61">Detail</span>
    </ImgBanner>
    <v-layout id="magi" justify-center>
      <v-flex xs11 md9>
        <!-- 뒤로가기 -->
        <v-layout justify-end>
          <v-btn color="#ff6f61" flat @click="$router.go(-1)"><i class="material-icons">undo</i></v-btn>
        </v-layout>
        <!-- 본문 부분 -->
        <v-card min-height="400" flat>
          <v-layout text-xs-center>
            <v-card-text v-if="!postFlag" class="headline" style="background-color:#ff6f61; color:#fff">
              {{postInfo.title}}
            </v-card-text>

            <v-text-field v-else v-model="editTitle">
            </v-text-field>
          </v-layout>

          <v-divider></v-divider>

          <v-layout justify-end>
            <v-card-title style="color:#7C7C7C;">작성자  : {{postInfo.author.name}} / 작성일 : {{postInfo.created_at}}</v-card-title>
          </v-layout>
          <v-divider></v-divider>

          <!-- 수정버튼 누르기전 -->
          <div v-if="!postFlag">
            <VueMarkdown class="title mx-3 my-3" :source="postInfo.content"></VueMarkdown>
          </div>

          <!-- 수정버튼 누른 후 -->
          <div v-else>
            <MarkdownEditor class="title mx-3 my-3" v-model="editContent"></MarkdownEditor>
          </div>
          
        </v-card>
        <!--버튼 부분-->
        <v-layout justify-end>
          <v-card-actions>
            <v-btn
              v-if="!postFlag"
              style="background-color:#ff6f61; color:#fff"
              @click="authorizationCheck()"
            >수정</v-btn>
            <v-btn v-else style="background-color:#ff6f61; color:#fff" @click="modifyPost()">수정완료</v-btn>
            <v-btn
              v-if="postFlag"
              style="background-color:#ff6f61; color:#fff"
              @click="cancelPostModify()"
            >취소</v-btn>
            <v-btn
              v-if="!postFlag"
              style="background-color:#ff6f61; color:#fff"
              @click="deletePost()"
              text
            >삭제</v-btn>
          </v-card-actions>
        </v-layout>

        <PostComment :articleId="id"></PostComment>
      </v-flex>
    </v-layout>

    <!--=========================================MODAL====================================================-->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{modalTitle}}</v-card-title>
        <v-card-text>{{modalContent}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="movePage == 1" color="green darken-1" flat @click="$router.go(0)">Close</v-btn>
          <v-btn v-else-if="movePage == 2" color="green darken-1" flat to="/post">Close</v-btn>
          <v-btn v-else color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--=================================================================================================-->
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import MarkdownEditor from "vue-simplemde/src/markdown-editor";
import ImgBanner from "../components/base/ImgBanner";
import { mapState } from "vuex";

// Markdown Viewer
import VueMarkdown from "vue-markdown";

// Comments
import PostComment from "../components/post/PostComment";

export default {
  name: "PostViewPage",
  props: {
    articleId: { type: String }
  },
  data() {
    return {
      id: "",

      postFlag: false,
      dialog: false,
      modalTitle: "",
      modalContent: "",

      movePage: 0,
      postInfo: {
        author: {
          name: { type: String },
          uid: { type: String }
        },
        content: { type: String },
        created_at: { type: Date },
        title: { type: String }
      },
      editTitle: "",
      editContent: "",

      originTitle: "",
      originContent: ""
    };
  },
  components: {
    ImgBanner,
    MarkdownEditor,
    VueMarkdown,
    PostComment
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      loggedIn: state => state.user.loggedIn
    })
  },
  created() {
    this.id = this.$route.params.postIndex;
  },
  mounted() {
    this.id = this.$route.params.postIndex;
    this.loadPost();
  },
  methods: {
    async loadPost(id) {
      let ret = await FirebaseService.getPostById(this.id);

      this.postInfo.title = ret.title;
      this.postInfo.content = ret.content;
      this.postInfo.author = ret.author;
      this.postInfo.created_at = ret.created_at;
    },

    authorizationCheck() {
      if (this.user === undefined) {
        this.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }

      if (
        this.loggedIn === true &&
        (this.authorUid == this.user.uid || this.user.tier == "diamond")
      ) {
        this.postFlag = true;

        this.originTitle = this.postInfo.title;
        this.originContent = this.postInfo.content;

        this.editTitle = this.originTitle;
        this.editContent = this.originContent;
      } else {
        this.setModalContent("오류", "권한이 없습니다.");
      }
    },
    setModalContent(title, content) {
      this.modalTitle = title;
      this.modalContent = content;
      this.dialog = !this.dialog;
    },
    modifyPost() {

      this.postInfo.title = this.editTitle;
      this.postInfo.content = this.editContent;
      
      FirebaseService.modifyPost(this.id, this.postInfo);
      this.setModalContent("성공", "글을 성공적으로 수정하였습니다.");
      this.movePage = 1;
      this.postFlag = false;
    },
    deletePost() {
      if (
        this.loggedIn === true &&
        (this.authorUid == this.user.uid || this.user.tier == "diamond")
      ) {
        this.movePage = 2;

        FirebaseService.deletePost(this.id);
        this.setModalContent("성공", "글이 성공적으로 삭제 되었습니다.");
      } else {
        this.setModalContent("오류", "권한이 없습니다.");
      }
    },
    cancelPostModify() {
      this.postFlag = !this.postFlag;

      this.postInfo.title = this.originTitle;
      this.postInfo.content = this.originContent;
    }
  }
};
</script>

<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}

#magi {
  margin-top: -150px;
}
@media (min-width: 768px) {
  #magi {
    margin-top: -250px;
  }
}
@media (min-width: 1024px) {
  #magi {
    margin-top: -650px;
  }
}

.choosingcolor {
  background-color: #ff6f61;
  color: #fff;
}
</style>