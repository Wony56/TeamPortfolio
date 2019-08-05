<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">
        <span style="color:black;">Portfolio</span>
      </div>
    </ImgBanner>

    <!-- Portfolio -->
    <PortfolioList></PortfolioList>
  </div>
</template>

<script>
import ImgBanner from "../components/base/ImgBanner";
import PortfolioList from "../components/portfolio/PortfolioList";

export default {
  name: "PortfolioPage",
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
