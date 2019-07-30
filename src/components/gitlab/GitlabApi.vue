<template>
  <div class="hidden-md-and-down">
    <v-card flat>
      <div class="page center">
        <a v-on:click="initiateUserRepo('Taylous', 'J7kwFVv-7zWVHD3_zuU1')" class="link mx-3">김창윤</a>
        <a v-on:click="initiateUserRepo('ryuhojin', 'ZVEyzUs6pWXdv44x2Qxk')" class="link mx-3">류호진</a>
        <a v-on:click="initiateUserRepo('blackmonkey9256', '-5QLJ3LQoXHNZ43fZhQn')" class="link mx-3">이석원</a>
        <a v-on:click="initiateUserRepo('hyeonjin23', 'ScV9uvQp_a6E5dgZzGYd')" class="link mx-3">조현진</a>
        <a v-on:click="initiateUserRepo('Eomazing', 'fNzX96z-yzcyNyuR8TTU')" class="link mx-3">엄윤주</a>
      </div>

      <v-tabs-items v-model="tab">
        <div class="calendarContainer" style="margin-top: 70px;">
          <div class="calendarBox" id="calendar_basic" style="width: 1000px; height: 350px;"></div>
        </div>
      </v-tabs-items>
    </v-card>

    <v-layout justify row wrap>
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center font-weight-bold subtitles">Repository</h2>
      </v-flex>
    </v-layout>

    <v-flex align-center>
      <v-card flat>
      <div id="scroll-area">
        <smooth-scrollbar>
          <div id="example-content">
            <GitCommitLine></GitCommitLine>
          </div>
        </smooth-scrollbar>
      </div>
      </v-card>
    </v-flex>

  </div>
</template>

<script>
import GitCommitLine from "./GitCommitLine.vue";

const converter = require("../../services/CurlToNodeJS");
const BASE_URL = "https://lab.ssafy.com/api/v4";
google.charts.load("current", { packages: ["calendar"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart(name, username, data) {
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: "date", id: "Date" });
  dataTable.addColumn({ type: "number", id: "Won/Loss" });

  dataTable.addRows(data);

  var chart = new google.visualization.Calendar(
    document.getElementById("calendar_basic")
  );
  var optionsTitle = name + " " + username;
  var options = {
    title: optionsTitle,
    height: 500,
    colorAxis: { colors: ["white", "#ff6f61"] }
  };
  chart.draw(dataTable, options);
}

export default {
  data() {
    return {
      userReposInfo: [],
      username: "",
      name: "",
      loaded: false,
      page: -1,

      dialog: false,
      tab: null
    };
  },
  created() {
    let user = "Taylous";
    let token = "J7kwFVv-7zWVHD3_zuU1";

    this.getRepos(user, token, true);
  },
  watch: {
    loaded: function(newVal, oldVal) {
      if (newVal && !oldVal) {
        drawChart(this.name, this.username, this.userReposInfo);
      }
    }
  },
  methods: {
    initiateUserRepo(user, tokens) {
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
              if (action_name.indexOf(new String("comment")) >= 0) continue;
              if (str == null || str.substring(0, 4) != year) continue;

              let y = str.substring(0, 4);
              let m = str.substring(5, 7) - 1;
              let d = str.substring(8, 10);

              let monthDaySet = m + "" + d;

              if (dateObj.get(monthDaySet) == undefined) {
                dateObj.set(monthDaySet, 1);

                timeline.push([new Date(y, m, d), 1]);
              } else {
                dateObj.set(monthDaySet, dateObj.get(monthDaySet) + 1);
                timeline.push([new Date(y, m, d), dateObj.get(monthDaySet)]);
              }
            }
            count++;
            if (count == totalPage && isEnd) {
              this.loaded = true;
              this.userReposInfo = timeline;
              this.username = data[0].author.username;
              this.name = data[0].author.name;
            }
          });
      }
    }
  },
  components: {
    GitCommitLine
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

#scroll-area {
  margin: 70px;
  width: 100%;
  height: 700px;
}

#example-content {
  width: 90%;
  height: 2000px;
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
*{
   font-family: 'Do Hyeon', sans-serif;
}

.link{
	color: #000000;
	font-size: 16px;
	font-weight: 700;
	text-decoration: none;
	text-transform: uppercase;
}

.link{
	position: relative;
	z-index: 1;
	display: inline-flex;

	padding-left: 10px;
	padding-bottom: 5px;
	padding-right: 10px;
}

.link::before{
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
	transform-origin: left bottom
}

.link:hover::before{
	width: 0;
}

.link::before{
	transition: width .1s ease-out;
}

.link:hover::before{
	transition-duration: .15s;
}

.center {
  text-align: center;
  border: 3px solid #ff6f61;
  padding: 10px;
}
</style>
