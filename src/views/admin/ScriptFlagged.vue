<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="flagged-script"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
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
            <h6 class="title">Flagged Script</h6>
          </div>

          <div class="content-wrap set-min-h pt-4 pb-5">
            <div class="search-form mb-2">
              <button class="btn search-btn">
                <i class="flaticon-loupe icons"></i>
              </button>
              <input
                 v-model="searchKey"  @input="searchKeyWord"
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div v-if="users.length === 0" class="no-data-info">
              Created agency will display here.
            </div>
            <table v-else class="table table-custom">
              <thead>
                <tr>
                  <th>Script</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in orderedUser" :key="user.id">
                  <td scope="row">{{ user.email }}</td>
                  <td class="text-left">{{ formatDate(user.created_at) }}</td>
                  <td>{{ user.email }}</td>
                  <td>27/08/2011</td>
                  <td class="text-left">
                    <nav class="nav flex-column action-view">
                      <a class="nav-link" href="#" v-b-modal.modal-view-script
                        >View</a
                      >
                      <a class="nav-link" href="#">Mark as Read</a>
                    </nav>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPage"
              :total-rows="userLength"
              :per-page="perPage"
              aria-controls="my-table"
              size="sm"
              :hide-goto-end-buttons="true"
              prev-text="<"
              next-text=">"
               @change="handlePageChange"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      :hide-header="true"
      id="modal-view-script"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry s standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
      <p>
        <b>Product name: </b>LoremAppname <br />
        <b>Description: </b>Lorem Ipsum is simply dummy te x t of the printing
        and typesetting industry.
      </p>
      <p class="mb-5"><b>User email: </b> emma@gmail.com</p>

      <div class="d-flex align-items-center justify-content-between">
        <div>
          <div class="foot-script-type">
            <img
              src="@/assets/icons/admin/sidebar-icon/scripts-type.svg"
              alt=""
            />
            <span>Script Type</span>
          </div>
          <div class="script-date-text">27/08/2011</div>
        </div>
        <div>
          <b-button
            @click="$bvModal.hide('modal-view-script')"
            class="close-modal"
            >Close</b-button
          >
          <b-button
            @click="
              triggerEdit ? editAgency(editId, campaignName) : addAgency()
            "
            class="save-modal"
            >{{ triggerEdit ? "Edit" : "Add Client" }}</b-button
          >
        </div>
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
  name: "Users",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      users: [
        {
          email: "test@gmail.com",
          firstName: "Test",
          lastName: "Test",
          status: false,
          plan: ["FE", "0T1"],
          created_at: "04/09/2021",
        },
        {
          email: "test@gmail.com",
          firstName: "Test",
          lastName: "Test",
          status: false,
          plan: ["FE", "0T1"],
          created_at: "04/09/2021",
        },
      ],
      userData: {
        name: "",
        email: "",
      },
      error: "",
      triggerEdit: false,
      editId: null,
      selectedPlan: [], // Must be an array reference!
      selectedRole: null,
      optionsRole: [
        { value: null, text: "Select a Role" },
        { value: "User", text: "User" },
        { value: "Admin", text: "Admin" },
      ],
      optionsPlan: [
        { text: "FE", value: "FE" },
        { text: "0T01", value: "0T01" },
        { text: "0T02", value: "0T02" },
        { text: "0T03", value: "0T03" },
        { text: "0T04", value: "0T04" },
      ],
    };
  },
  methods: {
     handlePageChange(value) {
      this.currentPage = value;
      this.getAgency();
      console.log("Value: " + value);
    },
    getAgency() {
      this.$store
        .dispatch("getAllAgency")
        .then((res) => {
          this.users = res.data.data;
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
    addAgency() {
       this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");

      this.$store
        .dispatch("addAgency", this.client)
        .then((res) => {
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.getAgency();
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
    editAgency(id) {
       this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-client");
      this.$store
        .dispatch("editAgency", { id: id, data: this.client })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.getAgency();
          //   this.loading = false;
           this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          //   this.loading = false;
           this.$store.commit("updateLoadState", false);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });
    },
    deleteAgency(id) {
      //   this.loading = true;
       this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteAgency", id)
        .then((res) => {
          this.error = null;
          this.getAgency();
          console.log(res.data);
          //   this.loading = false;
           this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.message);
          //   this.loading = false;
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
    userLength() {
      return this.users.length;
    },
    orderedUser() {
      return this.orderSort(this.users);
    },
  },
};
</script>

<style>
</style>
