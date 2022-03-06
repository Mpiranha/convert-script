<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="reseller"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
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
            <h6 class="title">Reseller</h6>

            <button
              @click="clearField"
              class="btn btn-create"
              v-b-modal.modalPopover
            >
              <span>+</span>
              New Account
            </button>
          </div>

          <div class="content-wrap set-min-h pt-4 pb-5">
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div class="search-form">
              <button class="btn search-btn">
                <i class="flaticon-loupe icons"></i>
              </button>
              <input
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>

            <div class="sort-wrap">
              <div class="acct-desc">{{ resellers.length }} /50 Account</div>

              <select class="sort-select" name="" id="">
                <option selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <table class="table table-custom">
              <tbody>
                <tr v-for="reseller in resellers" :key="reseller.id">
                  <td scope="row">{{ reseller.first_name }}</td>
                  <td scope="row">{{ reseller.last_name }}</td>
                  <td>{{ reseller.active }}</td>
                  <td>{{ reseller.email }}</td>
                  <td>{{ formatDate(reseller.created_at) }}</td>
                  <td>
                    <dropdown-tool
                      delete-what="Reseller"
                      @edit-clicked="openEditModal(reseller.id, reseller)"
                      @delete-proceed="deleteReseller(reseller.id)"
                    >
                    </dropdown-tool>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      :hide-header="true"
      id="modalPopover"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <b-form-group
        label="First Name"
        label-for="name"
        label-class="form-label"
      >
        <b-form-input
          id="name"
          v-model="form.first_name"
          type="text"
          placeholder="first name"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Last Name" label-for="name" label-class="form-label">
        <b-form-input
          id="name"
          v-model="form.last_name"
          type="text"
          placeholder="last name"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Email" label-for="email" label-class="form-label">
        <b-form-input
          id="email"
          v-model="form.email"
          type="text"
          placeholder="user@domain.com"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        v-if="!triggerEdit"
        label="Password"
        label-for="pwd"
        label-class="form-label"
      >
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Access" label-for="pwd" label-class="form-label">
        <b-form-select
          class="input-table"
          v-model="form.plan"
          :options="planOptions"
        ></b-form-select>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modalPopover')" class="close-modal"
          >Close</b-button
        >
        <b-button class="save-modal">Save</b-button>
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

export default {
  name: "Reseller",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        role: "",
        email: "",
        password: "",
        plan: null,
      },
      planOptions: [{ value: null, text: "Select Plans" }],
      resellers: [],
      triggerEdit: false,
    };
  },
  methods: {
    getReseller() {
      this.$store
        .dispatch("getAllReseller")
        .then((res) => {
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
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modalPopover");

      this.$store
        .dispatch("addReseller", this.client)
        .then((res) => {
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.form = {
            first_name: "",
            last_name: "",
            role: "",
            email: "",
            password: "",
            plan: null,
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

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    editReseller(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modalPopover");
      this.$store
        .dispatch("editReseller", { id: id, data: this.client })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.form = {
            first_name: "",
            last_name: "",
            role: "",
            email: "",
            password: "",
            plan: null,
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
      this.form.plan = data.plan;
    },
    clearField() {
      this.form = {
        first_name: "",
        last_name: "",
        role: "",
        email: "",
        password: "",
        plan: null,
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
