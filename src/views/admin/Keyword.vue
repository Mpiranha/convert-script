<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="plans"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
         <div class="scroll-content">
        <div class="container">
          <loader-modal
            :loading-state="this.$store.state.loading"
          ></loader-modal>
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
              <h6 class="title">Marketplace Keyword</h6>
            </div>
            <div class="content-wrap px-3 pt-4 pb-4">
              <label for="">Freelancer.com Marketplace keyword</label>
              <div class="search-form flex-column px-2 mx-0 mb-4">
                <input
                  class="form-control no-shadow search-input"
                  type="text"
                  v-model="keyword"
                />
              </div>
              <div class="d-flex justify-content-end">
                <b-button
                  @click="triggerEdit ? editKeyword(keywords.id) : addKeyword"
                  class="save-modal py-2"
                  >Save</b-button
                >
              </div>
            </div>

            <div class="content-wrap pt-4 pb-2">
              <!-- <div class="search-form mb-2">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input
                   v-model="searchKey"  @input="searchKeyWord"
                  class="form-control no-shadow search-input"
                  type="text"
                  placeholder="Search"
                />
              </div> -->

              <div v-if="this.keywords.length === 0" class="no-data-info">
                No Keyword
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">{{ keywords.words }}</td>
                    <!-- <td scope="row">Admin</td> -->
                    <td>
                      <dropdown-tool
                        @edit-clicked="
                          openEditModal(keywords.id, {
                            word: keywords.words,
                          })
                        "
                        @delete-proceed="deleteKeyword(keyword.id)"
                        delete-what="keyword"
                      >
                      </dropdown-tool>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
import DropdownTool from "@/components/DropdownTool";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "MarketplaceKeywords",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      keywordsLength: 0,
      keywords: [],
      keyword: "",
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllplans();
      console.log("Value: " + value);
    },
    getAllKeywords() {
      // this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getKeywords")
        .then((res) => {
          this.keywords = res.data.data;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addKeyword() {
      this.$store.commit("updateLoadState", true);

      this.$store
        .dispatch("addKeyword", {
          name: this.plansData.name,
          type: this.plansData.type,
        })
        .then((res) => {
          console.log(res);
          this.getAllKeywords();
          this.keyword = "";
          this.makeToast("success", "Keyword added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editKeyword(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-plan");
      this.$store
        .dispatch("editKeyword", {
          id: id,
          data: {
            words: this.keyword,
          },
        })
        .then((res) => {
          console.log(res);
          this.getAllKeywords();
          this.keyword = "";
          this.makeToast("success", "Keyword edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteKeyword(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteKeyword", id)
        .then((res) => {
          console.log(res);
          this.getAllKeywords();
          this.makeToast("success", "Keyword deleted successfully");
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
      this.triggerEdit = true;
      this.editId = id;
      this.keyword = data.word;
    },
    clearField() {
      this.keyword = "";
      this.triggerEdit = false;
    },
  },

  mounted() {
    this.getAllKeywords();
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
