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
          <div
            class="
              dashboard-top
              d-flex
              justify-content-between
              align-items-center
              mb-5
            "
          >
            <h6 class="title">Generate New Script</h6>

            <button class="btn btn-create" v-b-modal.modal-new-campaign>
              <span>+</span>
              Add Script
            </button>
          </div>

          <div class="content-wrap script-custom-height">
            <div class="row h-100">
              <div class="col-6 no-gutter-right">
                <div class="bordered-right h-100">
                  <div class="script-form-wrap">
                    <form action="#" method="GET" @submit.prevent="onSubmit">
                      <div class="script-form">
                        <div
                          v-for="(scriptInfo, index) in scriptData"
                          :key="scriptInfo.id"
                          class="form-group"
                        >
                          <label for="">{{
                            scriptInfo.question.label
                          }}</label>
                          <input
                            :type="scriptInfo.question.field_type"
                            name=""
                            :class="{
                              'is-invalid':
                                $v.scriptAnswers.$each[index].answer.$error,
                            }"
                            id=""
                            v-model="scriptAnswers[index].answer"
                            class="form-control"
                            :placeholder="scriptInfo.question.placeholder"
                          />
                          <div class="invalid-feedback">
                            <div
                              v-if="
                                !$v.scriptAnswers.$each[index].answer.required
                                && isSubmitted
                              "
                            >
                              Answer is required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="script-form-footer">
                        <div class="desc">Variation</div>
                        <input
                          type="text"
                          size="1"
                          v-model="variation"
                          class="btn btn-variation"
                        />
                        
                        <button class="btn btn-create btn-script">
                          Generate Script
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-6 no-gutter-left">
                <div class="d-flex flex-column h-100">
                  <div class="section-head bordered-bottom">
                    <div class="section-head-right">
                      <!-- <select class="sort-select" name="" id="">
                        <option value="none" selected>Export All</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select> -->
                      <button class="btn btn-export-all">Export All</button>
                    </div>
                  </div>
                  <div class="control-overflow">
                    <div v-if="generatedScript.length > 0">
                      <script-box
                        v-for="script in generatedScript"
                        :key="script.id"
                        :script-content="script.text"
                      >
                      </script-box>
                    </div>
                    <div v-else class="empty-script">
                      Generated Script will display here.
                    </div>
                  </div>
                </div>
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
import ScriptBox from "@/components/ScriptBox";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ScriptGenerate",
  components: {
    Sidebar,
    Navbar,
    ScriptBox,
  },
  data() {
    return {
      scriptData: [],
      scriptAnswers: [],
      variation: 2,
      generatedScript: [],
      isSubmitted: false,
    };
  },
  validations: {
    scriptAnswers: {
      $each: {
        answer: { required },
      },
    },
  },
  methods: {
    getScriptData(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getOneScriptTypeSelect", id)
        .then((res) => {
          this.scriptData = res.data.data;

          // this.scriptData.forEach(function (data, index) {
          //   console.log(data + " and " + index)
          //   this.scriptAnswers.push(data.answer);
          // });
          for (let i = 0; i < this.scriptData.length; i++) {
            this.scriptAnswers.push({ answer: this.scriptData[i].answer });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    generateScript() {
      this.$store.commit("updateLoadState", true);

      this.$store
        .dispatch("generateScript", {
          content: "Info Limited",
          script_type_id: this.$route.params.id,
          campaign_id: this.$route.params.campaignId
            ? this.$route.params.campaignId
            : "",
        })
        .then((res) => {
          console.log(res);
          //this.getAllVideos();
          // this.videoData = {
          //   title: "",
          //   description: "",
          //   link: "",
          // };
          this.generatedScript = res.data.data.responses;
          // this.makeToast("success", "Video added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    onSubmit() {
      // set all fields to touched
      this.$v.$touch();

      // set isSubmite to true
      this.isSubmitted = true;
      // stop here if form is invalid
      if (this.$v.$invalid) return;

      this.generateScript();
    },
  },
  mounted() {
    this.getScriptData(this.$route.params.id);
  },
};
</script>

<style>
.script-form-wrap {
  padding: 2.5rem 2rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  height: calc(100% - 24px);
  overflow-y: auto;
}

.script-form-wrap label {
  font-size: 0.7rem;
  color: #848688;
}

.script-form-wrap form {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.script-form-wrap .form-control {
  padding: 0.175rem 0.75rem;
}

.script-form-wrap .form-control:focus {
  border-color: #1a01ff;
  outline: 0;
  box-shadow: 0 0 0 0.25rem #2c03e440 !important;
}

.script-form-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.script-form-footer .desc {
  color: #949fb0;
  font-size: 0.7rem;
  margin-right: 0.5rem;
}

.btn-variation {
  border: 1px solid #ddc8fa !important;
  color: #949fb0 !important;
  font-size: 0.7rem !important;
  margin-right: 0.5rem;
}

.btn-variation,
.btn-script {
  padding: 0.375rem 0.65rem !important;
}

.empty-script {
  color: #848688;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
