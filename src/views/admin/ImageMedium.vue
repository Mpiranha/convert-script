<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="medium"></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="sec-padding">
              <div class="
                    dashboard-top
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-5
                  ">
                <h6 class="title">Medium</h6>
                <div class="d-flex align-items-center">
                  <button @click="clearField" class="btn btn-create" v-b-modal.modal-new-medium>
                    <span>+</span>
                    New Medium
                  </button>
                </div>
              </div>
              <div class="content-wrap set-min-h pt-4 pb-5">
                <div class="search-form mb-2">
                  <button class="btn search-btn">
                    <i class="flaticon-loupe icons"></i>
                  </button>
                  <input v-model="searchKey" @input="searchKeyWord" class="form-control no-shadow search-input"
                    type="text" placeholder="Search" />
                </div>
                <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
                <div v-if="mediums.length === 0" class="no-data-info">
                  Created medium will display here.
                </div>
                <table v-else class="table table-custom">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th class="text-center">ID</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="result in searchResult" :key="result.id">
                      <td scope="row">{{ result.name }}</td>

                      <td>{{ result.id }}</td>
                      <td>
                        <dropdown-tool @edit-clicked="
                          openEditModal(result.id, {
                            name: result.name,
                          })
                        " @delete-proceed="deleteMedium(result.id)" delete-what="medium">
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="mediums && searchKey.length < 1">
                    <tr v-for="medium in mediums" :key="medium.id">
                      <td scope="row">{{ medium.name }}</td>
                      <td class="text-center">{{ medium.id }}</td>
                      <td>
                        <dropdown-tool @edit-clicked="
                          openEditModal(medium.id, {
                            name: medium.name,
                          })
                        " @delete-proceed="deleteMedium(medium.id)" delete-what="medium">
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center">
                <b-pagination v-model="currentPage" :total-rows="mediumLength" :per-page="perPage"
                  aria-controls="my-table" size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">"
                  @change="handlePageChange"></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :hide-header="true" id="modal-new-medium" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <!-- <div class="modal-head">
        <h3 class="title">Give your campaign a name</h3>
        <p class="desc">Only you can see this</p>
      </div> -->

      <b-form-group label="Name">
        <b-form-input id="name" v-model="mediumData.name" type="text" class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="ID">
        <b-form-input id="medium-id" v-model="mediumData.id" type="text" class="input-table">
        </b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-medium')" class="close-modal">Close</b-button>
        <b-button @click="
          triggerEdit ? editMedium(editId, mediumData) : addMedium()
        " class="save-modal">{{ triggerEdit ? "Edit" : "Save" }}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
import Navbar from "@/components/TheNav.vue";
import DropdownTool from "@/components/DropdownTool";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "ImageMedium",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      perPage: 20,
      currentPage: 1,
      mediumLength: 0,
      mediums: [],
      mediumData: {
        name: "",
        id: "",
      },
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllMediums();
    },
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/ai_medium",
          keyword: this.searchKey,
        })
        .then((res) => {
          this.searchResult = res.data.data;

          // console.log(res.data + "called now");
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getAllMediums() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllMedium")
        .then((res) => {
          this.mediums = res.data.data;
          // this.rolesLength = res.data.meta.total;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addMedium() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-medium");
      this.$store
        .dispatch("addMedium", this.mediumData)
        .then((res) => {
          console.log(res);
          this.getAllMediums();
          this.mediumData = {
            name: "",
            id: "",
          };
          this.makeToast("success", "medium added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editMedium(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-medium");
      this.$store
        .dispatch("editMedium", {
          id: id,
          data: this.mediumData,
        })
        .then(() => {
         
          this.getAllMediums();
          this.mediumData = {
            name: "",
            id: "",
          };
          this.makeToast("success", "medium edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteMedium(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteMedium", id)
        .then(() => {
      
          this.getAllMediums();
          this.makeToast("success", "medium deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },

    openEditModal(id, data) {
      this.$bvModal.show("modal-new-medium");
      this.triggerEdit = true;
      this.editId = id;
      this.mediumData.name = data.name;
      this.mediumData.id = id;
    },
    clearField() {
      this.mediumData = {
        name: "",
        id: "",
      };
      this.triggerEdit = false;
    },
  },

  mounted() {
    this.getAllMediums();
  },
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
