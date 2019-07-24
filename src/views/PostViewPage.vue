<template>
  <div style="margin: 150px;">
    <v-card>
      <div class="caption">{{date}}</div>
      <h2 class="color-333 headline font-weight-light" v-line-clamp="1">{{title}}</h2>
      <p>{{content}}</p>

      <div class="caption">asdfdasf</div>
    </v-card>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default { 
  name: "PostViewPage",
  data() {
    return {

      date: '',
      title: '',
      content: ''
    }
  },
  mounted() {

    this.date = this.$route.params.postInfo.date;
    this.date = `${this.date.getFullYear()}년 ${this.date.getMonth() + 1}월 ${this.date.getDate()}일`;
    this.title = this.$route.params.postInfo.title;
    this.content = this.$route.params.postInfo.content;

    console.log(this.$route.params.postInfo.id + " " + this.$route.params.postInfo.title + " " + this.$route.params.postInfo.content);
    let temp = FirebaseService.getPostById(this.$route.params.postInfo.id);
    console.log(temp);
  }
};
</script>
