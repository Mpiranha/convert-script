<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="nil"></sidebar>
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
                  mb-1
                ">
              <h6 class="title">{{ workspaceDetail.workspace[0].name }}</h6>

              <div class="d-flex flex-wrap align-items-center ml-md-auto">
                <button v-show="String(workspaceDetail.workspace[0].owner).toLowerCase() == 'me'" @click="clearField" class="btn btn-add-member" v-b-modal.modal-new-member>
                  Add member
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

              <div v-if="workspaceDetail.teams.length === 0" class="no-data-info">
                Created workspaces will display here.
              </div>
              <div v-else class="responsive-table">
                <table class="table table-custom">
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Date Created</th>
                      <th class="text-left">Role</th>
                      <th class="text-center">Status</th>
                      <th v-show="String(workspaceDetail.workspace[0].owner).toLowerCase() == 'me'" class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="result in searchResult" :key="result.id">
                      <td scope="row">
                        {{ result.name }}
                      </td>
                      <td class="text-left">{{ formatDate(result.created_at) }}</td>
                      <td class="text-left">{{ result.member_count }}</td>
                      <td>

                      </td>
                      <td v-show="String(workspaceDetail.workspace[0].owner).toLowerCase() == 'me'">
                        <dropdown-tool delete-what="user" @edit-clicked="openEditModal(result.id, result)
                          " @delete-proceed="deleteTeamMember(result.id)">
                          <template v-slot:secondary>
                            <b-dropdown-item v-b-modal.modal-add-client link-class="drop-link" href="#">
                              <img class="drop-img-icon" src="@/assets/icons/account 1.png" alt="add to client icon" />
                              Members
                            </b-dropdown-item>
                            <b-dropdown-item v-b-modal.modal-add-client link-class="drop-link" href="#"
                              @click="setDefaultWorkspace(result.id)">
                              <img class="drop-img-icon" src="@/assets/icons/Default_workspace.png"
                                alt="add to client icon" />
                              Set as Default
                            </b-dropdown-item>
                          </template>
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="workspaceDetail.teams && searchKey.length < 1">
                    <tr v-for="team in workspaceDetail.teams" :key="team.id">
                      <td scope="row">
                        {{ team.firstname + " " + team.lastname }}
                      </td>
                      <td class="text-left">
                        {{ formatDate(team.created_at) }}
                      </td>
                      <td class="text-left">{{ team.team_role }}</td>
                      <td class="text-center">
                        <span v-if="team.status.toLowerCase() == 'active'" class="bg-success default_workspace">{{
                          team.status }}</span>
                        <span v-else>{{ team.status }}</span>
                      </td>
                      <td v-show="String(workspaceDetail.workspace[0].owner).toLowerCase() == 'me'">
                        <dropdown-tool delete-what="workspace" @edit-clicked="openEditModal(team.id, team)
                          " @delete-proceed="deleteTeamMember(team.id)">
                          <template v-slot:secondary>

                            <b-dropdown-item v-b-modal.modal-add-client link-class="drop-link" href="#"
                              @click="resendInviteLink(team.id)">
                              <img class="drop-img-icon" src="@/assets/icons/Group.png" alt="add to client icon" />
                              Resend Invite
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
          <span v-if="!$v.userData.email.required">* Name is required <br /></span>
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

      <!-- <b-form-group label="Select Workspace">
        <b-form-select :class="{ 'is-invalid': submitted && $v.userData.workspace_id.$error }"
          v-model="userData.workspace_id" :options="workspaceOptions"></b-form-select>
        <div v-if="submitted && $v.userData.workspace_id.$error" class="invalid-feedback">
          <span v-if="!$v.userData.workspace_id.required">* Workspace is required <br /></span>
        </div>
      </b-form-group> -->

      <!-- <b-form-group label="Select Workspace" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group id="checkbox-group-1" v-model="userData.plans" :options="optionsPlan"
          :aria-describedby="ariaDescribedby" name="flavour-1"></b-form-checkbox-group>
      </b-form-group> -->

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-member')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editTeamToWorkspace(editId, $event) : addTeamToWorkspace($event)"
          class="save-modal">
          {{ triggerEdit ? "EDIT" : "ADD USER" }}
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
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "workspace",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  validations: {
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
      workspaceDetail: {
        teams: [],
        workspace: [{ name: "" }]
      },
      error: "",
      loading: true,
      triggerEdit: false,
      editId: null,
      roleOptions: [{ value: null, text: "Select a Role" }],
      submitted: false,
      userData: {
        // firstname: "",
        // lastname: "",
        role_id: null,
        email: "",
        workspace_id: this.$route.params.id
      },
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/workspaces/" + this.$route.params.id,
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
    getWorkspaceData(id, noload) {
      if (!noload) {
        this.$store.commit("updateLoadState", true);
      }

      this.$store
        .dispatch("getOneWorkspace", {
          id: id
        })
        .then((res) => {
          this.workspaceDetail = res.data.data;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },

    resendInviteLink(team_id) {
      console.log(team_id)
      this.$store
        .dispatch("resendInviteLink", team_id)
        .then((res) => {

          this.makeToast("success", res.data.message);


        })
        .catch((error) => {

          console.log(error);

        });
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
          this.getWorkspaceData(this.$route.params.id);
          this.submitted = false;
          this.userData = {
            // firstname: "",
            // lastname: "",
            role_id: null,
            email: "",
            workspace_id: this.$route.params.id
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
    editTeamToWorkspace(id, event) {


      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.userData.$invalid) {
        return;
      }


      this.$store.commit("updateLoadState", true);

      this.$bvModal.hide("modal-new-member");
      this.$store
        .dispatch("editTeamWorkspace", { id: id, data: this.userData })
        .then(() => {
          this.error = null;
          // console.log(res.data);
          this.getWorkspaceData(this.$route.params.id);
          this.submitted = false;
          this.userData = {
            // firstname: "",
            // lastname: "",
            role_id: null,
            email: "",
            workspace_id: this.$route.params.id
          }

          this.makeToast("success", "Team member editted successfully");
          this.$store.commit("updateLoadState", false);
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
    deleteTeamMember(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteTeamWorkspace", { id: id, workspace_id: this.$route.params.id })
        .then(() => {
          this.error = null;
          this.getWorkspaceData(this.$route.params.id);

          this.makeToast("success", "Team member deleted successfully");
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

    getRoleOptions() {
      this.$store
        .dispatch("getTeamRoles")
        .then((res) => {
          console.log(res);
          var data = res.data;

          for (let index = 0; index < data.length; index++) {
            this.roleOptions.push({
              value: data[index].id,
              text: data[index].name,
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
      this.$bvModal.show("modal-new-member");
      this.triggerEdit = true;
      this.editId = id;
      this.userData = {
        // firstname: data.firstname,
        // lastname: data.lastname,
        role_id: data.team_role_id,
        email: data.email,
        workspace_id: this.$route.params.id
      }
    },

    clearField() {
    
      this.triggerEdit = false;
      this.submitted = false;
      this.userData = {
        role_id: null,
        email: "",
        workspace_id: this.$route.params.id
      }
    },
    formatDate(date) {
      var formatedDate = new Date(date);

      return formatedDate.toLocaleDateString();
    },


  },

  mounted() {
    this.getWorkspaceData(this.$route.params.id);
    this.getRoleOptions();
    // this.getWorkspaces();
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
  font-size: 0.8rem;
}
</style>
