<template>
  <v-data-table :headers="headers" :items="desserts">
    <template class="row" slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.author }}</td>
      <td class="text-xs-right">{{ props.item.title }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
      <td class="text-xs-right">
        <v-btn flat icon color="red" @click="deletePortfolio(props.item)">
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </td>
    </template>
    <template
      slot="pageText"
      slot-scope="{ pageStart, pageStop }"
    >From {{ pageStart }} to {{ pageStop }}</template>
  </v-data-table>
</template>

<script>
import { mapMutations } from "vuex";
import firebaseService from "../../services/FirebaseService";

export default {
  data: () => ({
    max25chars: v => v.length <= 25 || "Input too long!",
    pagination: {},
    dialog: false,
    headers: [
      {
        text: "작성자",
        align: "left",
        value: "name"
      },
<<<<<<< HEAD
      { text: "글제목",align: "right", value: "title" },
      { text: "작성일",align: "right", value: "date" }
=======
      { text: "글제목", align: "right", value: "title" },
      { text: "작성일", align: "right", value: "date" },
      { text: "삭제", align: "center", sortable: false }
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
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
        const date = new Date(portfolio.created_at);

        let row = {
          id: portfolio.id,
          author: portfolio.author.name,
          title: portfolio.title,
          date:
            date.getFullYear() +
            "년 " +
            date.getMonth() +
            "월 " +
            date.getDate() +
            "일 " +
            date.getHours() +
            "시 " +
            date.getMinutes() +
            "분"
        };

        this.desserts.push(row);
      });
    },
    deletePortfolio(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);

      firebaseService.deletePortfolio(item.id);
    }
  }
};
</script>