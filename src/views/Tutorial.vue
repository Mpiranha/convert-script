<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
       :user-name="this.$store.state.user.first_name"
       current-active="tutorials"
      ></sidebar>
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
            v-for="video in videos"
            :key="video.id"
              :link="video.link"
              :title="video.title"
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
  name: "Tutorial",
  components: {
    Sidebar,
    Navbar,
    TutorialVideoBox,
  },
  data() {
    return {
      videos: [],
      videoLength: 0,
    }
  },
  methods: {
     getAllVideos() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getTutorialVideos")
        .then((res) => {
          this.videos = res.data.data;
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
    this.getAllVideos();
  },
};
</script>

<style scoped>


</style>
