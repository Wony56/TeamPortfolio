<template>
  <div>
    <div v-masonry transition-duration="0.3s" class="masonry-container align-center">
      <div v-masonry-tile flat v-for="i in portfolios.length > limit ? limit : portfolios.length" :key="i" xs12>
        <Portfolio flat
          class="grid-item"
          gutter = 10;
          :date="portfolios[i - 1].created_at.toString()"
          :title="portfolios[i - 1].title"
          :body="portfolios[i - 1].body"
          :imgItems="portfolios[i - 1].img"
          :id="portfolios[i - 1].id"
        ></Portfolio>
      </div>
    </div>

    <v-flex xs12 text-xs-center round my-5>
      <v-btn v-if="flag" style="background-color:#ff6f61; color:#ffff;" to="/portfoliowriter">
        <v-icon size="25" class="mr-2 notranslate">fa-pencil</v-icon>글쓰기
      </v-btn>
      <v-btn style="background-color:#ff6f61; color:#ffff;" v-if="load" @click="loadMorePortfolios()">
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
    limits: { type: Number, default: 5 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      portfolios: [],
      limit: this.limits,
      load: this.loadMore,
      flag: true
    };
  },
  components: {
    Portfolio
  },
  mounted() {
    this.getPortfolios();
    console.log(this.loggedIn);
  },
  computed: mapState({
    loggedIn: state => state.user.loggedIn
  }),
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
    },
    loadMorePortfolios() {
<<<<<<< HEAD

=======
      
>>>>>>> 9767669079ed3fcd3a9c8758e31f2ae5b989481f
      this.limit += 5;
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
