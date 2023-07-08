<template>
  <div class="container-fluid px-md-0">
    <loader-modal class="fs-loader-modal" :loading-state="this.$store.state.loading"></loader-modal>
    <div class="flex-main-wrap justify-content-center">
      <div class="form-section">
        <div class="login-form-wrap">
          <div class="d-flex justify-content-center mb-5">
            <img class="img-logo" src="../assets/image/Logo.svg" alt="Logo Image" />
          </div>

          <h1 class="title">Login</h1>
          <div class="error">{{ error }}</div>

          <!-- <a :href="signedURL" target="_blank" class="btn btn_sign_in_google">
            <img src="@/assets/icons/google-icon.svg" alt="google icon">
            <span class="btn_text">Login with Google</span>

          </a> -->

          <!-- <div class="line_wrap">
            <div class="line"></div>
            <div class="or_text">OR</div>
            <div class="line"></div>
          </div> -->

          <form action="#" method="post">
            <div class="form-group">
              <label for="my-input">Email</label>
              <input class="form-control input-signin" type="email" name="" v-model.trim="user.email"
                :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
              <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                <span v-if="!$v.user.email.required">Email is required</span>
                <span v-if="!$v.user.email.email">Email is invalid</span>
              </div>
            </div>
            <password-input label="Password" v-model.trim="user.password"
              :class="{ 'is-invalid': submitted && $v.user.password.$error }"></password-input>
            <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
              <span v-if="!$v.user.password.required">Password is required</span>
              <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
            </div>
            <div class="login-info">
              <router-link to="/password/forgot">Forgot Password?</router-link>
            </div>

            <button @click="login($event)" :disabled="disabledButton" class="btn btn-block btn-login">
              <span>
                Login
              </span>
              <img class="spinner" src="../assets/image/Rolling-1s-64px.gif" alt="loading icon">
            </button>

            <div class="login-info text-center mt-2">
              Don’t have an account?
              <!-- <router-link to="/register">Sign Up</router-link> -->
              <a href="/register ">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordInput from "@/components/Password";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  components: {
    PasswordInput,
  },
  provide() {
    return {
      $v: this.$v,
    };
  },
  data() {
    return {
      // isText: false,
      signedURL: null,
      disabledButton: false,
      user: {
        email: "",
        password: "",
      },
      error: null,
      submitted: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...
    if (to.query.code) {

      next(vm => {
        vm.$store
          .dispatch("verifyGoogleToken", to.query.code)
          .then(() => {
            vm.error = null;
            // vm.$router.push(this.$route.query.from || "/").catch(() => {
            // });
            next("/");
          })
          .catch((errors) => {
            

            // for (const key in errors) {
            //   if (Object.hasOwnProperty.call(errors, key)) {
            //     console.log(key);
            //     console.log(errors[key]);

            //   }
            // }
            vm.error = errors.response.data.message;
            // this.error = error;
          });
      })

    } else {
      next();
    }
  },
  mounted: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push("/");
    }

    this.getGoogleSignURL();

    // if (this.$route.fullPath.split("?")[1].split("&")[0]) {

    // }
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    // toggleText: function () {
    //   this.isText = !this.isText;
    // },
    // updatePassword() {
    //   this.$store.commit('updatePassword', );
    // },
    login: function (event) {
      event.preventDefault();
      this.submitted = true;


      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.disabledButton = true;
      this.$store
        .dispatch("login", this.user)
        .then(() => {
          this.error = null;
          this.$store.dispatch("getUser").then((res) => {
            // console.log(res.data.data);

            // console.log('First Name');
            // console.log(Boolean(res.data.data.first_name));
            // console.log('Last Name');
            // console.log(Boolean(res.data.data.last_name));

            if (Boolean(res.data.data.first_name) == false || Boolean(res.data.data.last_name) == false) {
              this.$router.push("/settings");

              return;
            }
          });



          this.$router.push(this.$route.query.from || "/").catch(() => {

          });

        })
        .catch((errors) => {
          // console.log(error);
          this.disabledButton = false;
          this.error = errors.response.data.errors.root;
          // this.error = error;
        });
      // const ( username, password ) = this
      // this.$store.dispatch(AUTH_REQUEST, {username, password }).then(() => {
      //   this.$router.push('/')
      // })
    },
    getGoogleSignURL: function () {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getGoogleSignURL")
        .then((res) => {
          this.error = null;

          this.signedURL = res.data;
          this.$store.commit("updateLoadState", false);


        })
        .catch((errors) => {
          this.error = errors.response.data.errors.root;
          this.$store.commit("updateLoadState", false);
          // this.error = error;
        });

    },
  },
};
</script>

<style>
.btn_sign_in_google {
  border: 1px solid #8A95A9 !important;
  color: #393F46 !important;
  font-size: 0.9rem !important;
  border-radius: 0.3rem !important;
  width: 100%;
  display: flex !important;
  justify-content: flex-start;
  padding: 0.55rem 0.6rem !important;
  align-items: center;
  margin-bottom: 2rem;
}

.btn_sign_in_google .btn_text {
  flex-grow: 1;
  text-align: center;
}

.line_wrap {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.line_wrap .or_text {
  margin: 0 0.5rem;
  font-size: 0.9rem;
  color: #AEADB3;
}

.line_wrap .line {
  background-color: #AEADB3;
  height: 1px;
  flex-grow: 1;
}

.fs-loader-modal {
  width: 100% !important;
  left: 0 !important;
  top: 0 !important;
  height: 100% !important;
}
</style>
