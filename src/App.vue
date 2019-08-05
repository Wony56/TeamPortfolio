<template>
  <div>
    <v-app>
      <Header />
      <notifications group="foo" animation-type="velocity" position="bottom left"/>
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
    </v-app>
  </div>
</template>
 <script>
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://danbee.ai/js/plugins/frogue-embed/frogue-embed.min.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "frdogue-embed");
</script>
<script>
import store from "./store";
import Header from "./components/base/Header.vue";
import Footer from "./components/base/Footer.vue";
import LoginSnackbar from "./components/snackbar/LoginSnackbar";
import LogoutSnackbar from "./components/snackbar/LogoutSnackbar";

import Firebase from "./services/FirebaseService";

var key = "AIzaSyDCo_1aj9Q1FYra6QCPzkV6Fya6nHqSZr4";
var to = "";
var notification = {
  title: "새글!",
  body: "이건새글",
  icon: "firebase-logo.png",
  click_action: "http://localhost:8080"
};

export default {
  name: "App",
  store,
  components: {
    Header,
    Footer,
    LoginSnackbar,
    LogoutSnackbar
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

      token: ""
    };
  },
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
    postPush() {
      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization: "key=" + key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          notification: notification,
          to: to
        })
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    async loadToken() {
      await Firebase.getToken().then(ret => {
        // this.to = ret;
        to = ret;
      });
    }
  },
  mounted() {
    this.loadToken();
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
</style>
