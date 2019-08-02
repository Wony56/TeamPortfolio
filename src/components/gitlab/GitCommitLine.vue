<template>
  <v-timeline class="notranslate">
    <v-timeline-item v-for="(element, index) in datas" :color="userColor(element.author_name)" :key="index" medium>
      <template v-slot:opposite>
        <span :class="`headline font-weight ${userColor(element.author_name)}--text`" v-text="element.created_at"></span>
      </template>
      <v-card class="elevation-2" style="padding: 20px;">
        <h2 :class="`headline font-weight-bold mb-3 ${userColor(element.author_name)}--text`">{{element.title}}</h2>
        <strong><font size="4">{{element.author_name}}</font></strong>
        <div><font size="3">{{element.message}}</font></div>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
  data() {
    return {
      datas: []
    };
  },
  created() {
    this.getCommits();
  },
  methods: {
    getCommits() {
      fetch(
        `${BASE_URL}/projects/7559/repository/commits?private_token=zAw5-XwKyMhRkQJuQ4fQ&all=true&per_page=100`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.datas = data;
          this.datas = this.datas.reverse();
        });
    },
    userColor(author_name) {

      if(author_name === "Kim ChangYoon")
        return "blue";
      else if(author_name === "엄윤주" || author_name === "Yoonju Eom")
        return "purple";
      else if(author_name === "Ryuhojin")
        return "pink";
      else if(author_name === "이석원")
        return "green";
      else if(author_name === "Hyeon Jin")
        return "orange"; 
      return "black";
    }
  }
};
</script>
<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
