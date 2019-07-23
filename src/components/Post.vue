<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <div class="caption">{{formatedDate}}</div>
      <h2 class="color-333 headline font-weight-light" v-line-clamp="1">{{title}}</h2>
      <p class="mb-1 color-666 font-weight-light subheading h-content" v-line-clamp="4">{{content}}</p>

      <template>
        <div class="text-xs-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <div class="">
                <v-btn style="background-color:#ff6f61; color:#ffff" flat v-on="on">
                  <font color="white">자세히 보기</font>
                </v-btn>
              </div>
            </template>

            <v-card>
              <v-card-title style="background-color:#ff6f61; color:#ffff;" primary-title>{{ title }}</v-card-title>

              <v-card-text>{{ content }}</v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-card-text>{{ date }}</v-card-text>

                <v-btn color="black" flat @click="dialog = false">닫기</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Post",
  props: {
    date: { type: Date },
    title: { type: String },
    content: { type: String }
  },
  data() {
    return {
      postInfo: {
        date: { type: String },
        title: { type: String },
        content: { type: String }
      },
      dialog: false
    };
  },
  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth() + 1}월 ${this.date.getDate()}일`;
    }
  }
};
</script>
<style>
.color-666 {
  color: #666;
}
.color-333 {
  color: #333;
}
.h-100 {
  height: 100%;
}
.h-content {
  height: 96px;
}
</style>
