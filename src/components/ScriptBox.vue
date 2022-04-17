<template>
  <div class="script-content-wrap">
    <div class="box-head">
      <div class="left-section">
        <button
          @click="saveAction"
          class="d-flex align-items-center no-shadow btn btn-save-to"
        >
          <img
            class="icon-save"
            src="@/assets/icons/convert-icon/save 1.svg"
            alt=""
          />
          <span> Save to </span>
        </button>
      </div>
      <div class="right-section">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <div class="fav-star" @click="toggleFavourite">
              <img
                v-if="isFavourite"
                class="icon-fav"
                src="@/assets/icons/convert-icon/star.png"
                alt=""
              />
              <img
                v-else
                class="icon-fav"
                src="@/assets/icons/convert-icon/my Favourites.svg"
                alt=""
              />
            </div>
            <a class="export-link" target="_blank" :href="exportLink">Export</a>
          </div>
        </div>
      </div>
    </div>
    <div class="script-content" v-nl2br>
      {{ scriptContent }}
    </div>

    <div class="script-footer">
      <!-- <button @click="editAction" class="btn no-shadow btn-share">
        <img
          class="foot-icons"
          src="@/assets/icons/convert-icon/draw.svg"
          alt=""
        />
      </button> -->
      <button @click="copyText" class="btn no-shadow ml-auto btn-copy">
        <img
          class="foot-icons"
          src="@/assets/icons/convert-icon/copy.svg"
          alt=""
        />
      </button>
      <textarea
        ref="input"
        type="hidden"
        id="text--copy"
        class="text--copy"
        :value="scriptContentRaw ? scriptContentRaw : ''"
      ></textarea>
    </div>
  </div>
</template>

<script>
import alertMixin from "@/mixins/alertMixin";
export default {
  name: "ScriptBox",
  mixins: [alertMixin],
  props: {
    scriptContent: {
      type: String,
      required: true,
    },
    scriptContentRaw: {
      type: String,
      required: true,
    },
    exportLink: {
      type: String,
      required: true,
    },
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
    };
  },
  methods: {
    copyText() {
      console.log(this.$refs.input.value);
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
  },
};
</script>

<style scoped>
.script-content-wrap {
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
  font-size: 1.1rem;
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