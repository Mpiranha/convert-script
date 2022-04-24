<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="campaign"
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
                mb-5
              "
            >
              <h6 class="title">{{ campaign.name }}</h6>

              <router-link
                class="btn btn-create"
                :to="{
                  name: 'CampaignScriptSelect',
                  params: { id: campaign.id },
                }"
              >
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
                      {{ campaign.scripts_count }}
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
                      <!-- <select class="sort-select" name="" id="">
                      <option value="none" selected>Export All</option>
                      <option value=""></option>
                      <option value=""></option>
                      <option value=""></option>
                    </select> -->
                      <a
                        @click="exportAllScripts($store.state.user.id)"
                        class="btn btn-export-all"
                      >
                        Export All
                      </a>
                    </div>
                  </div>
                  <div class="control-height">
                    <table class="table table-section script-table">
                      <tbody>
                        <tr
                          @click="setActiveScript(script)"
                          v-for="script in campaign.scripts"
                          :key="script.id"
                        >
                          <!-- <td scope="row">
                            <div class="control-order-tool">
                              <button class="btn mb-2">
                                <i
                                  class="flaticon-up-arrow icons icon-order"
                                ></i>
                              </button>
                              <button class="btn btn-down">
                                <i
                                  class="flaticon-up-arrow icons icon-order"
                                ></i>
                              </button>
                            </div>
                          </td> -->
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
                              delete-what="Script from this Campaign"
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
                <div class="col-6 h-100">
                  <div class="d-flex flex-column h-100">
                    <div class="section-head">
                      <button
                        v-b-modal.modal-add-campaign
                        class="
                          d-flex
                          align-items-center
                          no-shadow
                          btn btn-save-to
                        "
                      >
                        <img
                          src="@/assets/icons/convert-icon/save 1.svg"
                          alt=""
                          class="icon-save mr-2"
                        /><span> Save to </span>
                      </button>
                      <div class="section-head-right">
                        <!-- <select class="sort-select" name="" id="">
                        <option value="none" selected>Export Script</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select> -->
                        <button
                          @click="exportScript(activeScript.id)"
                          class="btn btn-export-all"
                        >
                          Export
                        </button>
                      </div>
                    </div>
                    <div class="content-display" v-if="activeScript">
                      <div v-html="formatScript(activeScript.text)"></div>
                    </div>
                    <div v-else class="no-select">
                      Select a Script to Preview
                    </div>
                    <div class="section-footer">
                      <!-- <button
                        class="btn no-shadow btn-share"
                        v-b-modal.modal-send-script
                      >
                        <img
                          class="foot-icons"
                          src="@/assets/icons/convert-icon/send.svg"
                          alt=""
                        />
                      </button> -->
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
                        :value="activeScript ? activeScript.text : ''"
                      ></textarea>
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
          >Save to</b-button
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
        <b-button @click="saveToCampaign" class="save-modal">Add</b-button>
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
  name: "CampaignScript",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
    quillEditor,
  },
  data() {
    return {
      selectedCampaign: null,
      campaignOptions: [{ value: null, text: "Select a Campaign" }],
      searchKey: "",
      searchResult: [],
      sendOptions: [{ value: null, text: "Select Plans" }],
      campaign: [],
      content: "",
      activeScript: null,
      sendLocation: "",
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
    saveToCampaign() {
      this.$bvModal.hide("modal-add-campaign");
      this.editScript(
        this.activeScript.id,
        this.selectedCampaign,
        this.activeScript.text
      );
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
    exportAllScripts(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("exportAllCampaignScripts", id)
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
    getCampaignData(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getOneCampaign", id)
        .then((res) => {
          this.campaign = res.data.data;

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
          this.getCampaignData(this.$route.params.id);
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
    editScript(id, campaignId, txt) {
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
          this.getCampaignData(this.$route.params.id);
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
    setActiveScript(data) {
      this.activeScript = data;
    },
    openEditModal(id, data) {
      this.$bvModal.show("modal-edit-script");
      // this.triggerEdit = true;
      this.$store.commit("triggerEdit", {
        editStatus: true,
        id: id,
      });
      this.content = data;
      // this.editId = id;
      // this.campaignName = data;
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
  mounted() {
    this.getCampaign();
    this.getCampaignData(this.$route.params.id);
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style>
</style>
