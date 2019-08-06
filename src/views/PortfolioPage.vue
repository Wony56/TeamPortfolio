<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span style="color:black;">Portfolio</span>
      </div>
    </ImgBanner>
    <v-container>
      <!-- Portfolio -->
      <v-layout>
        <v-flex>
          <PortfolioList :limits="6" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import PortfolioList from "../components/portfolio/PortfolioList";

export default {
  name: "PortfolioPage",
  mounted() {

    // this.$store.state.images.imgurLinks = [];
  },
  components: {
    ImgBanner,
    PortfolioList
  }
};
</script>
<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
