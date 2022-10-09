<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="marketplace"></sidebar>
      <div class="content-section">
        <navbar :remove-content="false"></navbar>
        <div ref="scrollContent" class="scroll-content">
          <div class="container">
            <div class="
              dashboard-top
              d-flex
              justify-content-between
              align-items-center
              mb-5
            ">
              <h6 class="title">Saved Projects</h6>
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
              <div class="acct-desc">{{ projects.length }} Projects</div>

              <select class="sort-select" name="" id="">
                <option value="none" selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div> -->
              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
              <div v-if="projects.length === 0" class="no-data-info">
                Saved Projects Will Display Here.
              </div>
              <table v-else class="table table-custom table-market">
                <tbody v-if="searchResult.length > 0">
                  <tr v-for="project in searchResult" :key="project.freelancer_ad_id.id">
                    <td>
                      <div class="market-desc">
                        <b>{{  project.freelancer_ad_id.title  }}</b><br />
                        {{  project.freelancer_ad_id.short_description  }}
                      </div>
                    </td>
                    <td>
                      {{  getProjectTime(project.freelancer_ad_id.updated_at)  }}
                      with
                      {{  project.freelancer_ad_id.bid_count  }}
                      {{
                       project.freelancer_ad_id.bid_count > 1 ? "bids" : "bid" 
                      }}
                    </td>
                    <td>
                      <img class="icon-location" src="@/assets/icons/convert-icon/Marketplace.svg"
                        alt="location icon" />

                      {{
                       project.freelancer_ad_id.city
                       ? project.freelancer_ad_id.city
                       : "NIL"


                      }},
                      {{
                       project.freelancer_ad_id.currency_country
                       ? project.freelancer_ad_id.currency_country
                       : "NIL"


                      }}
                    </td>
                    <td>
                      <div class="price">
                        <div>
                          {{
                           project.freelancer_ad_id.type == "Fixed"
                           ? project.freelancer_ad_id.budget_high
                           : project.freelancer_ad_id.budget_low +
                           "-" +
                           project.freelancer_ad_id.budget_high


                          }}
                          {{  project.freelancer_ad_id.currency_code  }}
                        </div>
                        {{  project.freelancer_ad_id.type  }}
                      </div>
                    </td>
                    <td class="text-left">
                      <nav class="nav action-view">
                        <button class="btn no-shadow nav-link" href="#" v-b-modal.modal-view-script @click="
                          getCurrent({
                            title: project.freelancer_ad_id.title,
                            description:
                              project.freelancer_ad_id.full_description,
                            type: project.freelancer_ad_id.type,
                            location: {
                              city: project.freelancer_ad_id.currency_country,
                              country:
                                project.freelancer_ad_id.currency_country,
                            },
                            budget: {
                              min: project.freelancer_ad_id.budget_low,
                              max: project.freelancer_ad_id.budget_high,
                            },
                            currency: {
                              code: project.freelancer_ad_id.currency_code,
                            },
                            bids: project.freelancer_ad_id.bid_count,
                            time_updated: getProjectTime(
                              project.freelancer_ad_id.updated_at
                            ),
                            url: project.freelancer_ad_id.url,
                          })
                        ">
                          View
                        </button>
                        <span>|</span>
                        <button @click="deleteSavedProject(project.freelancer_ad_id.id)" class="btn no-shadow nav-link"
                          href="#">
                          Remove
                        </button>
                      </nav>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="projects && searchKey.length < 1">
                  <tr v-for="project in filteredNull" :key="project.freelancer_ad_id.id">
                    <td>
                      <div class="market-desc">
                        <b>{{  project.freelancer_ad_id.title  }}</b><br />
                        {{  project.freelancer_ad_id.short_description  }}
                      </div>
                    </td>
                    <td>
                      {{  getProjectTime(project.freelancer_ad_id.updated_at)  }}
                      with
                      {{  project.freelancer_ad_id.bid_count  }}
                      {{
                       project.freelancer_ad_id.bid_count > 1 ? "bids" : "bid" 
                      }}
                    </td>
                    <td>
                      <img class="icon-location" src="@/assets/icons/convert-icon/Marketplace.svg"
                        alt="location icon" />

                      {{
                       project.freelancer_ad_id.city
                       ? project.freelancer_ad_id.city
                       : "NIL"


                      }},
                      {{
                       project.freelancer_ad_id.currency_country
                       ? project.freelancer_ad_id.currency_country
                       : "NIL"


                      }}
                    </td>
                    <td>
                      <div class="price">
                        <div>
                          {{
                           project.freelancer_ad_id.type == "Fixed"
                           ? project.freelancer_ad_id.budget_high
                           : project.freelancer_ad_id.budget_low +
                           "-" +
                           project.freelancer_ad_id.budget_high


                          }}
                          {{  project.freelancer_ad_id.currency_code  }}
                        </div>
                        {{  project.freelancer_ad_id.type  }}
                      </div>
                    </td>
                    <td class="text-left">
                      <nav class="nav action-view">
                        <button class="btn no-shadow nav-link" href="#" v-b-modal.modal-view-script @click="
                          getCurrent({
                            title: project.freelancer_ad_id.title,
                            description:
                              project.freelancer_ad_id.full_description,
                            type: project.freelancer_ad_id.type,
                            location: {
                              city: project.freelancer_ad_id.city,
                              country:
                                project.freelancer_ad_id.currency_country,
                            },
                            budget: {
                              min: project.freelancer_ad_id.budget_low,
                              max: project.freelancer_ad_id.budget_high,
                            },
                            currency: {
                              code: project.freelancer_ad_id.currency_code,
                            },
                            bids: project.freelancer_ad_id.bid_count,
                            time_updated: getProjectTime(
                              project.freelancer_ad_id.updated_at
                            ),
                            url: project.freelancer_ad_id.url,
                          })
                        ">
                          View
                        </button>
                        <span>|</span>
                        <button @click="deleteSavedProject(project.freelancer_ad_id.id)" class="btn no-shadow nav-link">
                          Remove
                        </button>
                      </nav>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                    {{  activeMarketData.currency.code  }}
                  </div>
                  {{  activeMarketData.type  }}
                </div>
              </div>
              <div>
                <h6 class="project-title">{{  activeMarketData.title  }}</h6>
                <p>
                  {{  activeMarketData.description  }}
                </p>
              </div>

              <div class="d-flex align-items-center justify-content-end mt-5">
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
                    {{  activeMarketData.time_updated  }} with
                    {{  activeMarketData.bids  }}
                    {{  activeMarketData.bids > 1 ? "bids" : "bid"  }}
                  </div>
                </div>
                <div>
                  <b-button @click="$bvModal.hide('modal-view-script')" class="close-modal">Close</b-button>
                  <a :href="activeMarketData.url" target="_blank" class="save-modal">Open Project</a>
                </div>
              </div>
            </b-modal>
          </div>
          <!-- <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPage"
              :total-rows="marketLength"
              :per-page="perPage"
              aria-controls="my-table"
              size="sm"
              :hide-goto-end-buttons="true"
              prev-text="<"
              next-text=">"
              @change="handlePageChange"
            ></b-pagination>
          </div> -->
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

export default {
  name: "SavedProjects",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      perPage: 20,
      currentPage: 1,
      marketLength: 0,
      projects: [],
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
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/marketplace-saved",
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
      this.currentPage = value;
      this.getSavedProject();
    
    },
    getSavedProject() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getSavedProject")
        .then((res) => {
          this.projects = res.data.data;
        
          // this.marketLength = res.data.result.total_count;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteSavedProject(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteSavedProject", id)
        .then(() => {
        
          this.getSavedProject();
          this.makeToast("success", "project removed successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
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

      // console.log("Years:", years);
      // console.log("Months:", months);
      // console.log("Days:", days);
      // console.log("Hours:", hours);
      // console.log("Minutes:", minutes);
      // console.log("Seconds:", seconds);
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
    formatDate(date) {
      var formatedDate = new Date(date);

      return formatedDate.toLocaleDateString();
    },
  },

  mounted() {
    this.getSavedProject();
  },
  computed: {
    filteredNull() {
      let result = [];
      for (let i = 0; i < this.projects.length; i++) {
        if (!this.projects[i].freelancer_ad_id) {
          continue;
        }

        result.push(this.projects[i]);
      }

      return result;
    },
  },
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
