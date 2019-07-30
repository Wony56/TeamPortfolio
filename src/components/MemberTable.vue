<template>
  <v-data-table :headers="headers" :items="desserts">
    <template class="row" slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.author }}</td>
      <td class="text-xs-right">{{ props.item.title }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
    </template>
    <template
      slot="pageText"
      slot-scope="{ pageStart, pageStop }"
    >From {{ pageStart }} to {{ pageStop }}</template>
  </v-data-table>
</template>

<script>
import firebaseService from "../services/FirebaseService";

export default {
  data: () => ({
    max25chars: v => v.length <= 25 || "Input too long!",
    pagination: {},
    dialog: false,
    headers: [
      {
        text: "UID",
        align: "center",
        value: "uid",
        sortable: false
      },
      { text: "이름", align: "center", value: "title", sortable: false },
      { text: "email", align: "center", value: "email", sortable: false },
      { text: "가입일", align: "center", value: "date", sortable: false },
      { text: "등급", align: "center", value: "tier", sortable: false }
    ],
    desserts: []
  }),
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let portfolios = await firebaseService.getPortfolios();

      portfolios.forEach(portfolio => {
        let row = {
          author: portfolio.author.name,
          title: portfolio.title,
          date: portfolio.created_at
        };

        this.desserts.push(row);
      });
    }
  }
};
</script>
<style>
*
{
  font-family: 'Nanum Gothic', sans-serif;
}
</style>