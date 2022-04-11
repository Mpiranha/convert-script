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
        <div class="scroll-content">
          <div class="container">
            <div
              class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-3
              "
            >
              <h6 class="title">
                <img class="script-type-icon" :src="scriptType.icon" alt="" />
                {{ scriptType.name }}
              </h6>
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
                            <textarea
                              v-if="
                                scriptInfo.question.field_type === 'textarea'
                              "
                              :class="{
                                'is-invalid':
                                  $v.scriptAnswers.$each[index].answer.$error,
                              }"
                              rows="3"
                              cols="10"
                              v-model="scriptAnswers[index].answer"
                              :placeholder="scriptInfo.question.placeholder"
                              class="form-control"
                            ></textarea>
                            <input
                              v-else
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
                                  !$v.scriptAnswers.$each[index].answer
                                    .required && isSubmitted
                                "
                              >
                                Answer is required
                              </div>
                            </div>
                          </div>

                          <b-form-group
                            label="Choose a tone (Optional)"
                            label-class="input-label"
                            v-if="
                              additional_content.script_type_tone
                                .script_type_allowed_tone
                            "
                          >
                            <b-form-select
                              class="form-control"
                              v-model="tone"
                              :options="toneOptions"
                            ></b-form-select>
                          </b-form-group>
                          <div class="row">
                            <b-form-group
                              class="col-6"
                              label="Input language (Optional)"
                              label-class="input-label"
                              v-if="
                                additional_content.script_type_language
                                  .script_type_allowed_tone
                              "
                            >
                              <b-form-select
                                class="form-control"
                                v-model="languageInput"
                                :options="languageOptions"
                              ></b-form-select>
                            </b-form-group>
                            <b-form-group
                              class="col-6"
                              label="Output language (Optional)"
                              label-class="input-label"
                              v-if="
                                additional_content.script_type_language
                                  .script_type_allowed_tone
                              "
                            >
                              <b-form-select
                                class="form-control"
                                v-model="languageOutput"
                                :options="languageOptions"
                              ></b-form-select>
                            </b-form-group>
                          </div>
                        </div>
                        <div class="script-form-footer">
                          <!-- <div class="desc">Variation</div>
                        <input
                          type="text"
                          size="1"
                          v-model="variation"
                          class="btn btn-variation"
                        /> -->
                          <loader-modal :loading-state="loading"></loader-modal>

                          <button class="btn btn-create py-2 btn-script">
                            Create Copy
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
                        <a
                          target="_blank"
                          :href="
                            generatedScript
                              ? `https://api.onecopy.ai/api/v1/export/excel/model?model=User&type=User&export=ScriptResponsesExport`
                              : '#'
                          "
                          class="btn btn-export-all"
                          >Export All</a
                        >
                      </div>
                    </div>
                    <div class="control-overflow">
                      <div v-if="generatedScript.length > 0">
                        <script-box
                          @save-clicked="saveCampaign"
                          v-for="script in generatedScript"
                          :key="script.id"
                          :script-content="
                            formatScript(script.scriptResponses[0].text)
                          "
                          @favorite-clicked="addRemoveScriptFavorite(script.id)"
                          @edit-clicked="
                            openEditModal(
                              script.id,
                              script.scriptResponses[0].text
                            )
                          "
                          :export-link="`https://api.onecopy.ai/api/v1/export/excel/model?model=User&type=User&export=ScriptResponsesExport&Id=${script.id}`"
                        >
                        </script-box>
                        <!-- <textarea
                        type="hidden"
                        id="text--copy"
                        :value="
                          generatedScript
                            ? script.scriptResponses[0].text
                            : ''
                        "
                      ></textarea> -->
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
    <b-modal
      :hide-header="true"
      id="modal-edit-script"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-modal-width"
      content-class="modal-main"
    >
      <quill-editor
        ref="myQuillEditor"
        class="mb-3"
        v-model="content"
        :options="editorOption"
      />

      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-edit-script')"
          class="close-modal"
          >Go back</b-button
        >
        <b-button @click="editScript(editId, content)" class="save-modal"
          >Edit</b-button
        >
      </div>
    </b-modal>
    <b-modal
      :hide-header="true"
      id="modal-add-campaign"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <b-form-group label="Add to Campaign" label-class="form-label">
        <b-form-select
          class="input-table"
          v-model="selectedCampaign"
          :options="campaignOptions"
        ></b-form-select>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-add-campaign')"
          class="close-modal"
          >Close</b-button
        >
        <b-button class="save-modal">Add</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import ScriptBox from "@/components/ScriptBox";
