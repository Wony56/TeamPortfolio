<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span style="color:black;">Post Writer</span>
      </div>
    </ImgBanner>

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
<!--============================================================================-->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{modalTitle}}</v-card-title>
        <v-card-text>{{modalContent}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!modifyFlag" color="green darken-1" flat to="/post">Close</v-btn>
          <v-btn v-if="modifyFlag" color="green darken-1" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--============================================================================-->
  </div>
</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import MarkdownEditor from "vue-simplemde/src/markdown-editor";
import FirebaseService from "@/services/FirebaseService";
import { mapState } from "vuex";

export default {
  data: () => ({
    title: "",
    content: "",

    modalTitle: "",
    modalContent: "",
    dialog: false,
    modifyFlag: false
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
      if (this.title === "") {
        this.modifyFlag = true;
        this.setModalContent("알림", "제목을 입력해주세요.");
      } else if (this.content === "") {
        this.modifyFlag = true;
        this.setModalContent("알림", "내용을 입력해주세요.");
      } else {
        let author = {
          name: this.user.displayName,
          uid: this.user.uid
        };
        let msg = FirebaseService.postPost(this.title, this.content, author);

        console.log(msg);

        if (msg == "fail") {

          this.setModalContent("Server Error", "관리자에게 문의하세요.");
          return;
        }
        this.modifyFlag = false;
        this.setModalContent("성공", "정상적으로 Post가 작성되었습니다.");
      }
    },
    setModalContent(title, content) {

      this.dialog = true;
      this.modalTitle = title;
      this.modalContent = content;
    }
  }
};
</script>