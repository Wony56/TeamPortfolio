<template>
  <div>
    <v-card flat min-height="600">
      <v-card-text
        class="headline"
        style="background-color:#ff6f61; color:#fff; text-align:center;"
      >Comments</v-card-text>

        <div v-for="(reply, index) in replies[focusPage - 1]" :key="index">
        <v-layout row wrap>
            <v-flex>

            <v-card-title>
            <span style="color:	#ff6f61">{{reply.author}}&nbsp;</span>
            {{reply.replyContent}}
            </v-card-title>
            

            </v-flex>
            <v-flex style="text-align:right; vertical-align:center;" align-center>
              <span style="color:#bcbcbc; ">
                {{reply.created_at | formatDate}}</span>
            <v-btn v-if="user.uid == reply.uid || user.tier =='diamond'" class="mx-2" fab small flat color="blue" @click="authorizationCheck(index)">
            <v-icon fab small dark>edit</v-icon>
            </v-btn>
            <v-btn v-if="user.uid == reply.uid || user.tier =='diamond'" class="mx-2" fab small flat color="red" @click="removeComment(index)">
            <v-icon fab small dark>delete</v-icon>
            </v-btn>
            </v-flex>
          </v-layout>
        <v-divider></v-divider>
        </div>
        
    </v-card>
    <v-card flat>
        <v-card-title style="height:80px; " >
            <v-text-field id="replyInput" v-model="content" label="댓글을 입력하세요" single-line color="#ff6f61"></v-text-field>
            <v-btn outline color="#ff6f61" @click="addComment()">댓글 쓰기</v-btn>
        </v-card-title>
      <v-layout justify-center>
      <v-pagination
        v-if="loadMore"
        v-model="focusPage"
        :length="totalPage"
        :total-visible="5"
        color="#ff6616"
      ></v-pagination>
    </v-layout>
    </v-card>
<!--===================================================================================================================-->
    <v-dialog v-model="dialog" persistent max-width="600px">

      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field label="댓글 수정" v-model="modifyContent" required></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>* 댓글 수정 시 최신 댓글로 수정되어 제일 뒤로 갑니다.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modifyComment(selectedIndex)" flat>수정완료</v-btn>
          <v-btn color="red darken-1" text @click="cancel()" flat>취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--===================================================================================================================-->
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import { mapState } from "vuex";

export default {
  name: "PortfolioComment",
  props: {
    articleId: { type: String }
  },
  data() {
    return {
      replies: [],
      selectedIndex: -1,

      id: "",
      loadMore: false,

      focusPage: 1,
      totalPage: 10,

      content: "",
      modifyContent: "",
      originContent: "",

      modalTitle: "",
      modalContent: "",

      dialog: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      loggedIn: state => state.user.loggedIn
    })
  },
  filters: {

    formatDate(data) {

      let date = new Date(data);

      return date.getMonth() + "." + date.getDay() + " "+
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
  },
  mounted() {
    this.loadComments();
  },
  methods: {
    async loadComments() {
      
      console.log("ID?? ", this.articleId);

      let comments = await FirebaseService.getComments(this.articleId);
      this.loadMore = true;
      this.replies = [];

      if (comments.length > 0) {
        let index = 0;
        let flag = false;
        this.totalPage = parseInt(comments.length / 9);

        for (let page = 0; page <= this.totalPage; page++) {
          let temp = [];

          for (let count = 0; count < 9; count++) {
            if (comments[index] === undefined) {
              flag = true;
              break;
            }
            temp.push(comments[index++]);
          }
          if (temp.length > 0) this.replies.push(temp);
          if (flag) break;
        }
        this.totalPage = this.replies.length;
      } else {
        this.totalPage = 1;
      }

      console.log("LOAD ", this.replies);
    },

    authorizationCheck(index) {
      if (this.user === undefined) {
        this.$parent.$options.parent.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }

      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        if (this.selectedIndex == -1) this.selectedIndex = index;
        else this.selectedIndex = -1;

        this.replyFlag = true;
        this.dialog = true;
         this.modifyContent = this.originContent = this.replies[this.focusPage - 1][index].replyContent;
      } else {
        this.$parent.$options.parent.setModalContent("오류", "권한이 없습니다.");
      }
    },

    getInputComment() {
      return {
        articleId: this.articleId,
        author: this.user.displayName,
        uid: this.user.uid,
        replyContent: this.content,
        created_at: { type: Date }
      };
    },
    addComment() {
      if (this.user.loggedIn == false || this.user.uid == undefined) {

        console.dir(this.$parent);
        this.$parent.$options.parent.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }
      let comment = this.getInputComment();
      this.paginations(comment);

      FirebaseService.addComment(comment);
      this.loadComments();

      console.log("AFTER ADD :", this.replies);
      this.content = "";
    },
    async removeComment(index) {
      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        FirebaseService.deleteComment(
          this.replies[this.focusPage - 1][index].commentId
        );
        this.replies[this.focusPage - 1].splice(index, 1);

        if (this.replies[this.focusPage - 1].length == 0) {
          if (this.totalPage != 1) this.totalPage -= 1;

          if (this.focusPage != 1) this.focusPage -= 1;
        }
        let origin = await FirebaseService.getComments(this.articleId);
        this.replies = [];

        if (origin.length > 0) {
          let index = 0;
          let flag = false;
          this.totalPage = parseInt(origin.length / 9);

          for (let page = 0; page <= this.totalPage; page++) {
            let temp = [];

            for (let count = 0; count < 9; count++) {
              if (origin[index] === undefined) {
                flag = true;
                break;
              }
              temp.push(origin[index++]);
            }
            if (temp.length > 0) this.replies.push(temp);
            if (flag) break;
          }
          this.totalPage = this.replies.length;
        }
      } else {
        this.$parent.$options.parent.setModalContent("오류", "권한이 없습니다.");
      }
    },
    modifyComment(index) {

      console.log(index);

      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {

        console.log(this.replies[this.focusPage - 1][index].commentId);
        console.log(this.modifyContent);

        FirebaseService.modifyComment(
          this.replies[this.focusPage - 1][index].commentId,
          this.modifyContent
        );

        this.selectedIndex = -1;
        this.replyFlag = false;
        this.dialog = false;

        this.loadComments();
      } else {
        this.$parent.$options.parent.setModalContent("오류", "권한이 없습니다.");
      }
    },
    cancel() {

      this.dialog = false;
      this.replies[this.focusPage - 1][this.selectedIndex].replyContent = this.originContent;
      this.selectedIndex = -1;
    },

    paginations(reply) {
      if (this.replies[this.totalPage - 1] === undefined) {
        this.replies.push([reply]);
        return;
      }

      if (this.replies[this.totalPage - 1].length == 9) {
        this.totalPage += 1;
        this.replies.push([reply]);
      } else {
        this.replies[this.totalPage - 1].push(reply);
      }
    }
  }
};
</script>