import { required } from "vuelidate/lib/validators";
import alertMixin from "@/mixins/alertMixin";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "ScriptGenerate",
  components: {
    Sidebar,
    Navbar,
    ScriptBox,
    quillEditor,
  },
  mixins: [alertMixin],
  data() {
    return {
      selectedCampaign: null,
      campaignOptions: [{ value: null, text: "Select a Campaign" }],
      tone: null,
      languageInput: null,
      languageOutput: null,
      toneOptions: [{ value: null, text: "Select Tone" }],
      languageOptions: [{ value: null, text: "Select Language" }],
      loading: false,
      additional_content: {
        script_type_tone: {
          script_type_allowed_tone: false,
        },
        script_type_language: {
          script_type_allowed_tone: false,
        },
      },
      scriptType: [],
      scriptData: [],
      scriptAnswers: [],
      content: "",
      variation: 2,
      generatedScript: [],
      isSubmitted: false,
      preset: [],
      editId: "",
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"], // toggled buttons
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ align: [] }],

              ["clean"],
            ],
          },
        },
      },
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
    saveCampaign() {
      this.$bvModal.show("modal-add-campaign");
    },
    getCampaign() {
      // this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getCampaigns")
        .then((res) => {
          let data = res.data.data;
          for (let index = 0; index < data.length; index++) {
            this.campaignOptions.push({
              value: data[index].id,
              text: data[index].name,
            });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    formatScript(text) {
      return text.replace(/\n/g, "<br />");
    },
    openEditModal(id, data) {
      this.$bvModal.show("modal-edit-script");
      this.editId = id;
      // this.triggerEdit = true;
      // this.$store.commit("triggerEdit", {
      //   editStatus: true,
      //   id: id,
      // });
      this.content = data;
      // this.editId = id;
      // this.campaignName = data;
    },
    addRemoveScriptFavorite() {
      this.$store
        .dispatch("addRemoveFavorite", {
          script_response_id: this.generatedScript.id,
        })
        .then((res) => {
          console.log(res.data.data.message);

          // this.getScripts();
          this.makeToast("success", res.data.data.message);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
        });
    },
    editScript(id) {
      this.$bvModal.hide("modal-edit-script");
      this.$store
        .dispatch("editScript", {
          id: id,
          data: { content: this.content, script_type_id: 1 },
        })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          //this.getScripts();
          this.makeToast("success", "Script edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.$store.commit("updateLoadState", false);
          this.makeToast("danger", this.error);
          // this.error = error;
        });
    },
    getScriptData(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getOneScriptTypeSelect", id)
        .then((res) => {
          this.scriptData = res.data.data;
          this.additional_content = res.data.additional_content;
          for (let i = 0; i < this.scriptData.length; i++) {
            this.scriptAnswers.push({ answer: "" });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getScriptType(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getOneScriptType", id)
        .then((res) => {
          this.scriptType = res.data.data;
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
      this.loading = true;

      this.$store
        .dispatch("generateScript", {
          content: "Info Limited",
          script_type_id: this.$route.params.id,
          campaign_id: this.$route.params.campaignId
            ? this.$route.params.campaignId
            : "",
          tone_id: this.tone ? this.tone[0].tone_id : "",
          output_language_id: this.languageOutput
            ? this.languageOutput[0].language_id
            : "",
          input_language_id: this.languageInput
            ? this.languageInput[0].language_id
            : "",
          // language_id: this.language ? this.language[0].language_id : "",
        })
        .then((res) => {
          this.loading = false;
          console.log(res);
          this.generatedScript.push(res.data.data);

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    postPresetAnswer() {
      // this.$store.commit("updateLoadState", true);
      this.loading = true;

      this.$store
        .dispatch("editScriptTypePresets", {
          id: this.scriptData[0].id,
          data: {
            // answer: this.scriptAnswers[0].answer,
            // script_type_preset_id: this.scriptData[0].question.id,
            // script_type_id: this.$route.params.id,
            presets: this.preset,
            languages: this.languageInput ? this.languageInput : [],
            tones: this.tone ? this.tone : [],
          },
        })
        .then((res) => {
          this.loading = false;
          console.log(res);

          this.generateScript();

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.loading = false;
          console.log("error: " + error);
          this.error = error.response.data.errors;

          // this.makeToast("danger", this.error);
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

      for (let i = 0; i < this.scriptData.length; i++) {
        this.preset.push({
          answer: this.scriptAnswers[i].answer,
          script_type_preset_id: this.scriptData[i].question.id,
          script_type_id: this.$route.params.id,
          user_script_type_preset_id: this.scriptData[i].id,
        });
      }

      // this.generateScript();
      this.postPresetAnswer();
    },
    getAllTones() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllTones")
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.toneOptions.push({
              value: [
                {
                  tone_id: res.data.data[i].id,
                  script_type_id: this.scriptType.id
                    ? this.scriptType.id
                    : setTimeout(() => {
                        return this.scriptType.id;
                      }, 3000),
                  user_id: this.$store.state.user.id,
                },
              ],
              text: res.data.data[i].name,
            });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getAllLanguages() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllLanguages")
        .then((res) => {
          this.languages = res.data.data;

          for (let i = 0; i < res.data.data.length; i++) {
            this.languageOptions.push({
              value: [
                {
                  language_id: res.data.data[i].id,
                  script_type_id: this.scriptType.id
                    ? this.scriptType.id
                    : setTimeout(() => {
                        return this.scriptType.id;
                      }, 3000),
                  user_id: this.$store.state.user.id,
                },
              ],
              text: res.data.data[i].name,
            });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
  },
  mounted() {
    this.getCampaign();
    this.getScriptType(this.$route.params.id);
    this.getScriptData(this.$route.params.id);
    this.getAllTones();
    this.getAllLanguages();
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
  font-size: 0.8rem;
  color: #474e56;
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

.title .script-type-icon {
  width: 2.5rem;
  margin-right: 0.7rem;
}
</style>
