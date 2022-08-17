<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="promo-code"></sidebar>
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
              <h6 class="title">Used Code ({{ codeLength }})</h6>
              <div class="d-flex align-items-center">
                <a href="/admin/promo-code"
                  target="_blank" class="btn btn-border-secondary no-shadow" to="/agency/setup">
                  Back to Promo Code
                </a>
              
              </div>
            </div>

            <div class="content-wrap set-min-h pt-4 pb-5">
              <div class="search-form mb-2">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input @input="searchKeyWord" class="form-control no-shadow search-input" type="text"
                  placeholder="Search" v-model="searchKey" />
              </div>
              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
              <div v-if="codes.length === 0" class="no-data-info">
                Used Promo Code will display here.
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Email</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody v-if="searchResult.length > 0">
                  <tr v-for="result in searchResult" :key="result.id">
                    <td scope="row">{{ result.code }}</td>
                    <td class="text-left">{{ result.role_name }}</td>
                    <td>
                      {{ result.is_active ? 'Used' : 'Available' }}
                    </td>
                    <td>
                      {{ result.email }}
                    </td>
                    <td>
                      <button class="btn btn-danger" @click="deletePromoCode(result.id)" delete-what="Code">Delete</button>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="codes && searchKey.length < 1">
                  <tr v-for="code in codes" :key="code.id">
                    <td scope="row">{{ code.code }}</td>
                    <td class="text-left">{{ code.role_name }}</td>
                    <td>
                      {{ code.is_active ? 'Used' : 'Available' }}
                    </td>
                    <td>
                      {{ code.email }}
                    </td>

                    <td>
                      <button class="btn btn-danger" @click="deletePromoCode(code.id)" delete-what="Code">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center">
              <b-pagination v-model="currentPage" :total-rows="codeLength" :per-page="perPage" aria-controls="my-table"
                size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">" @change="handlePageChange">
              </b-pagination>
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
  name: "PromoCode",
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
      codes: [],
      codeLength: 0,
      error: "",
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/users",
          keyword: this.searchKey,
        })
        .then((res) => {
          this.searchResult = res.data.data;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getAllUsedCode() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllUsedCode", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.codes = res.data.response.data;
          this.codeLength = res.data.response.meta.total;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deletePromoCode(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deletePromoCode", id)
        .then((res) => {
          console.log(res);
          this.getAllUsedCode();
          this.makeToast("success", "Code deleted successfully");
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
      this.getAllPromoCode();
      console.log("Value: " + value);
    },
  },

  mounted() {
    this.getAllUsedCode();
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

.custom-control-inline {
  margin-bottom: 1rem;
}
</style>
