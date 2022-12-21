<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading" class="fullscreen-loader"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" logo-class="permanent-logo"
        dismiss-class="permanent-dismiss" current-active="new-copy" class="always-hidden"></sidebar>
      <div class="content-section">
        <navbar :script-type-icon="scriptType.icon" :script-type-name="scriptType.name" logo-link-class="hide-logo"
          toggle-class="permanent-toggler"></navbar>
        <div class="scroll-content">
          <div class="container-fluid pt-5">
            <!-- <div class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-3
              ">
              <h6 class="title">
                <img class="script-type-icon" :src="scriptType.icon" alt="" />
                {{ scriptType.name }}
              </h6>
            </div> -->

            <div class="content-wrap script-custom-height">
              <div class="row h-100">
                <div class="col-12 col-lg-4 pr-lg-0">
                  <div class="bordered-right h-100 md-bordered-bottom">
                    <div class="script-form-wrap pb-0">
                      <form action="#" method="GET" @submit.prevent="onSubmit">
                        <div class="script-form">
                          <div v-for="(scriptInfo, index) in scriptData" :key="scriptInfo.id" class="form-group">
                            <label for="">{{
                                scriptInfo.question.label
                            }}</label>
                            <textarea v-if="
                              scriptInfo.question.field_type === 'textarea'
                            " :class="{
  'is-invalid':
    $v.scriptAnswers.$each[index].answer.$error,
}" rows="3" cols="10" v-model="scriptAnswers[index].answer" :placeholder="scriptInfo.question.placeholder"
                              class="form-control"></textarea>
                            <input v-else :type="scriptInfo.question.field_type" name="" :class="{
                              'is-invalid':
                                $v.scriptAnswers.$each[index].answer.$error,
                            }" id="" v-model="scriptAnswers[index].answer" class="form-control"
                              :placeholder="scriptInfo.question.placeholder" />
                            <div class="invalid-feedback">
                              <div v-if="
                                !$v.scriptAnswers.$each[index].answer
                                  .required && isSubmitted
                              ">
                                Answer is required
                              </div>
                            </div>
                          </div>

                          <b-form-group label="Choose a tone (Optional)" label-class="input-label" v-if="
                            additional_content.script_type_tone.script_type_allowed_tone
                          ">
                            <b-form-select class="form-control" v-model="tone" :options="toneOptions"></b-form-select>
                          </b-form-group>
                          <div class="row">
                            <b-form-group class="col-12 col-md-6" label="Input language (Optional)"
                              label-class="input-label" v-if="
                              additional_content.script_type_language.script_type_allowed_tone">
                              <b-form-select class="form-control" v-model="languageInput" :options="languageOptions">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group class="col-12 col-md-6" label="Output language (Optional)"
                              label-class="input-label" v-if="
                                additional_content.script_type_language
                                  .script_type_allowed_tone
                              ">
                              <b-form-select class="form-control" v-model="languageOutput" :options="languageOptions">
                              </b-form-select>
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
                <div class="col-12 col-lg-8 pl-lg-0">
                  <div class="d-flex flex-column h-100">
                    <div class="section-head bordered-bottom">
                      <div class="section-head-right">
                        <!-- <select class="sort-select" name="" id="">
                        <option value="none" selected>Export All</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select> -->
                        <button v-if="generatedScript.length > 0" @click="exportAllScripts()"
                          class="btn btn-export-all mb-0">
                          Export All
                        </button>
                      </div>
                    </div>
                    <div class="control-overflow">
                      <div v-if="generatedScript.length > 0">
                        <div v-for="script in generatedScript" :key="script.id">
                          <script-box @script-edited="(newText) => { response.text = newText }"
                            :content="formatScript(response.text)" :id="response.id" @save-clicked="
                              saveCampaign(response.id, response.text)
                            " v-for="response in script.scriptResponses" :key="response.id"
                            :script-content="formatScript(response.text)" :script-content-raw="response.text"
                            @favorite-clicked="
                              addRemoveScriptFavorite(response.id)
                            " @edit-clicked="
  openEditModal(response.id, response.text)
