<template>
  <div class="content-head" :class="removeContent ? 'fix-height' : ''">
    <div class="menu-section">
      <ul class="nav" :class="removeContent ? 'hide-content' : ''">
        <li class="nav-item">
          <a class="nav-link" v-b-modal.modal-suggest href="#">
            Suggest Feature
          </a>
        </li>
       
        <li class="nav-item">
          <a class="nav-link" href="https://support.onecopy.ai" target="_blank">
            Support
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="flaticon-bell icons head-icon"></i>
          </a>
        </li>
      </ul>
    </div>

    <b-modal
      :hide-header="true"
      id="modal-suggest"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <div class="modal-head">
        <h3 class="title">Send Suggestion</h3>
        <p class="desc">
          Tell us about a feature you would love to have on Onecopy.ai
        </p>
      </div>

      <b-form-group>
        <b-form-textarea
          id="name"
          v-model="suggestion.message"
          type="text"
          class="input-table"
          rows="10"
        >
        </b-form-textarea>
      </b-form-group>
      <p class="desc-message">
        This is not a support box. Messages from here goes to a no-reply email.
        If you send us a support message from here you will not get a reply.
      </p>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-suggest')" class="close-modal"
          >Close</b-button
        >
        <b-button @click="addSuggestion" class="save-modal">Submit</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import alertMixin from "@/mixins/alertMixin";
export default {
  mixins: [alertMixin],
  name: "Nav",
  props: {
    // msg: String
    currentActive: String,
    removeContent: Boolean,
  },
  data() {
    return {
      suggestion: {
        parent_id: 1,
        message: "",
      },
    };
  },
  methods: {
    addSuggestion() {
      this.$store.commit("updateLoadState", true);
      // this.$bvModal.hide("modal-new-user");
      this.$store
        .dispatch("addSuggestion", this.suggestion)
        .then((res) => {
          console.log(res);

          this.suggestion = {
            parent_id: 1,
            message: "",
          };
          this.$bvModal.hide("modal-suggest");
          this.makeToast("success", "Submitted Successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.content-head {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0.7rem 0.7rem;
  box-shadow: 1px 1px 3px #a69f9f;
  position: relative;
}

.content-head .menu-section {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.menu-section .nav-link {
  padding: 0.5rem 0.8rem;
  color: #566677;
  font-size: 0.8rem;
}

.menu-section .nav-link.active {
  color: #8338ec;
}

.menu-section .nav-link .head-icon::before {
  font-size: 1rem;
  font-weight: bold;
  color: #000;
}

.desc-message {
  color: #566677;
  font-size: 0.8rem;
}

.hide-content {
  display: none !important;
}

.fix-height {
  min-height: 60px;
}

@media (min-width: 1367px) {
  .menu-section .nav-link {
    font-size: 0.9rem;
  }
}
</style>