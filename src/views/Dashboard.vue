<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar current-active="dashboard"></sidebar>
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
              box-value="5"
            ></dashboard-box>
            <dashboard-box
              text="Script"
              box-type="links"
              image-url="script boxes.svg"
              box-value="9"
            ></dashboard-box>
            <dashboard-box
              text="Published"
              box-type="campaign"
              image-url="Published boxes.svg"
              box-value="3"
            ></dashboard-box>
          </div>

          <div class="dashboard-top">
            <h6 class="title">Welcome Video</h6>
          </div>

          <div class="row mb-4">
            <div class="col-12">
              <div class="vid-box">
                <iframe
                  src="https://www.youtube.com/embed/RpXS1iYz6-M"
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
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Nav.vue";
import DashboardBox from "@/components/DashboardBox";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    DashboardBox,
  },
};
</script>

<style scoped>

</style>
