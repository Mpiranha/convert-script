<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="plans"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="container scroll-content">
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
              <div class="search-form flex-column mx-0 mb-4">
                <input
                  class="form-control no-shadow search-input"
                  type="text"
                />
              </div>
              <div class="d-flex justify-content-end">
                <b-button class="save-modal py-2">Save</b-button>
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
// import DropdownTool from "@/components/DropdownTool";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "MarketplaceKeywords",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    // DropdownTool,
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      plansLength: 0,
      plans: [],
      plansData: {
        type: "",
        name: "",
      },
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
    getAllplans() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllPlans")
        .then((res) => {
          this.plans = res.data.data;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addPlan() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-plan");
      this.$store
        .dispatch("addPlan", {
          name: this.plansData.name,
          type: this.plansData.type,
        })
        .then((res) => {
          console.log(res);
          this.getAllplans();
          this.plansData = {
            type: "",
            name: "",
          };
          this.makeToast("success", "Role added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editPlan(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-plan");
      this.$store
        .dispatch("editPlan", {
          id: id,
          data: this.plansData,
        })
        .then((res) => {
          console.log(res);
          this.getAllplans();
          this.plansData = {
            type: "",
            name: "",
          };
          this.makeToast("success", "Plans edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deletePlan(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deletePlan", id)
        .then((res) => {
          console.log(res);
          this.getAllplans();
          this.makeToast("success", "Plan deleted successfully");
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
      this.$bvModal.show("modal-new-plan");
      this.triggerEdit = true;
      this.editId = id;
      this.plansData.name = data.name;
      this.plansData.type = data.type;
    },
    clearField() {
      this.plansData = {
        type: "",
        name: "",
      };
      this.triggerEdit = false;
    },
  },

  mounted() {
    this.getAllplans();
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
