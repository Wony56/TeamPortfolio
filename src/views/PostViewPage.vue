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
      <!-- <v-flex>
        <v-card>
          <v-list two-line>
            <template v-for="(reply, index) in replies">
              <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
              <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
              <v-list-item v-else :key="item.title">
                <v-list-item-avatar>
                  <img :src="item.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-tile-content v-html="item.content"></v-list-tile-content>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-flex>-->
      <v-flex>
        <v-card color="#385F73" dark v-for="(reply, index) in replies" :key="index">
          <v-card-text class="white--text">
            <div class="headline mb-2">{{reply.author}}</div>
            <div>{{reply.created_at}}</div>
            {{reply.content}}
          </v-card-text>

          <v-card-actions>
            <v-btn text flat>Reply</v-btn>
            <v-btn text flat>Modify</v-btn>
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
      replyContent: "",

      title: "",
      content: "",
      author: "",
      identifier: "",
      articleId: "",
      created_at: "",
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
    },
    addReply() {

      let temp = this.replyContent;
      console.log(this.replyContent);
      console.log(this.user.uid + "!!!" + this.articleId);

      console.log("BEFORE PUSH ", this.replies);
      FirebaseService.addReply(this.articleId, {
        author: this.author,
        content: this.content,
        created_at: this.created_at,
        identifier: this.identifier,
        reply: this.replies,
        title: this.title
      }, temp);
      this.replyContent = "";
    },
    removeReply(index) {

      if(this.replies[index].uid == this.user.uid) {

        this.replies.splice(index, 1);
      }
      else {

        console.log("다름!");
      }
    },
    modifyReply(index) {

      
    }
  },
  mounted() {
    this.loadPost(this.$route.params.postIndex);
  }
};
</script>
