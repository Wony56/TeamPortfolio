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
            :readonly="toggles[index]"
            v-model="reply.content"
          ></v-text-field>
          
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
            rows="3"
            row-height="25"
            shaped
          ></v-textarea>
        </v-flex>
      </v-card>

      <v-btn @click="addReply()">Add Reply</v-btn>
    </v-card>
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
      toggles: [],
      replyContent: "",

      title: "",
      content: "",
      author: "",
      identifier: "",
      articleId: "",
      created_at: ""
    };
  },
  computed: mapState({
    user: state => state.user.user
  }),
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

      for(let i = 0; i < this.replies.length; i++)
        this.toggles[i] = false;
    },
    getPostInfo() {

      return {

        author: this.author,
        content: this.content,
        created_at: this.created_at,
        identifier: this.identifier,
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

      if(this.replies[index].uid == this.user.uid) {

        this.replies.splice(index, 1);
        FirebaseService.modifyReply(this.articleId, this.getPostInfo());
      }
      else {

        console.log("다름!");
      }
    },
    checkReplyAuthority(index) {

      console.log("check authority");

      if(this.replies[index].uid == this.user.uid) {

        this.toggles[index] = !this.toggles[index];
      }
      else {

        console.log("다름!");
      }

      console.log(index + " " + this.toggles[index]);
    },
    modifyReply(index) {

      if(this.replies[index].uid == this.user.uid) {


        FirebaseService.modifyReply(this.articleId, this.getPostInfo());
      }
      else {

        console.log("다름!");
      }
    }
  },
  mounted() {
    this.loadPost(this.$route.params.postIndex);
  }
};
</script>
