<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="marketplace"></sidebar>
      <div class="content-section">
        <navbar :remove-content="false"></navbar>
        <div ref="scrollContent" class="scroll-content">
          <upgrade-alert v-if="isRestricted" title="Marketplace"></upgrade-alert>
          <div class="container">
            <div class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-4
              ">
              <h6 class="title">MarketPlace</h6>

              <router-link @click="clearField" class="btn btn-one" to="/projects">
                Saved Projects
              </router-link>
            </div>

            <div class="content-wrap set-min-h pt-4 pb-5">
              <div class="search-form">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input @input="searchKeyWord" v-model="searchKey" class="form-control no-shadow search-input"
                  type="text" placeholder="Search" />
              </div>

              <!-- <div class="sort-wrap">
              <div class="acct-desc">{{ marketLength }} Projects</div>

              <select class="sort-select" name="" id="">
                <option value="none" selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div> -->
              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
              <div v-if="marketLength === 0" class="no-data-info">
                No Active Project, Try Again Later.
              </div>
              <div v-else>
                <table class="table table-custom table-market">
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="project in searchResult" :key="project.id">
                      <td>
                        <div class="market-desc">
                          <b>{{ project.title }}</b><br />
                          {{ project.short_description }}
                        </div>
                      </td>
                      <td>
                        {{ getProjectTime(project.updated_at) }} with
                        {{ project.bid_count }}
                        {{ project.bid_count > 1 ? "bids" : "bid" }}
                      </td>
                      <td>
                        <img class="icon-location" src="@/assets/icons/convert-icon/Marketplace.svg"
                          alt="location icon" />

                        {{
                        project.city
                        ? project.city
                        : "NIL"
                        }},
                        {{
                        project.currency_country
                        ? project.currency_country
                        : "NIL"
                        }}
                      </td>
                      <td>
                        <div class="price">
                          <div>
                            {{
                            project.type == "Fixed"
                            ? project.budget_high
                            : project.budget_low + "-" + project.budget_high
                            }}
                            {{ project.currency_code }}
                          </div>
                          {{ project.type }}
                        </div>
                      </td>
                      <td class="text-left">
                        <nav class="nav action-view">
                          <button class="btn no-shadow nav-link" href="#" v-b-modal.modal-view-script @click="
                            getCurrent({
                              title: project.title,
                              description: project.full_description,
                              type: project.type,
                              location: {
                                city: project.city,
                                country: project.currency_country,
                              },
                              budget: {
                                min: project.budget_low,
                                max: project.budget_high,
                              },
                              currency: { code: project.currency_code },
                              bids: project.bids,
                              time_updated: getProjectTime(project.updated_at),
                              url: project.url,
                            })
                          ">
                            View
                          </button>
                          <span>|</span>
                          <button class="btn no-shadow nav-link" href="#" @click="saveProject(project.id)">
                            Save
                          </button>
                        </nav>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="market && searchKey.length < 1">
                    <tr v-for="project in market" :key="project.id">
                      <td>
                        <div class="market-desc">
                          <b>{{ project.title }}</b><br />
                          {{ project.short_description }}
                        </div>
                      </td>
                      <td>
                        {{ getProjectTime(project.updated_at) }} with
                        {{ project.bid_count }}
                        {{ project.bid_count > 1 ? "bids" : "bid" }}
                      </td>
                      <td>
                        <img class="icon-location" src="@/assets/icons/convert-icon/Marketplace.svg"
                          alt="location icon" />

                        {{
                        project.city
                        ? project.city
                        : "NIL"
                        }},
                        {{
                        project.currency_country
                        ? project.currency_country
                        : "NIL"
                        }}
                      </td>
                      <td>
                        <div class="price">
                          <div>
                            {{
                            project.type == "Fixed"
                            ? project.budget_high
                            : project.budget_low + "-" + project.budget_high
                            }}
                            {{ project.currency_code }}
                          </div>
                          {{ project.type }}
                        </div>
                      </td>
                      <td class="text-left">
                        <nav class="nav action-view">
                          <button class="btn no-shadow nav-link" href="#" v-b-modal.modal-view-script @click="
                            getCurrent({
                              title: project.title,
                              description: project.full_description,
                              type: project.type,
                              location: {
                                city: project.city,
                                country: project.currency_country,
                              },
                              budget: {
                                min: project.budget_low,
                                max: project.budget_high,
                              },
                              currency: { code: project.currency_code },
                              bids: project.bids,
                              time_updated: getProjectTime(project.updated_at),
                              url: project.url,
                            })
                          ">
                            View
                          </button>
                          <span>|</span>
                          <button class="btn no-shadow nav-link" href="#" @click="saveProject(project.id)">
                            Save
                          </button>
                        </nav>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="m-market-list" v-if="searchResult.length > 0">
                  <div class="m-market-item" v-for="project in searchResult" :key="project.id">
                    <div class="mb-3">
                      <div class="m-market-title">{{ project.title }}</div>
                      <div class="m-market-desc">{{ project.short_description }}</div>
                    </div>
                    <div class="m-market-details">
                      <div class="price d-flex text-left mr-3">
                        <div class="mr-2">
                          {{
                          project.type == "Fixed"
                          ? project.budget_high
                          : project.budget_low + "-" + project.budget_high
                          }}
                          {{ project.currency_code }}
                        </div>
                        {{ project.type }}
                      </div>



                      <div class="text-left ml-auto">
                        <nav class="nav action-view">
                          <button class="btn no-shadow nav-link" href="#" v-b-modal.modal-view-script @click="
                            getCurrent({
                              title: project.title,
                              description: project.full_description,
                              type: project.type,
                              location: {
                                city: project.city,
                                country: project.currency_country,
                              },
                              budget: {
                                min: project.budget_low,
                                max: project.budget_high,
                              },
                              currency: { code: project.currency_code },
                              bids: project.bids,
                              time_updated: getProjectTime(project.updated_at),
                              url: project.url,
                            })
                          ">
                            View
                          </button>
                          <span>|</span>
                          <button class="btn no-shadow nav-link pr-0" href="#" @click="saveProject(project.id)">
                            Save
                          </button>
                        </nav>
                      </div>

                    </div>
                    <div class="m-market-action">
                      <div >
                        <img class="icon-location" src="@/assets/icons/convert-icon/Marketplace.svg"
                          alt="location icon" />

                        {{
                        project.city
                        ? project.city
                        : "NIL"
                        }},
                        {{
                        project.currency_country
                        ? project.currency_country
                        : "NIL"
                        }}
                      </div>
                      <div class="ml-auto">
                        {{ getProjectTime(project.updated_at) }} with
                        {{ project.bid_count }}
                        {{ project.bid_count > 1 ? "bids" : "bid" }}
                      </div>
                      


                    </div>
                  </div>
                </div>
                <div class="m-market-list" v-else-if="market && searchKey.length < 1">
                  <div class="m-market-item" v-for="project in market" :key="project.id">
                    <div class="mb-3">
                      <div class="m-market-title">{{ project.title }}</div>
                      <div class="m-market-desc">{{ project.short_description }}</div>
                    </div>
                    <div class="m-market-details">
                      <div class="price d-flex text-left mr-3">
                        <div class="mr-2">
                          {{
                          project.type == "Fixed"
                          ? project.budget_high
                          : project.budget_low + "-" + project.budget_high
                          }}
                          {{ project.currency_code }}
                        </div>
                        {{ project.type }}
                      </div>



                      <div class="text-left ml-auto">
                        <nav class="nav action-view">
                          <button class="btn no-shadow nav-link" href="#" v-b-modal.modal-view-script @click="
                            getCurrent({
                              title: project.title,
                              description: project.full_description,
                              type: project.type,
                              location: {
                                city: project.city,
                                country: project.currency_country,
                              },
                              budget: {
                                min: project.budget_low,
                                max: project.budget_high,
                              },
                              currency: { code: project.currency_code },
                              bids: project.bids,
                              time_updated: getProjectTime(project.updated_at),
                              url: project.url,
                            })
                          ">
                            View
                          </button>
                          <span>|</span>
                          <button class="btn no-shadow nav-link pr-0" href="#" @click="saveProject(project.id)">
                            Save
                          </button>
                        </nav>
                      </div>

                    </div>
                    <div class="m-market-action">
                      <div >
                        <img class="icon-location" src="@/assets/icons/convert-icon/Marketplace.svg"
                          alt="location icon" />

                        {{
                        project.city
                        ? project.city
                        : "NIL"
                        }},
                        {{
                        project.currency_country
                        ? project.currency_country
                        : "NIL"
                        }}
                      </div>
                      <div class="ml-auto">
                        {{ getProjectTime(project.updated_at) }} with
                        {{ project.bid_count }}
                        {{ project.bid_count > 1 ? "bids" : "bid" }}
                      </div>
                      


                    </div>
                  </div>
                </div>

              </div>
            </div>
            <b-modal :hide-header="true" id="modal-view-script" centered size="md" :hide-footer="true"
              dialog-class="control-width" content-class="modal-main">
              <div class="project-head">
                <h1 class="title">Project Details</h1>
                <div class="price">
                  <div>
                    {{
                    activeMarketData.type == "Fixed"
                    ? activeMarketData.budget.max
                    : activeMarketData.budget.min +
                    "-" +
                    activeMarketData.budget.max
                    }}
                    {{ activeMarketData.currency.code }}
                  </div>
                  {{ activeMarketData.type }}
                </div>
              </div>
              <div>
                <h6 class="project-title">{{ activeMarketData.title }}</h6>
                <p>
                  {{ activeMarketData.description }}
                </p>
              </div>

              <div class="d-flex flex-wrap align-items-center justify-content-end mt-5">
                <div class="d-flex location--time flex-column mr-auto">
                  <div class="mb-1">
                    <img class="icon-location" src="@/assets/icons/convert-icon/Marketplace.svg" alt="location icon" />
                    {{
                    activeMarketData.location.city
                    ? activeMarketData.location.city
                    : "NIL"
                    }},
                    {{
                    activeMarketData.location.country
                    ? activeMarketData.location.country
                    : "NIL"
                    }}
                  </div>
                  <div>
                    {{ activeMarketData.time_updated }} with
                    {{ activeMarketData.bids }}
                    {{ activeMarketData.bids > 1 ? "bids" : "bid" }}
                  </div>
                </div>
                <div>
                  <b-button @click="$bvModal.hide('modal-view-script')" class="close-modal">Close</b-button>
                  <a :href="activeMarketData.url" target="_blank" class="save-modal">Open Project</a>
                </div>
              </div>
            </b-modal>
            <div class="d-flex justify-content-center">
              <b-pagination v-model="currentPage" :total-rows="marketLength" :per-page="perPage"
                aria-controls="my-table" size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">"
                @change="handlePageChange"></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";
