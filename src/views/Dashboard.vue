<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="dashboard"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="container scroll-content">
          <div class="dashboard-top">
            <h6 class="title">Dashboard</h6>
          </div>

          <div class="row justify-content-between">
            <dashboard-box
              text="Campaign"
              box-type="leads"
              image-url="Campaigns boxes.svg"
              :box-value="stat.campaigns"
            ></dashboard-box>
            <dashboard-box
              text="Script"
              box-type="links"
              image-url="script boxes.svg"
              :box-value="stat.scripts"
            ></dashboard-box>
            <dashboard-box
              text="Published"
              box-type="campaign"
              image-url="Published boxes.svg"
              :box-value="stat.published"
            ></dashboard-box>
          </div>
          <loader-modal
            :loading-state="this.$store.state.loading"
          ></loader-modal>
          <div class="dashboard-top">
            <h6 class="title">Welcome Video</h6>
          </div>

          <div class="row mb-4">
            <div class="col-12">
              <div class="vid-box">
                <iframe
                  :src="stat.video.link"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen=""
                  frameborder="0"
                ></iframe>
              </div>
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
import DashboardBox from "@/components/DashboardBox";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    DashboardBox,
  },
  data() {
    return {
      stat: {
        video: {}
      },
    };
  },

  methods: {
    getStatInfo() {
       this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getDashboardInfo")
        .then((res) => {
          this.stat = res.data.data.message;

          console.log(res.data);
           this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
           this.$store.commit("updateLoadState", false);
        });
    },
  },
  mounted() {
    this.getStatInfo();
  },
};
</script>



<style scoped>
</style>
