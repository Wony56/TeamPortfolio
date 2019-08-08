<template>
  <div>
    <v-img src="/img/livingcoral.jpg" aspect-ratio="1.7">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light">
            <slot name="text" />
          </span>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>
export default {
  name: "ImgBanner",
  props: {
    imgSrc: {
      type: String,
    },
  },
};
</script>
<style>
.text-shadow {
  text-shadow: 0 0 15px rgb(255, 255, 255);
}
*{
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
