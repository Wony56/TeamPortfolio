<template>
  <div>
    <div v-masonry transition-duration="0.3s" class="masonry-container align-center">
      <div v-masonry-tile flat v-for="i in portfolios.length" :key="i" xs12>
        <Portfolio flat
          class="ma-3 grid-item"
          gutter = 10;
          :date="portfolios[i - 1].created_at.toString()"
          :title="portfolios[i - 1].title"
          :body="portfolios[i - 1].body"
          :imgItems="portfolios[i - 1].img"
        ></Portfolio>
      </div>
    </div>

    <v-flex xs12 text-xs-center round my-5>
      <v-btn style="background-color:#ff6f61; color:#ffff" to="/portfoliowriter">
        <v-icon size="25" class="mr-2 notranslate">fa-pencil</v-icon>글쓰기
      </v-btn>
      <v-btn style="background-color:#ff6f61; color:#ffff" v-if="loadMore" v-on:click="loadMorePortfolios">
        <v-icon size="25" class="mr-2 notranslate">fa-plus</v-icon>더 보기
      </v-btn>
    </v-flex>
  </div>
</template>

<script>
import Portfolio from "@/components/portfolio/Portfolio";
import FirebaseService from "@/services/FirebaseService";
import { mapState } from "vuex";

export default {
  name: "PortfoliosList",
  props: {
    limits: { type: Number, default: 4 },
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
  computed: mapState({
    loggedIn: state => state.user.loggedIn
  }),
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
    },
    loadMorePortfolios() {

    }
  }
};
</script>

<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
};
.mw-700 {
  max-width: 700px;
  margin: auto;
}

.grid-item {
  margin-bottom: 10px;
}
</style>
