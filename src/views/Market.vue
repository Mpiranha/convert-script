<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="marketplace"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="container scroll-content">
          <div
            class="
              dashboard-top
              d-flex
              justify-content-between
              align-items-center
              mb-5
            "
          >
            <h6 class="title">MarketPlace</h6>

            <router-link
              @click="clearField"
              class="btn btn-create py-2"
              to="/projects"
            >
              Saved Projects
            </router-link>
          </div>

          <div class="content-wrap set-min-h pt-4 pb-5">
            <div class="search-form">
              <button class="btn search-btn">
                <i class="flaticon-loupe icons"></i>
              </button>
              <input
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>

            <div class="sort-wrap">
              <div class="acct-desc">{{ marketLength }} Projects</div>

              <select class="sort-select" name="" id="">
                <option value="none" selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <loader-modal
              :loading-state="this.$store.state.loading"
            ></loader-modal>
            <div v-if="marketLength === 0" class="no-data-info">
              Created Suggestion will display here.
            </div>
            <table v-else class="table table-custom table-market">
              <!-- <thead>
                <tr>
                  <th>Message</th>
                  <th class="text-left">Email</th>
                  <th>Date</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead> -->
              <tbody>
                <tr v-for="project in market.projects" :key="project.id">
                  <td>
                    <div class="market-desc">
                      <b>{{ project.title }}</b
                      ><br />
                      {{ project.preview_description }}
                    </div>
                  </td>
                  <td>
                    {{ getProjectTime(project.time_updated) }} with
                    {{ project.bid_stats.bid_count }}
                    {{ project.bid_stats.bid_count > 1 ? "bids" : "bid" }}
                  </td>
                  <td>
                    <img
                      class="icon-location"
                      src="@/assets/icons/convert-icon/Marketplace.svg"
                      alt="location icon"
                    />

                    {{ project.location.city ? project.location.city : "NIL" }},
                    {{
                      project.location.country.name
                        ? project.location.country.name
                        : "NIL"
                    }}
                  </td>
                  <td>
                    <div class="price">
                      <div>
                        {{
                          project.type == "fixed"
                            ? project.budget.maximum
                            : project.budget.minimum +
                              "-" +
                              project.budget.maximum
                        }}
                        {{ project.currency.code }}
                      </div>
                      {{ project.type }}
                    </div>
                  </td>
                  <td class="text-left">
                    <nav class="nav action-view">
                      <a
                        class="nav-link"
                        href="#"
                        v-b-modal.modal-view-script
                        @click="
                          getCurrent({
                            title: project.title,
                            description: project.preview_description,
                            type: project.type,
                            location: {
                              city: project.location.city,
                              country: project.location.country.name,
                            },
                            budget: {
                              min: project.budget.maximum,
                              max: project.budget.minimum,
                            },
                            currency: {code: project.currency.code},
                            bids: project.bid_stats.bid_count,
                            time_updated: getProjectTime(project.time_updated),
                          })
                        "
                      >
                        View
                      </a>
                      <span>|</span>
                      <a class="nav-link" href="#">Save</a>
                    </nav>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <b-modal
            :hide-header="true"
            id="modal-view-script"
            centered
            size="md"
            :hide-footer="true"
            dialog-class="control-width"
            content-class="modal-main"
          >
            <div class="project-head">
              <h1 class="title">Project Details</h1>
              <div class="price">
                <div>
                  {{
                    activeMarketData.type == "fixed"
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

            <div class="d-flex align-items-center justify-content-end mt-5">
              <div class="d-flex location--time flex-column mr-auto">
                <div class="mb-1">
                  <img
                    class="icon-location"
                    src="@/assets/icons/convert-icon/Marketplace.svg"
                    alt="location icon"
                  />
                  {{
                    activeMarketData.location.city
                      ? project.location.city
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
                <b-button
                  @click="$bvModal.hide('modal-view-script')"
                  class="close-modal"
                  >Close</b-button
                >
                <b-button
                  @click="
                    triggerEdit ? editAgency(editId, campaignName) : addAgency()
                  "
                  class="save-modal"
                  >Open Project</b-button
                >
              </div>
            </div>
          </b-modal>
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPage"
              :total-rows="marketLength"
              :per-page="perPage"
              aria-controls="my-table"
              size="sm"
              :hide-goto-end-buttons="true"
              prev-text="<"
              next-text=">"
            ></b-pagination>
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

export default {
  name: "Suggestions",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      perPage: 5,
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
      },
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    getMarketData() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getMarket", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.market = res.data.result;
          console.log(res);
          this.marketLength = res.data.result.total_count;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getProjectTime(time) {
      if (!time) {
        return "NIL";
      }
      var diff = Date.now() - time;

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
