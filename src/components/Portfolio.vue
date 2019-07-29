<template>
  <div>
    <v-app id="inspire">
    <v-card>
      <v-list three-line>
        <template>
          <v-divider />
          <v-list-item>
            <v-list-item-avatar tile size="144">
              <v-carousel class="notranslate" hide-delimiters show-arrows-on-hover height="150" width="150">
                <v-carousel-item v-for="(imgItem,i) in imgItems" :key="i" :src="imgItem"></v-carousel-item>
              </v-carousel>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="title" v-line-clamp="1"></v-list-item-title>
              <v-list-item-subtitle v-html="body" v-line-clamp="4"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    date: { type: String },
    title: { type: String },
    body: { type: String },
    imgItems: []
  },
  data() {
    return {

    };
  }
};

</script>
<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
}
</style>