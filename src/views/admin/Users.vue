<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
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
              <a
                href="http://api.onecopy.ai/api/v1/export/excel/model?model=User&type=Admin&export=UsersExport"
                target="_blank"
                class="btn btn-border-secondary no-shadow"
                to="/agency/setup"
              >
                Export as CSV
              </a>
              <button
                @click="clearField"
                class="btn btn-create"
                v-b-modal.modal-new-user
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
                @input="searchKeyWord"
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
                v-model="searchKey"
              />
            </div>
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
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
                    <div class="d-flex">
                      <span
                        class="plan-types"
                        v-for="(plan, index) in result.plan"
                        :key="index"
                        >{{ plan }}
                      </span>
                    </div>
                  </td>
                  <td>
                    {{ formatDate(result.created_at) }}
                  </td>
                  <td>
                    <dropdown-tool
                      @edit-clicked="
                        openEditModal(result.id, {
                          first_name: result.first_name,
                          last_name: result.last_name,
                          role: result.role,
                          email: result.email,
                        })
                      "
                      @delete-proceed="deleteUser(result.id)"
                      delete-what="User"
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
                    <div class="d-flex">
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
                          first_name: user.first_name,
                          last_name: user.last_name,
                          role: user.role,
                          email: user.email,
                        })
                      "
                      @delete-proceed="deleteUser(user.id)"
                      delete-what="User"
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
              @change="handlePageChange"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      :hide-header="true"
      id="modal-new-user"
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
          <b-form-group label="First Name">
            <b-form-input
              id="name"
              v-model="userData.first_name"
              type="text"
              class="input-table"
            >
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group label="Last Name">
            <b-form-input
              id="name"
              v-model="userData.last_name"
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

      <b-form-group label="Password">
        <b-form-input
          id="name"
          v-model="userData.password"
          type="password"
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
        <b-button @click="$bvModal.hide('modal-new-user')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editUser(editId) : addUser()"
          class="save-modal"
          >{{ triggerEdit ? "Edit" : "Add User" }}</b-button
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
      searchKey: "",
      searchResult: [],
      perPage: 5,
      currentPage: 1,
      users: [],
      userLength: 0,
      firstname: "",
      lastname: "",
      userData: {
        first_name: "",
        last_name: "",
        role: null,
        email: "",
        password: "",
        plans: [],
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
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
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
          value: { plan_id: plan.id },
        };
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
    addUser() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-user");
      this.$store
        .dispatch("addUser", this.userData)
        .then((res) => {
          console.log(res);
          this.getAllUsers();
          this.userData = {
            name: "",
            role: null,
            email: "",
            password: "",
            plans: [],
          };
          this.makeToast("success", "User added successfully");
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
      this.$bvModal.hide("modal-new-user");
      this.$store
        .dispatch("editUser", {
          id: id,
          data: this.userData,
        })
        .then((res) => {
          console.log(res);
          this.getAllUsers();
          this.userData = {
            name: "",
            role: null,
            email: "",
            password: "",
            plans: [],
          };
          this.makeToast("success", "User edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error);
          this.error = error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteUser(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteUser", id)
        .then((res) => {
          console.log(res);
          this.getAllUsers();
          this.makeToast("success", "User deleted successfully");
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
      console.log("User data " + data);
      this.$bvModal.show("modal-new-user");
      this.triggerEdit = true;
      this.editId = id;
      this.userData.last_name = data.last_name;
      this.userData.first_name = data.first_name;
      this.userData.role = data.role;
      // console.log(data);
      this.userData.password = data.password;
      this.userData.email = data.email;
      this.userData.plans = data.plans;
    },
    clearField() {
      this.userData = {
        name: "",
        role: null,
        email: "",
        password: "",
        plans: [],
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
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllUsers();
      console.log("Value: " + value);
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
