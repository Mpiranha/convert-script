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
            <h6 class="title">Users (5)</h6>
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
                <tr v-for="user in orderedUser" :key="user.id">
                  <td scope="row">{{ user.email }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.lastName }}</td>
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
              v-model="userData.name"
              type="text"
              class="input-table"
            >
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group label="First Name">
            <b-form-input
              id="name"
              v-model="userData.name"
              type="text"
              class="input-table"
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
          v-model="selectedRole"
          :options="optionsRole"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Select Plan" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selectedPlan"
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
      userData: {
        name: "",
        email: "",
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
      optionsPlan: [
        { text: "FE", value: "FE" },
        { text: "0T01", value: "0T01" },
        { text: "0T02", value: "0T02" },
        { text: "0T03", value: "0T03" },
        { text: "0T04", value: "0T04" },
      ],
    };
  },
  methods: {
    getAllUsers() {
      this.$store
        .dispatch("getAllUsers")
        .then((res) => {
          this.users = res.data.data;
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
    addAgency() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");

      this.$store
        .dispatch("addAgency", this.client)
        .then((res) => {
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.getAgency();
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    editAgency(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");
      this.$store
        .dispatch("editAgency", { id: id, data: this.client })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.getAgency();
          //   this.loading = false;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          //   this.loading = false;
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });
    },
    deleteAgency(id) {
      //   this.loading = true;
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteAgency", id)
        .then((res) => {
          this.error = null;
          this.getAgency();
          console.log(res.data);
          //   this.loading = false;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          //   this.loading = false;
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();
    },

    openEditModal(id, data) {
      this.$bvModal.show("modal-new-client");
      this.triggerEdit = true;
      this.editId = id;
      this.client.name = data.name;
      this.client.email = data.email;
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
  },

  mounted() {
    this.getAllUsers();
  },
  computed: {
    userLength() {
      return this.users.length;
    },
    orderedUser() {
      return this.orderSort(this.users);
    }
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
