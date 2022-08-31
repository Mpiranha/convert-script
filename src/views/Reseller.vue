<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="reseller"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <upgrade-alert v-if="isRestricted" title="Reseller"></upgrade-alert>
          <div class="container">
            <div class="
              dashboard-top
              d-flex
              justify-content-between
              align-items-center
              mb-5
            ">
              <h6 class="title">Reseller</h6>

              <button @click="clearField" class="btn btn-create" v-b-modal.modalPopover>
                <span>+</span>
                New Account
              </button>
            </div>

            <div class="content-wrap set-min-h pt-4 pb-5">
              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
              <div class="search-form">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input @input="searchKeyWord" v-model="searchKey" class="form-control no-shadow search-input"
                  type="text" placeholder="Search" />
              </div>

              <!-- <div class="sort-wrap">
              <div class="acct-desc">{{ resellers.length }} /50 Account</div>

              <select class="sort-select" name="" id="">
                <option selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div> -->
              <div v-if="resellers.length === 0" class="no-data-info">
                No reseller created.
              </div>
              <table v-else class="table table-custom">
                <tbody v-if="searchResult.length > 0">
                  <tr v-for="reseller in searchResult" :key="reseller.id">
                    <td scope="row">{{  reseller.first_name  }}</td>
                    <td scope="row">{{  reseller.last_name  }}</td>
                    <td>{{  reseller.active  }}</td>
                    <td>{{  reseller.email  }}</td>
                    <td>{{  formatDate(reseller.created_at)  }}</td>
                    <td>
                      <dropdown-tool delete-what="Reseller" @edit-clicked="openEditModal(reseller.id, reseller)"
                        @delete-proceed="deleteReseller(reseller.id)">
                      </dropdown-tool>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="resellers && searchKey.length < 1">
                  <tr v-for="reseller in resellers" :key="reseller.id">
                    <td scope="row">{{  reseller.first_name  }}</td>
                    <td scope="row">{{  reseller.last_name  }}</td>
                    <td>{{  reseller.active  }}</td>
                    <td>{{  reseller.email  }}</td>
                    <td>{{  formatDate(reseller.created_at)  }}</td>
                    <td>
                      <dropdown-tool delete-what="Reseller" @edit-clicked="openEditModal(reseller.id, reseller)"
                        @delete-proceed="deleteReseller(reseller.id)">
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

    <b-modal :hide-header="true" id="modalPopover" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <b-form-group label="First Name" label-for="name" label-class="form-label">
        <b-form-input id="name" v-model="form.first_name" type="text" placeholder="first name" class="input-table"
          :class="{ 'is-invalid': submitted && $v.form.first_name.$error }">
        </b-form-input>
        <div v-if="submitted && !$v.form.first_name.required" class="invalid-feedback">
          * first name is required
        </div>
        <div v-if="submitted && !$v.form.first_name.minLength" class="invalid-feedback">
          * Minimum of 3 Characters
        </div>
      </b-form-group>
      <b-form-group label="Last Name" label-for="name" label-class="form-label">
        <b-form-input id="name" v-model="form.last_name" type="text" placeholder="last name" class="input-table"
          :class="{ 'is-invalid': submitted && $v.form.last_name.$error }">
        </b-form-input>
        <div v-if="submitted && !$v.form.last_name.required" class="invalid-feedback">
          * last name is required
        </div>
        <div v-if="submitted && !$v.form.last_name.minLength" class="invalid-feedback">
          * Minimum of 3 Characters
        </div>

      </b-form-group>

      <b-form-group label="Email" label-for="email" label-class="form-label">
        <b-form-input id="email" v-model="form.email" type="text" placeholder="user@domain.com" class="input-table"
          :class="{ 'is-invalid': submitted && $v.form.email.$error }">
        </b-form-input>
        <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
          <span v-if="!$v.form.email.required">* Email is required</span>
          <span v-if="!$v.form.email.email">* Email is invalid</span>
        </div>
      </b-form-group>
      <b-form-group v-if="!triggerEdit" label="Password" label-for="pwd" label-class="form-label">
        <b-form-input id="password" v-model="form.password" type="password" class="input-table"
          :class="{ 'is-invalid': submitted && $v.form.password.$error }">
        </b-form-input>
        <div v-if="submitted && $v.form.password.$error" class="invalid-feedback">
          <span v-if="!$v.form.password.required">* Password is required</span>
          <span v-if="!$v.form.password.minLength">* Password must be at least 6 characters</span>
        </div>
      </b-form-group>
      <b-form-group label="Access" label-for="pwd" label-class="form-label">
        <b-form-select class="input-table" v-model="form.role" :options="planOptions"
          :class="{ 'is-invalid': submitted && $v.form.role.$error }"></b-form-select>
        <div v-if="submitted && !$v.form.role.required" class="invalid-feedback">
          * select suitable plan
        </div>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modalPopover')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editReseller() : addReseller()" class="save-modal">Submit</b-button>
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
import UpgradeAlert from "../components/UpgradeAlert.vue";
import {
  required,
  minLength,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Reseller",
  provide() {
    return {
      $v: this.$v,
    };
  },
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
    UpgradeAlert
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      form: {
        first_name: "",
        last_name: "",
        role: "",
        email: "",
        password: "",
      },
      planOptions: [{
        value: null,
        text: "Select Plans"
      }],
      resellers: [],
      triggerEdit: false,
      submitted: false,
      error: null,
      isRestricted: false,
    };
  },
  validations: {
    form: {
      first_name: {
        required,
        minLength: minLength(3),
      },
      last_name: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      role: {
        required,
      },
    },
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/reseller",
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
    getAllplans() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getUsersAllPlan")
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.planOptions.push({
              value: res.data.data[i].name,
              text: res.data.data[i].name.toUpperCase(),
            });
          }
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getReseller() {
      this.$store
        .dispatch("getAllReseller")
        .then((res) => {

          if (res.data.data.length == 0) {
            if (res.data.message == "Access to Reseller is restricted") {
              this.isRestricted = true;
              this.$store.commit("updateLoadState", false);
              return;
            }
          }
          this.resellers = res.data.data;
          // console.log(res.data + "called now");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addReseller() {
      //event.preventDefault();
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modalPopover");

      this.$store
        .dispatch("addReseller", {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          role: this.form.role,
          email: this.form.email,
          password: this.form.password,
        })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.makeToast("success", "Reseller created successfully");
          // this.getCampaign();
          this.form = {
            first_name: "",
            last_name: "",
            role: null,
            email: "",
            password: "",
          };
          this.getReseller();
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          this.error = error.response.data.errors;
          for (const key in this.error) {
            if (Object.hasOwnProperty.call(this.error, key)) {
              //const element = [key];
              if (this.error[key] !== "undefined") {
                this.makeToast("danger", this.error[key]);
              }
            }
          }
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    editReseller(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modalPopover");
      this.$store
        .dispatch("editReseller", {
          id: id,
          data: {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            role: this.form.role,
            email: this.form.email,
          },
        })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.form = {
            first_name: "",
            last_name: "",
            role: null,
            email: "",
            password: "",

          };
          this.getReseller();
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });
    },
    deleteReseller(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteReseller", id)
        .then((res) => {
          this.error = null;
          this.getReseller();
          console.log(res.data);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();
    },

    openEditModal(id, data) {
      this.$bvModal.show("modalPopover");
      this.triggerEdit = true;
      this.editId = id;

      this.form.first_name = data.first_name;
      this.form.last_name = data.last_name;
      this.form.role = data.role;
      this.form.email = data.email;
    },
    clearField() {
      this.submitted = false;
      this.form = {
        first_name: "",
        last_name: "",
        role: null,
        email: "",
        password: "",

      };
      this.triggerEdit = false;
    },
    formatDate(date) {
      var formatedDate = new Date(date);

      return formatedDate.toLocaleDateString();
    },
  },
  mounted() {
    this.getReseller();
    this.getAllplans();
  },
};
</script>

<style>
.drop-toogle-btn {
  background-color: transparent !important;
  border: none !important;
  color: #000 !important;
  padding: 0.15rem 0.5rem !important;
}

.table-drop-icon::before {
  font-size: 0.9rem;
  margin-right: 0.3rem;
}
</style>
