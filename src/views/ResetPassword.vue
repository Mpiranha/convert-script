<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap justify-content-center">
      <div class="form-section">
        <div class="login-form-wrap">
          <div class="d-flex justify-content-center mb-5">
            <img class="img-logo" src="../assets/image/Logo.svg" alt="Logo Image" />
          </div>

          <h1 class="title">Password Reset</h1>
          <div class="error">{{ error }}</div>
          <div class="success">{{ message }}</div>

          <form action="#" method="post">
            <div v-if="!success">
              <password-input label="New Password" v-model.trim="user.new_password"
                :class="{ 'is-invalid': submitted && $v.user.new_password.$error }">
              </password-input>
              <div v-if="submitted && $v.user.new_password.$error" class="invalid-feedback">
                <span v-if="!$v.user.new_password.required">New Password is required</span>
                <span v-if="!$v.user.new_password.minLength">Password must be at least 6 characters</span>
              </div>
              <password-input label="Confirm Password" v-model.trim="user.same_as_new_password"
                :class="{ 'is-invalid': submitted && $v.user.same_as_new_password.$error }"></password-input>
              <div v-if="submitted && $v.user.same_as_new_password.$error" class="invalid-feedback">
                <span v-if="!$v.user.same_as_new_password.required">Confirm Password is required</span>
                <span v-else-if="!$v.user.same_as_new_password.sameAsPassword">* Passwords must match</span>
              </div>
            </div>
            <router-link v-if="success" to="/login" class="btn btn-block btn-login">
              Login
            </router-link>
            <button v-else @click="resetPassword($event)" :disabled="disabledButton" class="btn btn-block btn-login">
              <span>
                Reset Password
              </span>
              <img class="spinner" src="../assets/image/Rolling-1s-64px.gif" alt="loading icon">
            </button>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordInput from "@/components/Password";
import {
  required,
  minLength,
  sameAs
} from "vuelidate/lib/validators";
export default {
  name: "ResetPassword",
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
        new_password: "",
        same_as_new_password: "",
      },
      error: null,
      message: null,
      submitted: false,
      success: false,
    };
  },
  mounted: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push("/");
    }

    if (this.$route.params.token) {
      this.$store
        .dispatch("verifyToken", this.$route.params.token)
        .then((res) => {
         // console.log(res.data.message);
          if (res.data.message.toLowerCase() !== 'valid') {
            this.$router.push('/login');
          } else {
            return;
          }
        })
        .catch((errors) => {


          this.error = errors.response.data.errors.root;

       //   console.log(this.error);

        });
    }
  },
  validations: {
    user: {
      new_password: {
        required,
        minLength: minLength(6),
      },
      same_as_new_password: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs(function () {
          return this.user.new_password;
        }),
      },
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

      this.disabledButton = true;

      this.$store
        .dispatch("resetUserPassword", {
          token: this.$route.params.token,
          password: this.user.new_password,
          password_confirmation: this.user.same_as_new_password,
        })
        .then((res) => {
          this.error = null;
          this.message = res.data.message;
          this.success = res.data.success;
          this.disabledButton = false;

          //console.log(res.data);
        })
        .catch((errors) => {
          // console.log(error);
          this.message = null;
          this.disabledButton = false;
          this.error = errors.response.data.errors.root;


          // this.error = error;
        });

    },
  },

};
</script>
