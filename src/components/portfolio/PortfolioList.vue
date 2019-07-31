<template>
  <div>
    <v-layout v-masonry transition-duration="1s"
      width="100%"
      class="masonry-container">
      <v-flex v-masonry-tile flat
        col-12 col-md-6 col-lg-4
        class="masonry-grid-item column ma-2"
        v-for="i in portfolios.length" :key="i">
        <Portfolio flat
          :date="portfolios[i - 1].created_at.toString()"
          :title="portfolios[i - 1].title"
          :body="portfolios[i - 1].body"
          :imgItems="portfolios[i - 1].img"
        ></Portfolio>
      </v-flex>
    </v-layout >

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
    limits: { type: Number, default: 6 },
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

.column {
  /* Chrome, Safari, Opera */
  -webkit-column-count: 3;
  -webkit-column-gap: 40px;
  -webkit-column-rule-style: outset;
  -webkit-column-rule-width: 10px;
}

</style>
