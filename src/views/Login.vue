<template>
  <div class="container-fluid px-md-0">
    <div class="flex-main-wrap justify-content-center">
      <div class="form-section">
        <div class="login-form-wrap">
          <div class="d-flex justify-content-center mb-5">
            <img class="img-logo" src="../assets/image/Logo.svg" alt="Logo Image" />
          </div>

          <h1 class="title">Login</h1>
          <div class="error">{{ error }}</div>

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
      disabledButton: false,
      user: {
        email: "",
        password: "",
      },
      error: null,
      submitted: false,
    };
  },
  mounted: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push("/");
    }
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

          console.log();
          // this.error = error;
        });
      // const ( username, password ) = this
      // this.$store.dispatch(AUTH_REQUEST, {username, password }).then(() => {
      //   this.$router.push('/')
      // })
    },
  },
};
</script>
