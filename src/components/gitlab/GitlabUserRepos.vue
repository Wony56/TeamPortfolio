<template>
  <div>
    <v-layout column justify-center align-center></v-layout>
    <v-container id="scroll-target" style="max-height: 400px;" class="scroll-y">
      <v-layout
        v-scroll:#scroll-target="onScroll"
        column
        align-center
        justify-center
        style="height: 1700px;"
      >
        <v-btn
          v-for="(element, i) in datas"
          :key="i"
          block
          :color="mainColor"
          large
          flat
          dark
          outline

        ><font :color="mainColor">{{element.name}}</font>&nbsp;
         <font color="black">{{element.created_at}}</font>
        </v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
  data() {
    return {
      datas: [],
      mainColor: "black",
      offsetTop: 0
    };
  },
  created() {
    this.getRepositories("Taylous", "J7kwFVv-7zWVHD3_zuU1", "blue");
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    async getRepositories(userId, token, color) {
      this.mainColor = color;

      await axios.get(
        `${BASE_URL}/users/${userId}/projects?private_token=${token}&all=true`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          this.datas = data;
        });
    }
  }
};
</script>
