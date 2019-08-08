<template>
  <v-data-table :headers="headers" :items="portfolioTables">
    <template class="row" slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.author }}</td>
      <td class="text-xs-right">{{ props.item.title }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
      <td class="text-xs-right">
        <v-btn flat icon color="red" @click="deletePortfolio('portfolio', props.item)">
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
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    max25chars: v => v.length <= 25 || "Input too long!",
    pagination: {},
    headers: [
      {
        text: "작성자",
        align: "left",
        value: "name"
      },
      { text: "글제목", align: "right", value: "title" },
      { text: "작성일", align: "right", value: "date" },
      { text: "삭제", align: "center", sortable: false }
    ],
    desserts: []
  }),
  created() {
    this.initialize();
  },
  computed: mapState({
    portfolioTables: state => state.admin.portfolioTables
  }),
  methods: {
    ...mapMutations(["setPortfolioTables", "openDeleteDialog", "setDocument"]),
    initialize() {
      this.setPortfolioTables();
    },
    deletePortfolio(type, item) {
      this.$store.commit("setDocument", { type: type, document: item });
      this.openDeleteDialog();
    }
  }
};
</script>