<template>
  <la-cartesian :width="450" :height="200" :bound="[0]" :data="dailyPortfolios">
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
import { mapState, mapMutations } from "vuex";

export default {
  computed: mapState({
    dailyPortfolios: state => state.admin.dailyPortfolios
  }),
  created() {
    this.setDailyPortfolios();
  },
  methods: {
    ...mapMutations(["setDailyPortfolios"])
  }
};
</script>
<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>
