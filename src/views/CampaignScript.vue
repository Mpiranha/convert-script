<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading" class="fullscreen-loader"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar class="always-hidden" dismiss-class="permanent-dismiss" :user-name="this.$store.state.user.first_name"
        current-active="campaign"></sidebar>
      <div class="content-section">
        <navbar :script-type-name="campaign.name" logo-link-class="hide-logo" toggle-class="permanent-toggler">
          <template v-slot:create-btn>
            <router-link class="btn btn-create btn-new-copy" :to="{
              name: 'CampaignScriptSelect',
              params: { id: campaign.id },
            }">
              <span>+</span>
              New Copy
            </router-link>
          </template>
        </navbar>
        <div class="scroll-content script-content-fs">
          <div class="container-fluid pt-3">
            <div class="content-wrap script-custom-height">
              <div class="row h-100">
                <div class="col-12 col-lg-4 h-100 bordered-right pr-lg-0">
                  <div class="section-head">
                    <div class="section-head-left">
                      <img class="section-head-icon" src="@/assets/icons/convert-icon/All script.svg" alt="" />
                      {{ campaign.scripts_count }}
                    </div>
                    <div class="search-form">
                      <button class="btn search-btn">
                        <i class="flaticon-loupe icons"></i>
                      </button>
                      <input @input="searchKeyWord" v-model="searchKey" class="form-control no-shadow search-input"
                        type="text" placeholder="Search" />
                    </div>
                    <div class="section-head-right">

                      <a @click="exportAllScripts($store.state.user.id)" class="btn btn-export-all">
                        Export All
                      </a>
                    </div>
                  </div>
                  <div class="control-height" @scroll="infiniteScroll($event)">
                    <div v-if="campaign.scripts_count === 0" class="no-data-info">
                      Created Copies will display here.
                    </div>
                    <div v-else class="responsive-table">
                      <table class="table table-section script-table">
                        <tbody v-if="searchResult.length > 0">
                          <tr v-for="script in searchResult" :key="script.id"
                            :class="activeScript ? script.id == activeScript.id ? 'active' : '' : ''">

                            <td @click="setActiveScript(script)">
                              <div class="script-type">
                                {{ script.name }}
                              </div>
                              <div class="script-content">
                                {{ removeTags(abbrScript(script.text)) }}
                              </div>
                            </td>
                            <td class="text-right">
                              <dropdown-tool :no-edit="true" delete-what="Script from this Campaign"
                                @delete-proceed="deleteScript(script.id)">
                              </dropdown-tool>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else-if="campaign.scripts && searchKey.length < 1">
                          <tr v-for="script in campaign.scripts" :key="script.id"
                            :class="activeScript ? script.id == activeScript.id ? 'active' : '' : ''">

                            <td @click="setActiveScript(script)">
                              <div class="script-type">
                                {{ script.name }}
                              </div>
                              <div class="script-content">
                                {{ removeTags(abbrScript(script.text)) }}
                              </div>
                            </td>
                            <td class="text-right">
                              <dropdown-tool :no-edit="true" delete-what="Script from this Campaign"
                                @delete-proceed="deleteScript(script.id)">
                              </dropdown-tool>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <loader-modal :loading-state="nextLoading" class="next-loader"></loader-modal>
                    </div>
                  </div>
                </div>
                <div class="col-lg-8 d-none d-lg-block h-100">
                  <div v-if="isEdit" class="h-100">

                    <div class="editor-outter h-100">
                      <loader-modal :loading-state="loading" class="script-loader"></loader-modal>
                      <quill-editor ref="myQuillEditor" class="mb-3 script-editor-bg" v-model="content"
                        :options="editorOption">

                      </quill-editor>
                      <div class="d-flex justify-content-start px-3 pt-1 pb-4">
                        <b-button class="close-modal" @click="closeEdit">Close</b-button>
                        <b-button class="save-modal" @click="editScript(editId, content)">Save</b-button>
                      </div>
                    </div>
                  </div>
                  <div v-else class="d-flex flex-column h-100">
                    <div class="section-head" v-if="activeScript">
                      <button v-b-modal.modal-add-campaign class="
                                  d-flex
                                  align-items-center
                                  no-shadow
                                  btn btn-save-to
                                ">
                        <img src="@/assets/icons/convert-icon/save 1.svg" alt="" class="icon-save mr-2" /><span> Save to
                        </span>
                      </button>
                      <div class="section-head-right">

                        <button @click="exportScript(activeScript.id)" class="btn btn-export-all">
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
                      <button v-if="activeScript" @click="toggleEdit(activeScript.id, formatScript(activeScript.text))"
                        class="btn no-shadow btn-share">
                        <img class="foot-icons" src="@/assets/icons/convert-icon/draw.svg" alt="edit icon" />
                        Edit
                      </button>
                      <button v-if="activeScript" @click="copyText" class="btn no-shadow btn-copy">
                        <img class="foot-icons" src="@/assets/icons/convert-icon/copy.svg" alt="" />
                        Copy to clipboard
                      </button>
                      <textarea type="hidden" id="text--copy" :value="activeScript ? activeScript.text : ''"></textarea>
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
        <b-button @click="editScript(editId, content)" class="save-modal">Save to</b-button>
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

    <b-modal :hide-header="true" id="modal-view-script" centered size="md" :hide-footer="true" content-class="modal-main">
      <div v-if="isEdit" class="h-100">

        <div class="editor-outter h-100">
          <loader-modal :loading-state="loading" class="script-loader"></loader-modal>
          <quill-editor ref="myQuillEditor" class="mb-3 script-editor-bg" v-model="content" :options="editorOption">

          </quill-editor>
          <div class="d-flex justify-content-start px-3 pt-1 pb-4">
            <b-button class="close-modal" @click="closeEdit">Close</b-button>
            <b-button class="save-modal" @click="editScript(editId, content)">Save</b-button>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-12 h-100">
          <div class="d-flex flex-column m-min-height">
            <div class="section-head">
              <button v-b-modal.modal-add-campaign class="
                      d-flex
                      align-items-center
                      no-shadow
                      btn btn-save-to
                    ">
                <img src="@/assets/icons/convert-icon/save 1.svg" alt="" class="icon-save mr-2" /><span> Save to
                </span>
              </button>
              <div class="ml-auto d-flex align-items-center">

                <button @click="exportScript(activeScript.id)" target="_blank" class="btn btn-export-all">
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

              <button v-if="activeScript" @click="toggleEdit(activeScript.id, formatScript(activeScript.text))"
                class="btn no-shadow btn-share">
                <img class="foot-icons" src="@/assets/icons/convert-icon/draw.svg" alt="edit icon" />
                Edit
              </button>
              <button @click="copyText" class="btn no-shadow btn-copy">
                <img class="foot-icons" src="@/assets/icons/convert-icon/copy.svg" alt="" />
                Copy to clipboard
              </button>
              <b-button @click="$bvModal.hide('modal-view-script')" class="close-modal ml-auto">Close</b-button>
              <textarea type="hidden" id="text--copy" :value="activeScript ? activeScript.text : ''"></textarea>
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
      workspace_id: this.$store.state.user.default_workspace_id,
      isEdit: false,
      loading: false,
      nextLoading: false,
      selectedCampaign: null,
      perPage: 15,
      currentPage: 1,
      maxPage: 1,
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
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline"], // toggled buttons
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            ],
          },
        },
      },
    };
  },
  methods: {
    closeEdit() {
      this.isEdit = false;
    },
    toggleEdit(id, data) {
      this.isEdit = true;
      this.editId = id;
      this.content = data;
    },
    saveToCampaign() {
      this.$bvModal.hide("modal-add-campaign");
      if (!this.activeScript) {
        this.makeToast("danger", "Not saved, Please select a copy");
        return;
      }
      if (this.selectedCampaign == null) {
        this.makeToast("danger", "Not saved, Please select a campaign");
        return;
      }
      this.editScript(
        this.activeScript.id,
        this.activeScript.text,
        this.selectedCampaign
      );
    },
    getCampaign() {
      // this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getCampaigns", this.workspace_id)
        .then((res) => {
          let data = res.data.data;
          for (let index = 0; index < data.length; index++) {
            this.campaignOptions.push({
              value: data[index].id,
              text: data[index].name,
            });
          }

          // this.$store.commit("updateLoadState", false);
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
          endpoint: `/api/v1/scripts/${this.workspace_id}`,
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
    removeTags(str) {
      if ((str === null) || (str === ''))
        return false;
      else
        str = str.toString();

      // Regular expression to identify HTML tags in 
      // the input string. Replacing the identified 
      // HTML tag with a null string.
      return str.replace(/(<([^>]+)>)/ig, '');
    },
    exportAllScripts(id) {

      this.$store
        .dispatch("exportAllCampaignScripts", id)
        .then((res) => {
          // this.users = res.data.data;
        //  console.log(res);

          var a = document.createElement("a");
          document.body.appendChild(a);
          //a.style = "display: none";
          var url = res.config.url;

          a.href = url;
          a.download = true;
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);


        })
        .catch((error) => {
          this.error = error.response.data.error;
          for (const key in this.error) {
            if (Object.hasOwnProperty.call(this.error, key)) {
              this.makeToast("danger", this.error[key]);
            }
          }

        });
    },
    getCampaignData(id, noload, next) {
      if (!noload) {
        this.$store.commit("updateLoadState", true);
      }
      this.nextLoading = next ? true : false;
      this.$store
        .dispatch("getOneCampaign", {
          id: id, page: {
            number: this.currentPage,
            perPage: this.perPage,

          },
          workspace_id: this.workspace_id
        })
        .then((res) => {
          if (next) {
            this.nextLoading = false;
            this.campaign.scripts = this.campaign.scripts.concat(res.data.data[0].scripts)
          } else {
            this.campaign = res.data.data[0];
            this.maxPage = Math.ceil(res.data.data[0].scripts_count / this.perPage);

          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.error = error.response.data.error;
          for (const key in this.error) {
            if (Object.hasOwnProperty.call(this.error, key)) {
              this.makeToast("danger", this.error[key]);
            }
          }
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteScript(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteScript", { id: id, workspace_id: this.workspace_id })
        .then(() => {
          this.error = null;
          this.getCampaignData(this.$route.params.id);
        //  console.log(res.data);
          this.makeToast("success", "Script deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.error = error.response.data.error;
          for (const key in this.error) {
            if (Object.hasOwnProperty.call(this.error, key)) {
              this.makeToast("danger", this.error[key]);
            }
          }
          this.$store.commit("updateLoadState", false);
          // this.error = error;
        });

      // this.getCampaign();
    },
    editScript(id, txt, campaignId) {
      this.loading = true;
      this.$bvModal.hide("modal-edit-script");
      this.$store
        .dispatch("editScript", {
          id: id,
          data: campaignId
            ? { campaign_id: campaignId, text: txt, workspace_id: this.workspace_id }
            : { text: this.content, workspace_id: this.workspace_id },
        })
        .then(() => {
          this.error = null;
          this.isEdit = false;
          this.activeScript.text = txt;
          this.getCampaignData(this.$route.params.id, true);
          if (campaignId) {
            this.selectedCampaign = null;
            this.makeToast("success", "Script added to campaign successfully");
          } else {
            this.makeToast("success", "Script edited successfully");
          }
          this.loading = false;
        })
        .catch((error) => {
         
          this.error = error.response.data.data.error;
          this.loading = false;
          this.makeToast("danger", this.error);
          // this.error = error;
        });
    },
    exportScript(id) {

      this.$store
        .dispatch("exportOneScript", id)
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


        })
        .catch((error) => {
          console.log(error);

        });
    },
    setActiveScript(data) {
      if (this.isEdit) {
        let ans = confirm("Unsaved data will be lost!");

        if (!ans) {
          return
        }
      }
      this.isEdit = false;
      const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width <= 991) {
        this.$bvModal.show("modal-view-script");
      }
      this.activeScript = data;
    },
    openEditModal(id, data) {
      this.$bvModal.show("modal-edit-script");
      // this.triggerEdit = true;
      this.$store.commit("triggerEdit", {
        editStatus: true,
        id: id,
      });
      this.content = this.formatScript(data);
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
    infiniteScroll(event) {
      let heightOfWindow = event.target.scrollHeight - event.target.offsetHeight;
      let bottomOfWindow = Math.round(event.target.scrollTop) >= heightOfWindow;
      // console.log("scroll height " + event.target.scrollHeight)
      // console.log("scroll top " + event.target.scrollTop);
      // console.log("inner height " + event.target.children[0].offsetHeight);
      // console.log("height " + event.target.offsetHeight);
      // console.log("height " + heightOfWindow);

      // console.log("is bottom of window " + bottomOfWindow);
      if (bottomOfWindow && this.currentPage < this.maxPage) {
        // ...
        this.currentPage++;
        this.getCampaignData(this.$route.params.id, true, true);

      }
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

<style></style>
