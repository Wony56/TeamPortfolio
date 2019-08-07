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
          <v-layout text-xs-center>
<<<<<<< HEAD
            <v-card-text class="headline" style="background-color:#ff6f61; color:#fff">{{postInfo.title}}</v-card-text>
=======
            <v-text-field
              v-model="postInfo.title"
              class="headline"
              style="background-color:#ff6f61; color:#fff"
              :readonly="!postFlag"
            ></v-text-field>
          </v-layout>
          <v-layout text-xs-center>
            <v-card-text
              class="headline"
              style="background-color:#ff6f61; color:#fff"
            >{{postInfo.author.name}}</v-card-text>
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
          </v-layout>

          <v-divider></v-divider>

          <v-layout justify-end>
            <v-card-title style="color:gray;">작성일 : {{postInfo.created_at}}</v-card-title>
          </v-layout>
          <v-divider></v-divider>

          <!-- 수정버튼 누르기전 -->
          <div v-if="!postFlag">
            <VueMarkdown :source="postInfo.content"></VueMarkdown>
          </div>

          <!-- 수정버튼 누른 후 -->
          <div v-else>
            <MarkdownEditor v-model="postInfo.content"></MarkdownEditor>
          </div>
        </v-card>
        <!--버튼 부분-->
        <v-layout justify-end>
          <v-card-actions>
            <v-btn
              v-if="!postFlag"
              style="background-color:#ff6f61; color:#fff"
<<<<<<< HEAD
              @click="authorizationCheck('POST', 0)"
=======
              @click="authorizationCheck(0)"
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
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
<<<<<<< HEAD
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
                    @click="authorizationCheck('REPLY', index)"
                  >수정</v-btn>
                  <v-btn v-else text flat color="black" @click="modifyReply(index)">수정완료</v-btn>
                  <v-btn v-if="replyFlag" text flat color="black" @click="replyFlag = false">취소</v-btn>
                  <v-btn text flat color="#ff6f61" @click="removeReply(index)">삭제</v-btn>
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
=======

        <Comment :articleId="id"></Comment>
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
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

<<<<<<< HEAD
=======
// Comments
import Comment from "../components/base/Comment";

