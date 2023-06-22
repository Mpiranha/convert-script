<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="campaign"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="
                  dashboard-top
                  d-flex
                  flex-wrap
                  justify-content-between
                  align-items-center
                  mb-2
                ">
              <h6 class="title">All Campaign</h6>

              <div class="d-flex flex-wrap align-items-center ml-md-auto">
                <!-- <button @click="resetFilter" v-if="selectedAgency" class="btn btn-cancel-filters">
                  <img src="@/assets/icons/cancel.svg" alt="cancel icon" />
                </button>

                <b-form-group class="mb-3 mr-3" label-class="input-label">
                  <b-form-select @input="getClientsCampaign" class="input-table manage-width" v-model="selectedAgency"
                    :options="clientOptions"></b-form-select>
                </b-form-group> -->

                <button @click="clearField" class="btn btn-create mb-3" v-b-modal.modal-new-campaign>
                  <span>+</span>
                  New Campaigns
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

              <div v-if="campaigns.length === 0" class="no-data-info">
                Created campaigns will display here.
              </div>
              <div v-else class="responsive-table">
                <table class="table table-custom">
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="result in searchResult" :key="result.id">
                      <td scope="row">
                        <router-link :to="{
                            name: 'CampaignScript',
                            params: { id: result.id },
                          }">
                          {{ result.name }}
                        </router-link>
                      </td>
                      <td>{{ result.scripts_count }}</td>
                      <td>
                        {{ formatDate(result.created_at) }}
                      </td>
                      <td>
                        <dropdown-tool delete-what="Campaign" @edit-clicked="openEditModal(result.id, result.name)"
                          @delete-proceed="deleteCampaign(result.id)">
                          <!-- <template v-slot:secondary>
                            <b-dropdown-item v-b-modal.add-client link-class="drop-link" href="#"
                              @click="getCampaignId(result.id)">
                              <img class="drop-img-icon" src="@/assets/icons/convert-icon/Add to client icon.svg"
                                alt="add to client icon" />
                              Add to Client
                            </b-dropdown-item>
                          </template> -->
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="selectedAgency">
                    <tr v-for="campaign in filteredCampaign" :key="campaign.id">
                      <td scope="row">
                        <router-link class="campaign_link" :to="{
                            name: 'CampaignScript',
                            params: { id: campaign.id },
                          }">
                          {{ campaign.name }}
                        </router-link>
                      </td>
                      <td>{{ campaign.scripts_count }}</td>
                      <td>
                        {{ formatDate(campaign.created_at) }}
                      </td>
                      <td>
                        <dropdown-tool delete-what="Campaign" @edit-clicked="openEditModal(campaign.id, campaign.name)
                          " @delete-proceed="deleteCampaign(campaign.id)">
                          <!-- <template v-slot:secondary>
                            <b-dropdown-item v-b-modal.modal-add-client link-class="drop-link" href="#"
                              @click="getCampaignId(campaign.id)">
                              <img class="drop-img-icon" src="@/assets/icons/convert-icon/Add to client icon.svg"
                                alt="add to client icon" />
                              Add to Client
                            </b-dropdown-item>
                          </template> -->
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="campaigns && searchKey.length < 1">
                    <tr v-for="campaign in campaigns" :key="campaign.id">
                      <td scope="row">
                        <router-link class="campaign_link" :to="{
                            name: 'CampaignScript',
                            params: { id: campaign.id },
                          }">
                          {{ campaign.name }}
                        </router-link>
                      </td>
                      <td>{{ campaign.scripts_count }}</td>
                      <td>
                        {{ formatDate(campaign.created_at) }}
                      </td>
                      <td>
                        <dropdown-tool delete-what="Campaign" @edit-clicked="openEditModal(campaign.id, campaign.name)
                          " @delete-proceed="deleteCampaign(campaign.id)">
                          <template v-slot:secondary>
                            <b-dropdown-item v-b-modal.modal-add-client link-class="drop-link" href="#"
                              @click="getCampaignId(campaign.id)">
                              <img class="drop-img-icon" src="@/assets/icons/convert-icon/Add to client icon.svg"
                                alt="add to client icon" />
                              Add to Client
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

    <b-modal :hide-header="true" id="modal-new-campaign" centered size="md" :hide-footer="true"
      dialog-class="control-width" content-class="modal-main">
      <div class="modal-head">
        <h3 class="title">Give your campaign a name</h3>
        <p class="desc">Only you can see this</p>
      </div>

      <b-form-group>
        <b-form-input :class="{ 'is-invalid': submitted && $v.campaignName.$error }" id="name" v-model="campaignName"
          type="text" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.campaignName.$error" class="invalid-feedback">
          <span v-if="!$v.campaignName.required">* Name is required <br /></span>
          <span v-if="!$v.campaignName.minLength">* Minimum of 3 Characters</span>
        </div>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-campaign')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editCampaign(editId, $event) : addCampaign($event)
          " class="save-modal">{{ triggerEdit ? "Edit" : "Create" }}</b-button>
      </div>
    </b-modal>
    <b-modal :hide-header="true" id="modal-add-client" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <b-form-group label="Add to Client" label-for="pwd" label-class="form-label">
        <b-form-select class="input-table" v-model="client" :options="clientOptions"></b-form-select>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-add-client')" class="close-modal">Close</b-button>
        <b-button @click="addToClient(campaignIdToAdd)" class="save-modal">Add</b-button>
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
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Campaign",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  validations: {
    campaignName: {
      required,
      minLength: minLength(3),
    },
  },
  data() {
    return {
      workspace_id: this.$store.state.user.default_workspace_id,
      searchKey: "",
      searchResult: [],
      client: null,
      campaignIdToAdd: null,
      clientOptions: [{ value: null, text: "Select a Client" }],
      campaignName: "",
      accessOptions: [{ value: null, text: "Select Plans" }],
      campaigns: [],
      error: "",
      loading: true,
      triggerEdit: false,
      editId: null,
      agencyOptions: [{ value: null, text: "Select a Client" }],
      selectedAgency: null,
      clientCampaign: [],
      submitted: false,
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/campaigns",
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
    getCampaignId(id) {
      this.campaignIdToAdd = id;
    },
    getCampaign() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getCampaigns", this.workspace_id)
        .then((res) => {
          this.campaigns = res.data.data.reverse();
          console.log(res.data + "called now");
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
    addCampaign(event) {

      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.commit("updateLoadState", true);

      this.$bvModal.hide("modal-new-campaign");
      this.$store
        .dispatch("addCampaign", { name: this.campaignName, workspace_id: this.workspace_id })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.getCampaign();
          this.makeToast("success", "Campaign added successfully");
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

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    editCampaign(id, event) {
      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-campaign");
      this.$store
        .dispatch("editCampaign", { id: id, data: { name: this.campaignName }, workspace_id: this.workspace_id })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.getCampaign();
          this.makeToast("success", "Campaign editted successfully");
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
    deleteCampaign(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteCampaign", { id: id, workspace_id: this.workspace_id })
        .then((res) => {
          this.error = null;
          this.getCampaign();
          console.log(res.data);
          this.makeToast("success", "Campaign deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
          // this.error = error;
        });

      // this.getCampaign();
    },

    addToClient(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-add-client");
      this.$store
        .dispatch("addCampaignToAgency", {
          id: id,
          data: { agency_id: this.client, campaign_id: id },
        })
        .then((res) => {
          console.log(res);
          this.error = null;
          this.client = null;
          this.makeToast("success", "Campaign Added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          this.client = null;
          this.error = error.response.data.data.error;

          this.$store.commit("updateLoadState", false);
          this.makeToast("danger", this.error);
          // this.error = error;
        });
    },

    getAgency() {
      this.$store
        .dispatch("getAllAgency")
        .then((res) => {
          var data = res.data.data;

          for (let index = 0; index < data.length; index++) {
            this.clientOptions.push({
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
      this.$bvModal.show("modal-new-campaign");
      this.triggerEdit = true;
      this.editId = id;
      this.campaignName = data;
    },
    clearField() {
      this.campaignName = "";
      this.triggerEdit = false;
      this.submitted = false;
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
    resetFilter() {
      this.selectedAgency = null;
      this.clientCampaign = [];
    },
    getClientsCampaign() {
      this.$store.commit("updateLoadState", true);
      if (this.selectedAgency) {
        this.$store
          .dispatch("getAgencyCampaign", this.selectedAgency)
          .then((res) => {
            this.$store.commit("updateLoadState", false);
            this.clientCampaign = res.data.data;
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("updateLoadState", false);
          });
      } else {
        this.getAgency();
      }
    },
  },

  mounted() {
    this.getAgency();
    this.getCampaign();
  },
  computed: {
    campaignLength() {
      return this.campaigns.length;
    },
    orderedCampaign() {
      return this.orderSort(this.campaigns);
    },
    filteredCampaign() {
      if (this.selectedAgency) {
        return this.clientCampaign;
      }

      return this.campaigns;
      // return this.campaigns.filter((cat) => {
      //   return this.selectedAgency == cat.script_type_category;
      // });
    },
  },
};
</script>

<style>
.btn-cancel-filters img {
  width: 1rem;
}

.manage-width {
  width: 200px !important;
}

.campaign_link {
  color: #8338ec !important;
  text-decoration: none;
  font-size: 1rem;
}
</style>
