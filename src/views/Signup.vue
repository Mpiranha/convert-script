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

          <h1 class="title">Sign up</h1>
          <div class="error">{{ error }}</div>
          <form action="#" method="post">
            <div class="form-group">
              <label for="my-input">Name</label>
              <input
                id="my-input"
                class="form-control input-signin"
                type="text"
                name=""
                v-model="userData.name"
                :class="{ 'is-invalid': submitted && $v.userData.name.$error }"
              />
              <div
                v-if="submitted && !$v.userData.name.required"
                class="invalid-feedback"
              >
                * Name is required
              </div>
            </div>
            <div class="form-group">
              <label for="my-input">Email</label>
              <input
                id="my-input"
                class="form-control input-signin"
                type="email"
                name=""
                v-model="userData.email"
                :class="{ 'is-invalid': submitted && $v.userData.email.$error }"
              />
              <div
                v-if="submitted && $v.userData.email.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.userData.email.required"
                  >* Email is required</span
                >
                <span v-if="!$v.userData.email.email">* Email is invalid</span>
              </div>
            </div>

            <password-input
              v-model="userData.password"
              label="Password"
              :class="{
                'is-invalid': submitted && $v.userData.password.$error,
              }"
            ></password-input>
            <div
              v-if="submitted && $v.userData.password.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.userData.password.required"
                >* Password is required</span
              >
              <span v-if="!$v.userData.password.minLength"
                >* Password must be at least 6 characters</span
              >
            </div>

            <password-input
              v-model="userData.confirmPassword"
              label="Confirm Password"
              :class="{
                'is-invalid': submitted && $v.userData.confirmPassword.$error,
              }"
            ></password-input>
            <div
              v-if="submitted && $v.userData.confirmPassword.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.userData.confirmPassword.required"
                >* Confirm Password is required</span
              >
              <span v-else-if="!$v.userData.confirmPassword.sameAsPassword"
                >* Passwords must match</span
              >
            </div>
            <button @click="register($event)" class="btn btn-block btn-login">
              Sign up
            </button>
            <div class="login-info text-center mt-2">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordInput from "@/components/Password";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "SignUp",
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
      userData: {
        name: "",
        email: "",
        role: "User",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
      error: null
    };
  },
  validations: {
    userData: {
      name: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs(function () {
          return this.userData.password;
        }),
      },
    },
  },
  methods: {
    register: function (event) {
      event.preventDefault();
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let user = {
        name: this.userData.name,
        role: this.userData.role,
        email: this.userData.email,
        password: this.userData.password,
      };

     // console.log(user);
      this.$store
        .dispatch("register", user)
        .then((res) => {
          this.error = null;
          this.$store.dispatch("getUser")
          this.$router.push("/");
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          this.error = error.response.data.error;
        });
    },
  },
};
</script>

<style scoped>
</style>>
