<template>
  <div class="container-fluid px-0">
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
            <h6 class="title">All Script</h6>

            <router-link class="btn btn-create" to="/script/select">
              <span>+</span>
              Add Scripts
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
                    5
                  </div>
                  <div class="section-head-right">
                    <button class="btn btn-export-all">Export All</button>
                  </div>
                </div>
                <div class="control-height">
                  <table class="table table-section">
                    <tbody>
                      <tr>
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
                        <td>Script Summary 1</td>
                        <td>
                          <div class="script-type">Video Script</div>
                        </td>
                        <td class="text-right">
                          <dropdown-tool
                            @edit-clicked="openEditModal('', '')"
                            @delete-proceed="deleteCampaign('')"
                          >
                          </dropdown-tool>
                        </td>
                      </tr>
                      <tr>
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
                        <td>Script Summary 1</td>
                        <td>
                          <div class="script-type">Video Script</div>
                        </td>
                        <td class="text-right">
                          <dropdown-tool
                            @edit-clicked="openEditModal('', '')"
                            @delete-proceed="deleteCampaign('')"
                          >
                          </dropdown-tool>
                        </td>
                      </tr>
                      <tr>
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
                        <td>Script Summary 1</td>
                        <td>
                          <div class="script-type">Video Script</div>
                        </td>
                        <td class="text-right">
                          <dropdown-tool> </dropdown-tool>
                        </td>
                      </tr>
                      <tr>
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
                        <td>Script Summary 1</td>
                        <td>
                          <div class="script-type">Video Script</div>
                        </td>
                        <td class="text-right">
                          <dropdown-tool> </dropdown-tool>
                        </td>
                      </tr>
                      <tr>
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
                        <td>Script Summary 1</td>
                        <td>
                          <div class="script-type">Video Script</div>
                        </td>
                        <td class="text-right">
                          <dropdown-tool> </dropdown-tool>
                        </td>
                      </tr>
                      <tr>
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
                        <td>Script Summary 1</td>
                        <td>
                          <div class="script-type">Video Script</div>
                        </td>
                        <td class="text-right">
                          <dropdown-tool> </dropdown-tool>
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
                      <div class="fav-star">
                        <img
                          class="fav-icon"
                          src="@/assets/icons/convert-icon/my Favourites.svg"
                          alt=""
                        />
                      </div>
                      <select class="sort-select" name="" id="">
                        <option value="none" selected>Export Script</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                  </div>
                  <div class="content-display">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </div>
                  <div class="section-footer">
                    <button class="btn no-shadow btn-share">
                      <img
                        class="foot-icons"
                        src="@/assets/icons/convert-icon/send.svg"
                        alt=""
                      />
                    </button>
                    <button class="btn no-shadow btn-copy">
                      <img
                        class="foot-icons"
                        src="@/assets/icons/convert-icon/copy.svg"
                        alt=""
                      />
                      Copy to clipboard
                    </button>
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
        <b-button class="save-modal">Save to</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import DropdownTool from "@/components/DropdownTool";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
    quillEditor,
  },
  data() {
    return {
      campaignName: "",
      accessOptions: [{ value: null, text: "Select Plans" }],
      content: "",
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
    openEditModal(id) {
      this.$bvModal.show("modal-edit-script");
      // this.triggerEdit = true;
      this.$store.commit("triggerEdit", {
        editStatus: true,
        id: id,
      });
      // this.editId = id;
      // this.campaignName = data;
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
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