>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
export default {
  name: "PostViewPage",
  props: {
    articleId: { type: String }
  },
  data() {
    return {
<<<<<<< HEAD
      replies: [],
      selectedIndex: -1,
      replyContent: "",

      articleId: "",

      postFlag: false,
      replyFlag: false,      
      dialog: false,
      movePage: 0,
      loadMore: false,

      focusPage: 1,
      totalPage: 10,
=======
      id: "",
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f

      postFlag: false,
      dialog: false,
      modalTitle: "",
      modalContent: "",

<<<<<<< HEAD
      postInfo: {

        author: {type:String},
        authorUid: {type:String},
        content: {type:String},
        created_at: {type:Date},
        reply: {type:Array},
        title: {type:String}
=======
      movePage: 0,
      postInfo: {
        author: {
          name: { type: String },
          uid: { type: String }
        },
        content: { type: String },
        created_at: { type: Date },
        title: { type: String }
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
      },
      originContent: ""
    };
  },
  components: {
    ImgBanner,
    MarkdownEditor,
<<<<<<< HEAD
    VueMarkdown
=======
    VueMarkdown,
    Comment
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
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

<<<<<<< HEAD
      this.articleId = ret.articleId;

      this.postInfo.title = ret.title;
      this.postInfo.content = ret.content;
      this.postInfo.author = ret.author;
      this.postInfo.authorUid = ret.authorUid;
      this.postInfo.created_at = ret.created_at;

      console.log(ret.reply);
      this.loadMore = true;

      if(ret.reply.length > 0) {

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
          if(temp.length > 0)
            this.replies.push(temp);
          if(flag)
            break;
        }
        this.totalPage = this.replies.length;
      }
      else {

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

        FirebaseService.removeReply(this.articleId, this.replies[this.focusPage - 1][index], "POST");
        this.replies[this.focusPage - 1].splice(index, 1);

        if(this.replies[this.focusPage - 1].length == 0) {
          if(this.totalPage != 1)
            this.totalPage -= 1;
          
          if(this.focusPage != 1)
            this.focusPage -= 1;
        }
        let origin =  await FirebaseService.getPostReply(this.articleId);
        this.replies = [];

        console.log("ORIGIN ", origin);

        if(origin.length > 0) {

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
            if(temp.length > 0)
              this.replies.push(temp);
            if(flag)
              break;
          }
          this.totalPage = this.replies.length;
        }
      } else {

         this.setModalContent("오류", "권한이 없습니다.");
=======
      this.postInfo.title = ret.title;
      this.postInfo.content = ret.content;
      this.postInfo.author = ret.author;
      this.postInfo.created_at = ret.created_at;
    },

    authorizationCheck(index) {
      if (this.user === undefined) {
        this.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }

      if (
        this.loggedIn === true &&
        (this.authorUid == this.user.uid || this.user.tier == "diamond")
      ) {
        this.postFlag = true;
        this.originContent = this.postInfo.content;
      } else {
        this.setModalContent("오류", "권한이 없습니다.");
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
      }
      console.log("RESULT? ", this.replies);
    },
<<<<<<< HEAD
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

    authorizationCheck(select, index) {

      if (this.user === undefined) {

        this.setModalContent("알림", "로그인을 해주시길 바랍니다.");
        return;
      }

      if(select === "POST") {

        if ((this.loggedIn === true) && (this.authorUid == this.user.uid || this.user.tier == "diamond")) {
          
          this.postFlag = true;
          this.originContent = this.postInfo.content;

        } else {
          this.setModalContent("오류", "권한이 없습니다.");
        }
      }
      else {

        if (this.replies[this.focusPage - 1][index].uid == this.user.uid ||
          this.user.tier == "diamond"
        ) {
          if (this.selectedIndex == -1) 
            this.selectedIndex = index;
          else 
            this.selectedIndex = -1;

          this.replyFlag = true;
        } else {
          this.setModalContent("오류", "권한이 없습니다.");
        }
      }
    },
    setModalContent(title, content) {

        this.modalTitle = title;
        this.modalContent = content;
        this.dialog = !this.dialog;
    },
    modifyPost() {

        FirebaseService.modifyPost(this.articleId, this.postInfo, this.replies);
        this.setModalContent("성공", "글을 성공적으로 수정하였습니다.");
        this.movePage = 1;
        this.postFlag = false;
    },
    deletePost() {
      if ((this.loggedIn === true) && (this.authorUid == this.user.uid || this.user.tier == "diamond")) {
        this.movePage = 2;

        FirebaseService.deletePost(this.articleId);
        this.setModalContent("성공", "글이 성공적으로 삭제 되었습니다.");
      } else {
        this.setModalContent("오류", "권한이 없습니다.");
      }
    },
    paginations(reply) {

      console.log("BEFORE ", this.replies);

      if(this.replies[this.totalPage - 1] === undefined) {

        this.replies.push([reply]);
        return;
      }

      if(this.replies[this.totalPage - 1].length == 5) {

        console.log("IF ", this.replies[this.totalPage - 1]);
        this.totalPage += 1;
        this.replies.push([reply]);
      } else {

        console.log("ELSE ", this.replies[this.totalPage - 1]);
        this.replies[this.totalPage - 1].push(reply);
=======
    setModalContent(title, content) {
      this.modalTitle = title;
      this.modalContent = content;
      this.dialog = !this.dialog;
    },
    modifyPost() {
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
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
      }
      console.log("AFTER ", this.replies);
    },
    cancelPostModify() {
<<<<<<< HEAD

      console.log("test");

=======
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
      this.postFlag = !this.postFlag;
      this.postInfo.content = this.originContent;
    }
  }
};
</script>

<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}

#magi 
{
  margin-top: -150px;
}
@media (min-width: 768px) 
{
  #magi 
  {
    margin-top: -250px;
  }
}
@media (min-width: 1024px) 
{
  #magi 
  {
    margin-top: -650px;
  }
}

<<<<<<< HEAD
.choosingcolor 
{
=======
.choosingcolor {
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
  background-color: #ff6f61;
  color: #fff;
}
</style>