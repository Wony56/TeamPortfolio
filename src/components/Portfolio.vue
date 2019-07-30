<template>
  <v-card
  :loading="loading"
  width="250"
  height="50%">
    <v-carousel class="notranslate" hide-delimiters>
      <v-carousel-item v-for="(imgItem,i) in imgItems" :key="i" :src="imgItem"></v-carousel-item>
    </v-carousel>
    <v-card-title primary-title>
      <div class="headline" v-line-clamp="1">{{title}}</div>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <span class="grey--text" v-line-clamp="4">{{body}}</span>
    </v-card-text>
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
  data: () => ({
    loading: false,
    selection: 1,
  }),
};
</script>
