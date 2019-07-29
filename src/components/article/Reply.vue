<template>
<div>
  <v-card-text class="white--text">
    <div class="headline mb-1">{{replyAuthorName}}</div>
    <div>{{created_at}}</div>
  </v-card-text>

  <v-textarea
    :name="index"
    :readonly="flag"
    v-model="replyContent"
  ></v-textarea>

  <v-btn v-show="!flag" @click="modifyReply()">수정완료</v-btn>

  <v-card-actions>
    <v-btn text flat>Reply</v-btn>
    <v-btn text flat @click="checkReplyAuthority()">Modify</v-btn>
    <v-btn text flat @click="removeReply()">Delete</v-btn>
  </v-card-actions>
</div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import { mapState } from "vuex";

export default {
  props: {
    replyAuthorName: { type: String },
    created_at: {type: String },
    replyContent: { type: String },
    articleId: {type: String },
    index: { type: Number },
    replyAuthorUid: {type: String},

    replies: {type: Array}
  },
  mounted() {

    console.log(this.$parent.replies);

    console.log("REPLY?");
    console.log(this.replyContent);
    console.log(this.articleId);
    console.log(this.replyAuthorUid);
  },
  data() {
    return {
      flag: true,

      loadMore: false,
      focusPage: 1,
      totalPage: 10
    };
  },
  methods: {
    addReply() {

      console.log(this.replyContent);
      console.log(this.user.uid + "!!!" + this.articleId);

      let temp = {

        author: this.replyAuthorName,
        content: this.replyContent,
        created_at: getCurrentDate(),
        uid: this.replyAuthorUid
      }
      console.log("TEMP> ", temp);

      FirebaseService.addReply(this.articleId, temp);
      this.replyContent = "";
    },
    removeReply() {
      if (this.replyAuthorUid == this.user.uid) {

        this.replies.splice(index, 1);
        FirebaseService.removeReply(this.articleId, this.$parent.getPostInfo());
      } else {
        console.log("다름!");
      }
    },
    checkReplyAuthority() {
      if (this.replyAuthorUid == this.user.uid) {
        this.flag = !this.flag;
      } else {
        console.log("다름!");
      }
    },
    modifyReply() {
      if (this.replyAuthorUid == this.user.uid) {

        FirebaseService.modifyReply(this.articleId, this.index, this.replyContent);
        this.flag = !this.flag;
      } else {
        console.log("다름!");
      }
    }
  },  
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
};
</script>
