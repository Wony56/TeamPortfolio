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
      password: ""
    };
  },
  methods: {
    ...mapMutations(["closeLoginModal", "openSignupModal", "showLoginBar"]),
    closeLogin() {
      this.closeLoginModal();
      this.$refs.form.reset();
    },
    changeLoginToSignup() {
      this.closeLogin();
      this.openSignupModal();
    },
    loginWithEmail() {
      if (this.$refs.form.validate()) {
        firebaseService
          .loginWithEmail(this.email, this.password)
          .then(async () => {
            this.showLoginBar();
            await this.closeLogin();
            this.$router.replace("/");
          });
      }
    },
    loginWithGoogle() {
      firebaseService.loginWithGoogle().then(async () => {
        this.showLoginBar();
        await this.closeLogin();
        this.$router.replace("/");
      });
    },
    loginWithFacebook() {
      firebaseService.loginWithFacebook().then(async () => {
        this.showLoginBar();
        await this.closeLogin();
        this.$router.replace("/");
      });
    }
  }
};
</script>
<style>
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>
