<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="transaction"></sidebar>
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
              <h6 class="title">Transactions ({{ transactionsLength }})</h6>
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
              <div v-if="this.transactionsLength == 0" class="no-data-info">
                No Transaction Yet
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody v-if="searchResult.length > 0">
                  <tr v-for="(result, index) in searchResult" :key="result.id">
                    <td scope="row">{{ result.transactionId }}</td>
                    <td class="text-left">
                      {{ formatDate(result.created_at) }}
                    </td>
                    <td>{{ result.user.email }}</td>
                    <td>{{ result.plan }}</td>

                    <td class="text-left">
                      <label class="switch mb-0">
                        <input v-model="status[index]" type="checkbox"
                          @change="updateTransaction(result.id, status[index])" />
                        <span class="slider round"></span>
                      </label>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="transactions && searchKey.length < 1">
                  <tr v-for="(transaction, index) in transactions" :key="transaction.id">
                    <td scope="row">{{ transaction.transactionId }}</td>
                    <td class="text-left">
                      {{ formatDate(transaction.created_at) }}
                    </td>
                    <td v-if="transaction.user">{{ transaction.user.email }}</td>
                    <td v-else>NULL</td>
                    <td v-if="transaction.plan">{{ transaction.plan.name }}</td>
                    <td v-else>NULL</td>
                    <td class="text-left">
                      <label class="switch mb-0">
                        <input v-model="status[index]" type="checkbox" @change="
                          updateTransaction(transaction.id, status[index])
                        " />
                        <span class="slider round"></span>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center">
              <b-pagination v-model="currentPage" :total-rows="transactionsLength" :per-page="perPage"
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
  name: "Transactions",
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
      transactions: [],
      transactionsLength: 0,
      status: [],
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/transactions",
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
    getAllTransactions() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllTransactions", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.transactions = res.data.data;
          this.transactionsLength = res.data.meta.total;

          this.transactions.forEach((transaction, index) => {
            this.status[index] = transaction.activate;
          });

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
    updateTransaction(id, data) {
      this.$store.commit("updateLoadState", true);
      console.log(typeof data);
      this.$store
        .dispatch("updateTransaction", {
          id: id,
          data: {
            activate: data,
          },
        })
        .then(() => {
          // console.log(res);
          // this.getAllplans();
          // this.plansData = {
          //   type: "",
          //   name: "",
          // };
          this.makeToast("success", "Transaction edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    formatDate(date) {
      var formatedDate = new Date(date);
      return formatedDate.toLocaleDateString();
    },
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllTransactions();
      console.log("Value: " + value);
    },
  },

  mounted() {
    this.getAllTransactions();
  },
  computed: {},
};
</script>

<style>
</style>
