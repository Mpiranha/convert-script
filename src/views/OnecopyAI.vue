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
                        <button class="btn btn_chat_action">New Chat
                          <!-- <img src="@/assets/icons/plus_dark.png"
                            alt="plus icon"> -->
                        </button>

                        <button class="btn btn_chat_action" v-b-modal.modal-delete>
                          Clear Chat
                          <!-- <img src="@/assets/icons/x_dark.png" alt="clear icon"> -->
                        </button>
                      </div>

                      <div class="chat_history_main_wrap">
                        <div class="chat_history_title">Chat History</div>

                        <div class="chat_history_wrap">
                          <div v-for="history in chatHistories" :key="history.id" class="chat_history_item">
                            <span class="history_title">
                              {{ history.length > 51 ? history.prompt_1.substring(0, 51).concat("...") : history.prompt_1
                              }}
                            </span>
                            <button @click="deleteChatHistory(history.id)" class="btn no-shadow btn_del_chat_history">
                              <img src="@/assets/icons/delete_speech.png" alt="delete icon">
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
                      <div class="section-head-right mb-0 py-1 ml-0">
                        <div class="active_chat_title">
                          {{ activeChatTitle.length > 51 ? activeChatTitle.substring(0, 51).concat("...") :
                            activeChatTitle }}
                        </div>
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
                        :message="chat.content">
                      </chatbox>
                      <div class="ai-typing" v-if="isProcessing">
                        <img src="@/assets/icons/Message-1s-267px.gif" alt="ai typing icon">
                      </div>

                    </div>
                    <div class="chat_footer">
                      <button class="btn no-shadow btn_chat_prompt mr-3" v-b-modal.modal-prompt>
                        <img src="@/assets/icons/prompt.png" alt="prompt icon">
                      </button>

                      <!-- <button class="btn no-shadow btn_chat_prompt mr-3">  </button> -->
                      <VueRecordAudio mode="press" class="mr-3" />


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
    <b-modal :hide-header="true" id="modal-delete" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main py-3">
      <div class="modal-head text-center mb-4">
        <h3 class="title">
          Are You sure you want to clear your chat history?
        </h3>
      </div>

      <div class="d-flex justify-content-center">
        <b-button @click="$bvModal.hide('modal-delete')" class="close-modal">No</b-button>
        <b-button @click="clearChatHistory()" class="save-modal btn-danger">Yes</b-button>
      </div>
    </b-modal>

    <b-modal :hide-header="true" id="modal-prompt" centered size="lg" :hide-footer="true" dialog-class="p-0"
      content-class="modal-main" body-class="p-0">
      <div class="row">
        <div class="col-7 border-right">
          <div class="prompt_left_side">
            <div class="template-categories-wrap justify-content-start">
              <!-- <div class="category-item" :class="category == null ? 'active' : ''" @click="resetCategory">
              All Categories ({{ totalScripts }})
            </div> -->
              <div v-for="cat in categories" :key="cat.id" class="category-item"
                :class="category == cat.id ? 'active' : ''" @click="setActiveCategory(cat.id)">
                {{ cat.name }} ({{ cat.scripts }})
              </div>
            </div>

            <div class="prompt_list">
              <div class="prompt_list_item">
                Twitter Thread
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="prompt_right_side">
            <div class="prompt_desc">
              Using the 'Attention-Interest-Desire-Action' framework, write an email marketing campaign that highlights
              the [features] of our [product/service] and explains how these [advantages] can be helpful to [ideal
              customer persona].

              Elaborate on the [benefits] of our product and how it can positively impact the reader.
            </div>
            <div class="d-flex justify-content-end mt-auto">
              <b-button class="save-modal">Use Prompt</b-button>
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
import Chatbox from '@/components/Chatbox'
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
      loading: false,
      message: "",
      workspace_id: this.$store.state.user.default_workspace_id,
      chatHistories: [],
      isFirstTime: true,
      isProcessing: false,
      activeChat: [],
      activeChatID: null,
      activeChatTitle: "",
      map: {},
      categories: [],
    };
  },
  methods: {
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
    getChatHistory(noload) {
      if (!noload) {
        this.$store.commit("updateLoadState", true);
      }
      this.$store
        .dispatch("getChatHistory", this.workspace_id)
        .then((res) => {
          this.chatHistories = res.data.data
        })
        .catch((error) => {
          console.log(error);

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
        .dispatch("getAllCategories")
        .then((res) => {
          //this.categoryOptions = res.data.data;

          this.categories = res.data.data.reverse();

          // cat.forEach(function (data) {
          //   console.log( "cat data " + data);
          //   this.categoryOptions.push({ value: data.id, text: data.name });
          // });

          // for (let index = 0; index < this.categories.length; index++) {
          //   this.categoryOptions.push({
          //     value: this.categories[index].id,
          //     text: this.categories[index].name + " (" + this.categories[index].scripts + ")",
          //   });
          // }



          // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
  },
  mounted() {
    // this.getCampaign();
    // this.getScriptType(this.$route.params.id);
    // this.getScriptData(this.$route.params.id);
    // this.getAllTones();
    this.getChatHistory();
    this.getCategories();

  },
  computed: {

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
  padding: 2rem 0.9rem;

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
  background-color: #FCFBFB;
  padding: 0.6rem 0.7rem;
  border: 1px solid #E5E5E5;
  min-width: 50%;
  max-width: 70%;
  margin-bottom: 1rem;

  /* z-index: 1; */
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
}


.user-msg {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}



.user-msg {
  background-color: #F4ECFF;
  color: #000;
  padding: 0.6rem 0.7rem;
  min-width: 50%;
  max-width: 80%;
  z-index: 1;
  text-align: left;
  font-size: 0.95rem;
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
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.45rem 0.8rem;
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
  background-color: #79869D;
}

.prompt_left_side {
  padding: 2rem;
}

.vue-audio-recorder {
  width: 47px !important;
  height: 45px !important;
  background-color: #fff !important;
  border: 1px solid #4b5157;
}

.vue-audio-recorder:after,
.vue-audio-recorder:before,
.vue-audio-recorder span:before,
.vue-audio-recorder span:after {
  background-color: #4b5157 !important;
}

.vue-audio-recorder span:before {
  border: .125em solid #4b5157 !important;
}


.vue-audio-recorder.active {
  background-color: #ef5350 !important;
}

.vue-audio-recorder.active:after,
.vue-audio-recorder.active:before,
.vue-audio-recorder.active span:before,
.vue-audio-recorder.active span:after,
.vue-audio-recorder.active span:before {
  background-color: #fff !important;
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


