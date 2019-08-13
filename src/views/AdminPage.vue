<template>
  <div>
    <v-container class="admin-container mt-5" fluid grid-list-md fill-height="100%">
      <v-layout column class="temp">
        <v-flex d-flex xs12 sm6 md4>
          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md4>
              <v-card>
                <v-card-title primary class="title">일간 POST 수</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <DailyPostGraph />
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md4>
              <v-card>
                <v-card-title primary class="title">일간 PORTFOLIO 수</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <DailyPortfolioGraph />
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md4>
              <v-card>
                <v-card-title primary class="title">일간 가입자 수</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <DailyMemberGraph />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-layout justify-center text-xs-center min-height="100">
            <v-flex d-flex xs6 sm6 md3>
              <v-card color="green">
                <v-card-text style="color:#ffff">POST</v-card-text>
                <v-divider></v-divider>
                <v-card-text style="color:#ffff">{{postCount}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs6 sm6 md3>
              <v-card color="red">
                <v-card-text style="color:#ffff">PORTFOLIO</v-card-text>
                <v-divider></v-divider>
                <v-card-text style="color:#ffff">{{portfolioCount}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs6 sm6 md3>
              <v-card color="blue">
                <v-card-text style="color:#ffff">MEMBER</v-card-text>
                <v-divider></v-divider>
                <v-card-text style="color:#ffff">{{memberCount}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs6 sm6 md3>
              <v-card color="black">
                <v-card-text style="color:#ffff">팔레트</v-card-text>
                <v-divider></v-divider>
                <v-card-text style="color:#ffff">여기에</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-layout wrap>
            <v-flex d-flex xs12 sm6 md6>
              <v-card outlined>
                <v-card-title>POST 관리</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <PostTable />
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md6>
              <v-card outlined>
                <v-card-title>PORTFOLIO 관리</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <PortfolioTable />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm12 md12>
          <v-layout wrap>
            <v-flex d-flex xs12 sm12 md12>
              <v-card outlined>
                <v-card-title>회원 관리</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <MemberTable />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <DeleteDialog />
    </v-container>
  </div>
</template>
<script>
import DailyPortfolioGraph from "../components/admin/DailyPortfolioGraph";
import DailyPostGraph from "../components/admin/DailyPostGraph";
import DailyMemberGraph from "../components/admin/DailyMemberGraph";
import PostTable from "../components/admin/PostTable";
import MemberTable from "../components/admin/MemberTable";
import PortfolioTable from "../components/admin/PortfolioTable";
import DeleteDialog from "../components/modal/DeleteDialog";
import { mapMutations, mapState } from "vuex";

export default {
  name: "AdminPage",
  components: {
    DailyPortfolioGraph,
    DailyPostGraph,
    DailyMemberGraph,
    PostTable,
    PortfolioTable,
    MemberTable,
    DeleteDialog
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
  font-family: "Nanum Gothic", sans-serif;
}

.admin-container {
  margin-top: 80px;
}
</style>
