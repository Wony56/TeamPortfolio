<template>
  <v-container class="admin-container" fluid grid-list-md fill-height="100%">
    <v-layout column class="temp">
      <v-flex d-flex xs12 sm6 md4>
        <v-layout wrap>
          <v-flex d-flex xs12 sm12 md4>
            <v-card>
              <v-card-title primary class="title">일간 방문자 수</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <DailyVisitorGraph></DailyVisitorGraph>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm12 md4>
            <v-card>
              <v-card-title primary class="title">일간 방문자 수</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <DailyPostingGraph></DailyPostingGraph>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm12 md4>
            <v-card>
              <v-card-title primary class="title">일간 가입자 수</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <DailyMemberGraph></DailyMemberGraph>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4>
        <v-layout>
          <v-flex d-flex xs6 sm6 md3>
            <v-card color="green" height="130">
              <v-card-title style="color:#ffff">POST</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="color:#ffff">{{postCount}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs6 sm6 md3>
            <v-card color="red" height="130">
              <v-card-title style="color:#ffff">PORTFOLIO</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="color:#ffff">{{portfolioCount}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs6 sm6 md3>
            <v-card color="blue" height="130">
              <v-card-title style="color:#ffff">MEMBER</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="color:#ffff">{{memberCount}}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs6 sm6 md3>
            <v-card color="black" height="130">
              <v-card-title style="color:#ffff">팔레트</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="color:#ffff">여기에</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4>
        <v-layout wrap>
          <v-flex d-flex xs12 sm6 md6>
            <v-card outlined width="330" height="450">
              <v-card-title>POST 관리</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <PostTable></PostTable>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md6>
            <v-card outlined width="330" height="450">
              <v-card-title>PORTFOLIO 관리</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <PortfolioTable></PortfolioTable>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4>
        <v-flex d-flex xs12 sm6 md12>
          <v-card outlined width="330" height="450">
            <v-card-title>회원 관리</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <MemberTable></MemberTable>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import DailyVisitorGraph from "../components/DailyVisitorGraph";
import DailyPostingGraph from "../components/DailyPostingGraph";
import DailyMemberGraph from "../components/DailyMemberGraph";
import TotalMember from "../components/TotalMember";
import PostTable from "../components/PostTable";
import MemberTable from "../components/MemberTable";
import PortfolioTable from "../components/PortfolioTable";
import NowLogin from "../components/NowLogin";
import { mapMutations, mapState } from "vuex";

export default {
  name: "AdminPage",
  components: {
    DailyVisitorGraph,
    DailyPostingGraph,
    DailyMemberGraph,
    TotalMember,
    PostTable,
    PortfolioTable,
    MemberTable,
    NowLogin
  },
  created() {
    this.countMember();
    this.countPost();
    this.countPortfolio();
  },
  computed: mapState({
    memberCount: state => state.admin.memberCount,
    postCount: state => state.admin.postCount,
    portfolioCount: state => state.admin.portfolioCount
  }),
  methods: {
    ...mapMutations(["countMember", "countPost", "countPortfolio"])
  }
};
</script>
<style>
* {
  font-family: "Jua", sans-serif;
}

.admin-container {
  margin-top: 80px;
}
</style>