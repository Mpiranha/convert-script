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
              <h6 class="title">Plans</h6>
              <div class="d-flex align-items-center">
                <button
                  @click="clearField"
                  class="btn btn-create"
                  v-b-modal.modal-new-plan
                >
                  <span>+</span>
                  New Plan
                </button>
              </div>
            </div>
            <div class="content-wrap set-min-h pt-4 pb-5">
              <div class="search-form mb-2">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input
                   v-model="searchKey"  @input="searchKeyWord"
                  class="form-control no-shadow search-input"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <loader-modal
                :loading-state="this.$store.state.loading"
              ></loader-modal>
              <div v-if="plans.length === 0" class="no-data-info">
                Created Plans will display here.
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="plan in plans" :key="plan.id">
                    <td scope="row">{{ plan.name }}</td>
                    <!-- <td scope="row">Admin</td> -->
                    <td>
                      <dropdown-tool
                        @edit-clicked="
                          openEditModal(plan.id, {
                            name: plan.name,
                            type: plan.type,
                          })
                        "
                        @delete-proceed="deletePlan(plan.id)"
                        delete-what="Plan"
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
                :total-rows="plansLength"
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
      id="modal-new-plan"
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

      <b-form-group label="Type">
        <b-form-input
          id="type"
          v-model="plansData.type"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Name">
        <b-form-input
          id="name"
          v-model="plansData.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-plan')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editPlan(editId, plansData) : addPlan()"
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
  name: "Plans",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
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
