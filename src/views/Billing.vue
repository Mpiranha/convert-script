<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="dashboard-top d-flex align-items-center mb-5">
              <h6 class="title mb-0">Billing</h6>

              <div class="d-flex align-items-center ml-auto">
                <h6 class="title mb-0 mr-3">Monthly</h6>
                <label class="switch mb-0">
                  <input v-model="isYearly" type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <h6 class="title mb-0 ml-3">Yearly</h6>

                <button class="btn btn-one pl-3 ml-4 px-4" v-b-modal.modal-new-promo_code>Add Promocode</button>
              </div>
            </div>

            <div class="content-wrap pt-4 pb-5">
              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
              <div class="responsive-table">
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
                    <tr v-for="activePlan in planDetail.active_plan" :key="activePlan.id">
                      <td scope="row"> {{ capitaliseStr(activePlan.name) }} <span class="plan_count">{{ activePlan.count >
                        1 ? "x " + activePlan.count : "" }}</span></td>
                      <td class="text-left">{{ activePlan.words.toLocaleString('en-US') }}</td>
                      <td>{{ formatDate(activePlan.end_date) }}</td>

                      <td><span class="badge badge-success">ACTIVE</span></td>
                    </tr>
                    <tr v-for="plan in sortedPlans" :key="plan.plan_id">
                      <td scope="row">{{ capitaliseStr(plan.name) }}</td>
                      <td class="text-left">{{ plan.words.toLocaleString('en-US') }}</td>
                      <td>{{ new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(plan.price)
                      }}/{{ capitaliseStr(plan.billing_cycle) }}</td>
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
              </div>



            </div>

            <div class="content-wrap word-usage-stat">
              <div class="label">Word Usage Count</div>
              <b-progress v-if="String(wordStat.limit).toLowerCase() == 'unlimited'" :value="0" :max="99999999999"
                animated height="0.8rem"></b-progress>
              <b-progress v-else :value="wordStat.script_words_generated" :max="wordStat.limit" animated height="0.8rem">
              </b-progress>
              <div class="value">
                {{ wordStat.script_words_generated }} of {{ wordStat.limit }}
              </div>
            </div>

            <div class="content-wrap word-usage-stat">
              <div class="label">Plagiarism Checker Credit: <b>0</b></div>

              <div class="value ml-auto">
                <button class="btn btn-one px-3" v-b-modal.modal-new-credit>
                  Buy Credit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal :hide-header="true" id="modal-new-promo_code" centered size="md" :hide-footer="true"
      dialog-class="control-width" content-class="modal-main">


      <b-form-group>
        <label for="promo_code">Promo Code</label>
        <b-form-input :class="{ 'is-invalid': submitted && $v.promoCode.$error }" id="promo_code" v-model="promoCode"
          type="text" class="input-table">
        </b-form-input>
        <div v-if="submitted && $v.promoCode.$error" class="invalid-feedback">
          <span v-if="!$v.promoCode.required">* Promo code is required <br /></span>
          <span v-if="!$v.promoCode.minLength">* Minimum of 3 Characters</span>
        </div>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-promo_code')" class="close-modal">Close</b-button>
        <b-button @click="upgradeWithPurchaseCode($event)" class="save-modal">Redeem</b-button>
      </div>
    </b-modal>

    <b-modal :hide-header="true" id="modal-new-credit" centered size="sm" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <div class="credit_title">Add plagiarism checker credit</div>
      <div class="credit_desc">Purchases are one-time purchases (no subscription)</div>

      <b-form-group>
        <label for="promo_code">Number of words</label>

        <b-form-select class="form-control" v-model="selectedPlagiarismPlan"
          :options="plagiarismPlanOption"></b-form-select>

        <!-- <div v-if="submitted && $v.promoCode.$error" class="invalid-feedback">
          <span v-if="!$v.promoCode.required">* Plan is required <br /></span>
        </div> -->
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-credit')" class="close-modal">Close</b-button>
        <a v-if="selectedPlagiarismPlan" class="save-modal" :href="selectedPlagiarismPlan" target="_blank">Purchase</a>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Billing",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  validations: {
    promoCode: {
      required,
      minLength: minLength(3),
    },
  },
  data() {
    return {
      plagiarismPlans: [],
      plagiarismPlanOption: [{ value: null, text: "Select a plan" }],
      selectedPlagiarismPlan: null,
      workspace_id: this.$store.state.user.default_workspace_id,
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
      isYearly: false,
      submitted: false,
      promoCode: "",
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
    getPlagiarismPlan() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getPlagiarismPlan")
        .then((res) => {
          this.plagiarismPlans = res.data.data;

          for (var i = 0; i < res.data.data.all_plans.length; i++) {
            this.plagiarismPlanOption.push({ value: res.data.data.all_plans[i].upgrade_link, text: res.data.data.all_plans[i].words + ' ($' + res.data.data.all_plans[i].price + ')' })
          }
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
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
    upgradeWithPurchaseCode(event) {
      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-promo_code");
      this.$store
        .dispatch("upgradeWithPurchaseCode", this.promoCode)
        .then((res) => {
          this.promoCode = "";
          this.makeToast("success", res);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.promoCode = "";
          this.makeToast("danger", error.response.data.message);
          this.$store.commit("updateLoadState", false);
        });
    },
    getStatInfo() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getDashboardInfo", this.workspace_id)
        .then((res) => {
          this.wordStat = res.data.data.message;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },

    capitaliseStr(text) {
      var words = text.split(' ');
      var CapitalizedWords = [];
      words.forEach(element => {
        if (element.indexOf('(') == 0) {
          CapitalizedWords.push('(' + element[1].toUpperCase() + element.slice(2, element.length));
        } else {
          CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
        }
      });
      return CapitalizedWords.join(' ');
    }
  },
  computed: {
    filteredPlans() {
      return this.planDetail.all_plans.filter((plan) => {
        if (this.isYearly) {
          return plan.billing_cycle.toLowerCase() == 'year' || plan.billing_cycle.toLowerCase() == 'lifetime'
        } else {
          return plan.billing_cycle.toLowerCase() == 'month'
        }
      });
    },
    sortedPlans() {
      let newArr = this.filteredPlans;

      return newArr.sort(function (a, b) { return a.price - b.price });
    }
  },
  mounted() {
    this.getUserPlanDetails();
    this.getStatInfo();
    this.getPlagiarismPlan();
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

.plan_count {
  margin-left: 1rem;
  font-weight: bold;
}

.credit_title {
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.credit_desc {
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 480px) {
  .word-usage-stat {
    flex-direction: column;
  }

  .word-usage-stat .progress {
    width: 100%;
  }

  .word-usage-stat .label {
    margin-bottom: 1rem;
  }

}
</style>
