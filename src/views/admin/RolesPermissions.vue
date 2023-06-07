<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="roles"></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="">
              <div class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-5
              ">
                <h6 class="title">Roles & Permissions</h6>
                <div class="d-flex align-items-center">
                  <button @click="clearField" class="btn btn-create" v-b-modal.modal-new-role>
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
                  <input v-model="searchKey" @input="searchKeyWord" class="form-control no-shadow search-input"
                    type="text" placeholder="Search" />
                </div>
                <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
                <div v-if="roles.length === 0" class="no-data-info">
                  Created agency will display here.
                </div>
                <table v-else class="table table-custom">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Word Limit</th>
                      <th>Success URL</th>
                      <th>Cancel URl</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="result in searchResult" :key="result.id">
                      <td scope="row">{{  result.name  }}</td>
                      <td>{{  result.price  }}</td>
                      <td>{{  result.set_as_user_plan  }}</td>
                      <td>{{  result.words_allowed  }}</td>
                      <td>{{  result.success_url ? result.success_url : "NIL"  }}</td>
                      <td>{{  result.cancel_url ? result.cancel_url : "NIL"  }}</td>
                      <td>
                        <dropdown-tool @edit-clicked="
                          openEditModal(result.id, {
                            name: role.name,
                            price: role.price,
                            cycle_id: role.cycle_id,
                            words_allowed: role.words_allowed,
                            success_url: role.success_url,
                            cancel_url: role.cancel_url,
                            set_as_user_plan: role.set_as_user_plan
                          })
                        " @delete-proceed="deleteRole(result.id)" delete-what="Role">
                          <template v-slot:secondary>
                            <b-dropdown-item link-class="drop-link" href="#">
                              <router-link class="drop-link" :to="{
                                name: 'SetPermission',
                                params: { id: result.id },
                              }">
                                <img class="drop-img-icon" src="@/assets/icons/admin/sidebar-icon/roles-permissions.svg"
                                  alt="" />
                                Permissions
                              </router-link>
                            </b-dropdown-item>
                            <!-- <b-dropdown-item link-class="drop-link" href="#">
                            <img
                              class="drop-img-icon"
                              src="@/assets/icons/admin/sidebar-icon/roles-permissions.svg"
                              alt=""
                            />
                            Permissions
                          </b-dropdown-item> -->
                          </template>
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="roles && searchKey.length < 1">
                    <tr v-for="role in roles" :key="role.id">
                      <td scope="row">{{  role.name  }}</td>
                      <td>{{  role.price  }}</td>
                      <td>{{  role.set_as_user_plan  }}</td>
                      <td>{{  role.words_allowed  }}</td>
                      <td>{{  role.success_url ? role.success_url : "NIL"  }}</td>
                      <td>{{  role.cancel_url ? role.cancel_url : "NIL"  }}</td>
                      <td>
                        <dropdown-tool @edit-clicked="
                          openEditModal(role.id, {
                            name: role.name,
                            price: role.price,
                            cycle_id: role.cycle_id,
                            words_allowed: role.words_allowed,
                            success_url: role.success_url,
                            cancel_url: role.cancel_url,
                            set_as_user_plan: role.set_as_user_plan
                          })
                        " @delete-proceed="deleteRole(role.id)" delete-what="Role">
                          <template v-slot:secondary>
                            <b-dropdown-item link-class="drop-link" href="#">
                              <router-link class="drop-link" :to="{
                                name: 'SetPermission',
                                params: { id: role.id },
                              }">
                                <img class="drop-img-icon" src="@/assets/icons/admin/sidebar-icon/roles-permissions.svg"
                                  alt="" />
                                Permissions
                              </router-link>
                            </b-dropdown-item>
                            <!-- <b-dropdown-item link-class="drop-link" href="#">
                            <img
                              class="drop-img-icon"
                              src="@/assets/icons/admin/sidebar-icon/roles-permissions.svg"
                              alt=""
                            />
                            Permissions
                          </b-dropdown-item> -->
                          </template>
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center">
                <b-pagination v-model="currentPage" :total-rows="rolesLength" :per-page="perPage"
                  aria-controls="my-table" size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">"
                  @change="handlePageChange"></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :hide-header="true" id="modal-new-role" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <b-form-group label="Name">
        <b-form-input :class="{ 'is-invalid': submitted && $v.rolesData.name.$error }" id="name" v-model="rolesData.name"
          type="text" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.rolesData.name.$error" class="invalid-feedback">
          <span v-if="!$v.rolesData.name.required">* Name is required</span>
          <span v-if="!$v.rolesData.name.minLength">* Name must be more than 3 characters</span>
        </div>
      </b-form-group>
      <b-form-group label="Price">
        <b-form-input :class="{ 'is-invalid': submitted && $v.rolesData.price.$error }" id="price"
          v-model="rolesData.price" type="number" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.rolesData.price.$error" class="invalid-feedback">
          <span v-if="!$v.rolesData.price.required">* Price is required</span>
          <span v-if="!$v.rolesData.price.decimal">* Price must be a Number</span>
        </div>
      </b-form-group>

      <b-form-group label="Cycle" label-class="form-label">
        <b-form-select :class="{ 'is-invalid': submitted && $v.rolesData.cycle.$error }" class="input-table"
          v-model="rolesData.cycle" :options="cycleOptions"></b-form-select>
        <div v-if="submitted && $v.rolesData.cycle.$error" class="invalid-feedback">
          <span v-if="!$v.rolesData.cycle.required">* Cycle is required</span>
        </div>
      </b-form-group>

      <b-form-group label="Words Allowed">
        <b-form-input :class="{ 'is-invalid': submitted && $v.rolesData.wordLimit.$error }" id="word"
          v-model="rolesData.wordLimit" type="number" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.rolesData.wordLimit.$error" class="invalid-feedback">
          <span v-if="!$v.rolesData.wordLimit.required">* Word Count is required</span>
          <span v-if="!$v.rolesData.wordLimit.numeric">* Word Count must be a Number</span>
        </div>
      </b-form-group>

      <b-form-group label="Success Link">
        <b-form-input :class="{ 'is-invalid': submitted && $v.rolesData.success_url.$error }" id="link"
          v-model="rolesData.success_url" type="url" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.rolesData.success_url.$error" class="invalid-feedback">
          <span v-if="!$v.rolesData.success_url.required">* Success URL is required</span>
          <span v-if="!$v.rolesData.success_url.url">* Enter a valid URL</span>
        </div>
      </b-form-group>

      <b-form-group label="Cancel Link">
        <b-form-input :class="{ 'is-invalid': submitted && $v.rolesData.cancel_url.$error }" id="link"
          v-model="rolesData.cancel_url" type="url" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.rolesData.cancel_url.$error" class="invalid-feedback">
          <span v-if="!$v.rolesData.cancel_url.required">* Cancel URL is required</span>
          <span v-if="!$v.rolesData.cancel_url.url">* Enter a valid url</span>
        </div>
      </b-form-group>


      <b-form-group label="">
        <b-form-checkbox v-model="rolesData.set_as_user_plan" :value="true" :unchecked-value="false" name="flavour-1">
          Make role a User Plan
        </b-form-checkbox>
      </b-form-group>

      <b-form-group label="">
        <b-form-checkbox v-model="rolesData.team_member_role" :value="true" :unchecked-value="false" name="flavour-1">
          Make role for team member
        </b-form-checkbox>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-role')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editRole(editId, rolesData) : addRole($event)" class="save-modal">{{  triggerEdit
        ?
        "Edit" : "Save"





          }}</b-button>
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
import { required, minLength, url, decimal, numeric } from "vuelidate/lib/validators";

