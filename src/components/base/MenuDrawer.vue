<template>
  <v-navigation-drawer v-model="$store.state.drawer" app temporary>
    <v-list>
      <v-list-tile style="color:#ff6f61">
        <v-list-tile-content>
          <v-list-tile-title>
            <h1>Menu</h1>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <template v-for="(item, index) in items">
        <v-list-tile :to="{name: item.href}" :key="index" class="sidetitle">
          <v-list-tile-action>
            <v-icon color="#ff6f61" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title" class="titletext"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <template v-if="!loggedIn">
        <v-list-tile @click="openSignModal">
          <v-list-tile-action>
            <v-icon color="#ff6f61">input</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>로그인/회원가입</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <template v-else>
        <v-list-tile @click="logOut">
          <v-list-tile-action>
            <v-icon color="#ff6f61"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>로그아웃</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <!-- <clock></clock> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebaseService from "../../services/FirebaseService";
import { mapState, mapMutations } from "vuex";

export default {
  name: "MenuDrawer",
  data() {
    return {
      items: [
        {
          href: "post",
          router: true,
          title: "게시판",
          icon: "dashboard"
        },
        {
          href: "portfolio",
          router: true,
          title: "포트폴리오",
          icon: "folder"
        },
        {
          href: "adminpage",
          router: true,
          title: "관리자페이지",
          icon: "insert_chart_outlined"
        }
      ]
    };
  },
  computed: mapState({
    loggedIn: state => state.user.loggedIn,
    loginDialog: state => state.modal.loginDialog,
    signupDialog: state => state.modal.signupDialog
  }),
  methods: {
    ...mapMutations(["openSignModal", "showLogoutBar"]),
    logOut() {
      this.showLogoutBar();
      firebaseService.logout();
    }
  }
};
</script>