<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading" class="fullscreen-loader"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" logo-class="permanent-logo"
        dismiss-class="permanent-dismiss" current-active="new-copy" class="always-hidden"></sidebar>
      <div class="content-section">
        <navbar script-type-name="Text to Speech" logo-link-class="hide-logo" toggle-class="permanent-toggler"></navbar>
        <div class="scroll-content script-content-fs">
          <div class="container-fluid pt-3">


            <div class="content-wrap script-custom-height mb-0">
              <div class="row h-100">
                <div class="col-12 col-lg-5 pr-lg-0">
                  <div class="bordered-right h-100 md-bordered-bottom">
                    <div class="script-form-wrap speech_form_wrap pb-3 pb-lg-0">
                      <div class="text_speech_header">
                        Create high quality audio/voice overs from your text in seconds using our humain-sounding text to
                        speech tool
                      </div>

                      <div class="script-form">
                        <div class="row">
                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="">Language</label>
                              <b-form-select class="form-control"
                                :class="{ 'is-invalid': $v.speechData.language_id.$error, }"
                                v-model="speechData.language_id" :options="languageOptions"></b-form-select>
                              <div class="invalid-feedback">
                                <div v-if="!$v.speechData.language_id.required && isSubmitted
                                  ">
                                  Answer is required
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-12 col-md-6">
                            <div class="form-group">
                              <label for="">Gender</label>
                              <b-form-select class="form-control" v-model="gender"
                                :options="genderOptions"></b-form-select>
                            </div>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="">Voice</label>
                          <div class="component-container">
                            <div class="component__select" @click="showOptions = !showOptions">
                              <span class="component__select--name">{{ voiceValue ? voiceValue : 'Select Voice'
                              }}</span>

                              <img src="@/assets/icons/down.png" class="c-arrow-down" v-if="!showOptions">
                              <img src="@/assets/icons/up.png" class="c-arrow-up" v-if="showOptions">
                            </div>
                            <ul class="component__select-options" v-if="showOptions">
                              <div v-if="gender">
                                <li class="select--option" v-for="(option, index) in filteredVoiceGender" :key="index"
                                  @click="selectOption(option)">
                                  <img v-if="option.detail.avatar_url" class="voice_icon"
                                    src="@/assets/icons/Screenshot 2023-05-01 at 5.07 1.png" alt="voice icon">
                                  <img v-else class="voice_icon" src="@/assets/icons/Screenshot 2023-05-01 at 5.07 1.png"
                                    alt="voice icon">
                                  <div class="voice_details">
                                    <div class="voice_name">{{ option.detail.name }} ({{ option.detail.gender.charAt(0)
                                    }})</div>
                                    <div class="voice_desc">English (US) - Middle-Aged - Cheerful, Conversational</div>
                                  </div>
                                  <button class="btn no-shadow btn_play_voice">
                                    <img src="@/assets/icons/play_btn.png" alt="play icon">
                                  </button>
                                  <audio hidden src=""></audio>
                                  <!-- <label> <input type="checkbox" :value="option" /> {{ option.text }}</label> -->
                                </li>
                              </div>
                              <div v-else>
                                <li class="select--option" v-for="(option, index) in filteredVoiceLanguage" :key="index"
                                  @click="selectOption(option)">
                                  <img v-if="option.detail.avatar_url" class="voice_icon"
                                    src="@/assets/icons/Screenshot 2023-05-01 at 5.07 1.png" alt="voice icon">
                                  <img v-else class="voice_icon" src="@/assets/icons/Screenshot 2023-05-01 at 5.07 1.png"
                                    alt="voice icon">
                                  <div class="voice_details">
                                    <div class="voice_name">{{ option.detail.name }} ({{ option.detail.gender.charAt(0)
                                    }})</div>
                                    <div class="voice_desc">English (US) - Middle-Aged - Cheerful, Conversational</div>
                                  </div>
                                  <button class="btn no-shadow btn_play_voice">
                                    <img src="@/assets/icons/play_btn.png" alt="play icon">
                                  </button>
                                  <audio hidden src=""></audio>
                                  <!-- <label> <input type="checkbox" :value="option" /> {{ option.text }}</label> -->
                                </li>
                              </div>
                              <!-- <li class="select--option" v-for="(option, index) in voiceOptions" :key="index"
                                  @click="selectOption(option)">
                                  <img class="voice_icon" src="@/assets/icons/Screenshot 2023-05-01 at 5.07 1.png"
                                    alt="voice icon">
                                  <div class="voice_details">
                                    <div class="voice_name">Mary (F)</div>
                                    <div class="voice_desc">English (US) - Middle-Aged - Cheerful, Conversational</div>
                                  </div>
                                  <button class="btn btn_play_voice">
                                    <img src="@/assets/icons/play_btn.png" alt="play icon">
                                  </button>
                                 
                                </li> -->
                            </ul>
                          </div>
                          <div class="invalid-feedback" v-if="!$v.speechData.voice_id.required && isSubmitted
                            ">
                            * Voice is required
                          </div>
                        </div>




                      </div>



                    </div>
                    <div class="player_section">
                      <div class="generated_player_details">
                        <div class="player_stat">
                          WORDS <br>
                          <span class="word_count">538</span>
                        </div>

                        <div class="player_stat">
                          SECONDS <br>
                          <span class="word_count">538</span>
                        </div>
                      </div>

                      <div class="custom_text_speech_player">
                        <div class="player_upper_section">
                          <button class="btn no-shadow btn_prev">
                            <img src="@/assets/icons/next-_1_ 1.png" alt="previous icon">
                          </button>

                          <button class="btn no-shadow btn_play_gen_speech">
                            <img src="@/assets/icons/play_btn.png" alt="play icon">
                          </button>

                          <div class="player_timer">
                            00:00:37 / 00:10:58
                          </div>
                        </div>

                        <div class="progress">
                          <progress id="progress" value="50" min="0" max="100">
                            <span id="progress-bar"></span>
                          </progress>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-7 pl-lg-0">
                  <div class="d-flex flex-column h-100">
                    <div class="section-head bordered-bottom">
                      <div class="section-head-right mb-0">

                        <button @click="exportAllScripts()" class="btn btn-export-all mb-0">
                          Export Audio
                        </button>
                      </div>
                    </div>
                    <div class="text_speech_word_form_wrap">
                      <div class="word_text_area_main_wrap">
                        <div class="word_textarea_wrap">
                          <div class="btn_reposition_wrap">
                            <button class="btn no-shadow btn_move_up">
                              <img src="@/assets/icons/up_control.png" alt="go up icon">
                            </button>

                            <button class="btn no-shadow btn_move_up">
                              <img src="@/assets/icons/down_control.png" alt="go down icon">
                            </button>
                          </div>

                          <textarea :class="{ 'is-invalid': $v.speechData.text.$error }" v-model="speechData.text"
                            class="form-control" name="" id="" cols="30" rows="10"></textarea>
                          <div v-if="isSubmitted && $v.speechData.text.$error" class="invalid-feedback">
                            <span v-if="!$v.speechData.text.required">* Please enter a text <br /></span>
                            <span v-if="!$v.speechData.text.minLength">* Minimum of 3 Characters</span>
                          </div>
                        </div>
                        <div class="text_speech_actions">
                          <button class="btn no-shadow btn_play_pause">
                            <img src="@/assets/icons/play_btn.png" alt="play / pause button">
                          </button>

                          <button class="btn btn-create btn-create-workspace px-4 py-3" @click="onSubmit">Generate
                            Audio</button>

                          <button class="btn btn_delete_gen_speech">
                            <img src="@/assets/icons/delete_speech.png" alt="delete icon">
                          </button>
                        </div>
                      </div>

                      <div class="btn_wrap_add_section">
                        <button class="btn btn_add_section">
                          <img src="@/assets/icons/plus_dark.png" alt="plus icon">
                          Add Section
                        </button>
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
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import { required, minLength } from "vuelidate/lib/validators";
import alertMixin from "@/mixins/alertMixin";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// import $ from 'jquery'

