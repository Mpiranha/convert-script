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
            <h6 class="title">All Copy</h6>

            <router-link class="btn btn-create" to="/script/select">
              <span>+</span>
              New Copy
            </router-link>
          </div>

          <div class="content-wrap script-custom-height">
            <div class="row h-100">
              <div class="col-6 h-100 bordered-right pr-0">
                <div class="section-head">
                  <div class="section-head-left">
                    <img
                      class="section-head-icon"
                      src="@/assets/icons/convert-icon/All script.svg"
                      alt=""
                    />
                    {{ scripts.length }}
                  </div>
                  <div class="search-form mb-0">
                    <button class="btn search-btn">
                      <i class="flaticon-loupe icons"></i>
                    </button>
                    <input
                      @input="searchKeyWord"
                      v-model="searchKey"
                      class="form-control no-shadow search-input"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                  <div class="section-head-right">
                    <a
                      href="http://api.onecopy.ai/api/v1/export/excel/model?model=User&type=User&export=ScriptResponsesExport"
                      target="_blank"
                      class="btn btn-export-all"
                    >
                      Export All
                    </a>
                  </div>
                </div>
                <div class="control-height">
                  <table class="table table-section script-table">
                    <tbody v-if="searchResult.length > 0">
                      <tr
                        @click="setActiveScript(result)"
                        v-for="result in searchResult"
                        :key="result.id"
                      >
                        <td scope="row">
                          <div class="control-order-tool">
                            <button class="btn mb-2">
                              <i class="flaticon-up-arrow icons icon-order"></i>
                            </button>
                            <button class="btn btn-down">
                              <i class="flaticon-up-arrow icons icon-order"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <div class="script-type">
                            {{ result.scriptResponses[0].script_type }}
                          </div>
                          <div class="script-content">
                            {{ abbrScript(result.scriptResponses[0].text) }}
                          </div>
                        </td>

                        <td class="text-right">
                          <dropdown-tool
                            delete-what="Script"
                            @edit-clicked="
                              openEditModal(result.id, result.scriptResponses[0].text)
                            "
                            @delete-proceed="deleteScript(result.id)"
                          >
                          </dropdown-tool>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else-if="scripts && searchKey.length < 1">
                      <tr
                        @click="setActiveScript(script)"
                        v-for="script in scripts"
                        :key="script.id"
                      >
                        <td scope="row">
                          <div class="control-order-tool">
                            <button class="btn mb-2">
                              <i class="flaticon-up-arrow icons icon-order"></i>
                            </button>
                            <button class="btn btn-down">
                              <i class="flaticon-up-arrow icons icon-order"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <div class="script-type">
                            {{ script.script_type_name }}
                          </div>
                          <div class="script-content">
                            {{ abbrScript(script.text) }}
                          </div>
                        </td>
                       
                        <td class="text-right">
                          <dropdown-tool
                            delete-what="Script"
                            @edit-clicked="
                              openEditModal(script.id, script.text)
                            "
                            @delete-proceed="deleteScript(script.id)"
                          >
                          </dropdown-tool>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-6">
                <div class="d-flex flex-column h-100">
                  <div class="section-head">
                    <div class="section-head-right d-flex align-items-center">
                      <div class="fav-star" @click="toggleFavourite">
                        <img
                          v-if="isFavourite"
                          class="fav-icon"
                          src="@/assets/icons/convert-icon/star.png"
                          alt=""
                        />
                        <img
                          v-else
                          class="fav-icon"
                          src="@/assets/icons/convert-icon/my Favourites.svg"
                          alt=""
                        />
                      </div>
                      <!-- <select class="sort-select" name="" id="">
                        <option value="none" selected>Export Script</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select> -->
                      <a
                        :href="
                          activeScript
                            ? `https://convertscript.test/api/v1/export/text/script/${activeScript.id}`
                            : '#'
                        "
                        target="_blank"
                        class="btn btn-export-all"
                      >
                        Export Script
                      </a>
                    </div>
                  </div>
                  <div class="content-display" v-if="activeScript">
                    <div
                      v-html="formatScript(activeScript.text)"
                    ></div>
                  </div>
                  <div v-else class="no-select">Select a Script to Preview</div>
                  <div class="section-footer">
                    <button
                      class="btn no-shadow btn-share"
                      v-b-modal.modal-send-script
                    >
                      <img
                        class="foot-icons"
                        src="@/assets/icons/convert-icon/send.svg"
                        alt=""
                      />
                    </button>
                    <button @click="copyText" class="btn no-shadow btn-copy">
                      <img
                        class="foot-icons"
                        src="@/assets/icons/convert-icon/copy.svg"
                        alt=""
                      />
                      Copy to clipboard
                    </button>
                    <textarea
                      type="hidden"
                      id="text--copy"
                      :value="
                        activeScript ? activeScript.text : ''
                      "
                    ></textarea>
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
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />

      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-edit-script')"
          class="close-modal"
          >Go back</b-button
        >
        <b-button @click="editScript(editId, content)" class="save-modal"
          >Save</b-button
        >
      </div>
    </b-modal>

    <b-modal
      :hide-header="true"
      id="modal-send-script"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <b-form-group label="Send to" label-for="pwd" label-class="form-label">
        <b-form-select
          class="input-table"
          v-model="sendValue"
          :options="sendOptions"
        ></b-form-select>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-send-script')"
          class="close-modal"
          >Close</b-button
        >
        <b-button class="save-modal">Send</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import DropdownTool from "@/components/DropdownTool";
