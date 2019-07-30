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
export default {
  name: "main-footer",
  data() {
    return {
      info: {},
      isEditing: true,
      model: null,
      search: null,
      states: [
        "Seoul",
        "London",
        "Paris",
        "Washington",
        "New York",
        "Ulsan",
        "Busan",
        "Madrid",
        "Tokyo",
        "Beijing",
        "Daegu",
        "Kwangju"
      ]
    };
  },
  created() {
    this.states.sort();
    this.getWeather("gumi");
  },
  watch: {
    search(val) {

      if (!this.states.includes(val)) return;

      this.getWeather(val);
    }
  },
  methods: {
    getWeather: function(location) {
      axios
        .get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            appid: "67203ee596b7f3fbdb622fd1306d1bdf",
            lang: "kr",
            q: location,
            units: "meteric"
          }
        })
        .then(response => {
          return (this.info = response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
* {
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
