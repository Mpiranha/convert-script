<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="audio-plagiarismCredit"></sidebar>
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
                <h6 class="title">Plagiarism Credit</h6>
                <div class="d-flex align-items-center">
                  <button @click="clearField" class="btn btn-create" v-b-modal.modal-new-plagiarismCredit>
                    <span>+</span>
                    Add New
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
                <div v-if="plagiarismCredits.length === 0" class="no-data-info">
                  Created plagiarism credits will display here.
                </div>
                <table v-else class="table table-custom">
                  <thead>
                    <tr>
                      <th>Words</th>
                      <th class="text-center">Price</th>
                      <th>Stripe Link</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="result in searchResult" :key="result.id">
                      <td scope="row">{{ result.words }}</td>

                      <td>${{ result.price }}</td>
                      <td>{{ result.stripe_link }}</td>
                      <td>
                        <dropdown-tool @edit-clicked="openEditModal(
                          result
                        )
                          " @delete-proceed="deleteplagiarismCredit(result.id)" delete-what="plagiarismCredit">
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="plagiarismCredits && searchKey.length < 1">
                    <tr v-for="plagiarismCredit in plagiarismCredits" :key="plagiarismCredit.id">
                      <td scope="row">{{ plagiarismCredit.words }}</td>
                      <td class="text-center">${{ plagiarismCredit.price }}</td>
                      <td>{{ plagiarismCredit.stripe_link }}</td>
                      <td>
                        <dropdown-tool @edit-clicked="openEditModal(plagiarismCredit)
                          " @delete-proceed="deletePlagiarismCredit(plagiarismCredit.id)"
                          delete-what="plagiarismCredit">
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center">
                <b-pagination v-model="currentPage" :total-rows="plagiarismCreditLength" :per-page="perPage"
                  aria-controls="my-table" size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">"
                  @change="handlePageChange"></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :hide-header="true" id="modal-new-plagiarismCredit" centered size="md" :hide-footer="true"
      dialog-class="control-width" content-class="modal-main">
      <!-- <div class="modal-head">
          <h3 class="title">Give your campaign a name</h3>
          <p class="desc">Only you can see this</p>
        </div> -->

      <b-form-group label="Word">
        <b-form-input id="words" v-model.number="plagiarismCreditData.words" type="number" class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Price">
        <b-form-input id="plagiarismCredit-price" v-model.number="plagiarismCreditData.price" type="number"
          class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Stripe Link">
        <b-form-input id="plagiarismCredit-stripe_link" v-model="plagiarismCreditData.stripe_link" type="text"
          class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Cancel Link">
        <b-form-input id="plagiarismCredit-stripe_link" v-model="plagiarismCreditData.cancel_url" type="text"
          class="input-table">
        </b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-plagiarismCredit')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editPlagiarismCredit(editId, plagiarismCreditData) : addPlagiarismCredit()
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
  name: "plagiarismCredit",
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
      plagiarismCreditLength: 0,
      plagiarismCredits: [],
      plagiarismCreditData: {
        words: "",
        price: "",
        stripe_link: "",
        cancel_url: ""
      },
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllPlagiarismCredits();
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
    getAllPlagiarismCredits() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllPlagiarismCredits")
        .then((res) => {
          this.plagiarismCredits = res.data.response.data;
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
    addPlagiarismCredit() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-plagiarismCredit");
      this.$store
        .dispatch("addPlagiarismCredit", this.plagiarismCreditData)
        .then((res) => {
          console.log(res);
          this.getAllPlagiarismCredits();
          this.plagiarismCreditData = {
            words: "",
            price: "",
            stripe_link: "",
            cancel_url: ""
          };
          this.makeToast("success", "plagiarismCredit added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editPlagiarismCredit(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-plagiarismCredit");
      this.$store
        .dispatch("editPlagiarismCredit", {
          id: id,
          data: this.plagiarismCreditData,
        })
        .then((res) => {
          console.log(res);
          this.getAllPlagiarismCredits();
          this.plagiarismCreditData = {
            words: "",
            price: "",
            stripe_link: "",
            cancel_url: ""
          };
          this.makeToast("success", "plagiarismCredit edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deletePlagiarismCredit(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deletePlagiarismCredit", id)
        .then((res) => {
          console.log(res);
          this.getAllPlagiarismCredits();
          this.makeToast("success", "plagiarismCredit deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },

    openEditModal(data) {
      this.$bvModal.show("modal-new-plagiarismCredit");
      this.triggerEdit = true;
      this.editId = data.id;
      this.plagiarismCreditData = {
        words: data.words,
        price: data.price,
        stripe_link: data.stripe_link,
        cancel_url: data.cancel_url
      }
    },
    clearField() {
      this.plagiarismCreditData = {
        words: "",
        price: "",
        stripe_link: "",
        cancel_url: ""
      };
      this.triggerEdit = false;
    },

  },

  mounted() {
    this.getAllPlagiarismCredits();
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
  