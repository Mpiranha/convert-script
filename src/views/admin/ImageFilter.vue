<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="filter"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="scroll-content">
          <div class="container">
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
                <h6 class="title">Filter</h6>
                <div class="d-flex align-items-center">
                  <button
                    @click="clearField"
                    class="btn btn-create"
                    v-b-modal.modal-new-filter
                  >
                    <span>+</span>
                    New Filter
                  </button>
                </div>
              </div>
              <div class="content-wrap set-min-h pt-4 pb-5">
                <div class="search-form mb-2">
                  <button class="btn search-btn">
                    <i class="flaticon-loupe icons"></i>
                  </button>
                  <input
                    v-model="searchKey"
                    @input="searchKeyWord"
                    class="form-control no-shadow search-input"
                    type="text"
                    placeholder="Search"
                  />
                </div>
                <loader-modal
                  :loading-state="this.$store.state.loading"
                ></loader-modal>
                <div v-if="filters.length === 0" class="no-data-info">
                  Created filters will display here.
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
                        <dropdown-tool
                          @edit-clicked="
                            openEditModal(result.id, {
                              name: result.name,
                            })
                          "
                          @delete-proceed="deleteFilter(result.id)"
                          delete-what="Filter"
                        >
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="filters && searchKey.length < 1">
                    <tr v-for="filter in filters" :key="filter.id">
                      <td scope="row">{{ filter.name }}</td>
                      <td class="text-center">{{ filter.id }}</td>
                      <td>
                        <dropdown-tool
                          @edit-clicked="
                            openEditModal(filter.id, {
                              name: filter.name,
                            })
                          "
                          @delete-proceed="deleteFilter(filter.id)"
                          delete-what="Filter"
                        >
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="filterLength"
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
    </div>

    <b-modal
      :hide-header="true"
      id="modal-new-filter"
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
          v-model="filterData.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="ID">
        <b-form-input
          id="filter-id"
          v-model="filterData.id"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-new-filter')"
          class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="
            triggerEdit ? editFilter(editId, filterData) : addFilter()
          "
          class="save-modal"
          >{{ triggerEdit ? "Edit" : "Save" }}</b-button
        >
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
  name: "ImageFilter",
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
      filterLength: 0,
      filters: [],
      filterData: {
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
      this.getAllFilters();
      console.log("Value: " + value);
    },
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/ai_filter",
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
    getAllFilters() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllFilters")
        .then((res) => {
          this.filters = res.data.data;
          // this.rolesLength = res.data.meta.total;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addFilter() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-filter");
      this.$store
        .dispatch("addFilter", this.filterData)
        .then((res) => {
          console.log(res);
          this.getAllFilters();
          this.filterData = {
            name: "",
            id: "",
          };
          this.makeToast("success", "Filter added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editFilter(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-filter");
      this.$store
        .dispatch("editFilter", {
          id: id,
          data: this.filterData,
        })
        .then((res) => {
          console.log(res);
          this.getAllFilters();
          this.filterData = {
            name: "",
            id: "",
          };
          this.makeToast("success", "Filter edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteFilter(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteFilter", id)
        .then((res) => {
          console.log(res);
          this.getAllFilters();
          this.makeToast("success", "Filter deleted successfully");
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
      this.$bvModal.show("modal-new-filter");
      this.triggerEdit = true;
      this.editId = id;
      this.filterData.name = data.name;
      this.filterData.id = id;
    },
    clearField() {
      this.filterData = {
        name: "",
        id: "",
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.filterData.name = data;
    },
  },

  mounted() {
    this.getAllFilters();
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
