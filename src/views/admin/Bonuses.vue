<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="bonuses"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="container scroll-content">
          <div class="sec-padding">
            <div
              class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-5
              "
            >
              <h6 class="title mb-0">Bonuses</h6>
              <div class="d-flex align-items-center">
                <button
                  @click="clearField"
                  class="btn btn-create"
                  v-b-modal.modal-new-bonus
                >
                  <span>+</span>
                  New Bonus
                </button>
              </div>
            </div>

            <div class="content-wrap set-min-h pt-4 pb-5">
              <div class="search-form mb-2">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input
                  @change="makeToast('primary', 'try me')"
                  class="form-control no-shadow search-input"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <loader-modal
                :loading-state="this.$store.state.loading"
              ></loader-modal>
              <div v-if="bonusesLength === 0" class="no-data-info">
                Created agency will display here.
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="bonus in bonuses" :key="bonus.id">
                    <td scope="row">{{ bonus.name }}</td>

                    <td class="text-right">
                      <nav class="nav flex-column action-view">
                        <a @click="openEditModal(bonus.id, bonus)" class="nav-link" href="#">Edit</a>
                        <a @click="deleteBonus(bonus.id)" class="nav-link" href="#">Delete</a>
                      </nav>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center">
              <b-pagination
                v-model="currentPage"
                :total-rows="bonusesLength"
                :per-page="perPage"
                aria-controls="my-table"
                size="sm"
                :hide-goto-end-buttons="true"
                prev-text="<"
                next-text=">"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      :hide-header="true"
      id="modal-new-bonus"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <b-form-group label="Name">
        <b-form-input
          id="name"
          v-model="bonusData.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea
          id="name"
          v-model="bonusData.description"
          type="text"
          class="input-table"
          rows="4"
        >
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="Access URL">
        <b-form-input
          id="name"
          v-model="bonusData.url"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-bonus')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editBonus(editId, bonusData) : addBonus()"
          class="save-modal"
          >{{triggerEdit ? "Edit" : "Save"}}</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "Bonuses",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      bonuses: [],
      bonusesLength: 0,
      triggerEdit: false,
      bonusData: {
        name: "",
        description: "",
        url: "",
      },
    };
  },
  methods: {
    getAllBonuses() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllBonuses")
        .then((res) => {
          this.bonuses = res.data.data;
          this.bonusesLength = this.bonuses.length;
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
    addBonus() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-bonus");
      this.$store
        .dispatch("addBonuses", this.bonusData)
        .then((res) => {
          console.log(res);
          this.getAllBonuses();
          this.bonusData = {
            name: "",
            description: "",
            url: "",
          };
          this.makeToast("success", "Bonus added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editBonus(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-bonus");
      this.$store
        .dispatch("editBonuses", {
          id: id,
          data: this.bonusData,
        })
        .then((res) => {
          console.log(res);
          this.getAllBonuses();
          this.bonusData = {
            name: "",
            description: "",
            url: "",
          };
          this.makeToast("success", "Bonus edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteBonus(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteBonuses", id)
        .then((res) => {
          console.log(res);
          this.getAllBonuses();
          this.makeToast("success", "Bonus deleted successfully");
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
      this.$bvModal.show("modal-new-bonus");
      this.triggerEdit = true;
      this.editId = id;
      this.bonusData.name = data.name;
      this.bonusData.description = data.description;
      this.bonusData.url = data.url;
    },
    clearField() {
      this.bonusData = {
        name: "",
        description: "",
        url: ""
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
    this.getAllBonuses();
  },
  computed: {},
};
</script>

<style>
.sec-padding {
  padding-left: 200px;
  padding-right: 200px;
}
</style>
