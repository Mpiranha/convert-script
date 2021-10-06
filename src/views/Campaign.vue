<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
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
            <div v-if="loading">
              <div class="loader-modal">
                <img
                  class="loader-img"
                  src="@/assets/image/loader.gif"
                  alt=""
                />
              </div>
            </div>
            <div v-else>
              <div v-if="campaigns.length === 0" class="no-data-info">
                Created campaigns will display here.
              </div>
              <table v-else class="table table-custom">
                <tbody>
                  <tr v-for="campaign in orderedCampaign" :key="campaign.id">
                    <td scope="row">{{ campaign.name }}</td>
                    <td>5</td>
                    <td>
                      {{ formatDate(campaign.created_at) }}
                    </td>
                    <td>
                      <dropdown-tool
                        @edit-clicked="
                          openEditModal(campaign.id, campaign.name)
                        "
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
      this.$store
        .dispatch("getCampaigns")
        .then((res) => {
          this.campaigns = res.data.data;
          console.log(res.data + "called now");
          this.loading = false;
        })
        .catch((error) => {
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          this.loading = false;
        });
    },
    addCampaign() {
      this.loading = true;
      this.$bvModal.hide("modal-new-campaign");
      this.$store
        .dispatch("addCampaign", { name: this.campaignName })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.getCampaign();
          this.loading = false;
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
      this.loading = true;
      this.$bvModal.hide("modal-new-campaign");
      this.$store
        .dispatch("editCampaign", { id: id, data: { name: this.campaignName } })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.getCampaign();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });
    },
    deleteCampaign(id) {
      this.loading = true;
      this.$store
        .dispatch("deleteCampaign", id)
        .then((res) => {
          this.error = null;
          this.getCampaign();
          console.log(res.data);
          this.loading = false;
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
.save-btn {
  background-color: pink;
}

.modal-main {
  border-radius: 0.5rem !important;
}

.drop-main-wrap {
  min-width: 6rem !important;
  font-size: 0.8rem !important;
  box-shadow: -3px 3px 6px #eee;
}

.form-label {
  font-size: 0.9rem;
}

.input-table {
  border: 1px solid #c2c8d1 !important;
  font-size: 0.9rem !important;
  border-radius: 0.5rem !important;
  width: 100%;
  padding: 0.55rem 0.75rem;
}

.control-width {
  max-width: 420px !important;
}

.form-group {
  margin-bottom: 0.7rem;
}

.close-modal,
.save-modal {
  font-size: 0.8rem !important;
  padding: 0.45rem 1.5rem !important;
  border: none !important;
  border-radius: 0.5rem !important;
}

.close-modal {
  margin-right: 0.8rem;
  color: #8338ec !important;
  background-color: #fff !important;
  border: 1px solid #8338ec !important;
}

.save-modal {
  background-color: #8338ec !important;
  color: #fff !important;
}

.modal-head .title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0;
}

.modal-head .desc {
  font-size: 0.7rem;
  color: #848688;
}
</style>
