<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading" class="fullscreen-loader"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" logo-class="permanent-logo"
        dismiss-class="permanent-dismiss" current-active="new-copy" class="always-hidden"></sidebar>
      <div class="content-section">
        <navbar script-type-name="Onechat AI" logo-link-class="hide-logo" toggle-class="permanent-toggler"></navbar>
        <div class="scroll-content script-content-fs">
          <div class="container-fluid pt-3">


            <div class="content-wrap script-custom-height mb-0">
              <div class="row h-100">
                <div class="col-12 col-lg-4 pr-lg-0 h-100">
                  <div class="bordered-right h-100 md-bordered-bottom">
                    <div class="history-section_wrap h-100">
                      <div class="chat_actions">
                        <button class="btn btn_chat_action" @click="newChat">New Chat
                          <img src="@/assets/icons/new-chat.svg" alt="plus icon">
                        </button>

                        <button :disabled="activeChatID ? false : 'disabled'" class="btn btn_chat_action"
                          v-b-modal.modal-delete>
                          Clear Chat
                          <img src="@/assets/icons/close.svg" alt="clear icon">
                        </button>
                      </div>

                      <div class="chat_history_main_wrap">
                        <div class="chat_history_title">Chat History</div>

                        <div class="chat_history_wrap">
                          <div v-for="history in chatHistories" :key="history.id" class="chat_history_item">
                            <span class="history_title" @click="getOneChatHistory(history.chat_id)">
                              {{ history.prompt_1.length > 51 ? history.prompt_1.substring(0, 51).concat("...") :
                                history.prompt_1
                              }}
                            </span>
                            <button @click="deleteChatHistory(history.chat_id)"
                              class="btn no-shadow btn_del_chat_history">
                              <img src="@/assets/icons/delete.svg" alt="delete icon">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-8 pl-lg-0 h-100">
                  <div class="d-flex flex-column h-100">
                    <div class="section-head bordered-bottom">
                      <div class="section-head-right w-100 d-flex align-items-center mb-0 py-1 ml-0">
                        <input ref="titleInput" v-if="isEditTitle" class="form-control no-shadow text edit_title_input"
                          v-model="activeChatTitle" @blur="onBlur()">
                        <div v-else class="active_chat_title">
                          {{ activeChatTitle.length > 51 ? activeChatTitle.substring(0, 51).concat("...") :
                            activeChatTitle }}
                        </div>
                        <button v-if="activeChatTitle" class="btn no-shadow btn_edit_chat_title" type="button"
                          @click="toggleEditTitle">
                          <img src="@/assets/icons/edit.svg" alt="edit icon">
                        </button>
                      </div>
                    </div>
                    <div class="chat_area" ref="chatScrollWrap">
                      <div v-if="activeChat.length == 0" class="no-chat">
                        <div class="title">Welcome to OneChat AI</div>
                        <div class="desc">
                          To begin, write down a task and let Chat handle the rest. If you're unsure of where to begin,
                          browse through the Prompt Library for some inspiration.
                        </div>
                      </div>
                      <chatbox v-else v-for="(chat, index) in activeChat" :key="index" :author="chat.role"
                        :message="chat.content" @regenerate-response="doRegeneration(index)"
                        @save-clicked="saveChat(chat.message_id)">
                      </chatbox>
                      <div class="ai-typing" v-if="isProcessing">
                        <img src="@/assets/icons/Message-1s-267px.gif" alt="ai typing icon">
                      </div>

                    </div>
                    <div class="chat_footer">
                      <button class="btn no-shadow btn_chat_prompt mr-3" v-b-modal.modal-prompt>
                        <img src="@/assets/icons/templates.svg" alt="prompt icon">
                      </button>

                      <button class="btn no-shadow btn_chat_prompt btn_mic mr-3"
                        :disabled="this.convertingToText ? 'disabled' : false" :class="{
                          'active': isRecording
                        }" @click="isRecording ? stopRecording() : startRecording()">
                        <img v-if="isRecording" src="@/assets/icons/mic_white.svg" alt="prompt icon">
                        <img v-else src="@/assets/icons/voice-rec.svg" alt="prompt icon">

                      </button>

                      <!-- <button class="btn no-shadow btn_chat_prompt mr-3">  </button> -->


                      <div class="chat-input-div">
                        <div class="speech_text_processing" v-if="isRecording">
                          <!-- <img src="@/assets/icons/Message-1s-267px.gif" alt="ai typing icon"> -->

                          <div class="recording_state">
                            {{ recordState }}
                          </div>

                          <button class="btn btn_cancel_record">
                            x
                          </button>

                          <div ref="waveform" id="waveform" class="wave_form">
                            <canvas ref="visualizer" class="visualizer"></canvas>
                          </div>

                          <button class="btn btn-one btn_done" @click="stopRecording()">Done</button>

                        </div>
                        <div class="speech_text_processing" v-if="this.convertingToText">
                          <div class="recording_state">
                            {{ recordState }}
                          </div>
                        </div>
                        <!-- <textarea name="name" cols="80"
                            placeholder="Type in your answers here"></textarea> -->

                        <div @keyup="doKeydownEvent($event)" @keydown="doKeydownEvent($event)" @input="updateData($event)"
                          ref="chatDiv" contenteditable="showPromptBox" class="chat-input"
                          data-placeholder="Send a Message">

                        </div>
                        <button class="btn btn-send" @click="sendMessage(message)">
                          <img src="@/assets/icons/send-chat.svg" class="send-icon" name="send">
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
    <b-modal :hide-header="true" id="modal-delete" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main py-3">
      <div class="modal-head text-center mb-4">
        <h3 class="title">
          Are You sure you want to clear this chat?
        </h3>
      </div>

      <div class="d-flex justify-content-center">
        <b-button @click="$bvModal.hide('modal-delete')" class="close-modal">No</b-button>
        <b-button @click="clearChat()" class="save-modal btn-danger">Yes</b-button>
      </div>
    </b-modal>

    <b-modal :hide-header="true" id="modal-prompt" centered size="lg" :hide-footer="true" dialog-class="p-0"
      content-class="modal-main" body-class="p-0">
      <div class="row">
        <div class="col-7 border-right">
          <div class="prompt_left_side">
            <div class="template-categories-wrap justify-content-start">
              <div class="category-item" :class="category == null ? 'active' : ''" @click="resetCategory">
                All Categories ({{ this.prompts.length }})
              </div>
              <div v-for="cat in removedCategoryWithoutPrompt" :key="cat.id" class="category-item"
                :class="category == cat.id ? 'active' : ''" @click="setActiveCategory(cat.id)">
                {{ cat.name }} ({{ cat.prompt_count }})
              </div>
            </div>

            <div class="prompt_list" v-if="category">
              <div v-for="prompt in filteredCategory" :key="prompt.id" class="prompt_list_item"
                :class="selectedPrompt ? prompt.id == selectedPrompt.id ? 'selected' : '' : ''"
                @click="setActivePrompt(prompt)">
                {{ prompt.name }}
              </div>
            </div>
            <div class="prompt_list" v-else>
              <div v-for="prompt in prompts" :key="prompt.id" class="prompt_list_item"
                :class="selectedPrompt ? prompt.id == selectedPrompt.id ? 'selected' : '' : ''"
                @click="setActivePrompt(prompt)">
                {{ prompt.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="prompt_right_side">
            <div class="prompt_desc" v-if="selectedPrompt">
              {{ selectedPrompt.prompt }}
            </div>
            <div class="d-flex justify-content-end mt-auto">
              <b-button :disabled="selectedPrompt ? false : 'disabled'" class="save-modal" @click="setPromptToFIeld">Use
                Prompt</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";
import Chatbox from '@/components/Chatbox';

// import Recorder from 'recorder-js';
// import $ from 'jquery'

export default {
  name: "OnechatAI",
  components: {
    Sidebar,
    Navbar,
    Chatbox
  },
  mixins: [alertMixin],
  data() {
    return {
      isEditTitle: false,
      loading: false,
      isRecording: false,
      Recorder: "",
      message: "",
      convertingToText: false,
      workspace_id: this.$store.state.user.default_workspace_id,
      chatHistories: [],
      isFirstTime: true,
      isProcessing: false,
      activeChat: [],
      activeChatID: null,
      activeChatTitle: "",
      map: {},
      categories: [],
      category: null,
      prompts: [],
      selectedPrompt: null,
      recordState: "Listening",
      wavesurfer: ""
    };
  },
  methods: {
    animateRecordState() {
      var _this = this;
      var count = 1;
      var temp = _this.recordState;
      setInterval(function () {

        if (count <= 3) {
          _this.recordState = _this.recordState + ".";
          count++;
        } else {
          count = 1;
          if (temp != _this.recordState.substring(0, _this.recordState.length - 3)) {
            temp = _this.recordState;
          }
          _this.recordState = temp;
        }


      }, 500)
    },
    setPromptToFIeld() {
      this.$bvModal.hide('modal-prompt');
      this.$refs.chatDiv.innerText = this.selectedPrompt.prompt;
      this.message = this.selectedPrompt.prompt;
    },
    doRegeneration(index) {
      this.activeChat.splice(index);

      this.isProcessing = true;
      this.$store
        .dispatch("regenerateChat", { workspace_id: this.workspace_id, chat_id: this.activeChatID, message_id: this.activeChat[index - 1].message_id })
        .then((res) => {
          this.isProcessing = false;
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.activeChat = res.data.data.messages;

        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

    },
    newChat() {
      this.isFirstTime = true,
        this.activeChatID = null;
      this.activeChat = [];
      this.activeChatTitle = "";
    },
    clearChat() {
      this.$store
        .dispatch("clearChat", { chat_id: this.activeChatID, workspace_id: this.workspace_id })
        .then(() => {
          this.error = null;
          this.$bvModal.hide('modal-delete');
          this.isFirstTime = true,
            this.activeChatID = null;
          this.activeChat = [];
          this.activeChatTitle = "";
          this.getChatHistory(true);
          this.makeToast("success", "Chat cleared deleted successfully");
        })
        .catch((error) => {
          this.error = error;
          this.makeToast("danger", this.error);
          // this.error = error;
        });
    },
    async startRecording() {
      this.recordState = "Listening";



      // Old code
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      // Old code
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();

      const source = audioCtx.createMediaStreamSource(stream);
      //const distortion = audioCtx.createWaveShaper();
      source.connect(analyser);
      //analyser.connect(distortion);
      //distortion.connect(audioCtx.destination);
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;






      let drawVisual;




      // Old code
      this.Recorder = new MediaRecorder(stream);
      this.Recorder.start();
      console.log(this.Recorder.state);
      if (this.Recorder.state === "recording") {
        this.isRecording = true;

        let canvas;
        let canvasCtx;
        let intendedWidth;
        let intendedHeight;
        const visualize = function () {
          var WIDTH = canvas.width;
          var HEIGHT = canvas.height;



          analyser.fftSize = 2048;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          console.log(bufferLength);

          // We can use Float32Array instead of Uint8Array if we want higher precision
          // const dataArray = new Float32Array(bufferLength);
         

          canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

          const draw = function () {

            console.log(bufferLength);
            drawVisual = window.requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = "rgb(255, 255, 255)";
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = "rgb(0, 0, 0)";

            canvasCtx.beginPath();

            const sliceWidth = (WIDTH * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
              let v = dataArray[i] / 128.0;
              let y = (v * HEIGHT) / 2;

              if (i === 0) {
                canvasCtx.moveTo(x, y);
              } else {
                canvasCtx.lineTo(x, y);
              }

              x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
          };

          draw();

        }
        setTimeout(() => {
          canvas = this.$refs.visualizer;
          canvasCtx = canvas.getContext("2d");
          intendedWidth = this.$refs.waveform.clientWidth - 32;
          intendedHeight = this.$refs.waveform.clientHeight;
          console.log("intended width", intendedWidth);
          canvas.setAttribute("width", intendedWidth);
          canvas.setAttribute("height", intendedHeight);

          visualize();
        }, 1000)





      }
      let chunks = [];
      this.Recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      }
      //function to catch error
      this.Recorder.onerror = (e) => {
        alert(e.error);
      }

      this.Recorder.onstop = () => {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        window.cancelAnimationFrame(drawVisual);
        this.isRecording = false;
        let blob = new Blob(chunks);
        // var base64String;
        // var reader = new FileReader();
        // reader.readAsDataURL(blob);
        // reader.onloadend = function () {
        //   base64String = reader.result;
        //   console.log('Base64 String - ', base64String);
        // }

        blob = blob.slice(0, blob.size, "audio/webm");

        var aud = new FormData();

        aud.append("audio", blob);

        this.convertingToText = true;
        this.recordState = "Processing";

        this.$store
          .dispatch("speechToText", aud)
          .then((res) => {
            this.convertingToText = false;
            this.error = null;
            this.$refs.chatDiv.innerText = res.data.data.text;
            this.message = res.data.data.text;

          })
          .catch((error) => {
            console.log(error);
            this.error = error;
            this.convertingToText = false
            this.makeToast("danger", this.error);
            // this.error = error.response.data.errors.root;
            // this.error = error;
          });

        //   console.log(blob);
        //  // create url for audio
        //    let url = URL.createObjectURL(blob);
        //    //pass url into audio tag
        //    var audio = document.createElement("audio");
        //    audio.src = url;

        //    document.body.appendChild(audio);

        //    audio.play();
      }


    },
    stopRecording() {
      this.Recorder.stop();
    },
    onResult(blob) {

      console.log('Downloadable audio', window.URL.createObjectURL(blob));

      blob = blob.slice(0, blob.size, "audio/webm");

      console.log(blob);
      var aud = new FormData();

      aud.append("audio", blob);

      this.$store
        .dispatch("speechToText", aud)
        .then((res) => {

          this.error = null;
          this.$refs.chatDiv.innerText = res.data.data;
          this.message = res.data.data;

        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });
    },
    updateData(e) {


      this.message = e.target.innerText
      //console.log(this.message);
    },
    doKeydownEvent(event) {
      console.log(event);
      // You could also use an array

      //console.log(this);
      let e = event; // to deal with IE
      this.map[e.keyCode] = e.type == 'keydown';
      /* insert conditional here */
      // eslint-disable-next-line no-empty
      if (this.map[13] && this.map[16]) {

      } else if (this.map[13]) {
        e.preventDefault();
        this.sendMessage(this.message);
      }





      // if (event.keyCode == 13) {
      //     event.preventDefault();

      //     this.sendMessage();

      // }
    },
    sendMessage(msg) {
      if (!msg.length) return;
      this.$refs.chatScrollWrap.children[0].lastElementChild.scrollIntoView(false);

      this.activeChat.push({
        "created_at": "2023-06-11 08:45:01",
        "message_id": 1,
        role: "user",
        content: msg
      });



      if (this.isFirstTime) {
        this.startChat();
      } else {
        this.continueChat();
      }

      this.$refs.chatDiv.innerText = '';
      this.message = '';
    },
    getOneChatHistory(chat_id) {
      this.$store
        .dispatch("getOneChatHistory", { chat_id: chat_id, workspace_id: this.workspace_id })
        .then((res) => {
          this.isProcessing = false;
          this.isFirstTime = false;
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.activeChat = res.data.data;
          this.activeChatID = chat_id;
          this.activeChatTitle = res.data.data[0].title;

        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    setActiveCategory(cat) {
      this.category = cat;
    },
    setActivePrompt(prompt) {
      this.selectedPrompt = prompt;
    },
    resetCategory() {
      this.category = null;
    },
    startChat() {
      this.isProcessing = true;

      this.$store
        .dispatch("startChat", { message: this.message, workspace_id: this.workspace_id })
        .then((res) => {
          this.isProcessing = false;
          this.isFirstTime = false;
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.activeChat = res.data.data.messages;
          this.activeChatID = res.data.data.chat_id;
          this.activeChatTitle = res.data.data.messages[0].content;
          this.getChatHistory(true);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    continueChat() {
      this.isProcessing = true;

      this.$store
        .dispatch("continueChat", { id: this.activeChatID, data: { message: this.message, workspace_id: this.workspace_id } })
        .then((res) => {
          this.isProcessing = false;
          this.error = null;
          console.log(res.data);
          // this.getCampaign();
          this.activeChat = res.data.data.messages;
          this.activeChatID = res.data.data.chat_id;
          this.getChatHistory(true);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    updateTitle() {
      this.$store
        .dispatch("updateChatTitle", { chat_id: this.activeChatID, data: { title: this.activeChatTitle, workspace_id: this.workspace_id } })
        .then((res) => {
          this.getChatHistory(true);
          this.makeToast("success", res.data.message);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },

    saveChat(message_id) {
      this.$store
        .dispatch("saveMessage", { chat_id: this.activeChatID, data: { message_id: message_id, workspace_id: this.workspace_id } })
        .then((res) => {
          this.makeToast("success", res.data.message);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          // this.error = error.response.data.errors.root;
          // this.error = error;
        });

      // this.getCampaign();

      // this.$vm.$forceUpdate();
    },
    getChatHistory(noload) {
      if (!noload) {
        this.$store.commit("updateLoadState", true);
      }
      this.$store
        .dispatch("getChatHistory", this.workspace_id)
        .then((res) => {
          this.chatHistories = res.data.data.reverse();
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteChatHistory(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteChatHistory", { id: id, workspace_id: this.workspace_id })
        .then(() => {
          this.error = null;
          this.getChatHistory();
          this.makeToast("success", "Chat history deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.error = error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
          // this.error = error;
        });

      // this.getCampaign();
    },
    clearChatHistory() {
      this.$bvModal.hide("modal-delete");
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("clearChatHistory", this.workspace_id)
        .then(() => {
          this.error = null;
          this.getChatHistory();
          this.makeToast("success", "Chat history deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.error = error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
          // this.error = error;
        });

      // this.getCampaign();
    },
    getCategories() {
      this.$store
        .dispatch("getPromptCategory")
        .then((res) => {
          //this.categoryOptions = res.data.data;

          this.categories = res.data.data.reverse();




          // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getPrompts() {
      this.$store
        .dispatch("getPrompts")
        .then((res) => {
          //this.categoryOptions = res.data.data;

          this.prompts = res.data.data;




          // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    toggleEditTitle() {
      this.isEditTitle = true;
    },
    onBlur() {
      this.isEditTitle = false;

      this.updateTitle();
    }
  },
  mounted() {
    // this.getCampaign();
    // this.getScriptType(this.$route.params.id);
    // this.getScriptData(this.$route.params.id);
    // this.getAllTones();
    this.getChatHistory();
    this.getCategories();
    this.getPrompts();

    //this.isRecording = true;
    this.animateRecordState();



  },
  computed: {
    filteredCategory() {
      return this.prompts.filter((cat) => {
        // console.log(id)
        return this.category == cat.script_type_category_id;
      });
    },
    removedCategoryWithoutPrompt() {
      return this.categories.filter((cat) => {
        return cat.prompt_count > 0
      })
    }
  }
};
</script>

<style>
.btn-danger {
  color: #fff;
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
}

.chat-input {
  width: 100%;
  min-height: 25px;
  overflow-y: auto;
  max-height: 100px;
  color: rgb(56, 54, 57);
  flex-grow: 1;
  margin-right: 1.5rem;
  white-space: pre-line;
}

.chat-input:empty:before {
  content: attr(data-placeholder);
  color: rgb(187 187 187);
}

.chat_actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #f6f6f6;
  padding: 1rem 1rem;
}

.btn_chat_action {
  border: 1px solid #79869D !important;
  border-radius: 7px !important;
  color: #79869D !important;
  width: 45%;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.chat_history_main_wrap {
  height: calc(100% - 71px);
  padding: 2rem 0.9rem;

}

.history_title {
  cursor: pointer;
  flex-grow: 1;
}

.chat_history_title {
  text-align: center;
  font-size: 20px;
  color: #393F46;
  margin-bottom: 1rem;
}

.btn_chat_action img {
  width: 1rem;
  margin-left: 0.5rem;
}

.chat_history_wrap {
  display: flex;
  flex-direction: column;
}

.chat_history_item {
  display: flex;
  align-items: center;
  border: 1px solid #79869D;
  border-radius: 7px;
  color: #393F46;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1rem;
}

.btn_del_chat_history {
  margin-left: auto;
  padding: 0 !important;

}

.chat_area {
  height: calc(100% - 154px);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.chat_footer {
  display: flex;
  align-items: center;
  border-top: 1px solid #E5E5E5;
  padding: 1rem;
  margin-top: auto;
}

.chat-input-div {
  display: flex;
  border: 1px solid #E5E5E5;
  flex-grow: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  position: relative;
}

.btn_edit_chat_title {
  margin-left: auto;
}

.edit_title_input {
  border: none !important;
  border-bottom: 1px solid #afb7c4 !important;
  border-radius: unset !important;
  margin-right: 1rem;
}

.speech_text_processing {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  height: 100%;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.7rem;
}

.speech_text_processing img {
  width: 4rem;
}

.chat-input:focus {
  border: none;
  outline: none;
}

.no-chat {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
}

.no-chat .title {
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 1rem;
  /* or 36px */

  text-align: center;

  color: #767676;
}

.no-chat .desc {
  font-size: 21px;

  text-align: center;

  color: #767676;
}


.ai-msg .ai-img {
  width: 40px;
}

.ai-msg .ai-img-wrap {
  margin-right: 2rem;
  position: relative;
}

.ai-msg .ai-img-wrap::after {
  content: "";
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  background: #95c136;
  border-radius: 50%;
  bottom: 3px;
  right: 0;
}

.ai-msg {

  background-color: #F4ECFF;
  padding: 0.6rem 0.7rem;
  border: 1px solid #E5E5E5;
  max-width: 70%;
  margin-bottom: 1rem;

  /* z-index: 1; */
  font-size: 1rem;
  display: flex;
  flex-direction: column;
}


.user-msg {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}



.user-msg {
  background-color: #FCFBFB;
  color: #000;
  padding: 0.6rem 0.7rem;
  border: 1px solid #E5E5E5;
  max-width: 80%;
  z-index: 1;
  text-align: left;
  font-size: 1rem;
  align-self: end;
}

.user-msg p::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  top: -3px;
  right: -14px;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #f7f4f4;
}

.ai-typing img {
  width: 5rem;
}

.active_chat_title {
  font-size: 1.3rem;
  line-height: 112.9%;
  /* identical to box height, or 25px */


  color: #393F46;
}

.prompt_list {
  display: flex;
  flex-direction: column;
}

.prompt_list_item {
  border: 0.5px solid #79869D;
  border-radius: 7px;
  background-color: #FAFAFA;
  padding: 0.45rem 0.8rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
}


.prompt_right_side {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
}

.prompt_desc {
  font-size: 1.1rem;
  margin-bottom: 4rem;
}

.prompt_list_item.selected {
  background-color: #cdcecf;
}

.prompt_left_side {
  padding: 2rem;
}


.outline_subsection_list_wrap {
  padding: 1rem;
}

.btn_mic {
  border-radius: 50% !important;
  width: 2.5rem;
  height: 2.5rem;
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding: 0 !important;
}

.btn_mic.active {
  -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
}

.recording_state,
.btn_cancel_record {
  border: 1px solid #79869D !important;
  padding: 0.65rem 0.95rem;
  border-radius: 7px !important;
  margin-right: 1rem;
}

.recording_state {
  min-width: 120px;
}

.btn_cancel_record {
  font-size: 1.4rem !important;
  padding: 0.35rem 0.95rem !important;
}

.wave_form {
  flex-grow: 1;
  border: 1px solid #afb6c4;
  padding: 0 1rem;
  border-radius: 0.3rem;
  margin-right: 1rem;
  height: 48px;
  width: 72%;
}

.btn_done {
  font-size: 1rem !important;
}

@keyframes pulse {
  to {
    box-shadow: 0 0 0 10px rgba(239, 83, 80, 0.1);
    background-color: #E53935;
    transform: scale(0.9);
  }
}
</style>

<style>
@media (min-width: 992px) {

  .modal-lg,
  .modal-xl {
    max-width: 1000px !important;
  }
}
</style>


