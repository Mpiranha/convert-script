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

          <form action="#" method="post">
            <div class="form-group">
              <label for="my-input">Name</label>
              <input
                id="my-input"
                class="form-control input-signin"
                type="text"
                name=""
                v-model="userData.name"
              />
            </div>
            <div class="form-group">
              <label for="my-input">Email</label>
              <input
                id="my-input"
                class="form-control input-signin"
                type="email"
                name=""
                v-model="userData.email"
              />
            </div>
            <password-input v-model="userData.password" label="Password"></password-input>
            <password-input v-model="confirmPassword" label="Confirm Password"></password-input>
            <button @click="register($event)" class="btn btn-block btn-login">Sign up</button>
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
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
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
        name: '',
        email: '',
        role: 'user',
        password: ''
      },
      confirmPassword: ''
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      minLength: minLength(1),
      email,
    },
    password: {
      minLength: minLength(4),
    },
  },
  methods: {
    register: function (event) {
      event.preventDefault();
      // let user = new FormData()
      // user.append('firstName', this.firstName)
      // user.append('lastName', this.lastName)
      // user.append('email', this.email)
      // user.append('password', this.password)
      let user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      console.log(user);
      this.$store
        .dispatch("register", user)
        .then((res) => {
          this.error = null;
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
