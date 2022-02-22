<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="script"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="container scroll-content">
          <div class="d-flex">
            <div class="dashboard-top">
              <h6 class="title">Create Script</h6>
              <div class="desc">
                Let's increase your engagement and<br />
                conversations and get your results.
              </div>
            </div>

            <div class="select-script-forms">
              <b-form-group label-class="input-label">
                <b-form-select
                  class="input-table"
                  v-model="category"
                  :options="categoryOptions"
                ></b-form-select>
              </b-form-group>
              <div class="search-form">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input
                  v-model="searchKey"
                  @input="searchKeyWord"
                  class="form-control no-shadow search-input"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <script-select-type-box
              v-for="scriptType in scriptTypes"
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
  name: "SelectScript",
  components: {
    Sidebar,
    Navbar,
    ScriptSelectTypeBox,
  },
  data() {
    return {
      scriptTypes: [],
    categoryOptions: [{ value: null, text: "Select a Category" }],
      category: "null",
    };
  },
  methods: {
    getScriptType() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getScriptTypes")
        .then((res) => {
          this.scriptTypes = res.data.data;

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
    this.getScriptType();
  },
};
</script>

<style scoped>
</style>
