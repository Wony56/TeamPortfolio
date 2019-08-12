<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span style="color:black;">Portfolio</span>
      </div>
    </ImgBanner>
    <PortfolioList />
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
