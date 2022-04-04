<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="agency"
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
            <h6 class="title">Agency</h6>
            <div class="d-flex align-items-center">
              <router-link
                @click="clearField"
                class="btn btn-border-secondary"
                to="/agency/setup"
              >
                Agency Setup
              </router-link>
              <button
                @click="clearField"
                class="btn btn-create"
                v-b-modal.modal-new-client
              >
                <span>+</span>
                New Client
              </button>
            </div>
          </div>

          <div class="content-wrap set-min-h pt-4 pb-5">
            <div class="search-form">
              <button class="btn search-btn">
                <i class="flaticon-loupe icons"></i>
              </button>
              <input
                v-model="searchKey"
                @input="searchKeyWord"
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>

            <!-- <div class="sort-wrap">
              <div class="acct-desc">{{ agencyLength }} Client(s)</div>

              <select class="sort-select" name="" id="">
                <option value="none" selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div> -->
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div v-if="agency.length === 0" class="no-data-info">
              Created agency will display here.
            </div>
            <table v-else class="table table-custom">
              <tbody>
                <tr v-for="agency in orderedAgency" :key="agency.id">
                  <td scope="row">{{ agency.name }}</td>
                  <td>{{ agency.id }}</td>
                  <td>{{ agency.email }}</td>
                  <td>
                    {{ formatDate(agency.created_at) }}
                  </td>
                  <td>
                    <dropdown-tool
                      @edit-clicked="
                        openEditModal(agency.id, {
                          name: agency.name,
                          email: agency.email,
                        })
                      "
                      @delete-proceed="deleteAgency(agency.id)"
                    >
                      <!-- <template v-slot:secondary>
                        <b-dropdown-item
                          v-b-modal.modal-campaign
                          @click="getCurrent(agency.name)"
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

      <b-form-group label="Name">
        <b-form-input
          id="name"
          v-model="client.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Email">
        <b-form-input
          id="name"
          v-model="client.email"
          type="text"
          class="input-table"
        >
        </b-form-input>
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
    <b-modal
      :hide-header="true"
      id="modal-campaign"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <div class="modal-head mb-3">
        <h3 class="title">{{ this.client.name }}</h3>
      </div>

      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>

      <div class="d-flex justify-content-end mt-4">
        <b-button @click="$bvModal.hide('modal-campaign')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editAgency(editId) : addAgency()"
          class="save-modal"
          >Save</b-button
        >
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
  name: "Agency",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  data() {
    return {
      client: {
        name: "",
        email: "",
      },
      accessOptions: [{ value: null, text: "Select Plans" }],
      agency: [],
      error: "",
      loading: true,
      triggerEdit: false,
      editId: null,
      selected: [], // Must be an array reference!
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" },
      ],
    };
  },
  methods: {
    getAgency() {
      this.$store
        .dispatch("getAllAgency")
        .then((res) => {
          this.agency = res.data.data;
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
    addAgency() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");

      this.$store
        .dispatch("addAgency", this.client)
        .then((res) => {
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.makeToast("success", "Agency added successfully");
          this.getAgency();
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          this.makeToast("danger", error);
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
          this.makeToast("success", "Agency editted successfully");
          this.getAgency();
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          this.makeToast("danger", error);
          this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });
    },
    deleteAgency(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteAgency", id)
        .then((res) => {
          this.error = null;
          this.makeToast("success", "Agency deleted successfully");
          this.getAgency();
          console.log(res.data);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          this.makeToast("danger", error);
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
    this.getAgency();
  },
  computed: {
    agencyLength() {
      return this.agency.length;
    },
    orderedAgency() {
      return this.orderSort(this.agency);
    },
  },
};
</script>

<style>
.custom-control {
  position: relative;
  z-index: 1;
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5rem;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
}

.custom-control-inline {
  display: flex;
  margin-right: 1rem;
}

.custom-control-input {
  position: absolute;
  left: 0;
  z-index: -1;
  width: 1rem;
  height: 1.25rem;
  opacity: 0;
}

input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

.custom-control-label::after,
.custom-control-label::before {
  position: absolute;
  top: 0.25rem;
  left: -1.5rem;
  display: block;
  width: 1rem;
  height: 1rem;
  content: "";
}

.custom-control-label {
  position: relative;
  margin-bottom: 0;
  vertical-align: top;
}

.custom-control-label::before {
  pointer-events: none;
  background-color: #fff;
  border: 1px solid #adb5bd;
}

.custom-control-label::before,
.custom-file-label,
.custom-select {
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.custom-checkbox .custom-control-label::before {
  border-radius: 0.25rem;
}

.custom-control-label::after {
  background: no-repeat 50%/50% 50%;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #007bff;
  background-color: #007bff;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3E%3C/svg%3E");
}
</style>
