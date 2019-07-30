<template>
  
  <v-footer color="#fff" height="auto" justify-center text-xs-center>
    <V-CARD justify-center text-xs-center>
      <v-card-actions justify-center text-xs-center class="notranslate" style="height: 100px;">
        &copy;2019 — made by
        <strong>ToT</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
import { close } from 'fs';
export default {
  name: "main-footer",
  data() {
    return {
    };
  },

  methods: {

  }
};
</script>

<style>
* {
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
