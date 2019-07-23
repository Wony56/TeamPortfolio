<template>
  <v-layout mt-5 wrap>
    <v-flex flat v-for="i in portfolios.length > limits ? limits : portfolios.length" :key="i" xs12 sm6>
      <Portfolio flat
        class="ma-3"
        :date="portfolios[i - 1].created_at.toString()"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgItems="portfolios[i - 1].img"
      ></Portfolio>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn style="background-color:#ff6f61; color:#ffff" to="/portfoliowriter">
        <v-icon size="25" class="mr-2 notranslate">fa-pencil</v-icon>글쓰기
      </v-btn>
      <v-btn style="background-color:#ff6f61; color:#ffff" v-on:click="loadMorePortfolios">
        <v-icon size="25" class="mr-2 notranslate">fa-plus</v-icon>더 보기
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Portfolio from "@/components/Portfolio";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PortfoliosList",
  props: {
    limits: { type: Number, default: 3 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      portfolios: []
    };
  },
  components: {
    Portfolio
  },
  mounted() {
    this.getPortfolios();
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
    },
    loadMorePortfolios() {}
  }
};
</script>

<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
