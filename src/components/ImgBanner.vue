<template>
  <div>
    <v-img :src="imgSrc" aspect-ratio="1.7">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light">
            <slot name="text" />
          </span>
        </v-flex>
        <toggle-button
          style="opacity:0.3"
          right
          bottom
          @change="onChangeEventHandler"
          :sync="false"
          color="#ff6f61"
        />
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
      default: "https://source.unsplash.com/random/1600x1300"
    },
    text: { type: String }
  },
  methods: {
    onChangeEventHandler(State) {
      if (State.value) {
        let banner = localStorage.getItem("banner");
        this.$props.imgSrc = banner;
      } else {
        this.$props.imgSrc = "https://source.unsplash.com/random/1600x1300";
      }
    }
  }
};
</script>
<style>
.text-shadow {
  text-shadow: 0 0 15px rgb(255, 255, 255);
}
</style>
