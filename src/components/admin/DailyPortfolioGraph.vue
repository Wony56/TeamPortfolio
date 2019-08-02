<template>
  <la-cartesian :width="450" :height="200" :bound="[0]" :data="values">
    <defs>
      <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#ff6f61" offset="0%" stop-opacity="0.4"></stop>
        <stop stop-color="#ff6f61" offset="50%" stop-opacity="0.2"></stop>
        <stop stop-color="#ff6f61" offset="100%" stop-opacity="0"></stop>
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
    this.setPortfolioGraph();
  },
  methods: {
    async setPortfolioGraph() {
      const portfolios = await firebaseService.getPortfolios();

      let portfolioCount = [];

      portfolios.forEach(portfolio => {
        let date = portfolio.created_at;

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let key = year + "-" + month + "-" + day;

        if (portfolioCount[key]) {
          portfolioCount[key] += 1;
        } else {
          portfolioCount[key] = 1;
        }
      });

      for (let i = 5; i >= 0; i--) {
        let today = new Date();

        today.setDate(today.getDate() - i);

        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        let key = year + "-" + month + "-" + day;

        if (portfolioCount[key]) {
          this.values.push({
            date: key,
            counts: portfolioCount[key]
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
