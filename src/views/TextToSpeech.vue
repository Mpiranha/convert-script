<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading" class="fullscreen-loader"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" logo-class="permanent-logo"
        dismiss-class="permanent-dismiss" current-active="ai-speech" class="always-hidden"></sidebar>
      <div class="content-section">
        <navbar script-type-name="Text to Speech" logo-link-class="hide-logo" toggle-class="permanent-toggler"></navbar>
        <div class="scroll-content script-content-fs">
          <div class="container-fluid pt-3">


            <div class="content-wrap script-custom-height mb-0">
              <div class="row h-100">
                <div class="col-12 col-lg-5 pr-lg-0">
                  <div class="bordered-right h-100 md-bordered-bottom">
                    <div class="script-form-wrap speech_form_wrap text-speech-form-wrap pb-3 pb-lg-0">
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
                              <div class="selected_group">
                                <div class="selected_group_inner">
                                  <img v-if="voiceValue.avatar" class="voice_icon" :src="voiceValue.avatar"
                                    alt="voice icon">
                                  <div>
                                    <span class="component__select--name">
                                      {{ voiceValue.name ? voiceValue.name : 'Select Voice'
                                      }}</span>
                                    <br>
                                    <span class="component__select--desc">{{ voiceValue.desc ? voiceValue.desc : ''
                                    }}</span>
                                  </div>
                                </div>
                              </div>

                              <img src="@/assets/icons/down.png" class="c-arrow-down" v-if="!showOptions">
                              <img src="@/assets/icons/up.png" class="c-arrow-up" v-if="showOptions">
                            </div>
                            <ul class="component__select-options" v-if="showOptions">
                              <div v-if="gender">
                                <li class="select--option" v-for="(option, index) in filteredVoiceGender" :key="index"
                                 >
                                  <img v-if="option.detail.avatar_url" class="voice_icon" :src="option.detail.avatar_url"
                                    alt="voice icon">
                                  <img v-else class="voice_icon" src="@/assets/icons/Screenshot 2023-05-01 at 5.07 1.png"
                                    alt="voice icon">
                                  <div class="voice_details">
                                    <div class="voice_name">{{ option.detail.name }} ({{ option.detail.gender.charAt(0)
                                    }})</div>
                                    <div class="voice_desc">{{ option.detail.description }}</div>
                                  </div>
                                  <button class="btn no-shadow btn_play_voice"
                                    @click="playTestAudio('testAudio' + index)">
                                    <img src="@/assets/icons/play.svg" alt="play icon">
                                  </button>

                                  <button class="btn btn-one btn_select__item"  @click="selectOption(option)">Select</button>
                                  <audio :ref="'testAudio' + index" hidden :src="option.detail.sample_voice_url"></audio>
                                  <!-- <label> <input type="checkbox" :value="option" /> {{ option.text }}</label> -->
                                </li>
                              </div>
                              <div v-else>
                                <li class="select--option" v-for="(option, index) in filteredVoiceLanguage" :key="index"
                                  >
                                  <img v-if="option.detail.avatar_url" class="voice_icon" :src="option.detail.avatar_url"
                                    alt="voice icon">
                                  <img v-else class="voice_icon" src="@/assets/icons/Screenshot 2023-05-01 at 5.07 1.png"
                                    alt="voice icon">
                                  <div class="voice_details">
                                    <div class="voice_name">{{ option.detail.name }} ({{ option.detail.gender.charAt(0)
                                    }})</div>
                                    <div class="voice_desc">{{ option.detail.description }}</div>
                                  </div>
                                  <button class="btn no-shadow btn_play_voice"
                                    @click="playTestAudio('testAudio' + index)">
                                    <img src="@/assets/icons/play.svg" alt="play icon">
                                  </button>
                                  <button class="btn btn-one btn_select__item"  @click="selectOption(option)">Select</button>
                                  <audio :ref="'testAudio' + index" hidden :src="option.detail.sample_voice_url"></audio>
                                  <!-- <label> <input type="checkbox" :value="option" /> {{ option.text }}</label> -->
                                </li>
                              </div>
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
                          <span class="word_count">{{ totalWordCount }}</span>
                        </div>

                        <div class="player_stat">
                          SECONDS <br>
                          <span class="word_count">{{ allAudioLength }}</span>
                        </div>
                      </div>

                      <div class="custom_text_speech_player">
                        <div class="player_upper_section">
                          <button class="btn no-shadow btn_prev" @click="prevAudio" :disabled="sectionsAudio.length == 0">
                            <img src="@/assets/icons/previous.svg" alt="previous icon">
                          </button>

                          <button v-if="audioIsPlaying" ref="playPauseBtn" class="btn no-shadow btn_play_gen_speech"
                            @click="playPauseAudio">
                            <img src="@/assets/icons/pause.svg" alt="play icon">
                          </button>
                          <button v-else ref="playPauseBtn" :disabled="sectionsAudio.length == 0"
                            class="btn no-shadow btn_play_gen_speech" @click="playPauseAudio">
                            <img src="@/assets/icons/play.svg" alt="play icon">
                          </button>


                          <div class="player_timer">
                            <span ref="audioCurTime">00:00:00</span> / <span ref="audioDuration">00:00:00</span>
                          </div>
                        </div>
                        <audio @play="changeButtonState('playpause')" @pause="changeButtonState('playpause')"
                          @ended="playNext" @loadedmetadata="updateProgressBar" @timeupdate="updateTimeAndProgressBar"
                          ref="genAudio" v-if="sectionsAudio[currentPlayIndex]" hidden
                          :src="sectionsAudio[currentPlayIndex].url"></audio>

                        <div class="progress">
                          <progress ref="audioProgressBar" id="progress" value="0" min="0" max="100">
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

                        <button @click="exportAudios" class="btn btn-export-all mb-0">
                          Export Audio
                        </button>
                      </div>
                    </div>
                    <div class="text_speech_word_form_wrap">

                      <div v-for="( text, index ) in speechData.text" :key="index" class="word_text_area_main_wrap">
                        <div class="word_textarea_wrap">
                          <div class="btn_reposition_wrap">
                            <button class="btn no-shadow btn_move_up" @click="moveUp(index)">
                              <img src="@/assets/icons/reorder-up.svg" alt="go up icon">
                            </button>

                            <button class="btn no-shadow btn_move_up" @click="moveDown(index)">
                              <img src="@/assets/icons/reorder-down.svg" alt="go down icon">
                            </button>
                          </div>

                          <textarea :class="{ 'is-invalid': $v.speechData.text.$each[index].text.$error }"
                            v-model="text.text" @input="updateWordcount" class="form-control" name="" id="" cols="30"
                            rows="5"></textarea>

                        </div>
                        <div v-if="isSubmitted && $v.speechData.text.$each[index].text.$error" class="invalid-feedback">
                          <span v-if="!$v.speechData.text.$each[index].text.required">* Please enter a text <br /></span>
                          <span v-if="!$v.speechData.text.$each[index].text.minLength">* Minimum of 3 Characters</span>
                        </div>
                        <div class="text_speech_actions blog-loader">
                          <button v-if="sectionsAudio[index] && sectionAudioIsPlaying[index]"
                            class="btn no-shadow btn_play_pause" @click="playMyAudio('audio' + index)">
                            <img src="@/assets/icons/pause.svg" alt="play / pause button">
                          </button>
                          <button v-else-if="sectionsAudio[index]" class="btn no-shadow btn_play_pause"
                            @click="playMyAudio('audio' + index)">
                            <img src="@/assets/icons/play.svg" alt="play / pause button">
                          </button>

                          <loader-modal :loading-state="loading[index]"></loader-modal>

                          <button class="btn btn-one btn-create-workspace px-4 py-3" @click="onSubmit(index, text.text)">
                            Generate
                            Audio
                          </button>

                          <audio @play="changeButtonState('playpauseSingle', 'audio' + index, index)"
                            @pause="changeButtonState('playpauseSingle', 'audio' + index, index)" hidden
                            class="gen-audios" @loadedmetadata="updateMaxLength" v-if="sectionsAudio[index]"
                            :ref="'audio' + index" :src="sectionsAudio[index].url">
                          </audio>



                          <button v-if="speechData.text.length > 1" class="btn btn_delete_gen_speech"
                            @click="deleteSection($event, index)">
                            <img src="@/assets/icons/delete.svg" alt="delete icon">
                          </button>
                        </div>
                      </div>

                      <div class="btn_wrap_add_section">
                        <button @click="addSection" class="btn btn_add_section">
                          <img src="@/assets/icons/plus.svg" alt="plus icon">
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
      loading: [],
      speechData: {
        text: [],
        language_id: null,
        voice_id: null,
      },
      currentPlayIndex: 0,
      sectionsAudio: [],
      sectionAudioIsPlaying: [],
      audioIsPlaying: false,
      voiceValue: { avatar: null, name: null, desc: null },
      generatedAudio: [{}],
      genAudioWordCount: 0,
      genAudioDur: 0.0,
      sections: [],
      gender: null,
      showOptions: false,
      isSubmitted: false,
      editId: "",
      rafVid: null,
      allAudioLength: 0.0,
    };
  },
  validations: {
    speechData: {
      text: {
        $each: {
          text: { required, minLength: minLength(3) },
        },
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
    playTestAudio(ref) {
      var allAudios = document.querySelectorAll('audio');
      allAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        
      });
      this.$refs[ref][0].play();
    },
    moveUp(index) {
      if (index === 0) {
        return;
      }

      let priorIndex = index - 1;

      let itemCopy = { ...this.speechData.text[index] };
      let priorItemCopy = { ...this.speechData.text[priorIndex] };
      let itemAudio = { ...this.sectionsAudio[index] };
      let priorAudioCopy = { ...this.sectionsAudio[priorIndex] }

      // Swap array position with prior element
      this.$set(this.speechData.text, priorIndex, itemCopy);
      this.$set(this.speechData.text, index, priorItemCopy);
      if (this.sectionsAudio.length > 0) {
        this.$set(this.sectionsAudio, priorIndex, itemAudio);
        this.$set(this.sectionsAudio, index, priorAudioCopy);
      }
    },
    moveDown(index) {
      if (index === this.speechData.text.length - 1) {
        return;
      }

      let subsequentIndex = index + 1;

      let itemCopy = { ...this.speechData.text[index] };
      let subsequentItemCopy = { ...this.speechData.text[subsequentIndex] };
      let itemAudio = { ...this.sectionsAudio[index] };
      let subsequentAudioCopy = { ...this.sectionsAudio[subsequentIndex] };

      // Swap array positions with subsequent element
      this.$set(this.speechData.text, subsequentIndex, itemCopy);
      this.$set(this.speechData.text, index, subsequentItemCopy);
      if (this.sectionsAudio.length > 0) {
        this.$set(this.sectionsAudio, subsequentIndex, itemAudio);
        this.$set(this.sectionsAudio, index, subsequentAudioCopy);
      }
    },
    prevAudio() {
      if (this.currentPlayIndex > 0) {
        this.currentPlayIndex--;
      }
    },
    playNext() {

      if (this.currentPlayIndex < this.sectionsAudio.length - 1) {
        this.currentPlayIndex++;


        setTimeout(() => {
          this.$refs.genAudio.play();
        }, 2000)




      } else {
        this.currentPlayIndex = 0;
      }
    },
    playMyAudio(target) {
      var el = this.$refs[target];

      // el[0].play();

      if (el[0].paused || el[0].ended) {
        el[0].play();

      } else {
        el[0].pause();
      }
      // this.$refs[ref].play();
    },
    addSection(event) {
      if (event) {
        event.preventDefault();
      }

      this.speechData.text.push({ text: "" });
      this.loading.push(false);
      this.sectionAudioIsPlaying.push(false);
    },
    deleteSection(event, index) {
      event.preventDefault();
      this.speechData.text =
        this.speechData.text.filter(function (value, indx) {
          return indx != index;
        });
    },
    updateWordcount() {
      //this.genAudioWordCount = this.speechData.text.trim().split(' ').length;
    },
    whilePlayingVideo() {
      this.$refs.audioCurTime.textContent = this.calculateTime(Math.floor(this.$refs.genAudio.currentTime));

      // audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
      this.rafVid = requestAnimationFrame(this.whilePlayingVideo);
    },
    updateTimeAndProgressBar() {
      if (!this.$refs.audioProgressBar.getAttribute("max"))
        this.$refs.audioProgressBar.setAttribute("max", this.$refs.genAudio.duration);
      this.$refs.audioProgressBar.value = this.$refs.genAudio.currentTime;
      // progressBar.style.width =
      //   Math.floor((video.currentTime / video.duration) * 100) + "%";
    },
    updateProgressBar() {
      this.$refs.audioDuration.textContent = this.calculateTime(Math.floor(this.$refs.genAudio.duration));
      this.$refs.audioProgressBar.setAttribute("max", this.$refs.genAudio.duration);
      this.genAudioDur = this.$refs.genAudio.duration;
    },
    calculateTime(secs) {
      const hour = Math.floor(secs / 3600);
      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const returnedHour = hour < 10 ? `0${hour}` : `${hour}`;
      return `${returnedHour}:${returnedMinutes}:${returnedSeconds}`;
    },
    changeButtonState(type, target, index) {
      // Play/Pause button
      if (type == "playpause") {
        if (this.$refs.genAudio.paused || this.$refs.genAudio.ended) {
          this.$refs.playPauseBtn.setAttribute("data-state", "play");

          this.audioIsPlaying = false;
          // bigPlayImg.src = "../assets/icons/play frame.svg";
        } else {
          this.$refs.playPauseBtn.setAttribute("data-state", "pause");

          this.audioIsPlaying = true;
          // bigPlayImg.src = "../assets/icons/time.svg";
        }
      }

      var el = this.$refs[target];
      if (type == "playpauseSingle") {
        if (el[0].paused || el[0].ended) {

          this.$set(this.sectionAudioIsPlaying, index, false);
          // bigPlayImg.src = "../assets/icons/play frame.svg";
        } else {

          this.$set(this.sectionAudioIsPlaying, index, true);
          // bigPlayImg.src = "../assets/icons/time.svg";
        }
      }
    },
    playPauseAudio() {
      if (this.$refs.genAudio.paused || this.$refs.genAudio.ended) {
        this.$refs.genAudio.play();
        requestAnimationFrame(this.whilePlayingVideo);
      } else {
        this.$refs.genAudio.pause();
        cancelAnimationFrame(this.rafVid);
      }
    },
    selectOption(option) {
      this.speechData.voice_id = option.value;
      this.voiceValue.name = option.text + " (" + option.detail.gender.charAt(0) + ")";
      this.voiceValue.desc = option.detail.description;
      this.voiceValue.avatar = option.detail.avatar_url;
      this.showOptions = false;
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
    onSubmit(index, text) {

      // set all fields to touched
      this.$v.$touch();

      // set isSubmite to true
      this.isSubmitted = true;
      // stop here if form is invalid
      if (this.$v.speechData.$invalid) return;


      this.loading.splice(index, 1, true);
      this.$store
        .dispatch("initiateTextToSpeech", {
          text: text,
          language_id: this.speechData.language_id,
          voice_id: this.speechData.voice_id
        })
        .then((res) => {

          //this.generatedAudio = res.data.data;
          // this.sectionsAudio[index] = res.data.data;
          // this.sectionsAudio.splice(index, 0, res.data.data);
          this.$set(this.sectionsAudio, index, { url: res.data.data, filename: res.data.filename });
          this.makeToast("success", res.data.message);
          this.loading.splice(index, 1, false);
        })
        .catch((error) => {

          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.loading.splice(index, 1, false);
        });
    },
    exportAudios() {

      var data = [];

      for (let i = 0; i < this.sectionsAudio.length; i++) {
        data.push({
          audio_file: this.sectionsAudio[i].filename
        });
      }


      this.$store
        .dispatch("exportAudios", {
          audios: data
        })
        .then((res) => {
          console.log(res);

          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          var url = res.data.data;

          a.href = url;
          a.download = url.split("/")[url.split("/").length - 1];
          console.log(a.download);
          a.target = "_blank";
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);



        })
        .catch((error) => {
          console.log(error);
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

          this.$store.commit("updateLoadState", false);


        })
        .catch((error) => {
          console.log(error);

        });
    },
    updateMaxLength() {
      var count = 0;
      for (var i = 0; i < this.sectionsAudio.length; i++) {

        let el = this.$refs["audio" + i];


        count += el[0].duration;
      }
      this.allAudioLength = count.toFixed(2);
    }
  },
  mounted() {
    // this.getCampaign();
    // this.getScriptType(this.$route.params.id);
    // this.getScriptData(this.$route.params.id);
    // this.getAllTones();
    this.getAllLanguages();
    this.getAllVoices();
    this.addSection();
  },
  computed: {
    filteredVoiceLanguage() {
      return this.voiceOptions.filter((voice) => {
        return voice.detail.language_id == this.speechData.language_id
      });
    },
    filteredVoiceGender() {
      return this.filteredVoiceLanguage.filter((voice) => {
        return voice.detail.gender.toLowerCase() == this.gender.toLowerCase();
      })
    },
    totalWordCount() {
      let count = 0;


      for (var i = 0; i < this.speechData.text.length; i++) {
        count += this.speechData.text[i].text.split(" ").length;
      }
      return count;
    },
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

.text-speech-form-wrap {
  overflow-y: unset !important;
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
  height: calc(2em + 0.75rem + 17px);
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  background-color: #fff;
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
  max-height: 350px;
  overflow-y: auto;
  z-index: 9;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
}

.select--option {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #495057;
  padding: 0.35rem 0.75rem 0.35rem 0.45rem !important;
  border-bottom: 1px solid rgb(219 222 229);
  cursor: pointer;
  background-color: #fff;
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
  margin-right: 1rem;
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
  font-size: 1rem;
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
  padding: 0.95rem 1rem 1.5rem 1rem;
}

.player_upper_section {
  display: flex;
  align-items: center;
  align-self: center;
  padding-left: 7rem;
  margin-bottom: 0.7rem;
}

.player_upper_section .btn_prev {
  margin-right: 1rem;
}

.player_upper_section .btn_play_gen_speech {
  margin-right: 1rem;
}

.player_timer {
  font-size: 1rem;
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
  height: 80vh;
  overflow-y: auto;
  padding-bottom: 1rem;
}

.word_text_area_main_wrap {
  border-bottom: 1px solid#E5E5E5;
  padding: 1rem 1rem 1rem 0rem;
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
  background-color: #fff !important;
  padding: 0.5rem 0.75rem !important;
  margin-top: 1rem;
}

.selected_group_inner {
  display: flex;
  align-items: center;
}

.btn_select__item {
  color: #fff;
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
