<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="integration"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="container scroll-content">
          <div class="dashboard-top">
            <h6 class="title">New Integration</h6>
            <div class="desc">
              Sync your scripts to your email marketing <br />
              platforms
            </div>
          </div>
          <div class="row mt-5">
            <integration-box
              type-title="Aweber"
              img-url="icons/convert-icon/Aweber.svg"
              link-url="#"
            ></integration-box>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      :hide-header="true"
      id="modal-api"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <h1 class="modal-title-api">Aweber Integration</h1>
      <b-form-group
        label="API KEY"
        label-for="key-api"
        label-class="api-form-label"
      >
        <b-form-input
          id="key-api"
          v-model="apiKey"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="API URL"
        label-for="url-api"
        label-class="api-form-label"
      >
        <b-form-input
          id="url-api"
          v-model="apiUrl"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button  @click="$bvModal.hide('modal-api')" class="close-modal">Go back</b-button>
        <b-button class="save-modal">Create</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import IntegrationBox from "@/components/IntegrationBox";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    IntegrationBox,
  },
  data() {
    return {
      apiKey: "",
      apiUrl: "",
    };
  },
};
</script>

<style>

.modal-title-api {
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.api-form-label {
  color: #8994a8;
  font-size: 0.7rem;
}

#modal-api .form-group {
  margin-bottom: 1.5rem;
}
</style>
