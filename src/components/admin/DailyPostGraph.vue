<template>
  <la-cartesian :width="450" :height="200"  :bound="[0]" :data="values">
    <defs>
      <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#0076b1" offset="0%" stop-opacity="0.4"></stop>
        <stop stop-color="#0076b1" offset="50%" stop-opacity="0.2"></stop>
        <stop stop-color="#0076b1" offset="100%" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
    <la-area fill-color="url(#area-fill)" dot curve prop="counts"></la-area>
    <la-x-axis prop="date"></la-x-axis>
    <la-tooltip></la-tooltip>
    <la-y-axis></la-y-axis>
  </la-cartesian>
</template>

<script>
import firebaseService from "../../services/FirebaseService";

export default {
  data: () => ({
    values: []
  }),
  created() {
    this.setPostGraph();
  },
  methods: {
    async setPostGraph() {
      const posts = await firebaseService.getPosts();

      let postCount = [];

      posts.forEach(post => {
        let date = post.created_at;

        let dateArr = date.split("년 ");
        let year = dateArr[0];

        dateArr = dateArr[1].split("월 ");
        let month = dateArr[0];

        dateArr = dateArr[1].split("일");
        let day = dateArr[0];

        let key = year + "-" + month + "-" + day;

        if (postCount[key]) {
          postCount[key] += 1;
        } else {
          postCount[key] = 1;
        }
      });

      for (let i = 7; i >= 0; i--) {
        let today = new Date();

        today.setDate(today.getDate() - i);

        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        let key = year + "-" + month + "-" + day;

        if (postCount[key]) {
          this.values.push({
            date: key,
            counts: postCount[key]
          });
        } else {
          this.values.push({
            date: key,
            counts: 0
          });
        }
      }
    }
  }
};
</script>
<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>
