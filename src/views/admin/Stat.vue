<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="stat"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="container scroll-content">
          <div class="dashboard-top">
            <h6 class="title">Admin Dashboard</h6>
          </div>

          <div class="row justify-content-between">
            <dashboard-box
              text="Users"
              box-type="leads"
              image-url="Campaigns boxes.svg"
              :box-value="stat.user"
            ></dashboard-box>
            <dashboard-box
              text="Transactions"
              box-type="links"
              image-url="script boxes.svg"
              :box-value="stat.transactions"
            ></dashboard-box>
            <dashboard-box
              text="Scripts"
              box-type="campaign"
              image-url="Published boxes.svg"
              :box-value="stat.published"
            ></dashboard-box>
          </div>

          <div class="dashboard-top">
            <h6 class="title">Words/Day Chart</h6>
          </div>

          <div class="row mb-4">
            <div class="col-12">
              <div class="chart-box">
                <apexchart
                  type="line"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
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
import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
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
      stat: [],
      series: [
        {
          name: "This Month",
          data: [10, 41, 35, 51, 49, 62, 90, 91, 100],
        },
      ],

      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },

        colors: ["#8338ec"],
        // fill: {
        //   type: "gradient",
        //   gradient: {
        //     shadeIntensity: 1,
        //     opacityFrom: 0.6,
        //     opacityTo: 0.9,
        //     stops: [0, 60, 100],
        //   },
        // },
        // dropShadow: {
        //   enabled: true,
        //   enabledSeries: [0],
        //   top: 2,
        //   left: 5,
        //   blur: 3,
        //   color: "#000",
        //   opacity: 1,
        // },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Words",
          align: "left",
        },
        grid: {
          row: {
            colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "19/May",
            "20/May",
            "21/May",
            "22/May",
            "23/May",
            "24/May",
            "25/May",
            "26/May",
            "27/May",
          ],
        },
      },
    };
  },
  methods: {
    getStatInfo() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getStatInfo")
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
  }
};
</script>

<style scoped>
.chart-box {
  background-color: #ffffff;
  height: 375px;
  border-radius: 0.4rem;
  box-shadow: 1px 2px 6px #bbb4b482;
  padding: 1rem 0.5rem;
}
</style>
