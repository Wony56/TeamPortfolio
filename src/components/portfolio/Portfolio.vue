<template>
  <v-card :loading="loading" class="mx-auto my-auto" width="500" height="100%">
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
    <v-btn
      :to="{ name: 'portfolioview', params: { portfolioInfo: this.id}}"
    >MORE</v-btn>
    
      <div>{{imgItems}}</div>
  </v-card>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    date: { type: String },
    title: { type: String },
    body: { type: String },
    imgItems: { type: Array },
    id: { type: String }
  },
  data: () => ({
    loading: false,
    selection: 1
  })
};
</script>
<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>