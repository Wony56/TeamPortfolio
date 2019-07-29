<template>
  <div style="margin: 150px;">
    <v-card>
      <form>
        <v-textarea
          style="font-size: 30px;"
          v-model="title"
          auto-grow
          filled
          color="black"
          label="Title"
          rows="1"
        ></v-textarea>
        <v-card v-model="title"></v-card>
        <v-divider></v-divider>
        <v-card-text class="text--primary">작성일 : {{created_at}}</v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          작성자 :
          {{author}}
        </v-card-text>
        <v-divider></v-divider>

        <div v-if="!flag">
          <v-card-text>내용></v-card-text>
          <v-card-text>{{content}}</v-card-text>
          <v-divider></v-divider>
        </div>

        <div v-else>
          <markdown-editor v-model="content" ref="MarkdownEditor"></markdown-editor>
          <v-divider></v-divider>

          <v-btn dark @click="modifyPost()">수정완료</v-btn>
          <v-btn dark @click="flagToggle()">취소</v-btn>
        </div>
        <v-divider></v-divider>
      </form>

      <v-card-actions>
        <v-btn class="text-right" text @click="$router.go(-1)">뒤로</v-btn>
        <v-btn class="text-right" text @click="modifyToggle()">수정</v-btn>
        <v-btn class="text-right" text @click="deletePost()">삭제</v-btn>
      </v-card-actions>

      <v-divider></v-divider>

      <v-flex>
        <v-card color="#385F73" dark v-for="(reply, index) in replies" :key="index">
          <Reply
            :replyAuthorName="reply.author"
            :created_at="reply.created_at"
            :replyContent="reply.content"
            :replyAuthorUid="reply.uid"
            :articleId="articleId"
            :index="index"
          ></Reply>
        </v-card>
      </v-flex>

      <v-card>
        <v-flex xs12>
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
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import MarkdownEditor from "vue-simplemde/src/markdown-editor";
import Reply from "@/components/article/Reply";
import { mapState } from "vuex";

export default {
  name: "PostViewPage",
  data() {
    return {
      replies: [],
      selectedIndex: -1,
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
      totalPage: 10,

      flag: false
    };
  },
  components: {
    MarkdownEditor,
    Reply
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
      this.identifier = ret.identifier;
      this.articleId = ret.articleId;
      this.created_at = ret.created_at;

      this.replies = ret.reply;

      if (this.replies.length > 10) this.loadMore = true;
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

      console.log(this.replyContent);
      console.log(this.user.uid + "!!!" + this.articleId);

      let temp = {

        author: this.user.name,
        content: this.replyContent,
        created_at: FirebaseService.getCurrentDate(),
        uid: this.user.uid
      }
      console.log("TEMP> ", temp);

      FirebaseService.addReply(this.articleId, temp);
      this.replyContent = "";
      this.replies.push(temp);
    },

    modifyToggle() {
      if (this.identifier == this.user.uid) this.flag = true;
      else console.log("다릅니다!");
    },
    flagToggle() {
      this.flag = !this.flag;
    },
    modifyPost() {
      if (this.identifier == this.user.uid) {
        FirebaseService.modifyPost(this.articleId, this.getPostInfo());
        this.selectedIndex = -1;
      } else {
        console.log("다름!");
      }
    },
    deletePost() {
      if (this.identifier == this.user.uid) {
        FirebaseService.deletePost(this.articleId);
      } else {
        console.log("다릅니다!");
      }
    }
  },
  mounted() {
    this.loadPost(this.$route.params.postIndex);
  }
};
</script>