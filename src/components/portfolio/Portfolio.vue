<template>
  <div>
    <!-- <div class="macy-container"> -->

      <img :src="imgItems[0]" width="300px" height="auto" />
      <!-- <v-card
        width="350"
        class="mx-auto">
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
      </v-card> -->
    <!-- </div> -->
  </div>
</template>

<script>
// import Macy from "macy";

export default {
  name: "Portfolio",
  props: {
    date: { type: String },
    title: { type: String },
    body: { type: String },
    imgItems: { type: Array }
  },
  data: () => ({
    loading: false,
    selection: 1,
    masonry: { type: Macy}
  }),
  // mounted() {
  //   masonry = Macy({
  //       container: '.macy-container',
  //       trueOrder: false,
  //       waitForImages: false,
  //       useOwnImageLoader: false,
  //       debug: true,
  //       mobileFirst: true,
  //       columns: 1,
  //       margin: {
  //           y: 16,
  //           x: '2%',
  //       },
  //       breakAt: {
  //           1200: 3,
  //           940: 3,
  //           520: 2,
  //           400: 1
  //       },
  //   });
  // },
};
</script>
<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
}

</style>
