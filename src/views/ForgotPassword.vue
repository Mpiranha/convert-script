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

          <h1 class="title">Forgot Password</h1>
          <div class="error">
            {{error}}
          </div>
          <div class="success">
            {{message}}
          </div>

          <form action="#" method="post">
            <div class="form-group">
              <label for="my-input">Email</label>
              <input
                id="my-input"
                class="form-control input-signin"
                type="email"
                name=""
                v-model="email"
              />
              <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                <span v-if="!$v.email.required">Email is required</span>
                <span v-if="!$v.email.email">Email is invalid</span>
              </div>
            </div>

            <button
              @click="resetPassword($event)"
              class="btn btn-block btn-login"
            >
              Reset Password
            </button>
            <div class="login-info text-center mt-2">
              Back to 
              <router-link to="/login">Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "ResetPassword",
  provide() {
    return {
      $v: this.$v,
    };
  },
  data() {
    return {
      // isText: false,
      email: "",
      error: null,
      submitted: false,
      message: null
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
      email,
    },
  },
  methods: {
    resetPassword: function (event) {
      event.preventDefault();
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let data = {
        email: this.email,
      }

      this.$store
        .dispatch("resetPassword", data)
        .then((res) => {
          this.error = null;
          this.message = res.data.message;
          // this.$router.push("/").catch(() => {
          //   // console.log(error);
          // });

          console.log(res.data.message);
        })
        .catch((error) => {
          // console.log(error);
          this.message = null;
          this.error = error.response.data.error;
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

<style scoped>
</style>