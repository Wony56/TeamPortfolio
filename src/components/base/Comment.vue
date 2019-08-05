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
          <v-text-field :id="index" v-model="reply.replyContent" :readonly="selectedIndex != index"></v-text-field>
          <v-layout justify-end text-xs-right>
            <v-card-text style="color:gray">
              작성자 : {{reply.author}} |
              작성일 : {{reply.created_at}}
              <v-btn v-if="!replyFlag" text flat color="#ff6f61" @click="authorizationCheck('REPLY', index)">수정</v-btn>
              <v-btn v-else-if="replyFlag" text flat color="black" @click="modifyReply(index)">수정완료</v-btn>
              <v-btn v-else-if="replyFlag" text flat color="red" @click="replyFlag = false">취소</v-btn>
              <v-btn text flat color="blue" @click="removeReply(index)">삭제</v-btn>
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

export default {
  name: "Comment",
  props: {

      articleId: { type: String }
  },
  data() {
    return {
      replies: [],
      selectedIndex: -1,

      id: this.articleId,

      replyFlag: false,
      loadMore: false,

      focusPage: 1,
      totalPage: 10,

      replyContent: "",
      originContent: ""
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      loggedIn: state => state.user.loggedIn
    })
  },
  methods: {
    async loadReply() {

    //   this.articleId = this.$route.params.articleId;
    //   let ret = await FirebaseService.getPostById();

      this.articleId = ret.articleId;

      this.postInfo.title = ret.title;
      this.postInfo.content = ret.content;
      this.postInfo.author = ret.author;
      this.postInfo.authorUid = ret.authorUid;
      this.postInfo.created_at = ret.created_at;

      console.log(ret.reply);
      this.loadMore = true;

      if (ret.reply.length > 0) {
        let index = 0;
        let flag = false;
        this.totalPage = parseInt(ret.reply.length / 5);

        for (let page = 0; page <= this.totalPage; page++) {
          let temp = [];

          for (let count = 0; count < 5; count++) {
            if (ret.reply[index] === undefined) {
              flag = true;
              break;
            }
            temp.push(ret.reply[index++]);
          }
          if (temp.length > 0) this.replies.push(temp);
          if (flag) break;
        }
        this.totalPage = this.replies.length;
      } else {
        this.totalPage = 1;
      }
    },
    getReplyInfo() {
      return {
        author: this.user.displayName,
        uid: this.user.uid,
        replyContent: this.replyContent,
        created_at: { type: Date }
      };
    },
    addReply() {
      if (this.user.uid == undefined) {
        this.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }
      let reply = this.getReplyInfo();
      this.paginations(reply);
      FirebaseService.addReply(this.articleId, reply, "POST");

      this.replyContent = "";
    },
    async removeReply(index) {
      if (
        this.replies[this.focusPage - 1][index].uid == this.user.uid ||
        this.user.tier == "diamond"
      ) {
        FirebaseService.removeReply(
          this.articleId,
          this.replies[this.focusPage - 1][index],
          "POST"
        );
        this.replies[this.focusPage - 1].splice(index, 1);

        if (this.replies[this.focusPage - 1].length == 0) {
          if (this.totalPage != 1) this.totalPage -= 1;

          if (this.focusPage != 1) this.focusPage -= 1;
        }
        let origin = await FirebaseService.getPostReply(this.articleId);
        this.replies = [];

        console.log("ORIGIN ", origin);

        if (origin.length > 0) {
          let index = 0;
          let flag = false;
          this.totalPage = parseInt(origin.length / 5);

          console.log("TOTALPAGE ", this.totalPage);

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
        this.setModalContent("오류", "권한이 없습니다.");
      }
      console.log("RESULT? ", this.replies);
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
        this.setModalContent("오류", "권한이 없습니다.");
      }
    },

    paginations(reply) {
      console.log("BEFORE ", this.replies);

      if (this.replies[this.totalPage - 1] === undefined) {
        this.replies.push([reply]);
        return;
      }

      if (this.replies[this.totalPage - 1].length == 5) {
        console.log("IF ", this.replies[this.totalPage - 1]);
        this.totalPage += 1;
        this.replies.push([reply]);
      } else {
        console.log("ELSE ", this.replies[this.totalPage - 1]);
        this.replies[this.totalPage - 1].push(reply);
      }
      console.log("AFTER ", this.replies);
    }
  }
};
</script>

