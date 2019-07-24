<template>
  <v-footer color="#fff" height="auto">
    <v-card class="flex" flat tile>
      <v-card>
        <v-card-text>
          <v-autocomplete
            class="notranslate"
            v-model="model"
            label="location"
            color="#ff6f61"
            placeholder="도시명을 입력해주세요."
            :items="states"
            :search-input.sync="search"
          ></v-autocomplete>
        </v-card-text>
      </v-card>

      <section>
        <div class="footercontainer notranslate">
          <div
            class="box col-md-2 active"
            v-bind:class="'background-'+info.list[0].weather[0].main"
          > 
            <div class="weather-icon" style="width:100% height:100%">
              <i v-bind:class="info.list[0].weather[0].main"></i>
            </div>

            <h3 class="footer3 hidden-sm-and-down">
              {{ (info.list[0].dt_txt).substr(5,2) }}/{{ (info.list[0].dt_txt).substr(8,2) }}
              <br />
              {{ info.city.name }}
            </h3>
            <h3 class="footer3 hidden-md-and-up">{{ info.city.name }} / {{ info.city.country }}</h3>
            <h2
              class="footer2"
            >{{ info.list[0].weather[0].main }} {{ ((info.list[0].main.temp)-273.15).toFixed(0) }}&deg;C</h2>
            <p></p>
          </div>

          <div
            class="box col-md-2 hidden-xs-only"
            v-for="index in [ 8, 16, 24, 32 ]"
            v-bind:class="'background-'+info.list[index].weather[0].main"
            :key="index"
          >
            <div class="weather-icon">
              <i v-bind:class="info.list[index].weather[0].main" style="width:100% height:100%"></i>
            </div>
            <h3
              class="footer3"
            >{{ info.list[index].dt_txt.substr(5,2) }}/{{ info.list[index].dt_txt.substr(8,2) }}</h3>
            <h2
              class="footer2"
            >{{ info.list[index].weather[0].main }} {{ (info.list[index].main.temp-273.15).toFixed(0) }}&deg;C</h2>
          </div>
        </div>
      </section>
      <v-card-actions class="justify-center notranslate" style="height: 100px;">
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
  font-family: "Titillium Web", sans-serif;
}
</style>
