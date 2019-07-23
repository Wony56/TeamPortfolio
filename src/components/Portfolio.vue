<template>
  <v-card>
    <v-carousel class="notranslate" hide-delimiters height="300">
      <v-carousel-item v-for="(imgItem,i) in imgItems" :key="i" :src="imgItem"></v-carousel-item>
    </v-carousel>
    <v-card-title primary-title>
      <div>
        <div class="headline" v-line-clamp="1">{{title}}</div>
        <span class="grey--text" v-line-clamp="4">{{body}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    date: { type: String },
    title: { type: String },
    body: { type: String },
    imgItems: []
  },
  data() {
    return {

    };
  }
};
</script>