export default {
  name: "TextToSpeech",
  components: {
    Sidebar,
    Navbar,
  },
  mixins: [alertMixin],
  data() {
    return {
      genderOptions: [{ value: null, text: "Select a Gender" }, { value: "Male", text: "Male" }, { value: "Female", text: "Female" }],
      voiceOptions: [],
      languageOptions: [{ value: null, text: "Select Language" }],
      loading: false,
      speechData: {
        text: "",
        language_id: null,
        voice_id: null,
      },
      voiceValue: null,
      generatedAudio: [],
      gender: null,
      showOptions: false,
      isSubmitted: false,
      editId: "",
    };
  },
  validations: {
    speechData: {
      text: {
        required,
        minLength: minLength(3),
      },
      language_id: {
        required
      },
      voice_id: {
        required
      },
    },
  },
  methods: {
    selectOption(option) {
      this.speechData.voice_id = option.value;
      this.voiceValue = option.text;
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
    onSubmit() {
      // set all fields to touched
      this.$v.$touch();

      // set isSubmite to true
      this.isSubmitted = true;
      // stop here if form is invalid
      if (this.$v.speechData.$invalid) return;


      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("initiateTextToSpeech", this.speechData)
        .then((res) => {
          console.log(res);
          this.generatedAudio = res.data.data;
          this.makeToast("success", res.data.message);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getAllVoices() {

      this.$store
        .dispatch("getVoiceTextToSpeech")
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.voiceOptions.push({
              detail: res.data.data[i],
              value: res.data.data[i].id,
              text: res.data.data[i].name,
            });
          }


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
          // console.log(res);

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
        .dispatch("getLanguageTextToSpeech")
        .then((res) => {
          this.languages = res.data.data.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          for (let i = 0; i < res.data.data.length; i++) {
            this.languageOptions.push({
              value: res.data.data[i].id,
              text: res.data.data[i].name,
            });
          }


        })
        .catch((error) => {
          console.log(error);

        });
    },
  },
  mounted() {
    // this.getCampaign();
    // this.getScriptType(this.$route.params.id);
    // this.getScriptData(this.$route.params.id);
    // this.getAllTones();
    this.getAllLanguages();
    this.getAllVoices();
  },
  computed: {
    filteredVoiceLanguage() {
      return this.voiceOptions.filter((voice) => {
        return voice.detail.language_id == this.speechData.language_id
      });
    },
    filteredVoiceGender() {
      return this.filteredVoiceLanguage.filter((voice) => {
        return voice.detail.gender == this.gender;
      })
    }
  }
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

.btn-script {
  padding: 0.375rem 0.65rem !important;
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
  top: 61px !important;
  width: 100% !important;
  left: 0 !important;
  height: 100% !important;
}

.component-container {
  position: relative;
}

.component__select {
  border: 1px solid rgb(219 222 229);
  font-size: 0.9rem;
  color: #495057;
  padding: 0.35rem 0.75rem !important;
  border-radius: 0.25rem;
  height: calc(2em + 0.75rem + 2px);
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.c-arrow-down {
  width: 1.3rem;
  margin-left: auto;
}

.c-arrow-up {
  width: 0.8rem;
  margin-left: auto;
}

.text_speech_header {
  color: #495057;
  margin-bottom: 1rem;
}

.component__select-options {
  border: 1px solid rgb(219 222 229);
  border-radius: 0.25rem;
  list-style-type: none;
  padding: 0;
  position: absolute;
  width: 100%;
  top: 115%;
}

.select--option {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #495057;
  padding: 0.35rem 0.75rem 0.35rem 0.45rem !important;
  border-bottom: 1px solid rgb(219 222 229);
  cursor: pointer;
}

.voice_details {
  display: flex;
  flex-direction: column;
}

.voice_icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 0.7rem;
}

.btn_play_voice {
  margin-left: auto;
  padding: 0 !important;
}

.btn_play_voice img {
  width: 14px;
}

.generated_player_details {
  display: flex;
  justify-content: center;
  color: #393f46;
  padding-top: 0.9rem;
}

.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}


.generated_player_details .player_stat {
  text-align: center;
  font-size: 1.1rem;
}

.generated_player_details .player_stat:first-child {
  margin-right: 3rem;
}

.generated_player_details .player_stat:last-child {
  margin-left: 3rem;
}

.generated_player_details .player_stat .word_count {
  font-weight: bold;
  font-size: 2rem;
}

.custom_text_speech_player {
  border-top: 2px solid #E5E5E5;
  display: flex;
  flex-direction: column;
  padding: 0.35rem 1rem 1.5rem 1rem;
}

.player_upper_section {
  display: flex;
  align-items: center;
  align-self: center;
  padding-left: 7rem;
  margin-bottom: 1rem;
}

.player_upper_section .btn_prev {
  margin-right: 1rem;
}

.player_upper_section .btn_play_gen_speech {
  margin-right: 1rem;
}

.player_timer {
  font-size: 1.1rem;
}

.speech_form_wrap {
  height: calc(100% - 195px) !important;
}



.custom_text_speech_player .progress {
  flex-grow: 1;
  height: 0.3rem;
  background-color: #D9D9D9;
  color: #f7fafc;
  border: none;
  cursor: pointer;
  /* margin-bottom: 0.2rem; */
}

.custom_text_speech_player progress {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  color: #0095dd;
  margin: 0;
}


.custom_text_speech_player progress span {
  width: 0%;
  height: 100%;
  display: inline-block;
  background-color: #f7fafc;
}

.custom_text_speech_player progress::-webkit-progress-value {
  background-color: #393F46;
  max-width: 100%;
}


.custom_text_speech_player progress::-moz-progress-bar {
  background-color: #393F46;
  max-width: 100%;
}



.custom_text_speech_player progress[data-state="fake"] {
  background: #e6e6e6;
  height: 65%;
}

.text_speech_word_form_wrap {
  height: calc(100% - 60px);
}

.word_text_area_main_wrap {
  border-bottom: 1px solid#E5E5E5;
  padding: 1rem 1rem 1rem 0rem;
  margin-bottom: 2rem;
}

.word_textarea_wrap {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.btn_reposition_wrap {
  display: flex;
  flex-direction: column;
}

.btn_reposition_wrap .btn_move_up {
  margin-bottom: 1rem;
}

.text_speech_actions {
  display: flex;
  justify-content: end;
}

.text_speech_actions .btn_play_pause {
  margin-right: 1rem;
}

.text_speech_actions .btn_play_pause img {
  width: 25px;
}

.text_speech_actions .btn-create-workspace {
  margin-right: 1rem;
}

.btn_wrap_add_section {
  display: flex;
  justify-content: center;
}

.btn_add_section {
  border: 1px solid #393F46 !important;
  border-radius: 7px !important;
  font-size: 0.9rem !important;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.1) !important;
  background-color: #fff !important;
  padding: 0.5rem 0.75rem !important;
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
  height: 70vh;
}
</style>
