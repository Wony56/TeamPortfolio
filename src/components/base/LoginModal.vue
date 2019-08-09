<template>
  <v-card>
    <v-card-title style="background-color:#ff6f61; color:#ffff">
      <span class="headline">Log in</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
            </v-flex>

            <v-flex>
              <v-btn block dark @click="loginWithEmail">
                <i class="far fa-envelope"></i>&nbsp; Sign in with email
              </v-btn>
              <v-btn block color="error" @click="loginWithGoogle">
                <i class="fab fa-google"></i>&nbsp; Sign in with Google
              </v-btn>
              <v-btn block color="primary" @click="loginWithFacebook">
                <i class="fab fa-facebook-square"></i>&nbsp; Sign in with Facebook
              </v-btn>

              <img src="../../../backend/captcha.jpg" />

              <v-text-field v-model="captchaCode"></v-text-field>
              <v-btn @click="compareCaptchaCode()">COMPARE</v-btn>

            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn block @click="changeLoginToSignup" flat color="black">SIGN UP</v-btn>
      <v-btn block @click="closeLogin" flat color="black">CLOSE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebaseService from "../../services/FirebaseService";
import { mapMutations } from "vuex";

export default {
  name: "LoginModal",
  data() {
    return {
      statement: {},
      valid: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      password: "",

      captchaKey: null,
      captchaCode: ""
    };
  },
  created() {

    this.getCaptcha();
  },
  methods: {
    ...mapMutations([
      "closeLoginModal",
      "openSignupModal",
      "showLoginBar",
      "showLoginErrorBar"
    ]),
    closeLogin() {
      this.closeLoginModal();
      this.$refs.form.reset();
    },
    async changeLoginToSignup() {
      await this.closeLogin();
      this.openSignupModal();
    },
    loginWithEmail() {
      if (this.$refs.form.validate()) {
        firebaseService
          .loginWithEmail(this.email, this.password)
          .then(async res => {
            if (res) {
              this.closeLogin();
              this.showLoginBar();
              this.$router.replace("/");
            }
          });
      }
    },
    loginWithGoogle() {
      firebaseService.loginWithGoogle().then(async res => {
        if (res) {
          this.closeLogin();
          this.showLoginBar();
          this.$router.replace("/");
        }
      });
    },
    loginWithFacebook() {
      firebaseService.loginWithFacebook().then(async res => {
        if (res) {
          this.closeLogin();
          this.showLoginBar();
          this.$router.replace("/");
        }
      });
    },
    async getCaptcha() {

      await this.$axios.get('api/captcha/nkey').then(ret => {

        console.log(ret);
        this.captchaKey = ret.data.key;
      });
      console.log("CAPTCHA KEY ", this.captchaKey);
      this.flag = true;

      await this.$axios.get('api/captcha/image', { params: { key: this.captchaKey } });
    },
    async compareCaptchaCode() {

      let value = this.captchaCode;
      let key = this.captchaKey;

      await this.$axios.get('api/captcha/result', { params: { key: key, value: value } }).then(ret => {

        console.log(ret);
      }).catch(err => {

        console.log(err);
      });
      this.captchaCode = "";
    }
  }
};
</script>
<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>
