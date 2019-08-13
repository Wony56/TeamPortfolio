<template>
  <v-footer color="#fff" height="auto" justify-center text-xs-center>
    <v-layout justify-center text-xs-center>
      <v-card flat justify-center>
        <v-card-actions justify-center text-xs-center class="notranslate" id="heightby100">
          &copy;2019 — made by
          <strong>ToT</strong>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: "main-footer",
  data() {
    return {};
  }
};
</script>

<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}

#heightby100 {
  height:100px;
}
</style>
