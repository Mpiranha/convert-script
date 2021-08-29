<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="container scroll-content">
          <div class="dashboard-top">
            <h6 class="title">Bonuses</h6>
            <div class="desc">
              Let's increase your engagement and<br />
              conversions and get your result
            </div>
          </div>
          <div class="row">
            <bonus-box
              bonus-title="Bonus Title"
              desc="This is where the bonus description will be placed"
              bonus-link="#"
            ></bonus-box>
             <bonus-box
              bonus-title="Bonus Title"
              desc="This is where the bonus description will be placed"
              bonus-link="#"
            ></bonus-box>
             <bonus-box
              bonus-title="Bonus Title"
              desc="This is where the bonus description will be placed"
              bonus-link="#"
            ></bonus-box>
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
import BonusBox from "@/components/BonusBox";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    BonusBox,
  },
};
</script>

<style scoped>
</style>
