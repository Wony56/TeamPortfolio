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
      <v-btn block @click="closeLoginModal" flat color="black">CLOSE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebaseService from "../../services/FirebaseService";
import { mapState, mapMutations } from "vuex";

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
    closeLoginModal() {
      this.$store.commit("closeLoginModal");
      this.$refs.form.reset();
    },
    changeLoginToSignup() {
      this.$store.commit("closeLoginModal");
      this.$store.commit("openSignupModal");
      this.$refs.form.reset();
    },
    loginWithEmail() {
      if (this.$refs.form.validate()) {
        firebaseService.loginWithEmail(this.email, this.password);
        this.$store.commit("closeLoginModal");
        this.$refs.form.reset();
      }
    },
    loginWithGoogle() {
      firebaseService.loginWithGoogle();
      this.$store.commit("closeLoginModal");
      this.$refs.form.reset();
    },
    loginWithFacebook() {
      firebaseService.loginWithFacebook();
      this.$store.commit("closeLoginModal");
      this.$refs.form.reset();
    }
  }
};
</script>
<style>
*{
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
