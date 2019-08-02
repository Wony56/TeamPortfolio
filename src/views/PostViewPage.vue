<template>
  <div>
    <ImgBanner>
      <span color="#fff">Post</span>
    </ImgBanner>
    <v-layout id="magi" justify-center>
      <v-flex xs12 md10>
        <!-- 뒤로가기 -->
        <v-layout justify-end>
          <v-btn color="#ff6f61" flat @click="$router.go(-1)">뒤로</v-btn>
        </v-layout>
        <!-- 본문 부분 -->
        <v-card min-height="400" flat>
          <v-divider></v-divider>
          <v-layout text-xs-center>
            <v-card-text class="headline" style="background-color:#ff6f61; color:#fff">{{title}}</v-card-text>
          </v-layout>
          <v-divider></v-divider>

          <div v-if="!postFlag">
            <VueMarkdown :source="content"></VueMarkdown>
          </div>

          <div v-else>
            <MarkdownEditor v-model="content"></MarkdownEditor>
          </div>
        </v-card>
        <!--버튼 부분-->
        <v-layout justify-end>
          <v-card-actions>
            <v-btn
              v-if="!postFlag"
              style="background-color:#ff6f61; color:#fff"
              @click="checkPostAuthority()"
            >수정</v-btn>
            <v-btn v-else style="background-color:#ff6f61; color:#fff" @click="modifyPost()">수정완료</v-btn>
            <v-btn
              v-if="postFlag"
              style="background-color:#ff6f61; color:#fff"
              @click="postFlag = false"
            >취소</v-btn>
            <v-btn
              v-if="!postFlag"
              style="background-color:#ff6f61; color:#fff"
              @click="deletePost()"
              text
            >삭제</v-btn>
          </v-card-actions>
        </v-layout>
        <!--댓글 부분-->
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
                ></v-textarea>
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
              ></v-text-field>
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
                  >수정</v-btn>

                  <v-btn v-else text flat color="black" @click="modifyReply(index)">수정완료</v-btn>

                  <v-btn v-if="replyFlag" text flat color="black" @click="replyFlag = false">취소</v-btn>

                  <v-btn text flat color="#ff6f61" @click="removeReply(index)">삭제</v-btn>
                </v-card-text>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <v-pagination
          v-if="loadMore"
          v-model="focusPage"
          :length="totalPage"
          :total-visible="5"
          color="#ff6616"
        ></v-pagination>
      </v-flex>
    </v-layout>

    <!--=========================================MODAL====================================================-->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{modalTitle}}</v-card-title>
        <v-card-text>{{modalContent}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="movePage" color="green darken-1" flat to="/post">Close</v-btn>
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

export default {
  name: "PostViewPage",
  data() {
    return {
      replies: [],
      selectedIndex: -1,
      replyContent: "",

      title: "",
      content: "",
      authorUid: "",
      author: "",
      articleId: "",
      created_at: "",
      postFlag: false,

      replyFlag: false,
      loadMore: false,
      focusPage: 1,
      totalPage: 10,

      modalTitle: "",
      modalContent: "",
      dialog: false,
      movePage: false
    };
  },
  components: {
    ImgBanner,
    MarkdownEditor,
    VueMarkdown
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    async loadPost(id) {
      let ret = await FirebaseService.getPostById(this.$route.params.postIndex);

      this.articleId = ret.articleId;
      this.title = ret.title;
      this.content = ret.content;
      this.author = ret.author;
      this.authorUid = ret.authorUid;
      this.created_at = ret.created_at;

      console.log(this.replies);

      let index = 0;

      this.loadMore = true;
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
      console.log(this.replies);
      this.articleId = this.$route.params.postIndex;
    },
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
      FirebaseService.addReply(this.articleId, reply, "POST");

      this.replyContent = "";
    },
    removeReply(index) {
      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        let reply = this.replies[this.focusPage - 1][index];

        FirebaseService.removeReply(this.articleId, reply, "POST");
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
          "POST"
        );
        this.selectedIndex = -1;
        this.replyFlag = false;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },

    checkPostAuthority() {
      if (this.postId == this.user.uid || this.user.tier == "diamond") {
        this.postFlag = true;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    deletePost() {
      if (this.postId == this.user.uid || this.user.tier == "diamond") {
        this.movePage = false;

        FirebaseService.deletePost(this.articleId);
        this.modalTitle = "성공";
        this.modalContent = "글을 성공적으로 삭제하였습니다.";
        this.dialog = true;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    modifyPost() {
      if (this.postId == this.user.uid || this.user.tier == "diamond") {
        this.movePage = true;

        FirebaseService.modifyPost(this.articleId, this.getPostInfo());
        this.modalTitle = "성공";
        this.modalContent = "글을 성공적으로 수정하였습니다.";
        this.dialog = true;
        this.postFlag = true;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    }
  },
  mounted() {
    this.loadPost(this.$route.params.postIndex);
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