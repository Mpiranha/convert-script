<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="roles"
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
              <h6 class="title">Roles & Permissions</h6>
              <div class="d-flex align-items-center">
                <button
                  @click="clearField"
                  class="btn btn-create"
                  v-b-modal.modal-new-role
                >
                  <span>+</span>
                  New Role
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
              <div v-if="roles.length === 0" class="no-data-info">
                Created agency will display here.
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="role in roles" :key="role.id">
                   <td scope="row">{{ role.name }}</td>
                    <!-- <td scope="row">Admin</td> -->
                    <td>
                      <dropdown-tool
                        @edit-clicked="
                          openEditModal(role.id, {
                            name: role.name,
                          })
                        "
                        @delete-proceed="deleteRole(role.id)"
                      >
                        <template v-slot:secondary>
                          <b-dropdown-item
                            v-b-modal.modal-campaign
                            @click="getCurrent(role.name)"
                            link-class="drop-link"
                            href="#"
                          >
                            <img
                              class="drop-img-icon"
                              src="@/assets/icons/admin/sidebar-icon/roles-permissions.svg"
                              alt=""
                            />
                            Permissions
                          </b-dropdown-item>
                        </template>
                      </dropdown-tool>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center">
              <b-pagination
                v-model="currentPage"
                :total-rows="rolesLength"
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
    </div>

    <b-modal
      :hide-header="true"
      id="modal-new-role"
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

      <b-form-group label="Name">
        <b-form-input
          id="name"
          v-model="rolesData.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          :options="userPlan"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-role')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editRoles(editId, rolesData) : addRoles()"
          class="save-modal"
          >Save</b-button
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
      // users: [
      //   {
      //     email: "test@gmail.com",
      //     firstName: "Test",
      //     lastName: "Test",
      //     status: false,
      //     plan: ["FE", "0T1"],
      //     created_at: "04/09/2021",
      //   },
      //   {
      //     email: "test@gmail.com",
      //     firstName: "Test",
      //     lastName: "Test",
      //     status: false,
      //     plan: ["FE", "0T1"],
      //     created_at: "04/09/2021",
      //   },
      // ],
      rolesLength: 0,
      roles: [],
      rolesData: {
        name: "",
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
      userPlan: [{ text: "Make role a User Plan", value: "FE" }],
      // optionsPlan: [
      //   { text: "FE", value: "FE" },
      //   { text: "0T01", value: "0T01" },
      //   { text: "0T02", value: "0T02" },
      //   { text: "0T03", value: "0T03" },
      //   { text: "0T04", value: "0T04" },
      // ],
    };
  },
  methods: {
    getRoles() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllRoles", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.roles = res.data.data;
          this.rolesLength = res.data.meta.total;
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
    addRoles() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-role");
      this.$store
        .dispatch("addRoles", this.rolesData)
        .then((res) => {
          console.log(res);
          this.getRoles();
          this.rolesData = {
            name: ""
          };
          this.makeToast("success", "Role added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editRoles(id) {
     this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-role");
      this.$store
        .dispatch("editRoles", {
          id: id,
          data: this.rolesData,
        })
        .then((res) => {
          console.log(res);
          this.getRoles();
          this.rolesData = {
            name: "",
          };
          this.makeToast("success", "Role edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteAgency(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteRoles", id)
        .then((res) => {
          console.log(res);
          this.getAgency();
          this.makeToast("success", "Role deleted successfully");
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
      this.$bvModal.show("modal-new-role");
      this.triggerEdit = true;
      this.editId = id;
      this.client.name = data.name;
      this.client.email = data.email;
    },
    clearField() {
      this.rolesData = {
        name: "",
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
    this.getRoles();
  },
  // computed: {
  //   userLength() {
  //     return this.roles.length;
  //   },
  //   orderedUser() {
  //     return this.orderSort(this.roles);
  //   },
  // },
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