import alertMixin from "@/mixins/alertMixin";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "Copies",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
    quillEditor,
  },
  directives: {
    nl2br: {
      componentUpdated(el) {
        // simplified example,
        // works only for nodes without any child elements
        el.innerHTML = el.textContent.replace(/\n/g, "<br />");
      },
    },
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      triggerEdit: false,
      isFavourite: false,
      scripts: [],
      content: "",
      editId: "",
      activeScript: null,
      sendValue: null,
      sendOptions: [],
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

  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/scripts",
          keyword: this.searchKey,
        })
        .then((res) => {
          this.searchResult = res.data.data;

          // console.log(res.data + "called now");
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          // // console.log(error);
          // this.error = error.response.data.errors.root;
          // // this.error = error;
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    abbrScript(text) {
      return text.slice(0, 125) + "...";
    },
    exportScripts() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("exportScripts")
        .then((res) => {
          // this.users = res.data.data;
          console.log(res.data.data);

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getScripts() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getGeneratedScripts")
        .then((res) => {
          this.scripts = res.data.data;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteScript(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteScript", id)
        .then((res) => {
          this.error = null;
          this.getScripts();
          console.log(res.data);
          this.makeToast("success", "Script deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
          // this.error = error;
        });

      // this.getCampaign();
    },
    editScript(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-campaign");
      this.$store
        .dispatch("editScript", {
          id: id,
          data: { content: this.content, script_type_id: id },
        })
        .then((res) => {
          this.error = null;
          console.log(res.data);
          this.getScripts();
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
    addRemoveScriptFavorite() {
      this.$store
        .dispatch("addRemoveFavorite", {
          script_response_id: this.activeScript.id,
        })
        .then((res) => {
          console.log(res.data.data.message);

          this.getScripts();
          this.makeToast("success", res.data.data.message);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
        });
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
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

    toggleFavourite() {
      if (this.activeScript) {
        this.isFavourite = !this.isFavourite;
        this.addRemoveScriptFavorite();
      }
    },
    setActiveScript(data) {
      this.activeScript = data;
      this.isFavourite = data.favorite;
    },
    copyText() {
      let testingCodeToCopy = document.querySelector("#text--copy");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        this.makeToast("success", "Script was copied " + msg);
      } catch (err) {
        alert("Oops, unable to copy");
        this.makeToast("danger", "Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    formatScript(text) {
      return text.replace(/\n/g, "<br />");
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    this.getScripts();
  },
};
</script>

<style>
.ql-container {
  height: 300px;
}

.control-modal-width {
  max-width: 598px !important;
}
</style>
