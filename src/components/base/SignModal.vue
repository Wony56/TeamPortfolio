<template>
  <div class="contain" id="contain">
    <div class="form-contain sign-up-contain">
      <v-form id="form" ref="formSignup" v-model="valid" lazy-validation>
        <h1 id="h1">Create Account</h1>
        <div class="social-contain">
          <a id="a" class="social facebook-icon" @click="loginWithFacebook()">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a id="a" class="social google-icon" @click="loginWithGoogle()">
            <i class="fab fa-google-plus-g"></i>
          </a>
        </div>
        <span id="span">or use your email for registration</span>
        <div class="field">
          <v-text-field
            label="Name"
            v-model="name"
            :rules="[v => !!v || 'Name is required']"
            required
          ></v-text-field>
        </div>
        <div class="field">
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="[
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ]"
            required
          ></v-text-field>
        </div>
        <div class="field">
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            :rules="[
        v => !!v || 'password is required',
        v => v.length >= 8 || '8자 이상이어야 합니다.'
      ]"
            required
          ></v-text-field>
        </div>
        <div class="field">
          <v-text-field
            label="Confirm Password"
            type="password"
            v-model="passwordConfirm"
            :rules="[
        v => !!v || 'Confirm Password is required',
        v => v === this.password || '비밀번호가 일치하지 않습니다.'
      ]"
            required
          ></v-text-field>
        </div>
        <div class="btn-set">
          <v-btn flat @click="signupWithEmail()">Sign Up</v-btn>
          <v-btn flat @click="closeModal()">Cancel</v-btn>
        </div>
      </v-form>
    </div>
    <div class="form-contain sign-in-contain">
      <v-form id="form" ref="formSignin" v-model="valid" lazy-validation>
        <h1 id="h1">Sign in</h1>
        <div class="social-contain">
          <a id="a" class="social facebook-icon" @click="loginWithFacebook()">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a id="a" class="social google-icon" @click="loginWithGoogle()">
            <i class="fab fa-google-plus-g"></i>
          </a>
        </div>
        <span id="span">or use your account</span>
        <div class="field">
          <v-text-field
            label="E-mail"
            v-model="loginEmail"
            :rules="[
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ]"
            required
          ></v-text-field>
        </div>
        <div class="field">
          <v-text-field label="Password" type="password" v-model="loginPassword" required></v-text-field>
        </div>

          <v-layout v-if="failCount >= 5" wrap>
              <v-flex xs10>
                <img src="../../../backend/captcha.jpg" />
              </v-flex>
              <v-flex xs2>
                <v-btn text icon color="white" @click="getCaptcha()">
                  <v-icon>cached</v-icon>
                </v-btn>
              </v-flex>
              
            <v-text-field style="padding: 0pt" v-model="captchaCode"></v-text-field>
          </v-layout>

        <div class="btn-set">
          <v-btn flat @click="loginValidityCheck()">Sign In</v-btn>
          <v-btn flat @click="closeModal()">Cancel</v-btn>
        </div>
      </v-form>
    </div>
    <div class="overlay-contain">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1 id="h1">Welcome Back!</h1>
          <p id="p">To keep connected with us please login with your personal info</p>
          <button class="ghost" id="signIn" @click="$refs.formSignup.reset()">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1 id="h1">Hello, Friend!</h1>
          <p id="p">Enter your personal details and start journey with us</p>
          <button class="ghost" id="signUp" @click="$refs.formSignin.reset()">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseService from "../../services/FirebaseService";
import { mapMutations } from "vuex";

export default {
  name: "SignModal",
  date() {
    return {
      valid: true,
      loginEmail: "",
      loginPassword: "",
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",

      captchaCode: "",
      captchaKey: "",
      failCount: 0,
      captchaFlag: false,
      flag: false
    };
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("contain");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    this.failCount = 0;
    this.getCaptcha();
  },
  methods: {
    ...mapMutations([
      "closeSignModal",
      "showLoginBar",
      "showLoginErrorBar",
      "showSignupBar"
    ]),
    closeModal() {
      this.closeSignModal();
      this.$refs.formSignin.reset();
      this.$refs.formSignup.reset();
    },
    async loginValidityCheck() {

      if(this.failCount >= 5) {
      
        await this.compareKey();

        if(this.captchaFlag == true) {

          this.loginWithEmail();
        }
        else {

          this.$store.commit("showLoginErrorBar", {message: "CAPTCHA를 다시 입력해주세요."});
          this.getCaptcha();
        }
        this.captchaCode = "";
      }
      else {

        this.loginWithEmail();
      }
    },
    loginWithEmail() {
      if (this.$refs.formSignin.validate()) {
        firebaseService
          .loginWithEmail(this.loginEmail.trim(), this.loginPassword.trim())
          .then(res => {

            if(res === undefined) {

              this.failCount += 1;
              this.$forceUpdate();
            }
            else {

              this.closeModal();
              this.showLoginBar();
              this.$router.replace("/");
            }
          });
      }
    },
    loginWithGoogle() {
      firebaseService.loginWithGoogle().then(res => {
        if (res) {
          this.closeModal();
          this.showLoginBar();
          this.$router.replace("/");
        }
      });
    },
    loginWithFacebook() {
      firebaseService.loginWithFacebook().then(res => {
        if (res) {
          this.closeModal();
          this.showLoginBar();
          this.$router.replace("/");
        }
      });
    },
    async signupWithEmail() {
      if (this.$refs.formSignup.validate()) {
        let result = await firebaseService.signUpEmail(
          this.email.trim(),
          this.name.trim(),
          this.password.trim()
        );

        if (result) {
          this.closeModal();
          this.showSignupBar();
        }
      }
    },
    async getCaptcha() {
      
      await this.$axios.get("api/captcha/nkey").then(ret => {
        this.captchaKey = ret.data.key;
      });

      await this.$axios.get("api/captcha/image", {
        params: { key: this.captchaKey }
      });
    },

    async compareKey() {

      await this.$axios.get("api/captcha/result", {
        params: { key: this.captchaKey, value: this.captchaCode }
      }).then((ret) => {

        this.captchaFlag = ret.data.result;
      });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

#body {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

#h1 {
  font-weight: bold;
  margin: 0;
}

#h2 {
  text-align: center;
}

#p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

#span {
  font-size: 12px;
}

#a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

#a.google-icon:hover {
  color: red;
  border-color: red;
}

#a.facebook-icon:hover {
  color: blue;
  border-color: blue;
}

button {
  margin: 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 30px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
  border: solid 1px;
}

.field {
  width: 100%;
}

#form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

#input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.contain {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  max-width: 100%;
  min-height: 480px;
}

.form-contain {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-contain {
  left: 0;
  width: 50%;
  z-index: 2;
}

.contain.right-panel-active .sign-in-contain {
  transform: translateX(100%);
}

.sign-up-contain {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.contain.right-panel-active .sign-up-contain {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-contain {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.contain.right-panel-active .overlay-contain {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff6f61, #ff416c);
  background: linear-gradient(to right, #ff6f61, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.contain.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.contain.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.contain .right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-contain {
  margin: 20px 0;
}

.social-contain #a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>