<template>
<div>
  <ImgBanner>
        <span color="#fff">Post</span>
    </ImgBanner>
    <v-layout justify-center align-center style="margin-top:-600px">
      <v-flex xs11 md10>
    <v-card >
      <v-card-title>제목 : {{title}} <v-btn flat right style="background-color:#ff6f61; color:#fff">댓글</v-btn></v-card-title>
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

      <v-card-actions text-xs-right jusitfy-right align-right>
        <v-btn class="text-right" text @click="$router.go(-1)">뒤로</v-btn>
        <v-btn class="text-right" text>수정</v-btn>
        <v-btn class="text-right" text>삭제</v-btn>
      </v-card-actions>

      <v-divider></v-divider>
      <v-card-title>Reply</v-card-title>
      <!-- ========================================================================================== -->
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
            v-model="reply.content"
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
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import ImgBanner from "../components/ImgBanner";
import { mapState } from "vuex";

export default {
  name: "PostViewPage",
  data() {
    return {
      replies: [],
      selectedIndex : -1,
      replyContent: "",
      ff: false,
      title: "",
      content: "",
      author: "",
      identifier: "",
      articleId: "",
      created_at: "",

      loadMore: false,
      focusPage: 1,
      totalPage: 10
    };
  },
  components:{
    ImgBanner
  },
  computed: {

    ...mapState({
      user: state => state.user.user
    }),
    rendering() {

    }
  },
  methods: {
    async loadPost(id) {
      let ret = await FirebaseService.getPostById(this.$route.params.postIndex);

      this.title = ret.title;
      this.content = ret.content;
      this.author = ret.author;
      this.identifier = ret.identifier;
      this.articleId = ret.articleId;
      this.created_at = ret.created_at;

      this.replies = ret.reply;

      if(this.replies.length > 10)
        this.loadMore = true;

    },
    getPostInfo() {
      return {
        author: this.user.name,
        content: this.content,
        created_at: this.created_at,
        identifier: this.user.uid,
        reply: this.replies,
        title: this.title
      };
    },
    addReply() {
      let temp = this.replyContent;
      console.log(this.replyContent);
      console.log(this.user.uid + "!!!" + this.articleId);

      console.log("BEFORE PUSH ", this.replies);
      FirebaseService.addReply(this.articleId, this.getPostInfo(), temp);
      this.replyContent = "";
    },
    removeReply(index) {
      if (this.replies[index].uid == this.user.uid) {
        this.replies.splice(index, 1);
        FirebaseService.modifyReply(this.articleId, this.getPostInfo());
      } else {
        console.log("다름!");
      }
    },
    checkReplyAuthority(index) {
      if (this.replies[index].uid == this.user.uid) {
        
        if(this.selectedIndex == -1)
          this.selectedIndex = index;
        else
          this.selectedIndex = -1;
      } else {
        console.log("다름!");
      }
    },
    modifyReply(index) {
      if (this.replies[index].uid == this.user.uid) {
        FirebaseService.modifyReply(this.articleId, this.getPostInfo());
        this.selectedIndex = -1;
      } else {
        console.log("다름!");
      }
    }
  },
  mounted() {
    this.loadPost(this.$route.params.postIndex);
  }
};
</script>
<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
}
</style>