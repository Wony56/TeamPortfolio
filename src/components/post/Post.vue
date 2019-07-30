<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <div class="caption">{{date}}</div>
      <h2 class="color-333 headline font-weight-light" v-line-clamp="1">{{title}}</h2>
      <h2 class="color-333 headline font-weight-light" v-line-clamp="1">{{id}}</h2>

        <v-btn
          style="background-color:#ff6f61; color:#ffff"
          flat
          :to="{ name: 'postview', params: { postIndex: this.id }}"
        >
        자세히 보기
        </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: "Post",
  props: {
    date: { type: Date },
    title: { type: String },
    content: { type: String },
    id: { type: String }
  }
  // ,
  // computed: {
  //   formatedDate() {

  //     let time = this.date.toDate();

  //     console.log(time);
  //     return `${time.getFullYear()}년 ${time.getMonth() +
  //       1}월 ${time.getDate()}일`;
  //   }
  // }
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
