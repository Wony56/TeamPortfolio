<template>
  <div class="container">
     <div class="macy-container">
      <Portfolio
        v-for="i in portfolios.length" :key="i"
        :date="portfolios[i - 1].created_at.toString()"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgItems="portfolios[i - 1].img"
      ></Portfolio>
    </div>
    <div class="container">
      <v-flex xs12 text-xs-center round my-5>
        <v-btn style="background-color:#ff6f61; color:#ffff" to="/portfoliowriter">
          <v-icon size="25" class="mr-2 notranslate">fa-pencil</v-icon>글쓰기
        </v-btn>
        <v-btn style="background-color:#ff6f61; color:#ffff" v-if="loadMore" v-on:click="loadMorePortfolios">
          <v-icon size="25" class="mr-2 notranslate">fa-plus</v-icon>더 보기
        </v-btn>
      </v-flex>
    </div>
  </div>
</template>

<script>
import Portfolio from "@/components/portfolio/Portfolio";
import FirebaseService from "@/services/FirebaseService";
import { mapState } from "vuex";
import Macy from "macy";

export default {
  name: "PortfoliosList",
  props: {
    limits: { type: Number, default: 6 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      portfolios: [],
    };
  },
  components: {
    Portfolio
  },
  mounted() {
    this.getPortfolios();

      masonry = Macy({
          container: '.macy-container',
          trueOrder: false,
          waitForImages: false,
          useOwnImageLoader: false,
          debug: true,
          mobileFirst: true,
          columns: 1,
          margin: {
              y: 16,
              x: '2%',
          },
          breakAt: {
              1200: 3,
              940: 3,
              520: 2,
              400: 1
          },
      });
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
  },
};
</script>

<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
};
.container {
  padding: 0 0;
  margin: 0 auto;
}
.macy-container::before { content: ""; display: table; clear: both;}
.macy-container { margin-top: 22px; margin-right: 0;}
.macy-container::after { content: ""; display: table; clear: both;}
</style>
