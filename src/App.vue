<template>
  <div>
    <v-app>
      <Header />
      <notifications style="background-color:#ff6f61" group="foo" animation-type="velocity" position="bottom left" />
      <v-content id="contents">
        <router-view />

        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline" style="color:red; font-weight: 800;">Warning!</v-card-title>
            <v-card-text>
              해당 사이트는
              <u>크롬(Chrome)</u>에 최적화
              <br />되어 있습니다.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" flat @click="dialog = false">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-content>
      <Footer />
      
      <LoginSnackbar />
      <LogoutSnackbar />
      <TierChangeSnackbar />
      <LoginErrorSnackbar />
      <LockingSnackbar />
      <SignupSnackbar />
    </v-app>
  </div>
</template>
<script>
import store from "./store";
import Header from "./components/base/Header.vue";
import Footer from "./components/base/Footer.vue";
import LoginSnackbar from "./components/snackbar/LoginSnackbar";
import LogoutSnackbar from "./components/snackbar/LogoutSnackbar";
import TierChangeSnackbar from "./components/snackbar/TierChangeSnackbar";
import LoginErrorSnackbar from "./components/snackbar/LoginErrorSnackbar";
import LockingSnackbar from "./components/snackbar/LockingSnakbar";
import SignupSnackbar from "./components/snackbar/SignupSnackbar";

import Firebase from "./services/FirebaseService";
import { mapState } from "vuex";
export default {
  name: "App",
  store,
  components: {
    Header,
    Footer,
    LoginSnackbar,
    LogoutSnackbar,
    TierChangeSnackbar,
    LoginErrorSnackbar,
    LockingSnackbar,
    SignupSnackbar,
  },
  data() {
    return {
      show: false,
      dialog: false,
      favorite: false,
      favoriteKey: "Ctrl",

      direction: "top",
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
    };
  },
  computed: mapState({
    loadingShow: state => state.loading.loadingShow
  }),
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeMount() {
    var browser = navigator.userAgent.toLowerCase();

    if (browser.indexOf("chrome") !== -1) {
      this.dialog = false;
    } else {
      this.dialog = true;
    }
  },
  methods: {
    refresh() {
      setTimeout(function() {
        window.location.reload(1);
      }, 500);
    },
    handleScroll() {
      if (window.scrollY >= 500) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    bookmark() {
      var bookmarkURL = window.location.href;
      var bookmarkTitle = document.title;
      var triggerDefault = false;

      if (window.sidebar && window.sidebar.addPanel) {
        window.sidebar.addPanel(bookmarkTitle, bookmarkURL, "");
      } else if (
        (window.sidebar &&
          navigator.userAgent.toLowerCase().indexOf("firefox") > -1) ||
        (window.opera && window.print)
      ) {
        this.attr("href", bookmarkURL);
        this.attr("title", bookmarkTitle);
        this.attr("rel", "sidebar");
        this.off(e);
        triggerDefault = true;
      } else if (window.external && "AddFavorite" in window.external) {
        window.external.AddFavorite(bookmarkURL, bookmarkTitle);
      } else {
        if (navigator.userAgent.toLowerCase().indexOf("mac") !== -1) {
          this.favoriteKey = "Command";
        } else {
          this.favoriteKey = "Ctrl";
        }
        this.favorite = true;
      }

      return triggerDefault;
    },
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    }
  }
};
</script>



<style>
#create .v-speed-dial {
  position: fixed;
  z-index: 100;
  bottom: 100px;
  right: 20px;
}
#create .v-btn--floating {
  position: relative;
}
#favorite-btn {
  position: fixed;
  bottom: 180px;
  right: 20px;
}

#progress-container-el {
  background-color: transparent !important;
  top: calc(100%-4px) !important;
}

#progress-el {
  background-color: #ff6f61 !important;
}

.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
 
  font-size: 12px;
  color: #ffffff;
  background: #ff6f61;
  border-left: 5px solid #ff6f61;
}
</style>
