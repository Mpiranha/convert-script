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
          <a class="nav-link notification-icon" href="#">
            <i class="flaticon-bell icons head-icon"></i>
            <div class="nofi-anchor"></div>
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
      widget: undefined,
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
  mounted() {
    let notificationWidget = document.createElement("script");
    notificationWidget.setAttribute(
      "src",
      "https://cdn.headwayapp.co/widget.js"
    );
    notificationWidget.setAttribute("async", "true");
    document.head.appendChild(notificationWidget);

    let config = {
      selector: ".nofi-anchor", // CSS selector where to inject the badge
      account: "J4WWZ7",
      trigger: ".notification-icon",
      callbacks: {
        onWidgetReady: function (widget) {
          this.widget = widget;
        },
      },
    };

    const waitForHeadway = () => {
      if (window["Headway"]) {
        window.Headway.init(config);
      } else {
        setTimeout(() => waitForHeadway(), 100);
      }
    };
    waitForHeadway();
  },
};
</script>

<style>
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
.notification-icon {
  position: relative;
}
#HW_badge_cont {
  position: absolute !important;
  top: 0;
}

#HW_badge {
  background-color: transparent !important;
  font-size: 0;
  height: 11px;
  width: 11px;
  top: 15px;
  left: 9px;
}

#HW_badge.HW_visible {
background-color: #8338ec !important;
}

.HW_frame_cont {
  top: 70px !important;
}
@media (min-width: 1367px) {
  .menu-section .nav-link {
    font-size: 0.9rem;
  }
}
</style>