export default {
  name: "RolesPermission",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  validations: {
    rolesData: {
      name: {
        required,
        minLength: minLength(3),
      },
      price: {
        required,
        decimal
      },
      cycle: {
        required,
      },
      wordLimit: {
        required,
        numeric
      },
      success_url: {
        required,
        url,
      },
      cancel_url: {
        required,
        url,
      }
    },
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      perPage: 20,
      currentPage: 1,
      rolesLength: 0,
      roles: [],
      rolesData: {
        name: "",
        price: "",
        cycle: null,
        wordLimit: "",
        success_url: "",
        cancel_url: "",
        set_as_user_plan: false,
        team_member_role: false
      },
      cycleOptions: [{
        value: null,
        text: "Select Cycle",
      }],
      error: "",
      triggerEdit: false,
      editId: null,
      selectedRole: null,
      optionsRole: [{
        value: null,
        text: "Select a Role"
      },
      {
        value: "User",
        text: "User"
      },
      {
        value: "Admin",
        text: "Admin"
      },
      ],
      userPlan: [{
        text: "Make role a User Plan",
        value: "true"
      }],
      submitted: false,
    };
  },

  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllRoles();
      console.log("Value: " + value);
    },
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/roles",
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
    getRoleCycle() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getRoleCycle")
        .then((res) => {
          console.log(res.data);
          res.data.data.forEach(cycle => {
            this.cycleOptions.push({
              value: cycle.id,
              text: cycle.name.toUpperCase()
            });
          });

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getAllRoles() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllRoles")
        .then((res) => {
          this.roles = res.data;
          // this.rolesLength = res.data.meta.total;
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
    addRole(event) {
      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-role");
      this.$store
        .dispatch("addRole", {
          name: this.rolesData.name,
          price: this.rolesData.price,
          cycle_id: this.rolesData.cycle,
          words_allowed: this.rolesData.wordLimit,
          success_url: this.rolesData.success_url,
          cancel_url: this.rolesData.cancel_url,
          set_as_user_plan: this.rolesData.set_as_user_plan,
          team_member_role: this.rolesData.team_member_role
        })
        .then((res) => {
          console.log(res);
          this.getAllRoles();
          this.rolesData = {
            name: "",
            price: "",
            cycle: null,
            wordLimit: "",
            success_url: "",
            cancel_url: "",
            set_as_user_plan: false,
            team_member_role: false
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
    editRole(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-role");
      this.$store
        .dispatch("editRole", {
          id: id,
          data: {
            name: this.rolesData.name,
            price: this.rolesData.price,
            cycle_id: this.rolesData.cycle,
            words_allowed: this.rolesData.wordLimit,
            success_url: this.rolesData.success_url,
            cancel_url: this.rolesData.cancel_url,
            set_as_user_plan: this.rolesData.set_as_user_plan,
            team_member_role: this.rolesData.team_member_role,
            type: "role"
          },
        })
        .then((res) => {
          console.log(res);
          this.getAllRoles();
          this.rolesData = {
            name: "",
            price: "",
            cycle: null,
            wordLimit: "",
            success_url: "",
            cancel_url: "",
            set_as_user_plan: false,
            team_member_role: false
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
    deleteRole(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteRole", id)
        .then((res) => {
          console.log(res);
          this.getAllRoles();
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
      this.rolesData = {
        name: data.name,
        price: data.price,
        cycle: data.cycle_id,
        wordLimit: data.words_allowed,
        success_url: data.success_url,
        cancel_url: data.cancel_url,
        set_as_user_plan: data.set_as_user_plan,
        team_member_role: data.team_member_role
      }
    },
    clearField() {
      this.rolesData = {
        name: "",
        price: "",
        cycle: null,
        wordLimit: "",
        success_url: "",
        cancel_url: "",
        set_as_user_plan: false,
        team_member_role: false
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.rolesData.name = data;
    },
  },

  mounted() {
    this.getRoleCycle();
    this.getAllRoles();
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
