<template>
  <div>
    <!-- <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span style="color:black;">Portfolio</span>
      </div>
    </ImgBanner>
    <v-container> -->
      <!-- Portfolio -->
      <!-- <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="6" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container> -->
  <ul class="mdc-image-list my-image-list">
    <li class="mdc-image-list__item">
      <div class="mdc-image-list__image-aspect-container">
        <img class="mdc-image-list__image" src="https://i.pinimg.com/originals/86/d2/1c/86d21c73c55d8f64e4b4bcf85821149d.jpg">
      </div>
      <div class="mdc-image-list__supporting">
        <span class="mdc-image-list__label">Text label</span>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
// import "@material/image-list/mdc-image-list";
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

/* .my-image-list {
  mdc-image-list-standard-columns: 5;
}

@media (max-width: 599px) {
  .my-image-list {
    mdc-image-list-standard-columns: 3;
  }
} */
</style>
