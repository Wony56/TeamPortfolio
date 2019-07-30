<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-tile style="color:#ff6f61">
          <v-list-tile-content>
            <v-list-tile-title>
              <span>Menu</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <template v-for="(item, index) in items">
          <v-list-tile :href="item.href" :to="{name: item.href}" :key="index" class="sidetitle">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title" class="titletext"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-if="!loggedIn">
          <v-list-tile @click="openLoginModal">
            <v-list-tile-action>
              <v-icon light>input</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>로그인</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="openSignupModal">
            <v-list-tile-action>
              <v-icon light>person_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>회원가입</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <template v-else>
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon light></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>로그아웃</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar id="bar" flat fixed clipped-left v-on:scroll="onScroll" height="64px">
      <v-toolbar-title>
        <router-link to="/" v-on:click.native="moveTop">
          <span class="header_logo logo mt-5">
            <img src="../../../public/img/logo/122.svg" class />
            <img src="../../../public/img/logo/wtd.svg" class="logo_text_bottom logo_text" />
          </span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <mq-layout mq="tablet+" style="height: 100%;">
        <v-toolbar-items>
          <v-btn class="menu-item" flat to="/post" v-on:click.native="moveTop">게시판</v-btn>
          <v-btn class="menu-item" flat to="/portfolio" v-on:click.native="moveTop">포트폴리오</v-btn>
          <template v-if="!loggedIn">
            <!--로그인-->
            <v-btn class="menu-item" flat @click="openLoginModal">로그인</v-btn>
            <!--회원가입-->
            <v-btn class="menu-item" flat @click="openSignupModal">회원가입</v-btn>
          </template>
          <template v-else>
            <v-btn class="menu-item" flat @click="logout">로그아웃</v-btn>
          </template>
        </v-toolbar-items>
      </mq-layout>

      <mq-layout mq="mobile">
        <v-icon @click.stop="drawer = !drawer" class="notranslate">dehaze</v-icon>
      </mq-layout>
      <!--로그인 모달-->
      <v-dialog v-model="$store.state.modal.loginDialog" max-width="350">
        <LoginModal />
      </v-dialog>
      <!--회원가입 모달-->
      <v-dialog v-model="$store.state.modal.signupDialog" max-width="400">
        <signup-modal />
      </v-dialog>
    </v-toolbar>

    <v-snackbar
      v-model="snackbar"
      :color="'#ff6f61'"
      :top="true"
      :left="false"
      :right="false"
      :bottom="false"
      :timeout="3000"
    >
      <v-icon color="white" class="mr-3">notifications</v-icon>
      <div class="snack">{{snackbarText}}</div>
    </v-snackbar>
  </nav>
</template>

<script>
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { mapState, mapMutations } from "vuex";

var el;

export default {
  name: "Header",
  data() {
    return {
      drawer: false,
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
        }
      ]
    };
  },
  components: {
    LoginModal,
    SignupModal
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
    loginDialog: state => state.modal.loginDialog,
    signupDialog: state => state.modal.signupDialog,
    snackbar: state => state.notification.snackbar,
    snackbarText: state => state.notification.snackbarText
  }),
  methods: {
    handleDrawer() {
      if (this.$mq !== "mobile") {
        this.drawer = false;
      }
    },
    click1: function() {
      this.check = false;
    },
    click2: function() {
      this.check = true;
    },
    onScroll: function() {
      if (window.pageYOffset < 50) {
        el.style.backgroundColor = "#00ff0000";
      } else {
        el.style.backgroundColor = "#ffffff";
      }
    },
    ...mapMutations(["openLoginModal", "openSignupModal", "logout"])
  }
};
</script>

<style>
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
  color: #ffff;
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