<template>
  <nav>
    <MenuDrawer />
    <v-toolbar id="bar" flat fixed clipped-left v-on:scroll="onScroll" height="64px">
      <v-toolbar-title>
        <router-link to="home">
          <span class="header_logo logo mt-5">
            <img src="../../../public/img/logo/122.svg" class />
            <img src="../../../public/img/logo/wtd.svg" class="logo_text_bottom logo_text" />
          </span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <mq-layout mq="tablet+" style="height: 100%;">
        <v-toolbar-items>
          <v-btn class="menu-item" flat to="/post">게시판</v-btn>
          <v-btn class="menu-item" flat to="/portfolio">포트폴리오</v-btn>
          <template v-if="!loggedIn">
            <!--로그인-->
            <v-btn class="menu-item" flat @click="openSignModal">로그인/회원가입</v-btn>
          </template>
          <template v-else>
            <v-btn
              class="menu-item"
              flat
              to="/adminpage"
              v-show="$store.state.user.user.tier === 'diamond'"
            >관리자페이지</v-btn>
            <v-btn class="menu-item" flat @click="logOut">로그아웃</v-btn>
          </template>
        </v-toolbar-items>
      </mq-layout>

      <mq-layout mq="mobile">
        <v-icon
          color="#ff6f61"
          @click.stop="$store.state.drawer = !$store.state.drawer"
          class="notranslate"
        >dehaze</v-icon>
      </mq-layout>
    </v-toolbar>
  </nav>
  

</template>

<script>
import firebaseService from "../../services/FirebaseService";
import MenuDrawer from "./MenuDrawer";
import { mapState, mapMutations } from "vuex";

var el;

export default {
  name: "Header",
  components: {
    MenuDrawer
  },
  created() {
    window.addEventListener("resize", this.handleDrawer);
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  mounted() {
    el = document.getElementById("bar");
    el.style.backgroundColor = "#00ff0000";
  },
  computed: mapState({
    loggedIn: state => state.user.loggedIn,
    signDialog: state => state.modal.signDialog
  }),
  methods: {
    handleDrawer() {
      if (this.$mq !== "mobile") {
        this.$store.state.drawer = false;
      }
    },
    click1() {
      this.check = false;
    },
    click2() {
      this.check = true;
    },
    onScroll() {
      if (window.pageYOffset < 50) {
        el.style.backgroundColor = "#00ff0000";
      } else {
        el.style.backgroundColor = "#ffffff";
      }
    },
    logOut() {
      firebaseService.logout().then(() => {
        this.$router.replace("/");
        this.showLogoutBar();
      });
    },
    ...mapMutations(["openSignModal", "showLogoutBar"])
  }
};
</script>

<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}
nav:not(.snack) {
  font-family: "Do Hyeon", sans-serif;
}

a,
a:visited {
  color: black;
  text-decoration: none;
}

.menu-item {
  font-size: 1.3em;
}

.header_logo {
  position: absolute;
  top: 20px;
  z-index: 2;
  margin-bottom: 0;
}

.logo {
  display: inline-block;
  position: relative;
  margin-bottom: 3rem;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}

.logo_text {
  position: absolute;
  transform-origin: 0 0;
  transition: transform cubic-bezier(0.62, 0.28, 0.23, 1) 0.6s,
    -webkit-transform cubic-bezier(0.62, 0.28, 0.23, 1) 0.6s;
}

.logo_text_bottom {
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: -5px;
}

.snack {
  text-align: center;
  font-family: "Do Hyeon", sans-serif;
}
.menu-item::before {
  color: transparent;
}

.menu-item:hover {
  background-color: #ff6f61;
  color: #fff;
}

.sidetitle::before {
  color: transparent;
}

.sidetitle:hover {
  background-color: #ff6f61;
  color: #ffff;
}
.titletext:hover {
  color: #ffff;
}
</style>
