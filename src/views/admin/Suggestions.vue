<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="suggestion"></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="
              dashboard-top
              d-flex
              justify-content-between
              align-items-center
              mb-5
            ">
              <h6 class="title">Suggestions</h6>
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
              <div v-if="suggestionsLength === 0" class="no-data-info">
                Created Suggestion will display here.
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Message</th>
                    <th class="text-left">Email</th>
                    <th>Date</th>
                    <th class="text-left">Action</th>
                  </tr>
                </thead>
                <tbody v-if="searchResult.length > 0">
                  <tr v-for="result in searchResult" :key="result.id">
                    <td class="ctrl-width">
                      {{  result.message  }}
                    </td>
                    <td class="text-left">{{  result.user ? result.user.email : "NULL"  }}</td>
                    <td>{{  formatDate(result.created_at)  }}</td>
                    <td class="text-left">
                      <nav class="nav flex-column action-view">
                        <a class="nav-link" href="#" v-b-modal.modal-view-script @click="
                          getCurrent({
                            message: result.message,
                            email: result.user ? result.user.email : 'NULL',
                            date: formatDate(result.created_at),
                          })
                        ">
                          View
                        </a>
                        <a class="nav-link" href="#">Mark as Read</a>
                      </nav>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="suggestions && searchKey.length < 1">
                  <tr v-for="suggestion in suggestions" :key="suggestion.id">
                    <td class="ctrl-width">
                      {{  suggestion.message  }}
                    </td>
                    <td class="text-left">{{  suggestion.user ? suggestion.user.email : "NULL"  }}</td>
                    <td>{{  formatDate(suggestion.created_at)  }}</td>
                    <td class="text-left">
                      <nav class="nav flex-column action-view">
                        <a class="nav-link" href="#" v-b-modal.modal-view-script @click="
                          getCurrent({
                            message: suggestion.message,
                            email: suggestion.user ? suggestion.user.email : 'NUll',
                            date: formatDate(suggestion.created_at),
                          })
                        ">
                          View
                        </a>
                        <a class="nav-link" href="#">Mark as Read</a>
                      </nav>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <b-modal :hide-header="true" id="modal-view-script" centered size="md" :hide-footer="true"
              dialog-class="control-width" content-class="modal-main">
              <div class="py-4">
                <p>
                  {{  suggestionData.message  }}
                </p>
                <p>user email: {{  suggestionData.email ? suggestionData.email : 'NULL'   }}</p>
              </div>

              <div class="d-flex justify-content-end">
                <p class="mr-auto">{{  this.suggestionData.date  }}</p>
                <b-button @click="$bvModal.hide('modal-view-script')" class="close-modal">Close</b-button>
                <b-button @click="
                  triggerEdit ? editAgency(editId, campaignName) : addAgency()
                " class="save-modal">Mark as Read</b-button>
              </div>
            </b-modal>
            <div class="d-flex justify-content-center">
              <b-pagination v-model="currentPage" :total-rows="suggestionsLength" :per-page="perPage"
                aria-controls="my-table" size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">"
                @change="handlePageChange"></b-pagination>
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
  name: "Suggestions",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      perPage: 20,
      currentPage: 1,
      suggestionsLength: 0,
      suggestions: [],
      suggestionData: {
        message: "",
        email: "",
        date: "",
      },
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/suggestions",
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
    getAllSuggestions() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllSuggestions", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.suggestions = res.data.data;
          this.suggestionsLength = res.data.meta.total;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    addSuggestion() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-video");
      this.$store
        .dispatch("addSuggestion", this.suggestionData)
        .then((res) => {
          console.log(res);
          this.getAllSuggestions();
          this.suggestionData = {
            title: "",
            description: "",
            link: "",
          };
          this.makeToast("success", "Submitted added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getCurrent(data) {
      this.suggestionData.message = data.message;
      this.suggestionData.email = data.email;
      this.suggestionData.date = data.date;
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
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllSuggestions();
      console.log("Value: " + value);
    },
  },

  mounted() {
    this.getAllSuggestions();
  },
  computed: {},
};
</script>

<style>
.ctrl-width {
  max-width: 400px;
}
</style>
