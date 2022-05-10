<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="preset"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container">
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div class="dashboard-top">
              <h6 class="title">Agency Setup</h6>
              <div class="desc">
                Download all files and documents to setup your<br />
                agency
              </div>
            </div>
            <div class="row">
              <bonus-box
                v-for="agencyFile in agencyFiles"
                :key="agencyFile.id"
                :bonus-title="agencyFile.name"
                :desc="agencyFile.description"
                :bonus-link="agencyFile.url"
              ></bonus-box>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import BonusBox from "@/components/BonusBox";

export default {
  name: "AgencyFiles",
  components: {
    Sidebar,
    Navbar,
    BonusBox,
  },
  data() {
    return {
      agencyFiles: [],
    };
  },
  methods: {
    getAllAgencyFiles() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAgencyFilesUser")
        .then((res) => {
          this.agencyFiles = res.data.data;
          // this.videoLength = res.data.meta.total;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
  },
  mounted() {
    this.getAllAgencyFiles();
  },
};
</script>

<style scoped>
</style>
