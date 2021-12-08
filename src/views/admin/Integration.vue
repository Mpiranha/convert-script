<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="integrationadmin"
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
            <h6 class="title">Integration</h6>
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
                @change="makeToast('primary', 'try me')"
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div v-if="platformsLength === 0" class="no-data-info">
              Created agency will display here.
            </div>
            <table v-else class="table table-custom">
              <thead>
                <tr>
                  <th>Name</th>

                  <th class="text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="platform in platforms" :key="platform.id">
                  <td class="">{{ platform.name }}</td>

                  <td>
                    <label class="switch mb-0">
                      <input :checked="platform.activate" type="checkbox" />
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
              :total-rows="platformsLength"
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
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "PlatformIntegration",
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
      platforms: [],
      platformsLength: 0,
      // userData: {
      //   name: "",
      //   email: "",
      // },
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    getAllIntegrations() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllPlatformIntegration")
        .then((res) => {
          this.platforms = res.data.data;
          this.platformsLength = this.platforms.length;
          // console.log(res.data);
          // console.log("Current Page: " + this.currentPage);
          // console.log("Per Page: " + this.perPage);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addAgency() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");

      this.$store
        .dispatch("addAgency", this.client)
        .then((res) => {
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.getAgency();
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    editAgency(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");
      this.$store
        .dispatch("editAgency", { id: id, data: this.client })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.getAgency();
          //   this.loading = false;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          //   this.loading = false;
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });
    },
    deleteAgency(id) {
      //   this.loading = true;
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteAgency", id)
        .then((res) => {
          this.error = null;
          this.getAgency();
          console.log(res.data);
          //   this.loading = false;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          //   this.loading = false;
          this.$store.commit("updateLoadState", false);
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
    getCurrent(data) {
      this.client.name = data;
    },
    orderSort(arr) {
      return arr.sort(function (a, b) {
        return a.id - b.id;
      });
    },
    formatDate(date) {
      var formatedDate = new Date(date);

      return formatedDate.toLocaleDateString();
    },
  },
  mounted() {
    this.getAllIntegrations();
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
