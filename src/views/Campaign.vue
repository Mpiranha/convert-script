<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="campaign"
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
            <h6 class="title">All Campaign</h6>

            <div class="d-flex align-items-center ml-auto">
              <button
                @click="resetFilter"
                v-if="selectedAgency"
                class="btn btn-cancel-filters"
              >
                <img src="@/assets/icons/cancel.svg" alt="cancel icon" />
              </button>
              <b-form-group class="mb-0 mr-3" label-class="input-label">
                <b-form-select
                  class="input-table"
                  v-model="selectedAgency"
                  :options="clientOptions"
                ></b-form-select>
              </b-form-group>
              <button
                @click="clearField"
                class="btn btn-create"
                v-b-modal.modal-new-campaign
              >
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
              <input
                @input="searchKeyWord"
                v-model="searchKey"
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>

            <!-- <div class="sort-wrap">
              <div class="acct-desc">{{ campaignLength }} Campaign(s)</div>

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
            <div v-if="campaigns.length === 0" class="no-data-info">
              Created campaigns will display here.
            </div>
            <table v-else class="table table-custom">
              <tbody v-if="searchResult.length > 0">
                <tr v-for="result in searchResult" :key="result.id">
                  <td scope="row">
                    <router-link
                      :to="{
                        name: 'CampaignScript',
                        params: { id: result.id },
                      }"
                    >
                      {{ result.name }}
                    </router-link>
                  </td>
                  <td>{{ result.scripts_count }}</td>
                  <td>
                    {{ formatDate(result.created_at) }}
                  </td>
                  <td>
                    <dropdown-tool
                      delete-what="Campaign"
                      @edit-clicked="openEditModal(result.id, result.name)"
                      @delete-proceed="deleteCampaign(result.id)"
                    >
                      <template v-slot:secondary>
                        <b-dropdown-item
                          v-b-modal.add-client
                          link-class="drop-link"
                          href="#"
                        >
                          <img
                            class="drop-img-icon"
                            src="@/assets/icons/convert-icon/Add to client icon.svg"
                            alt="add to client icon"
                          />
                          Add to Client
                        </b-dropdown-item>
                      </template>
                    </dropdown-tool>
                  </td>
                </tr>
              </tbody>
               <tbody v-else-if="selectedAgency">
                <tr v-for="campaign in filteredCampaign" :key="campaign.id">
                  <td scope="row">
                    <router-link
                      :to="{
                        name: 'CampaignScript',
                        params: { id: campaign.id },
                      }"
                    >
                      {{ campaign.name }}
                    </router-link>
                  </td>
                  <td>{{ campaign.scripts_count }}</td>
                  <td>
                    {{ formatDate(campaign.created_at) }}
                  </td>
                  <td>
                    <dropdown-tool
                      delete-what="Campaign"
                      @edit-clicked="openEditModal(campaign.id, campaign.name)"
                      @delete-proceed="deleteCampaign(campaign.id)"
                    >
                      <template v-slot:secondary>
                        <b-dropdown-item
                          v-b-modal.modal-add-client
                          link-class="drop-link"
                          href="#"
                        >
                          <img
                            class="drop-img-icon"
                            src="@/assets/icons/convert-icon/Add to client icon.svg"
                            alt="add to client icon"
                          />
                          Add to Client
                        </b-dropdown-item>
                      </template>
                    </dropdown-tool>
                  </td>
                </tr>
              </tbody>
              <tbody v-else-if="campaigns && searchKey.length < 1">
                <tr v-for="campaign in campaigns" :key="campaign.id">
                  <td scope="row">
                    <router-link
                      :to="{
                        name: 'CampaignScript',
                        params: { id: campaign.id },
                      }"
                    >
                      {{ campaign.name }}
                    </router-link>
                  </td>
                  <td>{{ campaign.scripts_count }}</td>
                  <td>
                    {{ formatDate(campaign.created_at) }}
                  </td>
                  <td>
                    <dropdown-tool
                      delete-what="Campaign"
                      @edit-clicked="openEditModal(campaign.id, campaign.name)"
                      @delete-proceed="deleteCampaign(campaign.id)"
                    >
                      <template v-slot:secondary>
                        <b-dropdown-item
                          v-b-modal.modal-add-client
                          link-class="drop-link"
                          href="#"
                        >
                          <img
                            class="drop-img-icon"
                            src="@/assets/icons/convert-icon/Add to client icon.svg"
                            alt="add to client icon"
                          />
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

    <b-modal
      :hide-header="true"
      id="modal-new-campaign"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <div class="modal-head">
        <h3 class="title">Give your campaign a name</h3>
        <p class="desc">Only you can see this</p>
      </div>

      <b-form-group>
        <b-form-input
          id="name"
          v-model="campaignName"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-new-campaign')"
          class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="
            triggerEdit ? editCampaign(editId, campaignName) : addCampaign()
          "
          class="save-modal"
          >{{ triggerEdit ? "Edit" : "Create" }}</b-button
        >
      </div>
    </b-modal>
    <b-modal
      :hide-header="true"
      id="modal-add-client"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <b-form-group
        label="Add to Client"
        label-for="pwd"
        label-class="form-label"
      >
        <b-form-select
          class="input-table"
          v-model="client"
          :options="clientOptions"
        ></b-form-select>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-add-client')" class="close-modal"
          >Close</b-button
        >
        <b-button class="save-modal">Add</b-button>
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
  name: "Campaign",
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
      client: null,
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
    getCampaign() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getCampaigns")
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
    addCampaign() {
      this.$store.commit("updateLoadState", true);

      this.$bvModal.hide("modal-new-campaign");
      this.$store
        .dispatch("addCampaign", { name: this.campaignName })
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
    editCampaign(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-campaign");
      this.$store
        .dispatch("editCampaign", { id: id, data: { name: this.campaignName } })
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
        .dispatch("deleteCampaign", id)
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

    openEditModal(id, data) {
      this.$bvModal.show("modal-new-campaign");
      this.triggerEdit = true;
      this.editId = id;
      this.campaignName = data;
    },
    clearField() {
      this.campaignName = "";
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
    resetFilter() {
      this.selectedAgency = null;
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
      return this.campaigns.filter((cat) => {
        return this.selectedAgency == cat.script_type_category;
      });
    },
  },
};
</script>

<style>
.btn-cancel-filters img {
  width: 1rem;
}
</style>
