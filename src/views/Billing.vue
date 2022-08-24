<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="dashboard-top mb-5">
              <h6 class="title">Billing</h6>
            </div>

            <div class="content-wrap pt-4 pb-5">
              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
              <table class="table table-custom">
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Word</th>
                    <th>End At</th>
                    <th class="text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="planDetail.active_plan.length > 0">
                    <td scope="row"> {{ planDetail.active_plan[0].name.toUpperCase() }} </td>
                    <td class="text-left">{{ planDetail.active_plan[0].words.toLocaleString('en-US') }}</td>
                    <td>{{ formatDate(planDetail.active_plan[0].end_date) }}</td>

                    <td><span class="badge badge-success">ACTIVE</span></td>
                  </tr>
                  <tr v-for="plan in planDetail.all_plans" :key="plan.plan_id">
                    <td scope="row">{{ plan.name.toUpperCase() }}</td>
                    <td class="text-left">{{ plan.words.toLocaleString('en-US') }}</td>
                    <td>{{ new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(plan.price)
                    }}</td>
                    <td>
                      <router-link class="btn btn-upgrade" :to="{
                        name: 'UpgradeRedirect',
                        params: { id: plan.plan_id },
                      }">
                        Upgrade
                      </router-link>
                    </td>
                  </tr>
                 
                </tbody>
              </table>

              <table class="table table-custom">
                <tbody>

                </tbody>
              </table>

            </div>

            <div class="content-wrap word-usage-stat">
              <div class="label">Word Usage Count</div>
              <b-progress :value="wordStat.script_words_generated" :max="wordStat.limit" animated height="0.8rem">
              </b-progress>
              <div class="value">
                {{ wordStat.script_words_generated }} of {{ wordStat.limit }}
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
      planDetail: {
        active_plan: [],
        all_plans: []
      },
      wordStat: {
        limit: null,
        script_words_generated: null,
      },
    };
  },
  methods: {
    formatDate(date) {
      if (!date) {
        return "NULL";
      }
      var formatedDate = new Date(date);


      return formatedDate.toLocaleDateString();
    },
    getUserPlanDetails() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getUserPlanDetails")
        .then((res) => {
          this.planDetail = res.data.data;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getStatInfo() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getDashboardInfo")
        .then((res) => {
          this.wordStat = res.data.data.message;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
  },
  mounted() {
    this.getUserPlanDetails();
    this.getStatInfo();
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