import UpgradeAlert from "../components/UpgradeAlert.vue";

export default {
  name: "MarketPlace",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    UpgradeAlert
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      perPage: 20,
      currentPage: 1,
      marketLength: 0,
      market: [],
      activeMarketData: {
        title: "",
        description: "",
        type: "",
        location: {
          city: "",
          country: "",
        },
        budget: {
          min: "",
          max: "",
        },
        currency: {
          code: "",
        },
        bids: "",
        time_updated: "",
        url: "",
      },
      error: "",
      triggerEdit: false,
      editId: null,
      isRestricted: false,
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/marketplace",
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
    handlePageChange(value) {
      this.$store.commit("updateLoadState", true);
      this.currentPage = value;
      this.getMarketData();
      this.$refs.scrollContent.scroll(0, 0);

    },
    getMarketData() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getMarket", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            if (res.data.message == "Access to Market Place is restricted") {
              this.isRestricted = true;
              this.$store.commit("updateLoadState", false);
              return;
            }
          }
          this.market = res.data.data;
         
          //this.marketLength = res.data.result.total_count;
          if (res.data.meta.total) {
            this.marketLength = res.data.meta.total;
          }
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);

          this.$store.commit("updateLoadState", false);
        });
    },

    saveProject(id) {
      this.$store
        .dispatch("saveProject", {
          freelancer_ad_id: id,
        })
        .then(() => {
          this.makeToast("success", "Project saved successfully");
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
        });
    },
    getProjectTime(time) {
      if (!time) {
        return "NIL";
      }
      var mil = new Date(time);

   

      var diff = Date.now() - mil.getTime();

      var seconds = Math.floor(diff / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        months = Math.floor(days / 30),
        years = Math.floor(days / 365);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;
      days %= 30;
      months %= 12;

      if (years > 1) {
        return years + " Years ago ";
      } else if (years > 0) {
        return years + " Year ago ";
      } else if (months > 1) {
        return months + " Months ago ";
      } else if (months > 0) {
        return months + " Month ago ";
      } else if (days > 1) {
        return days + " Days ago ";
      } else if (months > 0) {
        return days + " Day ago ";
      } else if (hours > 1) {
        return hours + " Hours ago ";
      } else if (hours > 0) {
        return hours + " Hour ago ";
      } else if (minutes > 1) {
        return minutes + " Minutes ago ";
      } else if (months > 0) {
        return minutes + " Minute ago ";
      } else {
        return "Just now";
      }
    },

    clearField() {
      this.client = {
        name: "",
        email: "",
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.activeMarketData.title = data.title;
      this.activeMarketData.description = data.description;
      this.activeMarketData.type = data.type;
      this.activeMarketData.location = {
        city: data.location.city,
        country: data.location.country,
      };
      this.activeMarketData.budget = {
        min: data.budget.min,
        max: data.budget.max,
      };
      this.activeMarketData.currency = {
        code: data.currency.code,
      };
      this.activeMarketData.bids = data.bids;
      this.activeMarketData.time_updated = data.time_updated;
      this.activeMarketData.url = data.url;
    },
    orderSort(arr) {
      return arr.sort(function (a, b) {
        return a.id - b.id;
      });
    },
    formatDate(date) {
      var formatedDate = new Date(date);

      return formatedDate.toLocaleDateString();
    },
  },

  mounted() {
    this.getMarketData();
  },
  computed: {},
};
</script>

<style>
.market-desc {
  max-width: 200px;
}

.market-desc b {
  margin-bottom: 0.2rem;
  color: #000;
}

.icon-location {
  width: 1.2rem;
  margin-right: 0.5rem;
}

.price {
  text-align: right;
  color: #909bae;
}

.price div {
  color: #8841ec;
}

.project-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.project-head .title {
  font-size: 1.3rem;
}

.location--time {
  color: #909bae;
  font-size: 0.8rem;
}
</style>
