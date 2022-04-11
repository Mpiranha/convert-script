<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container">
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div class="dashboard-top">
              <h6 class="title">Bonuses</h6>
              <div class="desc">
                Let's increase your engagement and<br />
                conversions and get your result
              </div>
            </div>
            <div class="row">
              <bonus-box
                v-for="bonus in bonuses"
                :key="bonus.id"
                :bonus-title="bonus.name"
                :desc="bonus.description"
                :bonus-link="bonus.url"
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
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    BonusBox,
  },
  data() {
    return {
      bonuses: [],
      bonusLength: 0,
    };
  },

  methods: {
    getAllBonuses() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getBonues")
        .then((res) => {
          this.bonuses = res.data.data;
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
    this.getAllBonuses();
  },
};
</script>

<style scoped>
</style>