" @export-clicked="exportScript(response.id)">
                          </script-box>
                        </div>
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
    <b-modal :hide-header="true" id="modal-edit-script" centered size="md" :hide-footer="true"
      dialog-class="control-modal-width" content-class="modal-main">
      <quill-editor ref="myQuillEditor" class="mb-3" v-model="content" :options="editorOption" />

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-edit-script')" class="close-modal">Go back</b-button>
        <b-button @click="editScript(editId, content)" class="save-modal">Edit</b-button>
      </div>
    </b-modal>
    <b-modal :hide-header="true" id="modal-add-campaign" centered size="md" :hide-footer="true"
      dialog-class="control-width" content-class="modal-main">
      <b-form-group label="Add to Campaign" label-class="form-label">
        <b-form-select class="input-table" v-model="selectedCampaign" :options="campaignOptions"></b-form-select>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-add-campaign')" class="close-modal">Close</b-button>
        <b-button @click="saveToCampaign" class="save-modal">Add</b-button>
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
import $ from 'jquery'

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
      selectedSave: {
        id: null,
        text: null,
      },
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

    saveToCampaign() {
      this.$bvModal.hide("modal-add-campaign");
      this.editScript(
        this.selectedSave.id,
        this.selectedCampaign,
        this.selectedSave.text
      );
    },
    saveCampaign(id, txt) {
      this.$bvModal.show("modal-add-campaign");

      this.selectedSave = {
        id: id,
        text: txt,
      };
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
    getScriptData(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getOneScriptTypeSelect", id)
        .then((res) => {
          this.scriptData = res.data.data;
          console.log(res.data.data);
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

          if (res.data.length > 0 || !$.isEmptyObject(res.data.data)) {
            this.generatedScript.push(res.data.data);
          } else {
            this.makeToast("danger", res.data.message);
          }

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
    editScript(id, txt, campaignId) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-edit-script");
      this.$store
        .dispatch("editScript", {
          id: id,
          data: campaignId
            ? { campaign_id: 1, text: txt }
            : { text: this.content },
        })
        .then(() => {
          this.error = null;
          this.activeScript = null;

          if (campaignId) {
            this.selectedCampaign = null;
            this.makeToast("success", "Script added to campaign successfully");
          } else {
            this.makeToast("success", "Script edited successfully");
          }
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
    exportScript(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("exportOneScript", id)
        .then((res) => {
          // this.users = res.data.data;
          console.log(res);

          var a = document.createElement("a");
          document.body.appendChild(a);
          //a.style = "display: none";
          var url = res.config.url;

          a.href = url;
          a.download = true;
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    exportAllScripts(id) {
      if (this.generatedScript.length < 1) {
        this.makeToast("danger", "No script to export");
        return;
      } else {
        id = this.generatedScript[this.generatedScript.length - 1].id;
      }

      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("exportAllGeneratedScripts", id)
        .then((res) => {
          // this.users = res.data.data;
          console.log(res);

          var a = document.createElement("a");
          document.body.appendChild(a);
          //a.style = "display: none";
          var url = res.config.url;

          a.href = url;
          a.download = true;
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

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
  padding: 1rem;
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

.always-hidden {
  position: fixed;
  z-index: 9999999;
  min-width: 215px;
  width: 215px;
  left: -215px;
}

.permanent-toggler {
  display: flex !important;
}

.permanent-logo {
  display: inline !important;
}

.permanent-dismiss {
  display: inline-block !important;
}

.hide-logo {
  display: none;
}

.fullscreen-loader {
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .script-form-wrap {
    height: auto !important;
  }
}
</style>

<style scoped>
.script-custom-height {
  height: 80vh;
}

.control-overflow {
  height: 72vh;
}
</style>
