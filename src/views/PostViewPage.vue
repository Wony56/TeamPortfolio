<template>
  <div style="margin: 150px;">
    <v-card>
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

      <v-card-text>{{content}}</v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-btn class="text-right" text @click="$router.go(-1)">뒤로</v-btn>
        <v-btn class="text-right" text>수정</v-btn>
        <v-btn class="text-right" text>삭제</v-btn>
      </v-card-actions>

      <v-divider></v-divider>
      <v-card-title>Reply</v-card-title>
      <!-- ==============================REPLY================================================ -->
      <v-flex>
        <v-card color="#385F73" dark v-for="(reply, index) in replies" :key="index">
          <v-card-text class="white--text">
            <div class="headline mb-1">{{reply.author}}</div>
            <div>{{reply.created_at}}</div>
          </v-card-text>

          <v-text-field
            :id="index"
            auto-grow
            outlined
            rows="3"
            row-height="25"
            v-model="reply.replyContent"
            :readonly="selectedIndex != index"
          ></v-text-field>

          <v-btn v-show="selectedIndex == index" @click="modifyReply(index)">수정완료</v-btn>

          <v-card-actions>
            <v-btn text flat>Reply</v-btn>
            <v-btn text flat @click="checkReplyAuthority(index)">Modify</v-btn>
            <v-btn text flat @click="removeReply(index)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <!-- ========================================================================================== -->

      <v-card>
        <v-flex xs12 sm6>
          <v-textarea
            v-model="replyContent"
            label="댓글입력"
            auto-grow
            outlined
            rows="1"
            row-height="15"
          ></v-textarea>
        </v-flex>
      </v-card>

      <v-btn @click="addReply()">Add Reply</v-btn>
      <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
        <v-pagination v-model="focusPage" :length="totalPage" :total-visible="7" color="#ff6616"></v-pagination>
      </v-flex>
    </v-card>

    <!-- =========================================== MODAL =========================================== -->
    <v-layout justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{modalTitle}}</v-card-title>
          <v-card-text>{{modalContent}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- =========================================================================================== -->
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
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
      identifier: "",
      articleId: "",
      created_at: "",

      loadMore: false,
      focusPage: 1,
      totalPage: 10,

      modalTitle: "",
      modalContent: "",
      dialog: false
    };
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
    getReplyInfo(date) {
      return {
        author: this.user.name,
        uid: this.user.uid,
        replyContent: this.replyContent,
        name: this.user.name,
        created_at: date
      };
    },
    getPostInfo() {
      return {
        author: this.user.name,
        content: this.content,
        created_at: this.created_at,
        authorUid: this.user.uid,
        reply: this.replies,
        title: this.title
      };
    },
    addReply() {
      
      if(this.user.uid == undefined) {

        this.modalTitle = "WARNING";
        this.modalContent = "로그인 해주세요.";
        this.dialog = true;
        return;
      }
      let reply = this.getReplyInfo();
      reply.created_at = this.getCurrentDate();
      FirebaseService.addReply(this.articleId, reply);

      this.replies.push(reply);
      this.replyContent = "";
    },
    removeReply(index) {
      if (this.replies[index].uid == this.user.uid) {

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
      if (this.replies[index].uid == this.user.uid) {
        if (this.selectedIndex == -1) this.selectedIndex = index;
        else this.selectedIndex = -1;
      } else {
        this.modalTitle = "ERROR";
        this.modalContent = "권한이 없습니다.";
        this.dialog = true;
      }
    },
    modifyReply(index) {

      if (this.replies[index].uid == this.user.uid) {
        FirebaseService.modifyReply(this.articleId, index, this.replyContent);
        this.selectedIndex = -1;
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
