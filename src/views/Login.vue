<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap justify-content-center">
      <div class="form-section">
        <div class="login-form-wrap">
          <div class="d-flex justify-content-center mb-5">
            <img
              class="img-logo"
              src="../assets/image/ConvertScript Logo.png"
              alt="Logo Image"
            />
          </div>

          <h1 class="title">Login</h1>

          <form action="#" method="post">
            <div class="form-group">
              <label for="my-input">Email</label>
              <input
                id="my-input"
                class="form-control input-signin"
                type="email"
                name=""
                v-model="user.email"
              />
            </div>
            <password-input
              label="Password"
              v-model="user.password"
            ></password-input>
            <div class="login-info">
              <a href="/forgot-pwd">Forget Password?</a>
            </div>

            <button @click="login($event)" class="btn btn-block btn-login">
              Login
            </button>

            <div class="login-info text-center mt-2">
              Don’t have an account? <router-link to="/register">Sign Up</router-link>
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
      user: {
        email: "",
        password: "",
      },
    };
  },
  mounted: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push("/");
    }
  },
  validations: {
    email: {
      required,
      minLength: minLength(1),
      email,
    },
    password: {
      required,
      minLength: minLength(4),
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
      this.$store
        .dispatch("login", this.user)
        .then((res) => {
          this.error = null;
          this.$router.push(this.$route.query.from || "/").catch((error) => {
            console.log(error);
          });
         
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
        });
      // const ( username, password ) = this
      // this.$store.dispatch(AUTH_REQUEST, {username, password }).then(() => {
      //   this.$router.push('/')
      // })
    },
  },
};
</script>
