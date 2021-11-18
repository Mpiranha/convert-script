<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="agency-files"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="container-fluid scroll-content">
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
            <h6 class="title mb-0">Agency File</h6>
            <div class="d-flex align-items-center">
              <button
              @click="clearField"
                class="btn btn-create"
                v-b-modal.modal-new-agency
              >
                <span>+</span>
                New File
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
            <div v-if="agencyFiles.length === 0" class="no-data-info">
              Created agency will display here.
            </div>
            <table v-else class="table table-custom">
              <thead>
                <tr>
                  <th>Name</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="agency in agencyFiles" :key="agency.id" >
                  <td scope="row">{{ agency.name }}</td>
                  
                  <td class="text-right">
                    <nav class="nav flex-column action-view">
                      <a 
                      class="nav-link" 
                      href="#"
                      @click="openEditModal(agency.id, agency)">Edit</a>
                      <a 
                      class="nav-link" 
                      href="#"
                      @click="deleteAgency(agency.id)">Delete</a>
                    </nav>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPage"
              :total-rows="agencyFileLength"
              :per-page="perPage"
              aria-controls="my-table"
              size="sm"
              :hide-goto-end-buttons="true"
              prev-text="<"
              next-text=">"
              @change="handlePageChange"
            ></b-pagination>
          </div>
          </div>
          
        </div>
      </div>
    </div>
     <b-modal
      :hide-header="true"
      id="modal-new-agency"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <!-- <div class="modal-head">
        <h3 class="title">Give your campaign a name</h3>
        <p class="desc">Only you can see this</p>
      </div> -->

      <b-form-group label="Name">
        <b-form-input
          id="name"
          v-model="agencyFileData.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Email">
        <b-form-input
          id="name"
          v-model="agencyFileData.email"
          type="email"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <!-- <b-form-group label="Description">
        <b-form-textarea
          id="name"
          v-model="agencyFileData.desc"
          type="text"
          class="input-table"
          rows="4"
        >
        </b-form-textarea>
      </b-form-group> -->
      <!-- <b-form-group label="Access URL">
        <b-form-input
          id="name"
          v-model="agencyFileData.url"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group> -->
      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-agency')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editAgency(editId, agencyFileData) : addAgency()"
          class="save-modal"
          >
          {{ triggerEdit ? "Edit" : "Save" }}
          </b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "Users",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      agencyFiles: [],
      agencyFileLength: 0,
      agencyFileData: {
        name: "",
        email: ""
        
      },
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    getAgency() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllAgencyFiles", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.agencyFiles = res.data.data;
          this.agencyFileLength = res.data.meta.total;
          console.log(res.data);
          console.log("Current Page: " + this.currentPage);
          console.log("Per Page: " + this.perPage);

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
      // this.$store
      //   .dispatch("getAllAgency")
      //   .then((res) => {
      //     this.users = res.data.data;
      //     // console.log(res.data + "called now");
      //     //this.loading = false;
      //     this.$store.commit("updateLoadState", false);
      //   })
      //   .catch((error) => {
      //     // // console.log(error);
      //     // this.error = error.response.data.errors.root;
      //     // // this.error = error;
      //     console.log(error);
      //     //this.loading = false;
      //     this.$store.commit("updateLoadState", false);
      //   });
    },
    addAgency() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-agency");
      this.$store
        .dispatch("addAgencyFile", this.agencyFileData)
        .then((res) => {
          console.log(res);
          this.getAgency();
          this.agencyFileData = {
            name: "",
            email: ""
          };
          this.makeToast("success", "AgencyFile added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editAgency(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-agency");
      this.$store
        .dispatch("editAgencyFile", {
          id: id,
          data: this.agencyFileData,
        })
        .then((res) => {
          console.log(res);
          this.getAgency();
          this.agencyFileData = {
            name: "",
            email: ""
          };
          this.makeToast("success", "Agency File edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteAgency(id) {
     this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteAgencyFile", id)
        .then((res) => {
          console.log(res);
          this.getAgency();
          this.makeToast("success", "Agency File deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },

     handlePageChange(value) {
      this.currentPage = value;
      this.getAgency();
      console.log("Value: " + value);
    },

    openEditModal(id, data) {
      this.$bvModal.show("modal-new-agency");
      this.triggerEdit = true;
      this.editId = id;
      this.agencyFileData.name = data.name;
      this.agencyFileData.email = data.email;
    },
      clearField() {
      this.agencyFileData = {
        name: "",
        email: ""
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.client.name = data;
    },
    formatDate(date) {
      var formatedDate = new Date(date);

      return formatedDate.toLocaleDateString();
    },
  },

  mounted() {
    this.getAgency();
  },
  computed: {
  
  },
};
</script>

<style>
.sec-padding{
  padding-left: 200px;
  padding-right: 200px;
}
</style>
