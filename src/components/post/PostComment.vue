<template>
  <div>
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
              id="replyInput"
              v-model="content"
              label="댓글입력"
              auto-grow
              rows="1"
              row-height="15"
              flat 
              color="#ff6f61"
            ></v-textarea>
          </v-card-text>
          <v-card-text>
            <v-btn flat color="#ff6f61" @click="addComment()">댓글 추가</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!--하나씩 카드로 나눠서 보여주는걸로 할 예정-->
    <v-layout v-for="(reply, index) in replies[focusPage - 1]" :key="index">
      <v-flex row wrap>
        <br />
        <v-card min-height="100">
          <v-text-field color="#ff6f61" :id="index" v-model="reply.replyContent" :readonly="selectedIndex != index"></v-text-field>
          <v-layout justify-end text-xs-right>
            <v-card-text style="color:gray">
              작성자 : {{reply.author}} |
              작성일 : {{reply.created_at}}
              <v-btn
                v-if="selectedIndex != index"
                fab
                small
                flat
                color="blue"
                @click="authorizationCheck(index)"
              ><v-icon fab small dark>edit</v-icon></v-btn>
              <v-btn
                v-if="selectedIndex == index"
                text
                flat
                color="black"
                @click="modifyComment(index)"
              >수정완료</v-btn>
              <v-btn
                v-if="selectedIndex == index"
                text
                flat
                color="black"
                @click="selectedIndex = -1"
              >취소</v-btn>
              <v-btn fab small flat color="red" @click="removeComment(index)"><v-icon fab small dark>delete</v-icon></v-btn>
            </v-card-text>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-pagination
        v-if="loadMore"
        v-model="focusPage"
        :length="totalPage"
        :total-visible="5"
        color="#ff6616"
      ></v-pagination>
    </v-layout>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import { mapState } from "vuex";

export default {
  name: "Comment",
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
      originContent: "",

      modalTitle: "",
      modalContent: ""
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      loggedIn: state => state.user.loggedIn
    })
  },
  mounted() {
    this.loadComments();
  },
  methods: {
    async loadComments() {
      let comments = await FirebaseService.getComments(this.articleId);
      this.loadMore = true;

      if (comments.length > 0) {
        let index = 0;
        let flag = false;
        this.totalPage = parseInt(comments.length / 5);

        for (let page = 0; page <= this.totalPage; page++) {
          let temp = [];

          for (let count = 0; count < 5; count++) {
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
    },

    authorizationCheck(index) {
      if (this.user === undefined) {
        this.$parent.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }

      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        if (this.selectedIndex == -1) this.selectedIndex = index;
        else this.selectedIndex = -1;

        this.replyFlag = true;
      } else {
        this.$parent.setModalContent("오류", "권한이 없습니다.");
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
      if (this.user.uid == undefined) {
        this.$parent.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }
      let comment = this.getInputComment();
      this.paginations(comment);

      FirebaseService.addComment(comment);

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
          this.totalPage = parseInt(origin.length / 5);

          for (let page = 0; page <= this.totalPage; page++) {
            let temp = [];

            for (let count = 0; count < 5; count++) {
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
        this.$parent.setModalContent("오류", "권한이 없습니다.");
      }
    },
    modifyComment(index) {
      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        FirebaseService.modifyComment(
          this.replies[this.focusPage - 1][index].commentId,
          document.getElementById(index).value
        );
        this.selectedIndex = -1;
        this.replyFlag = false;
      } else {
        this.$parent.setModalContent("오류", "권한이 없습니다.");
      }
    },

    paginations(reply) {
      if (this.replies[this.totalPage - 1] === undefined) {
        this.replies.push([reply]);
        return;
      }

      if (this.replies[this.totalPage - 1].length == 5) {
        this.totalPage += 1;
        this.replies.push([reply]);
      } else {
        this.replies[this.totalPage - 1].push(reply);
      }
    }
  }
};
</script>

