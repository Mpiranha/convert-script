<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap justify-content-center">
      <div class="form-section">
        <div class="login-form-wrap">
          <div class="d-flex justify-content-center mb-5">
            <img class="img-logo" src="../assets/image/Logo.svg" alt="Logo Image" />
          </div>

          <h1 class="title">Sign up</h1>
          <div class="error">{{ error }}</div>

          <!-- <a :href="signedURL" target="_blank" class="btn btn_sign_in_google">
            <img src="@/assets/icons/google-icon.svg" alt="google icon">
            <span class="btn_text">Sign up with Google</span>
          </a> -->


          <!-- <div class="line_wrap">
            <div class="line"></div>
            <div class="or_text">OR</div>
            <div class="line"></div>
          </div> -->

          <form action="#" method="post">
            <div class="form-group">
              <label for="first_name">First Name *</label>
              <input id="first_name" class="form-control input-signin" type="text" name="" v-model="userData.first_name"
                :class="{
                  'is-invalid': submitted && $v.userData.first_name.$error,
                }" />
              <div v-if="submitted && !$v.userData.first_name.required" class="invalid-feedback">
                * First Name is required
              </div>
            </div>
            <div class="form-group">
              <label for="last_name">Last Name *</label>
              <input id="last_name" class="form-control input-signin" type="text" name="" v-model="userData.last_name"
                :class="{
                  'is-invalid': submitted && $v.userData.last_name.$error,
                }" />
              <div v-if="submitted && !$v.userData.last_name.required" class="invalid-feedback">
                * Last Name is required
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input id="email" class="form-control input-signin" type="email" name="" v-model="userData.email"
                :readonly="lockedEmail" :class="{ 'is-invalid': submitted && $v.userData.email.$error }" />
              <div v-if="submitted && $v.userData.email.$error" class="invalid-feedback">
                <span v-if="!$v.userData.email.required">* Email is required</span>
                <span v-if="!$v.userData.email.email">* Email is invalid</span>
              </div>
            </div>

            <password-input v-model="userData.password" label="Password" :class="{
              'is-invalid': submitted && $v.userData.password.$error,
            }"></password-input>
            <div v-if="submitted && $v.userData.password.$error" class="invalid-feedback">
              <span v-if="!$v.userData.password.required">* Password is required</span>
              <span v-if="!$v.userData.password.minLength">* Password must be at least 6 characters</span>
            </div>

            <password-input v-model="userData.confirmPassword" label="Confirm Password" :class="{
              'is-invalid': submitted && $v.userData.confirmPassword.$error,
            }"></password-input>
            <div v-if="submitted && $v.userData.confirmPassword.$error" class="invalid-feedback">
              <span v-if="!$v.userData.confirmPassword.required">* Confirm Password is required</span>
              <span v-else-if="!$v.userData.confirmPassword.sameAsPassword">* Passwords must match</span>
            </div>
            <div class="form-group" v-show="!invitationLink">
              <label for="promo_code">Promo Code (Optional)</label>
              <input id="promo_code" class="form-control input-signin" type="text" name=""
                v-model="userData.purchase_code" />
            </div>
            <button @click="register($event)" :disabled="disabledButton" class="btn btn-block btn-login">
              <span>
                Sign Up
              </span>
              <img class="spinner" src="../assets/image/Rolling-1s-64px.gif" alt="loading icon">
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
import alertMixin from '@/mixins/alertMixin';
export default {
  name: "SignUp",
  components: {
    PasswordInput,
  },
  mixins: [alertMixin],
  provide() {
    return {
      $v: this.$v,
    };
  },
  data() {
    return {
      disabledButton: false,
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        purchase_code: "",

      },
      lockedEmail: false,
      invitationLink: false,
      submitted: false,
      error: null,
      signedURL: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...
    console.log(to);
    if (to.query.invite_data) {

      var invite_data = atob(to.query.invite_data);
      invite_data = JSON.parse(invite_data);
      console.log(invite_data);

      next(vm => {

        vm.lockedEmail = true;
        vm.invitationLink = true;

        vm.userData = {
          first_name: "",
          last_name: "",
          email: invite_data.email,
          password: "",
          confirmPassword: "",
          workspace: true,
          workspace_id: invite_data.workspace_id
        }
      })

    } else {
      next();
    }
  },
  mounted: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push("/");
    }

    //  this.getGoogleSignURL();



  },
  validations: {
    userData: {
      first_name: {
        required,
        minLength: minLength(3),
      },
      last_name: {
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

      this.disabledButton = true;
      let user = {};
      if (this.invitationLink) {
        user = {
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
          email: this.userData.email,
          password: this.userData.password,
          workspace: true,
          workspace_id: this.userData.workspace_id
        }
      } else if (this.userData.purchase_code.length > 0) {
        user = {
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
          role: this.userData.role,
          email: this.userData.email,
          password: this.userData.password,
          purchase_code: this.userData.purchase_code,
        };
      } else {
        user = {
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
          role: this.userData.role,
          email: this.userData.email,
          password: this.userData.password,
        };
      }

      // console.log(user);
      this.$store
        .dispatch("register", user)
        .then((res) => {
          this.error = null;
          this.$store.dispatch("getUser");
          this.$router.push("/");
          console.log(res.data.data);
        })
        .catch((error) => { console.log(error.response.data.message);
          var object = error.response.data.errors;
          for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
           
              this.makeToast("danger", object[key]);
             
            }
          }
          this.disabledButton = false;
          this.error = error.response.data.message;
        });
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

          console.log();
          // this.error = error;
        });

    },
  },
};
</script>

<style scoped></style>>
