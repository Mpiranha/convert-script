<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="users"></sidebar>
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
              <h6 class="title">Users ({{ userLength }})</h6>
              <div class="d-flex align-items-center">
                <a href="http://api.onecopy.ai/api/v1/export/excel/model?model=User&type=Admin&export=UsersExport"
                  target="_blank" class="btn btn-border-secondary no-shadow" to="/agency/setup">
                  Export as CSV
                </a>
                <button @click="clearField" class="btn btn-create" v-b-modal.modal-new-user>
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
                <input @input="searchKeyWord" class="form-control no-shadow search-input" type="text" placeholder="Search"
                  v-model="searchKey" />
              </div>
              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
              <div v-if="users.length === 0" class="no-data-info">
                Created users will display here.
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
                <tbody v-if="searchResult.length > 0">
                  <tr v-for="result in searchResult" :key="result.id">
                    <td scope="row">{{ result.email }}</td>
                    <td class="text-left">{{ result.first_name }}</td>
                    <td>{{ result.last_name }}</td>
                    <td>
                      <label class="switch mb-0">
                        <input :checked="result.active" type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <span v-if="result.role.toLowerCase() === 'free'" class="badge badge-secondary">Free</span>
                      <span v-else-if="result.role.toLowerCase() === 'basic (yearly)'" class="badge badge-warning">Basic
                        (Yearly)</span>
                      <span v-else-if="result.role.toLowerCase() === 'basic (monthly)'" class="badge badge-primary">Basic
                        (Monthly)</span>
                      <span v-else-if="result.role.toLowerCase() === 'admin'" class="badge badge-success">Admin</span>
                      <span v-else-if="result.role.toLowerCase() === 'premium lifetime'"
                        class="badge badge-danger">Premium
                        Lifetime</span>
                      <span v-else>{{ result.role.toUpperCase() }}</span>
                    </td>
                    <td>
                      {{ formatDate(result.created_at) }}
                    </td>
                    <td>
                      <dropdown-tool @edit-clicked="
                        openEditModal(result.id, {
                          first_name: result.first_name,
                          last_name: result.last_name,
                          plagiarism_credit: result.plagiarism_credit,
                          role: result.role,
                          email: result.email,
                        })
                        " @delete-proceed="deleteUser(result.id)" delete-what="User">
                      </dropdown-tool>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="users && searchKey.length < 1">
                  <tr v-for="user in users" :key="user.id">
                    <td scope="row">{{ user.email }}</td>
                    <td class="text-left">{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>
                      <label class="switch mb-0">
                        <input :checked="user.active" type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <span v-if="user.role.toLowerCase() === 'free'" class="badge badge-secondary">Free</span>
                      <span v-else-if="user.role.toLowerCase() === 'basic (yearly)'" class="badge badge-warning">Basic
                        (Yearly)</span>
                      <span v-else-if="user.role.toLowerCase() === 'basic (monthly)'" class="badge badge-primary">Basic
                        (Monthly)</span>
                      <span v-else-if="user.role.toLowerCase() === 'admin'" class="badge badge-success">Admin</span>
                      <span v-else-if="user.role.toLowerCase() === 'premium lifetime'" class="badge badge-danger">Premium
                        Lifetime</span>
                      <span v-else>{{ user.role.toUpperCase() }}</span>
                    </td>
                    <td>
                      {{ formatDate(user.created_at) }}
                    </td>
                    <td>
                      <dropdown-tool @edit-clicked="
                        openEditModal(user.id, {
                          first_name: user.first_name,
                          last_name: user.last_name,
                          plagiarism_credit: user.plagiarism_credit,
                          role: user.role,
                          email: user.email,

                        })
                        " @delete-proceed="deleteUser(user.id)" delete-what="User">
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
            <div class="d-flex justify-content-center mb-5">
              <b-pagination v-model="currentPage" :total-rows="userLength" :per-page="perPage" aria-controls="my-table"
                size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">" @change="handlePageChange">
              </b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :hide-header="true" id="modal-new-user" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <!-- <div class="modal-head">
        <h3 class="title">Give your campaign a name</h3>
        <p class="desc">Only you can see this</p>
      </div> -->
      <div class="row">
        <div class="col-6">
          <b-form-group label="First Name">
            <b-form-input id="first_name" v-model="userData.first_name" type="text" class="input-table">
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group label="Last Name">
            <b-form-input id="last_name" v-model="userData.last_name" type="text" class="input-table">
            </b-form-input>
          </b-form-group>
        </div>
      </div>

      <b-form-group label="Email">
        <b-form-input autocomplete="off" id="email" v-model="userData.email" type="text" class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input autocomplete="off" id="password" v-model="userData.password" type="password" class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Plagiarism Credit">
        <b-form-input id="plagiarism_credit" v-model="userData.plagiarism_credit" type="text" class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Role">
        <b-form-select v-model="tempRole" :options="optionsRole" @change="fetchRelatedPlan()"
          :disabled="planIsLoading"></b-form-select>
      </b-form-group>

      <b-form-group label="Plan" v-if="tempRole == 'recurring' && optionsPlan.length > 1">
        <b-form-select v-model="userData.role" :options="optionsPlan">

        </b-form-select>
      </b-form-group>
      <!--  -->
      <div class="form-group" v-else-if="tempRole == 'lifetime' && optionsPlan.length > 1">
        <label for="">Plan</label>
        <div class="custom_plan_input">
          <div class="plan_list_inner">
            <div class="plan_list_item" v-for="(plan, inx) in selectedPlans" :key="inx">
              <span>{{ plan.text }}</span>
              <button class="btn no-shadow btn_remove_plan" @click="deleteSelectedPlan(plan)">
                x
              </button>
            </div>


          </div>
          <button id="popover-button-sync" class="btn btn_add_plan">+</button>

          <b-popover :show.sync="showPop" target="popover-button-sync" title="Add Plan(s)">
            <ul class="nav popover_plans_list">
              <li class="popover_item" v-for="(plan, index) in optionsPlan" :key="index"
                @click="updateSelectedPlans(plan)">
                {{ plan.text }}
              </li>
            </ul>
          </b-popover>
        </div>
      </div>



      <!-- <b-form-group label="Select Plan" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="userData.plans"
          :options="optionsPlan"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group> -->

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-user')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editUser(editId) : addUser()" class="save-modal">
          {{ triggerEdit ? "EDIT" : "ADD USER" }}
        </b-button>
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
      showPop: false,
      searchKey: "",
      searchResult: [],
      perPage: 20,
      currentPage: 1,
      users: [],
      userLength: 0,
      firstname: "",
      lastname: "",
      tempRole: null,
      planIsLoading: false,
      selectedPlans: [],
      selectedPlansStringify: [],
      userData: {
        first_name: "",
        last_name: "",
        role: null,
        email: "",
        password: "",
        plagiarism_credit: null,
      },
      error: "",
      triggerEdit: false,
      editId: null,
      optionsPlagiarism: [
        { value: null, text: "Select" }
      ],
      optionsRole: [
        { value: null, text: "Select a Role" },
        { value: "recurring", text: "RECURRING" },
        { value: "lifetime", text: "LIFETIME" }
      ],

      optionsPlan: [{ text: "Select a Plan", value: null }],
      roles: [],
    };
  },
  methods: {
    b64toBlob(b64Data, contentType = "", sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/users",
          keyword: this.searchKey,
        })
        .then((res) => {
          this.searchResult = res.data.data;

          // console.log(res.data + "called now");
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;

          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getSharedPlans() {
      this.$store
        .dispatch("getAllRoles")
        .then((res) => {
          this.roles = res.data;
          this.filterRoles(this.roles);
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
    getCycleType() {
      this.planIsLoading = true;
      this.optionsPlan = [{ text: "Select a Plan", value: null }];
      this.$store
        .dispatch("getCycleType", this.tempRole)
        .then((res) => {
          res.data.data.forEach((plan) => {
            this.optionsPlan.push({
              text: plan.name.toUpperCase(),
              value: plan.name,
              id: plan.id
            });
          });

          this.planIsLoading = false;

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
    getPlagiarism() {

      this.$store
        .dispatch("getAllPlagiarismCredits", this.tempRole)
        .then((res) => {
          res.data.response.data.forEach((credit) => {
            this.optionsPlagiarism.push({
              text: credit.words,
              value: credit.id,
            });
          });




        })
        .catch((error) => {
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          //this.loading = false;

        });
    },
    getPlanType(plan) {
      this.planIsLoading = true;
      this.optionsPlan = [{ text: "Select a Plan", value: null }];
      this.$store
        .dispatch("getRoleType", plan)
        .then((res) => {
          this.tempRole = res.data.data.name;
          this.getCycleType();

          this.planIsLoading = false;

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
    filterRoles(roles) {

      roles.forEach((role) => {
        this.optionsPlan.push({
          text: role.name.toUpperCase(),
          value: role.name,
        });
      });
    },
    exportUsers() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("exportUsers")
        .then((res) => {
          let blob = this.b64toBlob(res.data, "application/vnd.ms-excel");
          // var blob = new Blob([csvContent], {
          //   type: "data:application/octet-stream;base64",
          // });
          var url = window.URL.createObjectURL(blob);
          // you need to precise a front-end button to have a name
          var a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "user_exports.xlsx";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          this.makeToast("success", "your file has downloaded!");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
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
    fetchRelatedPlan() {
      this.userData.role = null;
      this.selectedPlans = [];
      this.selectedPlansStringify = [];
      this.getCycleType();
    },
    updateSelectedPlans(plan) {
      this.selectedPlans.push(plan);
      this.selectedPlansStringify.push(plan.value);
      this.userData.role = this.selectedPlansStringify.toString();

    },
    deleteSelectedPlan(plan) {
      this.selectedPlans = this.selectedPlans.filter((newItem) => newItem.text !== plan.text);
      this.selectedPlansStringify = this.selectedPlansStringify.filter((item) => item != plan.value);
      this.userData.role = this.selectedPlansStringify.toString();
    },
    addUser() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-user");
      this.$store
        .dispatch("addUser", this.userData)
        .then(() => {

          this.getAllUsers();
          this.userData = {
            first_name: "",
            last_name: "",
            role: null,
            email: "",
            password: "",
            plagiarism_credit: null
          };
          this.makeToast("success", "User added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          this.error = error.response.data.errors;

          for (const error in this.error) {
            if (Object.hasOwnProperty.call(this.error, error)) {
              this.makeToast("danger", this.error[error]);
            }
          }


          this.$store.commit("updateLoadState", false);
        });
    },
    editUser(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-user");
      this.$store
        .dispatch("editUser", {
          id: id,
          data: this.userData,
        })
        .then(() => {

          this.getAllUsers();
          this.userData = {
            first_name: "",
            last_name: "",
            role: null,
            email: "",
            password: "",
            plagiarism_credit: null,
          };
          this.makeToast("success", "User edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          this.error = error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteUser(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteUser", id)
        .then(() => {

          this.getAllUsers();
          this.makeToast("success", "User deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },

    openEditModal(id, data) {
      this.$bvModal.show("modal-new-user");
      this.selectedPlans = [];
      this.selectedPlansStringify = [];
      this.triggerEdit = true;
      this.editId = id;
      this.userData.last_name = data.last_name;
      this.plagiarism_credit = data.plagiarism_credit;
      this.userData.first_name = data.first_name;
      this.userData.plagiarism_credit = data.plagiarism_credit;

      // this.userData.role = data.role;
      // this.userData.plan = data.plan;
      console.log(data);
      this.getPlanType(data.role);
      data.role.split(",").forEach((plan) => {
        this.selectedPlans.push({ text: plan.toUpperCase(), value: plan })
        this.selectedPlansStringify.push(plan);
        this.userData.role = this.selectedPlansStringify.toString();
      }
      );
      this.userData.password = data.password;
      this.userData.email = data.email;



      // this.userData.plans = data.plans;
    },
    clearField() {
      this.userData = {
        first_name: "",
        last_name: "",
        role: null,
        email: "",
        password: "",
        plagiarism_credit: null,
      };
      this.selectedPlans = [];
      this.selectedPlansStringify = [];
      this.triggerEdit = false;
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
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllUsers();
    },
  },

  mounted() {
    this.getAllUsers();
    this.getPlagiarism();
    // this.getSharedPlans();
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

.custom_plan_input {
  border: 1px solid #c2c8d1 !important;
  font-size: 0.9rem !important;
  border-radius: 0.5rem !important;
  width: 100%;
  padding: 0.35rem 0.75rem 0 0.75rem !important;
  display: flex;
  align-items: center;
}

.plan_list_inner {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.plan_list_item {
  margin-right: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  background-color: #8338ec;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  margin-bottom: 0.35rem;
}

.btn_remove_plan {
  color: inherit !important;
  padding: 0 !important;
  margin-left: 1rem;
  font-size: 1rem !important;
}

.btn_add_plan {
  background-color: #8338ec !important;
  color: #fff !important;
  font-size: 1.4rem !important;
  margin-left: auto;
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding: 0.05rem 0.7rem !important;
  border-radius: 0.3rem !important;
  margin-bottom: 0.35rem;
}

.popover_plans_list {
  flex-direction: column;
}

.popover_item:first-child {
  display: none;
}

.popover_plans_list .popover_item {
  color: #8338ec;
  cursor: pointer;
  margin-bottom: 1rem;
}
</style>
