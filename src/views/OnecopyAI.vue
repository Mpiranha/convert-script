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
                <div class="col-12 col-lg-4 pr-lg-0">
                  <div class="bordered-right h-100 md-bordered-bottom">
                    <div class="history-section_wrap h-100">
                      <div class="chat_actions">
                        <button class="btn btn_chat_action">New Chat
                          <!-- <img src="@/assets/icons/plus_dark.png"
                            alt="plus icon"> -->
                        </button>

                        <button class="btn btn_chat_action">
                          Clear Chat
                          <!-- <img src="@/assets/icons/x_dark.png" alt="clear icon"> -->
                        </button>
                      </div>

                      <div class="chat_history_main_wrap">
                        <div class="chat_history_title">Chat History</div>

                        <div class="chat_history_wrap">
                          <div class="chat_history_item">
                            <span class="history_title">
                              Chat History 1 - First chat prompt becomes title...
                            </span>
                            <button class="btn no-shadow btn_del_chat_history">
                              <img src="@/assets/icons/delete_speech.png" alt="delete icon">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-8 pl-lg-0">
                  <div class="d-flex flex-column h-100">
                    <div class="section-head bordered-bottom">
                      <div class="section-head-right mb-0 py-3">

                      </div>
                    </div>
                    <div class="chat_area">
                      <div class="no-chat">
                        <div class="title">Welcome to OneChat AI</div>
                        <div class="desc">
                          To begin, write down a task and let Chat handle the rest. If you're unsure of where to begin,
                          browse through the Prompt Library for some inspiration.
                        </div>
                      </div>
                    </div>
                    <div class="chat_footer">
                      <button class="btn no-shadow btn_chat_prompt">
                        <img src="@/assets/icons/prompt.png" alt="prompt icon">
                      </button>

                      <button class="btn no-shadow btn_chat_prompt mr-3">
                        <img src="@/assets/icons/microphone.png" alt="microphone icon">
                      </button>

                      <div class="chat-input-div">
                        <!-- <textarea name="name" cols="80"
                            placeholder="Type in your answers here"></textarea> -->

                        <div @keyup="doKeydownEvent($event)" @keydown="doKeydownEvent($event)" @input="updateData($event)"
                          ref="chatDiv" contenteditable="showPromptBox" class="chat-input"
                          data-placeholder="Type in your answers here">

                        </div>
                        <button class="btn btn-send" @click="sendMessage(message)">
                          <img src="@/assets/icons/send-message.png" class="send-icon" name="send">
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
import alertMixin from "@/mixins/alertMixin";
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
      loading: false,
    };
  },
  methods: {
    updateData(e) {


      this.message = e.target.innerText
      //console.log(this.message);
    },
    doKeydownEvent(event) {
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
      this.$refs.chatScrollWrap.children[0].lastElementChild.scrollIntoView(false)
      let words = msg.replaceAll("_", " ").split(" ");

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);

      }

      words = words.join(" ");
      if (/\w+/.test(msg)) {
        this.chats.push({
          author: "user",
          message: words
        });
        this.$refs.chatDiv.innerText = '';
        this.message = '';

        //if(this.nextQuestion.length){
        //  msg = this.nextQuestion;
        // }
        //else{

        //}

        // does nothing when user uploads image instead text
        if (this.currentQuestion.current_question === "upload_an_image") {
          this.updateAIChat([this.currentQuestion]);
          return;
        }
        //end

        //console.log("msg "+msg);
        // verifies the user input is same as what is in the select options
        if (this.selectQuestions.includes(this.currentQuestion.current_question)) {
          if (!this.currentQuestion.select_options.filter(data => data.value.toLowerCase().trim() === msg.toLowerCase().trim()).length) {
            this.updateAIChat([this.currentQuestion]);
            return;
          }
        }
        // end

        console.log("prompt title", this.promptTitle, Object.keys(this.answersToGenerate).length);
        // save answers from the prompt to use later to generare the image

        //console.log("current question");
        //console.log(JSON.stringify(this.currentQuestion.question));

        if (Object.keys(this.answersToGenerate).length) {
          this.answersToGenerate["data"][this.currentQuestion.question] = this.currentQuestion.question === "mask_prompt" ? this.selectedMaskOption + " thus generating, " + msg : msg;
          // console.log("mask answer ", this.answersToGenerate["data"][this.currentQuestion.question]);
        }
        //this.answersToGenerate.push({"question_field": this.currentQuestion.question, answer: msg});

        // end

        //console.log("answers to generate");
        //console.log(JSON.stringify(this.answersToGenerate));



      }
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

  },
  computed: {

  }
};
</script>

<style>
.chat-input {
  width: 100%;
  min-height: 25px;
  overflow-y: auto;
  max-height: 100px;
  color: rgb(56, 54, 57);
  flex-grow: 1;
  margin-right: 1.5rem;
}

.chat-input:empty:before {
  content: attr(data-placeholder);
  color: rgb(56, 54, 57);
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

}

.chat_history_main_wrap {
  height: calc(100% - 71px);
  padding: 2rem;

}

.chat_history_title {
  text-align: center;
  font-size: 20px;
  color: #393F46;
  margin-bottom: 1rem;
}

.btn_chat_action img {
  width: 1rem;
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
}

.btn_del_chat_history {
  margin-left: auto;
  padding: 0 !important;

}

.chat_area {
  height: calc(100% - 159px);
}

.chat_footer {
  display: flex;
  align-items: center;
  border-top: 1px solid #E5E5E5;
  padding: 1rem;
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
</style>


