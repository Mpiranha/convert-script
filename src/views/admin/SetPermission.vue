<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="roles"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="container scroll-content">
          <div class="sec-padding">
            <div
              class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-5
              "
            >
              <h6 class="title mb-0">Set Permissions for {{ role.name }}</h6>
              <div class="d-flex align-items-center">
                <button
                  @click="clearField"
                  class="btn btn-create py-2"
                  v-b-modal.modal-new-client
                >
                  Save
                </button>
              </div>
            </div>

            <div class="content-wrap set-min-h pt-4 pb-5">
              <div class="search-form mb-2">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input
                  class="form-control no-shadow search-input"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <loader-modal
                :loading-state="this.$store.state.loading"
              ></loader-modal>
              <div v-if="permissions.length === 0" class="no-data-info">
                Permissions will display here.
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>ID</td>
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="permission in permissions" :key="permission.id">
                    <td class="">{{ permission.name }}</td>
                    <td>{{ permission.id }}</td>
                    <td>
                      <label class="switch mb-0">
                        <input
                          :checked="isPermissionAvailable(permission.name)"
                          type="checkbox"
                        />
                        <span class="slider round"></span>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center">
              <b-pagination
                v-model="currentPage"
                :total-rows="1"
                :per-page="perPage"
                aria-controls="my-table"
                size="sm"
                :hide-goto-end-buttons="true"
                prev-text="<"
                next-text=">"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <b-modal
      :hide-header="true"
      id="modal-new-client"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >


      <b-form-group label="Name">
        <b-form-input
          id="name"
          v-model="userData.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Description">
        <b-form-textarea
          id="name"
          v-model="userData.email"
          type="text"
          class="input-table"
          rows="4"
        >
        </b-form-textarea>
      </b-form-group>

      <b-form-group label="Upload">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        >
        </b-form-file>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-client')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editAgency(editId, campaignName) : addAgency()"
          class="save-modal"
          >{{ triggerEdit ? "Edit" : "Add Client" }}</b-button
        >
      </div>
    </b-modal> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "Permission",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      file: null,
      permissions: [],
      role: [],
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    getRole(id) {
      this.$store
        .dispatch("getOneRole", id)
        .then((res) => {
          this.role = res.data.data;

           // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
           // this.$store.commit("updateLoadState", false);
        });
    },
    getAllPermissions() {
       // this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllPermissions")
        .then((res) => {
          this.permissions = res.data.data;
           // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
           // this.$store.commit("updateLoadState", false);
        });
    },
    addAgency() {
       // this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");

      this.$store
        .dispatch("addAgency", this.client)
        .then((res) => {
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.getAgency();
           // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
           // this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    editAgency(id) {
       // this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");
      this.$store
        .dispatch("editAgency", { id: id, data: this.client })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.getAgency();
          //   this.loading = false;
           // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          //   this.loading = false;
           // this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });
    },
    deleteAgency(id) {
      //   this.loading = true;
       // this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteAgency", id)
        .then((res) => {
          this.error = null;
          this.getAgency();
          console.log(res.data);
          //   this.loading = false;
           // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          //   this.loading = false;
           // this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();
    },

    openEditModal(id, data) {
      this.$bvModal.show("modal-new-client");
      this.triggerEdit = true;
      this.editId = id;
      this.client.name = data.name;
      this.client.email = data.email;
    },
    clearField() {
      this.client = {
        name: "",
        email: "",
      };
      this.triggerEdit = false;
    },
    isPermissionAvailable(elem) {
  
      let found;

      if (this.role.permissions) {
        found = this.role.permissions.find((element) => element.name == elem);
      }

      if (found) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getRole(this.$route.params.id);
    this.getAllPermissions();
  },
  computed: {},
};
</script>

<style>
.control-width {
  max-width: 500px !important;
}
.plan-types {
  padding-right: 0.4rem;
  display: inline-flex;
}

.plan-types::after {
  content: ",";
}
</style>
