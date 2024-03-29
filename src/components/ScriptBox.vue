<template>
  <div v-if="isEdit">

    <div class="editor-outter">
      <loader-modal :loading-state="loading" class="script-loader"></loader-modal>
      <quill-editor ref="myQuillEditor" class="mb-3 script-editor" v-model="content" :options="editorOption"
        @ready="onReadyFocus">

      </quill-editor>
      <div class="d-flex justify-content-end px-3 pt-1 pb-4">
        <b-button class="close-modal" @click="closeEdit">Close</b-button>
        <b-button class="save-modal" @click="editScript(id, content)">Save</b-button>
      </div>
    </div>
  </div>
  <div v-else class="script-content-wrap">

    <div class="box-head">
      <div class="left-section">
        <button @click="saveAction" class="d-flex align-items-center no-shadow btn btn-save-to">
          <img class="icon-save" src="@/assets/icons/convert-icon/save 1.svg" alt="save icon" />
          <span> Save to </span>
        </button>
      </div>
      <div class="right-section">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <div class="fav-star" @click="toggleFavourite">
              <img v-if="isFavourite" class="icon-fav" src="@/assets/icons/convert-icon/star.png" alt="" />
              <img v-else class="icon-fav" src="@/assets/icons/convert-icon/my Favourites.svg" alt="" />
            </div>
            <a href="#" @click="exportAction($event)" class="export-link">Export</a>
          </div>
        </div>
      </div>
    </div>
    <div class="script-content" v-nl2br>
      {{ scriptContent }}
    </div>

    <div class="script-footer">
      <button @click="toggleEdit" class="btn no-shadow btn-share">
        <img class="foot-icons" src="@/assets/icons/convert-icon/draw.svg" alt="edit icon" />
      </button>
      <button @click="copyText" class="btn no-shadow ml-auto btn-copy">
        <img class="foot-icons" src="@/assets/icons/convert-icon/copy.svg" alt="copy icon" />
      </button>
      <textarea ref="input" type="hidden" id="text--copy" class="text--copy"
        :value="scriptContentRaw ? scriptContentRaw : ''"></textarea>
    </div>
  </div>

</template>

<script>
import alertMixin from "@/mixins/alertMixin";
// import Quill from 'quill';
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// import * as Emoji from "quill-emoji";
// import 'quill-emoji/dist/quill-emoji.css'

// Quill.register("modules/emoji", Emoji);
export default {
  name: "ScriptBox",
  mixins: [alertMixin],
  components: {
    quillEditor
  },
  props: {
    scriptContent: {
      type: String,
      required: true,
    },
    scriptContentRaw: {
      type: String,
      required: true,
    },
    id: Number,

  },
  created() {
    let fontawesome = document.createElement("link");
    fontawesome.setAttribute("href", "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css");
    fontawesome.setAttribute("rel", "stylesheet");
    document.head.appendChild(fontawesome)
  },
  directives: {
    nl2br: {
      inserted(el) {
        // simplified example,
        // works only for nodes without any child elements
        el.innerHTML = el.textContent.replace(/\n/g, "<br />");
      },
    },
  },

  data() {
    return {
      isFavourite: false,
      isEdit: false,
      loading: false,
      content: '',
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: {
            container: [
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
    editScript(id, txt, campaignId) {
      this.loading = true;

      this.$store
        .dispatch("editScript", {
          id: id,
          data: campaignId
            ? { campaign_id: 1, text: txt, workspace_id: this.workspace_id }
            : { text: this.content, workspace_id: this.workspace_id },
        })
        .then(() => {
          this.error = null;
          this.isEdit = false;

          if (campaignId) {
            this.selectedCampaign = null;
            this.$emit("script-edited", this.content);
            this.makeToast("success", "Script added to campaign successfully");
          } else {
            this.$emit("script-edited", this.content);
            this.makeToast("success", "Script edited successfully");
          }
          this.loading = false;
        })
        .catch((error) => {
      //    console.log(error);
          this.error = error.response.data.message;
          this.loading = false;
          this.makeToast("danger", this.error);
          // this.error = error;
        });
    },
    copyText() {
      //console.log(this.$refs.input.value);
      let testingCodeToCopy = this.$refs.input;
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
    toggleFavourite() {
      this.isFavourite = !this.isFavourite;
      this.$emit("favorite-clicked");
    },
    editAction() {
      this.$emit("edit-clicked");
    },
    copyAction() {
      this.$emit("copy-clicked");
    },
    saveAction() {
      this.$emit("save-clicked");
    },
    exportAction(e) {
      e.preventDefault();
      this.$emit("export-clicked");
    },
    toggleEdit() {
      this.isEdit = true;
      this.content = this.scriptContent;
    },
    onReadyFocus(editor) {
      editor.container.scrollIntoView();
    }
  },
};
</script>

<style>
.editor-outter {
  position: relative;
  border-bottom: 1px solid #f6f6f6;
  border-right: 1px solid #f6f6f6;
  border-left: 1px solid #f6f6f6;
}

.ql-toolbar.ql-snow {
  border: 1px solid #f6f6f6;
}

.ql-container.ql-snow {
  border-bottom: 0;
  border-right: 0;
  border-left: 0;
}

.script-loader {
  position: absolute !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  background: #fff !important;
}

.script-loader .loader-img {
  width: 2rem !important;
}

.script-editor .ql-container {
  height: 200px !important;
}
</style>

<style scoped>
.script-content-wrap {
  position: relative;
  color: #5f6f7f;
  /* border-top: 2px solid #f6f8f9; */
  /* border-left: 2px solid #f6f8f9; */
  border-bottom: 2px solid #f6f8f9;
  padding: 1rem 1rem 0.5rem 1rem;
}

.export-link {
  margin-bottom: -0.1rem;

}

.box-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.7rem;
  align-items: center;
}

.box-head .icon-save,
.box-head .icon-fav {
  width: 1rem;
}

.box-head .icon-save {
  margin-right: 0.3rem;
  width: 1.1rem;
}

.box-head a {
  color: inherit;
  text-decoration: none;
}

/* .box-head .icon-fav {
  margin-right: 1rem;
} */

.script-content-wrap .script-content {
  color: #000000;
  font-size: 1.3rem;
  margin-bottom: 1.3rem;
  line-height: 1.6;
  text-align: left;
}

.script-footer {
  display: flex;
  justify-content: space-between;
}

.script-footer .btn {
  padding: 0;
}

.script-footer .foot-icons {
  width: 1rem;
}

.btn-save-to {
  color: inherit;
  font-size: inherit;
}

.btn-save-to:hover {
  color: inherit;
}
</style>