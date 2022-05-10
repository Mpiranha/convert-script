<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="new-copy"
      ></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="d-flex">
              <div class="dashboard-top">
                <h6 class="title">Select Template</h6>
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

            <div v-if="searchResult.length > 0" class="row">
              <script-select-type-box
                v-for="scriptType in searchResult"
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

            <div v-else-if="category" class="row">
              <script-select-type-box
                v-for="scriptType in filteredCategory"
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
            <div v-else-if="scriptTypes && searchKey.length < 1" class="row">
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
      searchKey: "",
      searchResult: [],
      scriptTypes: [],
      categoryOptions: [{ value: null, text: "All Categories (0)" }],
      category: null,
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/script-types",
          keyword: this.searchKey,
        })
        .then((res) => {
          this.searchResult = res.data.data;

          // console.log(res.data + "called now");
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getScriptType() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getScriptTypes")
        .then((res) => {
          this.$set(this.categoryOptions, 0, {
            value: null,
            text: "All Categories (" + res.data.data.length + ")",
          });
          this.scriptTypes = res.data.data;

          console.log(res.data);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getCategories() {
      this.$store
        .dispatch("getAllCategories")
        .then((res) => {
          //this.categoryOptions = res.data.data;

          let cat = res.data.data.reverse();

          // cat.forEach(function (data) {
          //   console.log( "cat data " + data);
          //   this.categoryOptions.push({ value: data.id, text: data.name });
          // });

          for (let index = 0; index < cat.length; index++) {
            this.categoryOptions.push({
              value: cat[index].id,
              text: cat[index].name + " (" + cat[index].scripts + ")",
            });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
  },
  computed: {
    filteredCategory() {
      return this.scriptTypes.filter((cat) => {
        return this.category == cat.script_type_category;
      });
    },
  },
  mounted() {
    this.getScriptType();
    this.getCategories();
  },
};
</script>

<style scoped>
</style>
