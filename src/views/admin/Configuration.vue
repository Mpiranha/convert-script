<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="configuration"
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
            <h6 class="title mb-0">Configuration</h6>
            <div class="d-flex align-items-center">
              <button
                @click="clearField"
                class="btn btn-create py-2"
                v-b-modal.modal-new-client
              >
               
                Save
              </button>
            </div>
          </div>

          <div class="content-wrap pt-4 pb-5 px-5">
            
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
           
            <b-form-group label="API">
              <b-form-input
                id="name"
                v-model="userData.name"
                type="text"
                class="input-table"
              >
              </b-form-input>
           </b-form-group>
           <b-form-group label="IP Address">
              <b-form-input
                id="name"
                v-model="userData.name"
                type="text"
                class="input-table"
              >
              </b-form-input>
           </b-form-group>
           <b-form-group label="JVZoo IPN">
              <b-form-input
                id="name"
                v-model="userData.name"
                type="text"
                class="input-table"
              >
              </b-form-input>
           </b-form-group>
           <b-form-group label="API Secret">
              <b-form-input
                id="name"
                v-model="userData.name"
                type="text"
                class="input-table"
              >
              </b-form-input>
           </b-form-group>
          </div>
         
        </div>
          </div>
      </div>
    </div>

   
    
      <!-- <div class="modal-head">
        <h3 class="title">Give your campaign a name</h3>
        <p class="desc">Only you can see this</p>
      </div> -->

      

      

      

      
   
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
      file: null,
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
.control-width {
  max-width: 500px !important;
}
.plan-types {
  padding-right: 0.4rem;
  display: inline-flex;
}

.plan-types::after {
  content: ",";
}
</style>
