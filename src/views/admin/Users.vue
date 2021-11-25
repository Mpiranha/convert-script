<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="users"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="container scroll-content">
          <div
            class="
              dashboard-top
              d-flex
              justify-content-between
              align-items-center
              mb-5
            "
          >
            <h6 class="title">Users ({{ userLength }})</h6>
            <div class="d-flex align-items-center">
              <button
                @click="clearField"
                class="btn btn-border-secondary no-shadow"
                to="/agency/setup"
              >
                Export as CSV
              </button>
              <button
                @click="clearField"
                class="btn btn-create"
                v-b-modal.modal-new-client
              >
                <span>+</span>
                New User
              </button>
            </div>
          </div>

          <div class="content-wrap set-min-h pt-4 pb-5">
            <div class="search-form mb-2">
              <button class="btn search-btn">
                <i class="flaticon-loupe icons"></i>
              </button>
              <input
                @change="makeToast('primary', 'try me')"
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div v-if="users.length === 0" class="no-data-info">
              Created agency will display here.
            </div>
            <table v-else class="table table-custom">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Status</th>
                  <th>Plan</th>
                  <th>Registration Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td scope="row">{{ user.email }}</td>
                  <td class="text-left">{{ getSeperateName(user.name) }}</td>
                  <td>{{ getSeperateName(user.name, "lastname") }}</td>
                  <td>
                    <label class="switch mb-0">
                      <input type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <div class="d-dlex">
                      <span
                        class="plan-types"
                        v-for="(plan, index) in user.plan"
                        :key="index"
                        >{{ plan }}
                      </span>
                    </div>
                  </td>
                  <td>
                    {{ formatDate(user.created_at) }}
                  </td>
                  <td>
                    <dropdown-tool
                      @edit-clicked="
                        openEditModal(user.id, {
                          name: user.name,
                          email: user.email,
                        })
                      "
                      @delete-proceed="deleteAgency(user.id)"
                    >
                      <!-- <template v-slot:secondary>
                        <b-dropdown-item
                          v-b-modal.modal-campaign
                          @click="getCurrent(user.name)"
                          link-class="drop-link"
                          href="#"
                        >
                          <i
                            class="flaticon-briefcase icons table-drop-icon"
                          ></i>
                          Campaign
                        </b-dropdown-item>
                      </template> -->
                    </dropdown-tool>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPage"
              :total-rows="userLength"
              :per-page="perPage"
              aria-controls="my-table"
              size="sm"
              :hide-goto-end-buttons="true"
              prev-text="<"
              next-text=">"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      :hide-header="true"
      id="modal-new-client"
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
      <div class="row">
        <div class="col-6">
          <b-form-group label="Last Name">
            <b-form-input
              id="name"
              v-model="lastname"
              type="text"
              class="input-table"
              @input="updateName"
            >
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group label="First Name">
            <b-form-input
              id="name"
              v-model="firstname"
              type="text"
              class="input-table"
              @input="updateName"
            >
            </b-form-input>
          </b-form-group>
        </div>
      </div>

      <b-form-group label="Email">
        <b-form-input
          id="name"
          v-model="userData.email"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Role">
        <b-form-select
          v-model="userData.role"
          :options="optionsRole"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Select Plan" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="userData.plans"
          :options="optionsPlan"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-client')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editAgency(editId, campaignName) : addAgency()"
          class="save-modal"
          >{{ triggerEdit ? "Edit" : "Add Client" }}</b-button
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
  name: "Users",
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
      users: [],
      userLength: 0,
      firstname: "",
      lastname: "",
      userData: {
        name: "",
        role: null,
        email: "",
        plans: []
        
      },
      error: "",
      triggerEdit: false,
      editId: null,
      selectedPlan: [], // Must be an array reference!
      selectedRole: null,
      optionsRole: [
        { value: null, text: "Select a Role" },
        { value: "User", text: "User" },
        { value: "Admin", text: "Admin" },
      ],

      optionsPlan: [{ text: "", value: "" }],
      plans: [],
    };
  },
  methods: {
    updateName() {
      this.userData.name = this.lastname + " " + this.firstname;
    },
    getSharedPlans() {
      this.$store
        .dispatch("getSharedPlan")
        .then((res) => {
          this.plans = res.data.data;
          this.filterPlans(this.plans);
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
    filterPlans(plans) {
      plans.forEach((plan, index) => {
        this.optionsPlan[index] = {
          text: plan.name,
          value: plan.id,
        };
      });
    },
    getAllUsers() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllUsers", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.users = res.data.data;
          this.userLength = res.data.meta.total;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addUser() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-video");
      this.$store
        .dispatch("addUser", this.userData)
        .then((res) => {
          console.log(res);
          this.getAllVideos();
          this.userData = {
            name: "",
            role: "",
            email: "",
            plans: []
          };
          this.makeToast("success", "Video added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editUser(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-video");
      this.$store
        .dispatch("editUser", {
          id: id,
          data: this.userData,
        })
        .then((res) => {
          console.log(res);
          this.getAllVideos();
          this.userData = {
            name: "",
            role: "",
            email: "",
            plans: []
          };
          this.makeToast("success", "User edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteUser(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteVideo", id)
        .then((res) => {
          console.log(res);
          this.getAllVideos();
          this.makeToast("success", "Video deleted successfully");
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
      this.$bvModal.show("modal-new-client");
      this.triggerEdit = true;
      this.editId = id;
      this.lastname = this.getSeperateName(data.name, "lastname");
      this.firstname = this.getSeperateName(data.name);
      this.userData.role = data.role;
      console.log(data);
      this.userData.email = data.email;
      this.userData.plans = data.plans;
    },
    clearField() {
      this.client = {
        name: "",
        email: "",
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.client.name = data;
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
    getSeperateName(name, type) {
      if (type == "lastname") {
        return name.split(" ")[0];
      } else {
        return name.split(" ")[1];
      }
    },
  },

  mounted() {
    this.getAllUsers();
    this.getSharedPlans();
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
