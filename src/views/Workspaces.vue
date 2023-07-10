<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="workspace"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container-fluid">
            <div class="
                  dashboard-top
                  d-flex
                  flex-wrap
                  justify-content-between
                  align-items-center
                  mb-4
                ">
              <h6 class="title">Workspaces ({{ workspaces.length }})</h6>

              <div class="d-flex flex-wrap align-items-center ml-md-auto">
                <button @click="clearField" class="btn btn-add-member" v-b-modal.modal-new-member>
                  Add member
                </button>

                <button @click="clearField" class="btn btn-create btn-create-workspace" v-b-modal.modal-new-workspace>
                  <span>+</span>
                  New Workspace
                </button>
              </div>
            </div>

            <div class="content-wrap set-min-h pt-4 pb-5">
              <div class="search-form">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input @input="searchKeyWord" v-model="searchKey" class="form-control no-shadow search-input" type="text"
                  placeholder="Search" />
              </div>

              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>

              <div v-if="workspaces.length === 0" class="no-data-info">
                Created workspaces will display here.
              </div>
              <div v-else class="responsive-table">
                <table class="table table-custom">
                  <thead>
                    <tr>
                      <th>Workspace</th>
                      <th>Owner</th>
                      <th class="text-left">Members</th>
                      <th>Status</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="result in searchResult" :key="result.id">
                      <td class="workspace_link" scope="row" @click="setDefaultWorkspace(result.id)">
                        {{ result.name }}
                      </td>
                      <td class="text-left">{{ result.owner }}</td>
                      <td class="text-left">{{ result.member_count }}</td>
                      <td>
                        <span v-if="workspace.id == $store.state.user.default_workspace_id"
                          class="bg-success default_workspace">Active</span>
                      </td>
                      <td>
                        <dropdown-tool delete-what="workspace" @edit-clicked="openEditModal(result.id, result)
                          " :hide-edit="workspace.owner.toLowerCase() != 'me'"
                          :hide-delete="workspace.id == $store.state.user.default_workspace_id"
                          @delete-proceed="deleteWorkspace(result.id)">
                          <template v-slot:secondary>
                            <router-link link-class="drop-link" :to="/workspace/ + workspace.id">
                              <img class="drop-img-icon" src="@/assets/icons/members.svg" alt="add to client icon" />
                              Members
                            </router-link>
                            <b-dropdown-item link-class="drop-link" @click="setDefaultWorkspace(result.id)">
                              <img class="drop-img-icon" src="@/assets/icons/workspace.svg"
                                alt="add to client icon" />
                              Set as Active
                            </b-dropdown-item>
                          </template>
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="workspaces && searchKey.length < 1">
                    <tr v-for="workspace in workspaces" :key="workspace.id">
                      <td class="workspace_link" scope="row" @click="setDefaultWorkspace(workspace.id)">
                        {{ workspace.name }}
                      </td>
                      <td class="text-left">
                        {{ workspace.owner }}
                      </td>
                      <td class="text-left">{{ workspace.member_count }}</td>
                      <td>
                        <span v-if="workspace.id == $store.state.user.default_workspace_id"
                          class="bg-success default_workspace">Active</span>
                      </td>
                      <td>
                        <dropdown-tool delete-what="workspace" @edit-clicked="openEditModal(workspace.id, workspace)
                          " :hide-edit="workspace.owner.toLowerCase() != 'me'"
                          :hide-delete="workspace.id == $store.state.user.default_workspace_id"
                          @delete-proceed="deleteWorkspace(workspace.id)">
                          <template v-slot:secondary>
                            <b-dropdown-item link-class="drop-link">
                              <router-link class="drop-link" :to="/workspace/ + workspace.id">
                                <img class="drop-img-icon" src="@/assets/icons/members.svg" alt="add to client icon" />
                                Members
                              </router-link>
                            </b-dropdown-item>
                            <b-dropdown-item link-class="drop-link" @click="setDefaultWorkspace(workspace.id)">
                              <img class="drop-img-icon" src="@/assets/icons/workspace.svg"
                                alt="add to client icon" />
                              Set as Active
                            </b-dropdown-item>
                          </template>
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :hide-header="true" id="modal-new-workspace" centered size="md" :hide-footer="true"
      dialog-class="control-width" content-class="modal-main">


      <b-form-group>
        <label for="workspace-name">Workspace Name</label>
        <b-form-input :class="{ 'is-invalid': submitted && $v.workspaceData.name.$error }" id="workspace-name"
          v-model="workspaceData.name" type="text" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.workspaceData.name.$error" class="invalid-feedback">
          <span v-if="!$v.workspaceData.name.required">* Name is required <br /></span>
          <span v-if="!$v.workspaceData.name.minLength">* Minimum of 3 Characters</span>
        </div>
      </b-form-group>

      <!-- <b-form-group>
        <label for="workspace-name">Workspace Slug</label>
        <b-form-input :class="{ 'is-invalid': submitted && $v.workspaceData.slug.$error }" id="workspace-slug"
          v-model="workspaceData.slug" type="text" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.workspaceData.slug.$error" class="invalid-feedback">
          <span v-if="!$v.workspaceData.slug.required">* Slug is required <br /></span>
          <span v-if="!$v.workspaceData.slug.minLength">* Minimum of 3 Characters</span>
        </div>
      </b-form-group> -->

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-workspace')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editWorkspace(editId, $event) : addWorkspace($event)
          " class="save-modal">{{ triggerEdit ? "Edit" : "Create" }}</b-button>
      </div>
    </b-modal>
    <b-modal :hide-header="true" id="modal-new-member" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <!-- <div class="modal-head">
        <h3 class="title">Give your workspace a name</h3>
        <p class="desc">Only you can see this</p>
      </div> -->
      <!-- <div class="row">
        <div class="col-6">
          <b-form-group label="First Name">
            <b-form-input :class="{ 'is-invalid': submitted && $v.userData.firstname.$error }" id="firstname"
              v-model="userData.firstname" type="text" class="input-table">
            </b-form-input>
            <div v-if="submitted && $v.userData.firstname.$error" class="invalid-feedback">
              <span v-if="!$v.userData.firstname.required">* First name is required <br /></span>
              <span v-if="!$v.userData.firstname.minLength">* Minimum of 3 Characters</span>
            </div>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group label="Last Name">
            <b-form-input :class="{ 'is-invalid': submitted && $v.userData.lastname.$error }" id="lastname"
              v-model="userData.lastname" type="text" class="input-table">
            </b-form-input>
            <div v-if="submitted && $v.userData.lastname.$error" class="invalid-feedback">
              <span v-if="!$v.userData.lastname.required">* Last name is required <br /></span>
              <span v-if="!$v.userData.lastname.minLength">* Minimum of 3 Characters</span>
            </div>
          </b-form-group>
        </div>
      </div> -->

      <b-form-group label="Email">
        <b-form-input :class="{ 'is-invalid': submitted && $v.userData.email.$error }" id="email" v-model="userData.email"
          type="text" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.userData.email.$error" class="invalid-feedback">
          <span v-if="!$v.userData.email.required">* Email is required <br /></span>
          <span v-if="!$v.userData.email.email">* Please enter a valid email</span>
        </div>
      </b-form-group>



      <b-form-group label="Role">
        <b-form-select :class="{ 'is-invalid': submitted && $v.userData.role_id.$error }" v-model="userData.role_id"
          :options="roleOptions"></b-form-select>
        <div v-if="submitted && $v.userData.role_id.$error" class="invalid-feedback">
          <span v-if="!$v.userData.role_id.required">* User role is required <br /></span>
        </div>
      </b-form-group>

      <b-form-group label="Select Workspace">
        <b-form-select :class="{ 'is-invalid': submitted && $v.userData.workspace_id.$error }"
          v-model="userData.workspace_id" :options="workspaceOptions"></b-form-select>
        <div v-if="submitted && $v.userData.workspace_id.$error" class="invalid-feedback">
          <span v-if="!$v.userData.workspace_id.required">* Workspace is required <br /></span>
        </div>
      </b-form-group>

      <!-- <b-form-group label="Select Workspace" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group id="checkbox-group-1" v-model="userData.plans" :options="optionsPlan"
          :aria-describedby="ariaDescribedby" name="flavour-1"></b-form-checkbox-group>
      </b-form-group> -->

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-member')" class="close-modal">Close</b-button>
        <b-button @click="addTeamToWorkspace($event)" class="save-modal">
          Add user
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import DropdownTool from "@/components/DropdownTool";
import alertMixin from "@/mixins/alertMixin";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "workspace",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  validations: {
    workspaceData: {
      name: {
        required,
        minLength: minLength(1),
      },
      // slug: {
      //   required,
      //   minLength: minLength(1),
      // }
    },
    userData: {
      // firstname: {
      //   required,
      //   minLength: minLength(3),
      // },
      // lastname: {
      //   required,
      //   minLength: minLength(3),
      // },
      role_id: {
        required
      },
      email: {
        email,
        required
      },
      workspace_id: {
        required
      }
    },
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      workspaces: [],
      workspaceData: {
        name: "",
        // slug: ""
      },
      error: "",
      loading: true,
      triggerEdit: false,
      editId: null,
      roleOptions: [{ value: null, text: "Select a Role" }],
      workspaceOptions: [{ value: null, text: "Select a Workspace" }],
      submitted: false,
      userData: {
        // firstname: "",
        // lastname: "",
        role_id: null,
        email: "",
        workspace_id: null
      },
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/workspaces",
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
    getWorkspaces() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getWorkspaces")
        .then((res) => {
          this.workspaces = res.data.response.data;
          for (let index = 0; index < this.workspaces.length; index++) {
            this.workspaceOptions.push({
              value: this.workspaces[index].id,
              text: this.workspaces[index].name,
            });
          }
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addWorkspace(event) {

      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.workspaceData.$invalid) {
        return;
      }
      this.$store.commit("updateLoadState", true);

      this.$bvModal.hide("modal-new-workspace");
      this.$store
        .dispatch("addWorkspace", this.workspaceData)
        .then(() => {
          this.error = null;
        //  console.log(res.data);

          this.getWorkspaces();
          this.makeToast("success", "Workspace added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.$store.commit("updateLoadState", false);
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getworkspace();

      // this.$vm.$forceUpdate();
    },
    editWorkspace(id, event) {
      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.workspaceData.$invalid) {
        return;
      }

      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-workspace");
      this.$store
        .dispatch("editWorkspace", { id: id, data: this.workspaceData })
        .then(() => {
          this.error = null;
          this.submitted = false;
          this.getWorkspaces();
          this.makeToast("success", "Workspace editted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.$store.commit("updateLoadState", false);
          this.makeToast("danger", this.error);
          // this.error = error;
        });
    },
    deleteWorkspace(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteWorkspace", id)
        .then(() => {
          this.error = null;
          this.getWorkspaces();
         // console.log(res.data);
          this.makeToast("success", "workspace deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
          // this.error = error;
        });

      // this.getworkspace();
    },
    addTeamToWorkspace(event) {


      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.userData.$invalid) {
        return;
      }


      this.$store.commit("updateLoadState", true);

      this.$bvModal.hide("modal-new-member");
      this.$store
        .dispatch("addTeamToWorkspace", this.userData)
        .then(() => {
          this.error = null;
          // console.log(res.data);
          this.getWorkspaces();
          this.submitted = false;
          this.userData = {
            // firstname: "",
            // lastname: "",
            role_id: null,
            email: "",
            workspace_id: null
          }

          this.makeToast("success", "Team member added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.$store.commit("updateLoadState", false);
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getworkspace();

      // this.$vm.$forceUpdate();
    },
    setDefaultWorkspace(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("addDefaultWorkspace", {
          workspace_id: id
        })
        .then(() => {
          this.error = null;
          window.location.reload();
          this.makeToast("success", "Workspace successfully set as Default");
          // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.$store.commit("updateLoadState", false);
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getworkspace();

      // this.$vm.$forceUpdate();
    },
    getRoleOptions() {
      this.$store
        .dispatch("getTeamRoles")
        .then((res) => {
         // console.log(res);
          var data = res.data;

          for (let index = 0; index < data.length; index++) {
            this.roleOptions.push({
              value: data[index].id,
              text: String(data[index].name).replace(/^.|\s\S/g, function(a) { return a.toUpperCase(); }),
            });
          }

          // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    openEditModal(id, data) {
      this.$bvModal.show("modal-new-workspace");
      this.triggerEdit = true;
      this.editId = id;
      this.workspaceData = {
        name: data.name,
        // slug: data.slug
      }
    },
    clearField() {
      this.workspaceData = {
        name: "",
        // slug: ""
      },
        this.userData = {
          role_id: null,
          email: "",
          workspace_id: null
        },
        this.triggerEdit = false;
      this.submitted = false;
    },
    formatDate(date) {
      var formatedDate = new Date(date);

      return formatedDate.toLocaleDateString();
    },


  },

  mounted() {
    this.getWorkspaces();
    this.getRoleOptions();
  },
  computed: {

  },
};
</script>

<style>
.btn-add-member {
  border: 1px solid rgb(154 157 161) !important;
  margin-right: 1rem;
  font-size: 0.9rem !important;
  padding: 1rem 1.5rem !important;
}


.btn-create-workspace span {
  font-size: 1.4rem;
  left: 11px;
  top: 7px;
}

.btn-create-workspace {
  font-size: 0.8rem !important;
}

.default_workspace {
  color: #fff;
  padding: 0.35rem 1.2rem 0.3rem 1.2rem;
  border-radius: 1rem;
}

.workspace_link {
  cursor: pointer;
}</style>
