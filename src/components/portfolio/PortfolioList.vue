<template>
  <div>
    <section>
      <div class="con">
        <div class="box" v-for="(portfolio, i) in portfolios" :key="i">
          <router-link class="hover_img" :to="{ name: 'portfolioview', params: { articleId: portfolio.id }}">
            <img :src="portfolio.img[0]" alt="">
            <!-- <v-btn :to="{ name: 'portfolioview', params: { articleId: portfolio.id }}">CLICK</v-btn> -->
            <!-- <v-carousel class="notranslate" hide-delimiters>
              <v-carousel-item v-for="(imgItem,i) in imgItems" :key="i" :src="imgItem"></v-carousel-item>
            </v-carousel> -->
              <h1>{{portfolio.title}}</h1>
              <p>{{portfolio.content}}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- <section>
      <span class="con" v-for="i in portfolios.length > limit ? limit : portfolios.length" :key="i">
        <Portfolio
          :date="portfolios[i - 1].created_at.toString()"
          :title="portfolios[i - 1].title"
          :body="portfolios[i - 1].body"
          :imgItems="portfolios[i - 1].img"
          :id="portfolios[i - 1].id"
        ></Portfolio>
      </span>
    </section> -->
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
// import Portfolio from "@/components/portfolio/Portfolio";
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
  // components: {
  //   Portfolio
  // },
  mounted() {
    this.getPortfolios();
    console.log(this.loggedIn);
    // console.log(this.portfolios);
  },
  computed: mapState({
    loggedIn: state => state.user.loggedIn
  }),
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();

      console.log(this.portfolios[1].img);
    },
    loadMorePortfolios() {

      this.limit += 5;
    }
  }
};
</script>

<style scoped>
*{
  font-family: 'Nanum Gothic', sans-serif;
};
section {
  margin: 0;
  padding: 0;
  background: #fff;
}
.con {
  width: 1185px;
  margin: 10px auto;
  padding: 20px 0 0 !important;
  columns: 3;
  column-gap: 10px;
}
.con .box {
  width: 100%;
  margin: 0 0 20px;
  padding: 10px;
  background: fff;
  overflow: hidden;
  break-inside: avoid;
}
.con .box img {
  max-width: 100%;
}
.con .box h1 {
  margin: 10px 0 0;
  padding: 0;
  font-size:  25px;
}
.con .box p {
  margin: 0;
  padding: 0 0 10px;
  font-size:  16px;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  height: 5.5em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
@media (max-width: 1200px) {
  .con {
    columns: 3;
    margin: auto;
    width: calc(100% - 40px);
    box-sizing: border-box;
    padding: 20px 20px 20px 0;
  }
}
@media (max-width: 768px) {
  .con {
    columns: 2;
  }
}
@media (max-width: 480px) {
  .con {
    columns: 1;
  }
}
.hover_img {
	width: inherit;
	height: inherit;
	margin: 0;
	padding: 0;
	background: #fff;
	overflow: hidden;
}
.hover_img:hover {
	bottom: -36px;
	opacity: 1;
  overflow: hidden;
}
/* Zoom In */
.hover_img img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .6s ease-in-out;
	transition: .6s ease-in-out;
  overflow: hidden;
}
.hover_img:hover img {
	-webkit-transform: scale(1.05);
	transform: scale(1.05);
  overflow: hidden;
}
</style>
