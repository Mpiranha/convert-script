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
            <div class="ml-auto align-self-end mb-2">
              <b-button class="save-modal px-3 py-2">Save</b-button>
            </div>
          </div>

          <div class="content-wrap extra-margin-left-wrap">
            <b-form-group
              label="First Name"
              label-for="name"
              label-class="form-label"
            >
              <b-form-input
                id="name"
                v-model="firstname"
                type="text"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

             <b-form-group
              label="Last Name"
              label-for="name"
              label-class="form-label"
            >
              <b-form-input
                id="name"
                v-model="lastname"
                type="text"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Email"
              label-for="company-name"
              label-class="form-label"
            >
              <b-form-input
                id="company-name"
                v-model="form.email"
                type="email"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <password-input
              label="Password"
              v-model.trim="form.password"
              class-label="form-label"
            ></password-input>

            <password-input
              label="New Password"
              v-model.trim="form.newPassword"
              class-label="form-label"
            ></password-input>

            <b-form-group label="My Profile" label-class="form-label">
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
            </b-form-group>
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

export default {
  name: "Settings",
  components: {
    Sidebar,
    Navbar,
    PasswordInput,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      form: {
        name: "",
        email: "",
        password: "",
        newPassword: "",
      },
      userData: null,
    };
  },
  computed: mapState(["user"]),
  mounted() {
    // this.$store.dispatch("getUser");
  },
  methods: {
    assignUser(user) {
      this.userData = user;
    },
    populateForm() {
      this.form.name = this.userData.name;
      this.form.email = this.userData.email;
    },
  },
  watch: {
    user(newValue, oldValue) {
      console.log(`Updating from ${oldValue.name} to ${newValue}`);

      // Do whatever makes sense now
      // if (newValue === "success") {
      //   this.complex = {
      //     deep: "some deep object",
      //   };
      // }

      this.assignUser(newValue);
      this.populateForm();
    },
    computed: {
      username() {
        return `${this.lastname} ${this.firstname}`;
      }
    }
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
