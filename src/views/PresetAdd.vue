<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="presets"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="container scroll-content">
          <div class="dashboard-top">
            <h6 class="title">Add Preset</h6>
            <div class="desc">
              Use presets to save recurring details<br />
              and make your work a lot easier.
            </div>
          </div>
          <div class="content-wrap extra-margin-left-wrap">
            <b-form-group
              label="Name"
              label-for="name"
              label-class="form-label"
            >
              <b-form-input
                id="name"
                v-model="form.name"
                type="text"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Company Name"
              label-for="company-name"
              label-class="form-label"
            >
              <b-form-input
                id="company-name"
                v-model="form.companyName"
                type="text"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Product Name"
              label-for="prod-name"
              label-class="form-label"
            >
              <b-form-input
                id="prod-name"
                v-model="form.productName"
                type="text"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="What do you do?"
              label-for="occupation"
              label-class="form-label"
            >
              <b-form-input
                id="occupation"
                v-model="form.occupation"
                type="text"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Tag line"
              label-for="tag-line"
              label-class="form-label"
            >
              <b-form-input
                id="tag-line"
                v-model="form.tagLine"
                type="text"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-end mt-5">
              <b-button class="save-modal px-3 py-2">Save</b-button>
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

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      form: {
        name: "",
        companyName: "",
        productName: "",
        occupation: "",
        tagLine: "",
      },
    };
  },
};
</script>

<style>
.extra-margin-left-wrap {
  margin-left: 14rem;
  padding: 2rem;
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
