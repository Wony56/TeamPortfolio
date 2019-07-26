<template>
  <div style="margin: 150px;">
    <v-card>
      <v-card-title>제목 : {{title}}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text--primary">작성일 : {{date}}</v-card-text>
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
        <v-card>
          <v-list two-line>
            <template v-for="(item, index) in items.slice(0, 6)">
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
      </v-flex>
      <!-- ========================================================================================== -->

      <v-card>
        <v-flex xs12 sm6>
          <v-textarea label="댓글입력" auto-grow outlined rows="3" row-height="25" shaped></v-textarea>
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
      date: "",
      title: "",
      content: "",
      author: "",
      identifier: "",
      articleId: "",

      items: [
        { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        }
      ]
    };
  },
  computed: mapState({
    user: state => state.user.user
  }),
  methods: {
    async loadPost(id) {
      let ret = await FirebaseService.getPostById(this.$route.params.postIndex);

      this.date =
        new Date(ret.created_at).getFullYear() +
        "년 " +
        new Date(ret.created_at).getMonth() +
        "월 " +
        new Date(ret.created_at).getDate() +
        "일 " +
        new Date(ret.created_at).getHours() +
        "시 " +
        new Date(ret.created_at).getMinutes() +
        "분";
      this.title = ret.title;
      this.content = ret.content;
      this.author = ret.author;
      this.identifier = ret.identifier;
      this.articleId = ret.articleId;
    },
    addReply() {
      console.log(this.user.uid + "!!!" + this.articleId);

      FirebaseService.addReply(this.articleId, this.identifier, "asdfasfasdfasfsf");
    }
  },
  mounted() {
    this.loadPost(this.$route.params.postIndex);
  }
};
</script>
