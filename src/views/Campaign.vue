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

            <button
              @click="clearField"
              class="btn btn-create"
              v-b-modal.modal-new-campaign
            >
              <span>+</span>
              New Campaigns
            </button>
          </div>

          <div class="content-wrap set-min-h pt-4 pb-5">
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
              <div class="acct-desc">{{ campaignLength }} Campaign(s)</div>

              <select class="sort-select" name="" id="">
                <option value="none" selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div v-if="campaigns.length === 0" class="no-data-info">
              Created campaigns will display here.
            </div>
            <table v-else class="table table-custom">
              <tbody>
                <tr v-for="campaign in orderedCampaign" :key="campaign.id">
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
                      @edit-clicked="openEditModal(campaign.id, campaign.name)"
                      @delete-proceed="deleteCampaign(campaign.id)"
                    ></dropdown-tool>
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
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import DropdownTool from "@/components/DropdownTool";

export default {
  name: "Campaign",
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  data() {
    return {
      campaignName: "",
      accessOptions: [{ value: null, text: "Select Plans" }],
      campaigns: [],
      error: "",
      loading: true,
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    getCampaign() {
       this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getCampaigns")
        .then((res) => {
          this.campaigns = res.data.data;
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
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
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
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          // this.error = error.response.data.errors.root;
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
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();
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
  },

  mounted() {
    this.getCampaign();
  },
  computed: {
    campaignLength() {
      return this.campaigns.length;
    },
    orderedCampaign() {
      return this.orderSort(this.campaigns);
    },
  },
};
</script>

<style>
</style>
