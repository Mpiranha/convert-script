<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="container scroll-content">
          <div class="dashboard-top mb-5">
            <h6 class="title">Billing</h6>
          </div>

          <div class="content-wrap pt-4 pb-5">
            <table class="table table-custom">
              <tbody>
                <tr>
                  <td scope="row">Plan 1</td>
                  <td>05/072021</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td scope="row">Plan 2</td>
                  <td></td>
                  <td>
                    <button class="btn btn-upgrade">Upgrade</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="content-wrap word-usage-stat">
            <div class="label">Word Usage Count</div>
            <b-progress
              :value="progressValue"
              :max="max"
              animated
              height="0.8rem"
            ></b-progress>
            <div class="value">324500 of 50000</div>
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

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      progressValue: 50,
      max: 100,
    };
  },
};
</script>

<style>
.word-usage-stat {
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
}

.word-usage-stat .label {
  font-size: 0.9rem;
}

.word-usage-stat .value {
  font-size: 0.9rem;
}

.word-usage-stat .progress {
  flex-grow: 1;
  margin: 0 3rem;
  background-color: #bdbdbd;
}

.word-usage-stat .progress .progress-bar {
  background-color: #8338ec;
}
</style>
