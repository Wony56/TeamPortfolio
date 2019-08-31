<template>
  <div>
    <v-card flat>
      <div class="page center">
        <a v-on:click="initiateUserRepo('Taylous', 'zAw5-XwKyMhRkQJuQ4fQ')" class="link mx-3">김창윤</a>
        <a v-on:click="initiateUserRepo('ryuhojin', 'y4eoDG8jQ29sSs9_mpF2')" class="link mx-3">류호진</a>
        <a v-on:click="initiateUserRepo('blackmonkey9256', 'HdXsmvT6hBR-mFJyN_YP')" class="link mx-3">이석원</a>
        <a v-on:click="initiateUserRepo('hyeonjin23', 'kWsKbLKaDydDKBgguZnL')" class="link mx-3">조현진</a>
        <a v-on:click="initiateUserRepo('Eomazing', 'phLEf4A8LuBfkhsotEwg')" class="link mx-3">엄윤주</a>
      </div>

      <v-tabs-items v-model="tab">
        <div id="chart" />
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

const converter = require("../../services/CurlToNodeJS");
const BASE_URL = "https://lab.ssafy.com/api/v4";

var chart;

export default {
  data() {
    return {
      
      username: "",
      userCommitCount: { type: Map },
      name: "",
      loaded: false,
      page: -1,

      dialog: false,
      tab: null
    };
  },
  mounted() {
    let user = "Taylous";
    let token = "zAw5-XwKyMhRkQJuQ4fQ";
    this.getRepos(user, token, true);
  },
  watch: {
    loaded: function(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.drawChart(this.name, this.username);
      }
    }
  },
  methods: {
    initiateUserRepo(user, tokens) {
      chart.destroy();

      this.loaded = false;
      this.getRepos(user, tokens, true);
    },
    getRepos(id, token, isEnd) {
      this.userReposInfo = new Array();
      this.flag = false;

      converter.curlToNodeJS(id, token).on("response", response => {
        if (response.statusCode == 200) {
          this.getData(id, token, response.headers["x-total-pages"], isEnd);
        }
      });
    },
    getData(id, token, totalPage, isEnd) {
      var dateObj = new Map();
      var monthObj = new Map();

      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let timeline = [];
      let count = 0;

      for (let index = 1; index <= totalPage; index++) {
        fetch(
          `${BASE_URL}/users/${id}/events?private_token=${token}&page=${index}`
        )
          .then(res => {
            return res.json();
          })
          .then(data => {
            for (let i = 0; data[i] != null; i++) {
              let str = data[i].created_at;

              let action_name = new String(data[i].action_name);
              // if (action_name.indexOf(new String("comment")) >= 0) continue;
              if (str == null || str.substring(0, 4) != year) continue;

              let y = str.substring(0, 4);
              let m = str.substring(5, 7) - 1;
              let d = str.substring(8, 10);

              let monthDaySet = m + " " + d;

              if (dateObj.get(monthDaySet) == undefined)
                dateObj.set(monthDaySet, 1);
              else dateObj.set(monthDaySet, dateObj.get(monthDaySet) + 1);
            }
            count++;
            if (count == totalPage && isEnd) {
              this.loaded = true;
              this.username = data[0].author.username;
              this.name = data[0].author.name;
              this.userCommitCount = dateObj;
            }
          });
      }
    },
    generateData(count, yrange, month) {

      var i = 1;
      var series = [];
      let temp, key;

      while (i <= count) {
        var x = i.toString();
        if (i < 10) key = (month - 1) + " 0" + i;
        else key = (month - 1) + " " + i;

        var y =
          this.userCommitCount.get(key) === undefined
            ? 0
            : this.userCommitCount.get(key);

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
    },
    drawChart(name, username, data) {
      let color = "#000000";

      if (username == "Taylous") color = "#0057FF";
      else if (username == "Eomazing") color = "#C600FF";
      else if (username == "ryuhojin") color = "#FF00FB";
      else if (username == "blackmonkey9256") color = "#00E232";
      else if (username == "hyeonjin23") color = "#FF9600";

      var options = {
        chart: {
          height: 350,
          type: "heatmap"
        },
        dataLabels: {
          enabled: false
        },
        colors: [color],
        series: [
          {
            name: "Jan",
            data: this.generateData(
              31,
              {
                min: 0,
                max: 30
              },
              1
            )
          },
          {
            name: "Feb",
            data: this.generateData(
              28,
              {
                min: 0,
                max: 30
              },
              2
            )
          },
          {
            name: "Mar",
            data: this.generateData(
              31,
              {
                min: 0,
                max: 30
              },
              3
            )
          },
          {
            name: "Apr",
            data: this.generateData(
              30,
              {
                min: 0,
                max: 30
              },
              4
            )
          },
          {
            name: "May",
            data: this.generateData(
              31,
              {
                min: 0,
                max: 30
              },
              5
            )
          },
          {
            name: "Jun",
            data: this.generateData(
              30,
              {
                min: 0,
                max: 30
              },
              6
            )
          },
          {
            name: "Jul",
            data: this.generateData(
              31,
              {
                min: 0,
                max: 30
              },
              7
            )
          },
          {
            name: "Aug",
            data: this.generateData(
              31,
              {
                min: 0,
                max: 30
              },
              8
            )
          },
          {
            name: "Sep",
            data: this.generateData(
              30,
              {
                min: 0,
                max: 30
              },
              9
            )
          },
          {
            name: "Oct",
            data: this.generateData(
              31,
              {
                min: 0,
                max: 30
              },
              10
            )
          },
          {
            name: "Nov",
            data: this.generateData(
              30,
              {
                min: 0,
                max: 30
              },
              11
            )
          },
          {
            name: "Dec",
            data: this.generateData(
              31,
              {
                min: 0,
                max: 30
              },
              12
            )
          }
        ]
      };
      chart = new ApexCharts(document.querySelector("#chart"), options);

      chart.render();
    }
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}

.calendarContainer div {
  top: 17%;
  left: 20%;
}
.subtitles::before {
  color: transparent;
}

.subtitles:hover {
  color: #ff6f61;
}
* {
  font-family: "Do Hyeon", sans-serif;
}

.link {
  color: #000000;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
}

.link {
  position: relative;
  z-index: 1;
  display: inline-flex;

  padding-left: 10px;
  padding-bottom: 5px;
  padding-right: 10px;
}

.link::before {
  content: "";
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #ff6f61 25%, rgba(0, 0, 0, 0) 40%);

  position: absolute;
  left: 0;
  bottom: 2px;
  z-index: -1;

  will-change: width;
  transform: rotate(-2deg);
  transform-origin: left bottom;
}

.link:hover::before {
  width: 0;
}

.link::before {
  transition: width 0.1s ease-out;
}

.link:hover::before {
  transition-duration: 0.15s;
}

.center {
  text-align: center;
  border: 3px solid #ff6f61;
  padding: 10px;
}
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>
