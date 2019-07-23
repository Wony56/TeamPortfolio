<template>
  <v-card>
    <v-card-title style="background-color:#ff6f61; color:#ffff">
      <span class="headline">Sign up</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Name" v-model="name" :rules="nameRules" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                :rules="passwordRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Confirm Password"
                type="password"
                v-model="passwordConfirm"
                :rules="passwordConfirmRules"
                required
              ></v-text-field>
            </v-flex>

            <v-flex>
              <v-btn block flat style="background-color:#ff6f61; color:#ffff" @click="signupWithEmail">
                <i class="far fa-envelope"></i>&nbsp; Sign up with email
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn block @click="closeSignupModal" flat color="black">CLOSE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SignUpModal",
  data() {
    return {
      valid: true,
      statement: {},
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      name: "",
      nameRules: [v => !!v || "Name is required"],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "8자 이상이어야 합니다."
      ],
      passwordConfirm: "",
      passwordConfirmRules: [
        v => !!v || "Confirm Password is required",
        v => v === this.password || "비밀번호가 일치하지 않습니다."
      ]
    };
  },
  methods: {
    signupWithEmail() {
      if (this.$refs.form.validate()) {
        this.$store.commit("signupWithEmail", {
          email: this.email,
          name: this.name,
          password: this.password
        });
        this.$refs.form.reset();
      }
    },
    closeSignupModal() {
      this.$store.commit("closeSignupModal");
      this.$refs.form.reset();
    }
  }
};
</script>