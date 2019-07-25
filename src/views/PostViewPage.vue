<template>
  <div style="margin: 150px;">
    <v-card>
      <v-card-title>제목 : {{title}}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text--primary">작성일 : {{date}}</v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        내용 :
        <v-divider></v-divider>
        {{content}}
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-btn class="text-right" text>뒤로</v-btn>
        <v-btn class="text-right" text>수정</v-btn>
        <v-btn class="text-right" text>삭제</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PostViewPage",
  data() {
    return {

      date: "",
      title: "",
      content: ""
    };
  },
  mounted() {
    let temp = this.$route.params.postIndex;
    console.log("ID" + temp);

    let temp2 = FirebaseService.getPostById(this.$route.params.postIndex);
    console.log("adfasfasdfasdf" + temp2);
    console.log(temp2);
    // this.date = `${this.date.getFullYear()}년 ${this.date.getMonth() +
    //   1}월 ${this.date.getDate()}일`;
    // this.title = this.$route.params.postInfo.title;
    // this.content = this.$route.params.postInfo.content;

    console.log(
      temp2.id +
        " " +
        temp2.title +
        " " +
        temp2.content
    );
    //let temp = FirebaseService.getPostById(this.$route.params.postInfo.id);
    console.log(temp);
  }
};
</script>
