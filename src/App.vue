<template>
  <div>
    <VueScrollProgress></VueScrollProgress>
    <v-app>
      <Header />
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

        <v-dialog v-model="favorite" persistent max-width="400">
          <v-card>
            <v-card-title
              class="headline"
              style="background-color:#ff6f61; color:#ffff; font-weight: 800;"
            >즐겨찾기</v-card-title>
            <v-card-text>{{favoriteKey}} + D 키를 눌러 북마크에 추가해주세요.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black" flat @click="favorite = false">확인</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card id="create">
          <v-speed-dial
            v-model="fab"
            :top="top"
            :bottom="bottom"
            :right="right"
            :left="left"
            :direction="direction"
            :transition="transition"
            :open-on-hover="hover"
          >
            <template v-slot:activator>
              <v-btn v-show="show" v-model="fab" color="#ff6f61" dark fab>
                <v-icon class="notranslate">add</v-icon>
                <v-icon class="notranslate">close</v-icon>
              </v-btn>
            </template>
            <v-btn fab dark small v-show="show" color="yellow" @click="bookmark">
              <v-icon class="notranslate">star</v-icon>
            </v-btn>
            <v-btn fab dark small v-show="show" color="indigo" @click="moveTop">
              <v-icon class="notranslate">keyboard_capslock</v-icon>
            </v-btn>
            <v-btn
              fab
              small
              @click="refresh"
              v-show="show"
              href="#googtrans(en|ko)"
              class="lang-es lang-select"
              data-lang="ko"
            >
              <v-img src="../img/icons/south-korea.png" />
            </v-btn>
            <v-btn
              @click="refresh"
              fab
              small
              v-show="show"
              href="#googtrans(en|en)"
              class="lang-en lang-select"
              data-lang="en"
            >
              <v-img src="../img/icons/united-states.png" />
            </v-btn>
           
          </v-speed-dial>
        </v-card>
      </v-content>

      <!-- Footer -->
      <Footer />
    </v-app>
  </div>
</template>

<script>
import store from "./store";
import Header from "./components/base/Header.vue";
import Footer from "./components/base/Footer.vue";

export default {
  name: "App",
  store,
  components: {
    Header,
    Footer
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
      transition: "slide-y-reverse-transition"
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
    moveTop() {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
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
    }
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
#contents {
  font-size: 1.6vw;
}

#progress-container-el {
  background-color: transparent !important;
  top: calc(100%+2px) !important;
}

#progress-el {
  background-color: #ff6f61 !important;
}
</style>
