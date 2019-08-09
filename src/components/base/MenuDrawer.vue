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
        <v-list-tile @click="openLoginModal">
          <v-list-tile-action>
            <v-icon color="#ff6f61">input</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>로그인</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="openSignupModal">
          <v-list-tile-action>
            <v-icon color="#ff6f61">person_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>회원가입</v-list-tile-title>
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
    logOut() {
      alert("로그아웃되었습니다.");
      firebaseService.logout();
    },
    ...mapMutations(["openLoginModal", "openSignupModal"])
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Old+Standard+TT');

clock {
	font-family: 'Old Standard TT', serif;
	background-color: #fff;
	margin: 0;
	font-size: 0;
	color: #ff6f61;
	text-align: center;
	overflow: hidden;
}

#clock {
	font-size: 24px;
	width: 350px;
	height: 350px;
	position: fixed;
	left: 50%;
	top: 50%;
	margin-left: -175px;
	margin-top: -175px;
}

.digit-group {
	display: inline-block;
	height: 350px;
	&:not(:last-child) {
		&:after {
			content: ':';
			font-size: 72px;
		}
	}
}
.digit {
	display: inline-block;
	width: 50px;
	height: 350px;

	.digit-number {
		color: #ffd6d1;
		transform: rotate(-90deg);
		transition: font-size 200ms, transform 350ms, color 150ms;
		&.highlight {
			color: inherit;
			font-size: 72px;
			transform: rotate(0deg);
		}
	}
}
</style>
