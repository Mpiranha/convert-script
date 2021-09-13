<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar></sidebar>
      <div class="content-section">
        <navbar current-active="tutorials"></navbar>
        <div class="container scroll-content">
          <div class="dashboard-top">
            <h6 class="title">Tutorial</h6>
            <div class="desc">
              Find training materials, videos, tips and many more to<br />
              guide you on how to use this platform
            </div>
          </div>

          <div class="row mt-3">
            <tutorial-video-box
              link="https://www.youtube.com/embed/RpXS1iYz6-M"
              title="Write a high-converting subject line for your email"
            >
            </tutorial-video-box>

            <tutorial-video-box
              link="https://www.youtube.com/embed/RpXS1iYz6-M"
              title="Write a high-converting subject line for your email"
            >
            </tutorial-video-box>

            <tutorial-video-box
              link="https://www.youtube.com/embed/RpXS1iYz6-M"
              title="Write a high-converting subject line for your email"
            >
            </tutorial-video-box>

            <tutorial-video-box
              link="https://www.youtube.com/embed/RpXS1iYz6-M"
              title="Write a high-converting subject line for your email"
            >
            </tutorial-video-box>

            <tutorial-video-box
              link="https://www.youtube.com/embed/RpXS1iYz6-M"
              title="Write a high-converting subject line for your email"
            >
            </tutorial-video-box>

            <tutorial-video-box
              link="https://www.youtube.com/embed/RpXS1iYz6-M"
              title="Write a high-converting subject line for your email"
            >
            </tutorial-video-box>
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
import TutorialVideoBox from "@/components/TutorialVideoBox";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    TutorialVideoBox,
  },
};
</script>

<style scoped>
</style>
