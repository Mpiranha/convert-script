<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="preset"
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
          <div class="content-wrap extra-margin-left">
            <b-form-group
              label="Name"
              label-for="name"
              label-class="form-label"
            >
              <b-form-input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Name"
                class="input-table"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Email"
              label-for="email"
              label-class="form-label"
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="text"
                placeholder="user@domain.com"
                class="input-table"
              >
              </b-form-input>
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

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
  },
  data () {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  }
}; 
</script>

<style scoped>
.extra-margin-left {
  margin-left: 14rem;
}
</style>
