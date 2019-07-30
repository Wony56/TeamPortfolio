<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span style="color:black;">Post Writer</span>
      </div>
    </ImgBanner>

    <v-dialog v-model="dialog" persistent max-width="290">

      <v-card>
        <v-card-title class="headline">글쓰기 성공</v-card-title>
        <v-card-text>정상적으로 등록 되었습니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat to="/post">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <form>
        <v-text-field v-model="title" placeholder="제목을 입력해주세요." required></v-text-field>
        <markdown-editor v-model="content" ref="MarkdownEditor"></markdown-editor>
        <v-spacer></v-spacer>
        <v-layout justify-center>
          <v-btn style="background-color:#ff6f61; color:#ffff" @click="postPost()">submit</v-btn>
          <v-btn style="background-color:#ff6f61; color:#ffff" @click="$router.go(-1)">cancel</v-btn>
        </v-layout>
      </form>
    </v-container>
  </div>

</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import MarkdownEditor from "vue-simplemde/src/markdown-editor";
import FirebaseService from "@/services/FirebaseService";
import {mapState} from 'vuex';

export default {
  data: () => ({
    title: "",
    content: "",
    dialog: false
  }),
  components: {
    ImgBanner,
    MarkdownEditor
  },
  computed: mapState({
    user: state => state.user.user
  }),
  methods: {
    postPost() {
      console.log(this.title + " !!!!! " + this.content + "!!!!!" + this.user.name + "!!!!!" + this.user.uid);
      
      let msg = FirebaseService.postPost(
        this.title,
        this.content,
        new Array(),
        this.user.name,
        this.user.uid
      );

      if(msg == 'fail')
        return;
      this.dialog = true;
    }
  }
};
</script>
