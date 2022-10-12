<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="dashboard"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="dashboard-top">
              <h6 class="title">Dashboard</h6>
            </div>

            <div class="row justify-content-between">
              <dashboard-box
                text="Total Word Count"
                box-type="leads"
                image-url="Campaigns boxes.svg"
                :box-value="Number(stat.script_words_generated)"
              ></dashboard-box>
              <dashboard-box
                text="Copy Created"
                box-type="links"
                image-url="script boxes.svg"
                :box-value="Number(stat.scripts)"
              ></dashboard-box>
              <dashboard-box
                text="Clients"
                box-type="campaign"
                image-url="Published boxes.svg"
                :box-value="Number(stat.agencies)"
              ></dashboard-box>
            </div>
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div class="dashboard-top">
              <h6 class="title">Recently used</h6>
            </div>

            <div class="row" v-if="stat.recent_templates.length > 0">
              <script-select-type-box
                v-for="scriptType in stat.recent_templates"
                :key="scriptType.id"
                :img-url="
                  scriptType.icon
                    ? scriptType.icon
                    : require(`@/assets/icons/convert-icon/Aweber.svg`)
                "
                :link-url="
                  $route.params.id
                    ? {
                        name: 'CampaignCreateScript',
                        params: {
                          campaignId: $route.params.id,
                          id: scriptType.id,
                        },
                      }
                    : {
                        name: 'CreateScript',
                        params: { id: scriptType.id },
                      }
                "
                :type-title="scriptType.name"
                :desc="scriptType.description"
              ></script-select-type-box>
            </div>
            <div v-else class="empty-templates">
              Most recently Used Template will Show here
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
import ScriptSelectTypeBox from "@/components/ScriptSelectTypeBox";
import DashboardBox from "@/components/DashboardBox";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    DashboardBox,
    ScriptSelectTypeBox
  },
  data() {
    return {
      stat: {
        recent_templates: [],
      },
    };
  },

  methods: {
    getStatInfo() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getDashboardInfo")
        .then((res) => {
          this.stat = res.data.data.message;

          // console.log(res.data);
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
    
  },
};
</script>



<style scoped>

.empty-templates {
  min-height: calc(100vh - 355px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f8f9;
}

</style>
