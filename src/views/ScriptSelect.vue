<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="script"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="container scroll-content">
          <div class="dashboard-top">
            <h6 class="title">Create Script</h6>
            <div class="desc">
              Let's increase your engagement and<br />
              conversations and get your results.
            </div>
          </div>

          <div class="row">
            <script-select-type-box
              img-url="icons/convert-icon/Aweber.svg"
              link-url="#"
              type-title="Email Subject Line"
              desc="Write a high-converting subject line for your email"
            ></script-select-type-box>
             <script-select-type-box
              img-url="icons/convert-icon/Aweber.svg"
              link-url="#"
              type-title="Email Subject Line"
              desc="Write a high-converting subject line for your email"
            ></script-select-type-box>
             <script-select-type-box
              img-url="icons/convert-icon/Aweber.svg"
              link-url="#"
              type-title="Email Subject Line"
              desc="Write a high-converting subject line for your email"
            ></script-select-type-box>
             <script-select-type-box
              img-url="icons/convert-icon/Aweber.svg"
              link-url="#"
              type-title="Email Subject Line"
              desc="Write a high-converting subject line for your email"
            ></script-select-type-box>
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
import ScriptSelectTypeBox from "@/components/ScriptSelectTypeBox";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    ScriptSelectTypeBox,
  },
};
</script>

<style scoped>
</style>
