<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="category"
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
                <h6 class="title">Category</h6>
                <div class="d-flex align-items-center">
                  <button
                    @click="clearField"
                    class="btn btn-create"
                    v-b-modal.modal-new-category
                  >
                    <span>+</span>
                    New Category
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
                <div v-if="categories.length === 0" class="no-data-info">
                  Created Category will display here.
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
                          @delete-proceed="deleteCategory(result.id)"
                          delete-what="Category"
                        >
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="categories && searchKey.length < 1">
                    <tr v-for="category in categories" :key="category.id">
                      <td scope="row">{{ category.name }}</td>
                      <td class="text-center">{{ category.id }}</td>
                      <td>
                        <dropdown-tool
                          @edit-clicked="
                            openEditModal(category.id, {
                              name: category.name,
                            })
                          "
                          @delete-proceed="deleteCategory(category.id)"
                          delete-what="Category"
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
                  :total-rows="categoryLength"
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
      id="modal-new-category"
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
          v-model="categoryData.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="ID">
        <b-form-input
          id="category-id"
          v-model="categoryData.id"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-new-category')"
          class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="
            triggerEdit ? editCategory(editId, categoryData) : addCategory()
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
  name: "Category",
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
      categoryLength: 0,
      categories: [],
      categoryData: {
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
      this.getAllCategories();
      console.log("Value: " + value);
    },
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/script-type-categories",
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
    getAllCategories() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllCategories")
        .then((res) => {
          this.categories = res.data.data;
          // this.rolesLength = res.data.meta.total;
          console.log(res.data);
          console.log("Current Page: " + this.currentPage);
          console.log("Per Page: " + this.perPage);

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addCategory() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-category");
      this.$store
        .dispatch("addCategory", this.categoryData)
        .then((res) => {
          console.log(res);
          this.getAllCategories();
          this.categoryData = {
            name: "",
            id: "",
          };
          this.makeToast("success", "Category added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editCategory(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-category");
      this.$store
        .dispatch("editCategory", {
          id: id,
          data: this.categoryData,
        })
        .then((res) => {
          console.log(res);
          this.getAllCategories();
          this.categoryData = {
            name: "",
            id: "",
          };
          this.makeToast("success", "Category edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteCategory(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteCategory", id)
        .then((res) => {
          console.log(res);
          this.getAllCategories();
          this.makeToast("success", "Category deleted successfully");
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
      this.$bvModal.show("modal-new-category");
      this.triggerEdit = true;
      this.editId = id;
      this.categoryData.name = data.name;
    },
    clearField() {
      this.categoryData = {
        name: "",
        id: "",
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.categoryData.name = data;
    },
  },

  mounted() {
    this.getAllCategories();
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
