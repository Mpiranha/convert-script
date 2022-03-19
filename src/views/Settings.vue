<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="settings"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="container scroll-content">
          <div class="d-flex">
            <div class="dashboard-top">
              <h6 class="title">Account Details</h6>
              <div class="desc">Edit your account information, here.</div>
            </div>
          </div>
          <loader-modal
            :loading-state="this.$store.state.loading"
          ></loader-modal>

          <div class="content-wrap extra-margin-left-wrap">
            <b-form-group
              label="First Name"
              label-for="name"
              label-class="form-label"
            >
              <b-form-input
                id="name"
                v-model="userDetails.first_name"
                type="text"
                class="input-table"
                :class="{
                  'is-invalid':
                    submittedDetails && $v.userDetails.first_name.$error,
                }"
              >
              </b-form-input>
            </b-form-group>

            <div
              v-if="submittedDetails && !$v.userDetails.first_name.required"
              class="invalid-feedback"
            >
              * First name is required
            </div>

            <b-form-group
              label="Last Name"
              label-for="name"
              label-class="form-label"
            >
              <b-form-input
                id="name"
                v-model="userDetails.last_name"
                type="text"
                class="input-table"
                :class="{
                  'is-invalid':
                    submittedDetails && $v.userDetails.last_name.$error,
                }"
              >
              </b-form-input>
            </b-form-group>

            <div
              v-if="submittedDetails && !$v.userDetails.last_name.required"
              class="invalid-feedback"
            >
              * Last name is required
            </div>

            <b-form-group
              label="Email"
              label-for="email"
              label-class="form-label"
            >
              <b-form-input
                readonly
                id="email"
                v-model="email"
                type="email"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <!-- <b-form-group label="My Profile" label-class="form-label">
              <div class="d-flex user-img-wrap-setting">
                <img
                  class="user-img-settings"
                  src="@/assets/icons/profile-user.svg"
                  alt=""
                />
                <div>
                  <div class="desc">
                    Recommended dimensions <b>100 x 100</b>
                  </div>
                  <button class="btn close-modal">Change Profile</button>
                </div>
              </div>
            </b-form-group> -->

            <div class="d-flex justify-content-end align-self-end mb-2">
              <b-button
                @click="updateUserDetails()"
                class="save-modal px-4 py-2"
                >Save</b-button
              >
            </div>
          </div>

          <div class="content-wrap extra-margin-left-wrap">
            <password-input
              label="Current Password"
              v-model.trim="pwd.password"
              class-label="form-label"
              :class="{ 'is-invalid': submittedPwd && $v.pwd.password.$error }"
            ></password-input>
            <div
              v-if="submittedPwd && $v.pwd.password.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.pwd.password.required"
                >* Password is required</span
              >
              <span v-if="!$v.pwd.password.minLength"
                >* Password must be at least 6 characters</span
              >
            </div>

            <password-input
              label="New Password"
              v-model.trim="pwd.newPassword"
              class-label="form-label"
              :class="{
                'is-invalid': submittedPwd && $v.pwd.newPassword.$error,
              }"
            ></password-input>
            <div
              v-if="submittedPwd && $v.pwd.newPassword.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.pwd.newPassword.required"
                >* Password is required</span
              >
              <span v-if="!$v.pwd.newPassword.minLength"
                >* Password must be at least 6 characters</span
              >
            </div>
            <password-input
              label="Confirm New Password"
              v-model.trim="pwd.confirmNewPassword"
              class-label="form-label"
              :class="{
                'is-invalid': submittedPwd && $v.pwd.confirmNewPassword.$error,
              }"
            ></password-input>
            <div
              v-if="submittedPwd && $v.pwd.confirmNewPassword.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.pwd.confirmNewPassword.required"
                >* Password is required</span
              >
              <span v-if="!$v.pwd.confirmNewPassword.minLength"
                >* Password must be at least 6 characters</span
              >
              <span v-else-if="!$v.pwd.confirmNewPassword.sameAsPassword"
                >* Passwords must match</span
              >
            </div>

            <div class="d-flex justify-content-end align-self-end mb-2">
              <b-button @click="changePassword" class="save-modal px-4 py-2"
                >Save</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import PasswordInput from "@/components/Password";
import { mapState } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "Settings",
  components: {
    Sidebar,
    Navbar,
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
      userDetails: {
        first_name: "",
        last_name: "",
      },
      email: "",
      pwd: {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      userData: null,
      submittedPwd: false,
      submittedDetails: false,
    };
  },
  validations: {
    pwd: {
      password: {
        required,
        minLength: minLength(6),
      },
      newPassword: {
        required,
        minLength: minLength(6),
      },
      confirmNewPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs(function () {
          return this.pwd.newPassword;
        }),
      },
    },
    userDetails: {
      first_name: {
        required,
        minLength: minLength(3),
      },
      last_name: {
        required,
        minLength: minLength(3),
      },
    },
  },
  computed: mapState(["user"]),
  mounted() {
    // this.$store.dispatch("getUser");
    this.getUser();
  },
  methods: {
    getUser() {
      this.$store
        .dispatch("getUser")
        .then((res) => {
          this.userData = res.data.data;
          this.populateForm();
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    populateForm() {
      this.userDetails.first_name = this.userData.first_name;
      this.userDetails.last_name = this.userData.last_name;
      this.email = this.userData.email;
    },

    updateUserDetails() {
      this.$store.commit("updateLoadState", true);

      this.submittedDetails = true;

      this.$v.$touch();
      if (this.$v.userDetails.$invalid) {
        return;
      }

      this.$store
        .dispatch("updateUserDetails", {
          first_name: this.userDetails.first_name,
          last_name: this.userDetails.last_name,
          role: "User",
          email: this.email,
        })
        .then((res) => {
          console.log(res);
          this.getAllCategories();
          this.categoryData = {
            name: "",
            id: "",
          };
          this.makeToast("success", "Profile Updated successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    changePassword: function (event) {
      event.preventDefault();
      this.submittedPwd = true;

      this.$v.$touch();
      if (this.$v.pwd.$invalid) {
        return;
      }

      let data = {
        current_password: this.pwd.password,
        password: this.pwd.newPassword,
      };

      this.$store
        .dispatch("changePassword", data)
        .then((res) => {
          this.error = null;

          this.makeToast("success", res.data.message);
        })
        .catch((error) => {
          // console.log(error);

          this.error = error;
          this.makeToast("danger", this.error);
        });
    },
  },
};
</script>

<style>
.ml-auto {
  margin-left: auto;
}

.extra-margin-left-wrap {
  margin-left: 14rem;
  padding: 2rem;
}

.user-img-settings {
  width: 4rem;
  margin-right: 1rem;
}

.user-img-wrap-setting .desc {
  font-size: 0.8rem;
  color: #444a50;
  margin-bottom: 0.7rem;
}

.extra-margin-left-wrap .form-group {
  margin-bottom: 1.3rem;
}

.extra-margin-left-wrap .form-label {
  font-size: 0.8rem !important;
  color: #808da2;
  margin-bottom: 0.3rem;
}

.extra-margin-left-wrap .input-table {
  font-size: 0.9rem;
}
</style>
