<template>
  <div>
    <ImgBanner>
      <span color="#fff">Post</span>
    </ImgBanner>
    <v-layout justify-center align-center id="magi">
      <v-flex xs11 md10>
        <v-card flat>
          <v-btn class="text-right" text @click="$router.go(-1)">뒤로</v-btn>
          <v-divider></v-divider>
          <v-card-title>제목 : {{title}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text--primary">작성일 : {{created_at}}</v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            작성자 :
            {{author}}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>내용></v-card-text>

          <div v-if="modifyFlag">
            <v-card-text>{{content}}</v-card-text>
          </div>
          <div v-else>
            <markdown-editor v-model="content" ref="MarkdownEditor"></markdown-editor>
          </div>
          <v-divider></v-divider>

          <v-card-actions text-xs-right jusitfy-right align-right>
            <v-btn v-if="modifyFlag" class="text-right" @click="checkPostAuthority()">수정</v-btn>
            <v-btn v-else class="text-right" @click="modifyPost()">수정완료</v-btn>
            <v-btn v-if="!modifyFlag" class="text-right" @click="modifyFlag = true">취소</v-btn>
            <v-btn v-if="modifyFlag" class="text-right" @click="deletePost()" text>삭제</v-btn>
          </v-card-actions>

          <v-divider></v-divider>

          <!-- ==============================REPLY================================================ -->
          <v-card-title class="headline" style="background-color:#ff6f61; color:#fff">Reply</v-card-title>
          <v-card-title>Reply</v-card-title>
          <v-flex>
            <v-card flat outlined color="#fff" v-for="(reply, index) in replies" :key="index">
              <v-text-field
                :id="index"
                auto-grow
                rows="3"
                row-height="25"
                v-model="reply.replyContent"
                :readonly="selectedIndex != index"
              ></v-text-field>
              <v-card-text>
                {{reply.author}}
                {{reply.created_at}}
              </v-card-text>
              <v-btn v-show="selectedIndex == index" @click="modifyReply(index)">수정완료</v-btn>

              <v-card-actions justify-right text-xs-right>
                <v-btn text style="background-color:#ff6f61; color:#fff" flat>Reply</v-btn>
                <v-btn
                  text
                  style="background-color:#ff6f61; color:#fff"
                  flat
                  @click="checkReplyAuthority(index)"
                >Modify</v-btn>
                <v-btn
                  text
                  style="background-color:#ff6f61; color:#fff"
                  flat
                  @click="removeReply(index)"
                >Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <!-- ========================================================================================== -->

          <v-card flat>
            <v-flex xs12 sm12>
              <v-textarea
                v-model="replyContent"
                label="댓글입력"
                auto-grow
                rows="1"
                row-height="15"
                flat
                color="#ff6f61"
              ></v-textarea>
            </v-flex>
          </v-card>
          <div text-xs-right justify-right>
            <v-btn style="background-color:#ff6f61; color:#fff" @click="addReply()">Add Reply</v-btn>
          </div>
          <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
            <v-pagination
              v-model="focusPage"
              :length="totalPage"
              :total-visible="7"
              color="#ff6616"
            ></v-pagination>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- =========================================== MODAL =========================================== -->
    <v-layout justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{modalTitle}}</v-card-title>
          <v-card-text>{{modalContent}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <div v-if="movePage">
              <v-btn color="green darken-1" text @click="dialog = false">확인</v-btn>
            </div>
            <div v-else>
              <v-btn color="red darken-1" text @click="$router.push('/post')">확인</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- =========================================================================================== -->
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import MarkdownEditor from "vue-simplemde/src/markdown-editor";
import ImgBanner from "../components/base/ImgBanner";
import { mapState } from "vuex";

export default {
  name: "PostViewPage",
  data() {
    return {
      replies: [],
      selectedIndex: -1,
      replyContent: "",

      title: "",
      content: "",
      author: "",
      articleId: "",
      created_at: "",
      postId: "",
      modifyFlag: true,

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
    MarkdownEditor
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    async loadPost(id) {
      let ret = await FirebaseService.getPostById(this.$route.params.postIndex);

      this.title = ret.title;
      this.content = ret.content;
      this.author = ret.author;
      this.authorUid = ret.authorUid;
      this.postId = ret.postId;
      this.created_at = ret.created_at;
      this.replies = ret.reply;

      if (this.replies.length > 10) this.loadMore = true;
      this.articleId = this.$route.params.postIndex;
    },
    getReplyInfo() {
      return {
        author: this.user.displayName,
        uid: this.user.uid,
        replyContent: this.replyContent,
        created_at: ""
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
      FirebaseService.addReply(this.articleId, reply);

      this.replies.push(reply);
      this.replyContent = "";
    },
    removeReply(index) {
      if (
        this.replies[index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        let reply = this.replies[index];
        this.replies.splice(index, 1);
        FirebaseService.removeReply(this.articleId, reply);
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    checkReplyAuthority(index) {
      if (
        this.replies[index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        if (this.selectedIndex == -1) this.selectedIndex = index;
        else this.selectedIndex = -1;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    modifyReply(index) {
      if (
        this.replies[index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        FirebaseService.modifyReply(
          this.articleId,
          index,
          document.getElementById(index).value
        );
        this.selectedIndex = -1;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },

    checkPostAuthority() {

      if (this.postId == this.user.uid || this.user.tier == "diamond") {
        this.modifyFlag = false;
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
        this.modifyFlag = true;

      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },

    getCurrentDate() {
      return new Date();
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
  margin-top: -100px;
}
@media (min-width: 768px) {
  #magi {
    margin-top: -200px;
  }
}
@media (min-width: 1024px) {
  #magi {
    margin-top: -500px;
  }
}
</style>