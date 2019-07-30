<template>
  <la-cartesian :width="450" :height="200" :bound="[0]" :data="values">
    <defs>
      <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#0076b1" offset="0%" stop-opacity="0.4"></stop>
        <stop stop-color="#0076b1" offset="50%" stop-opacity="0.2"></stop>
        <stop stop-color="#0076b1" offset="100%" stop-opacity="0"></stop>
      </linearGradient>
    </defs>
    <la-area fill-color="url(#area-fill)" dot curve prop="pv"></la-area>
    <la-x-axis prop="name"></la-x-axis>
    <la-tooltip></la-tooltip>
    <la-y-axis></la-y-axis>
  </la-cartesian>
</template>

<script>
import firebaseService from "../services/FirebaseService";
import { stringify } from "querystring";

export default {
  data: () => ({
    values: []
  }),
  created() {
    this.setMemberGraph();
  },
  methods: {
    async setMemberGraph() {
      const users = await firebaseService.getUsers();
      let memberCount = [];

      users.forEach(user => {
        let date = user.created_at.toString().substring(4, 10);
        if (memberCount[date]) {
          memberCount[date] += 1;
        } else {
          memberCount[date] = 1;
        }
      });
    }
  }
};
</script>
