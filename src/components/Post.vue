<template>
  <v-layout  py-4 px-4 justify-center align-center row wrap>
    <v-flex xs10>
      <h2 class="title" v-line-clamp="1">{{title}}</h2>
      <!-- <h2 style="color:gray" class="title" v-line-clamp="1"> {{id}}</h2> -->
      <div  style="color:gray" class="caption">{{date}}</div>
    </v-flex>
    <v-flex xs2 fill-height fill-width>
        <v-btn text-xs-right
         block
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
  //     return `${this.date.getFullYear()}년 ${this.date.getMonth() +
  //       1}월 ${this.date.getDate()}일`;
  //   }
  // }
};
</script>

<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
}
.color-666 {
  color: #666;
}
.color-333 {
  color: #333;
}
.h-100 {
  height: 100%;
  left:30px;
}
.h-content {
  height: 96px;
  left:30px;
}
</style>
