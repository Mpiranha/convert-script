<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar></sidebar>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Nav.vue";


export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar
  },
};
</script>

<style scoped>

</style>
