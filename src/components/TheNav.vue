<template>
  <div class="content-head" :class="removeContent ? 'fix-height' : ''">
    <div class="sidebar-toggler">
      <button @click="openSidebar" class="navbar-toggler" type="button" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <img class="side-logo" src="@/assets/image/Logo.svg" alt="logo" />

    </div>
    <div class="menu-section">
      <ul class="nav" :class="removeContent ? 'hide-content' : ''">
        <li class="nav-item d-none-mobile">
          <a class="nav-link" v-b-modal.modal-suggest href="#">
            Suggest Feature
          </a>
        </li>

        <li class="nav-item d-none-mobile">
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
        <li class="nav-item">
          <button class="btn no-shadow btn-toggle-dropdown" @click="toggleNav">
            <span class="dropdown-toggler-icon"></span>
            <Transition name="fade">
              <ul v-if="isToggled" class="nav close-click-outside nav-drop-mobile">
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
              </ul>
            </Transition>

          </button>
        </li>
      </ul>
    </div>

    <b-modal :hide-header="true" id="modal-suggest" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <div class="modal-head">
        <h3 class="title">Send Suggestion</h3>
        <p class="desc">
          Tell us about a feature you would love to have on Onecopy.ai
        </p>
      </div>

      <b-form-group>
        <b-form-textarea :class="{ 'is-invalid': submitted && $v.suggestion.message.$error }" id=""
          v-model="suggestion.message" type="text" class="input-table" rows="10">
        </b-form-textarea>
        <div v-if="submitted && $v.suggestion.message.$error" class="invalid-feedback">
          <span v-if="!$v.suggestion.message.required">* Can't Send an Empty Message</span>
        </div>
      </b-form-group>
      <p class="desc-message">
        This is not a support box. Messages from here goes to a no-reply email.
        If you send us a support message from here you will not get a reply.
      </p>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-suggest')" class="close-modal">Close</b-button>
        <b-button @click="addSuggestion($event)" class="save-modal">Submit</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import alertMixin from "@/mixins/alertMixin";
import $ from 'jquery';
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [alertMixin],
  name: "Nav",
  props: {
    // msg: String
    currentActive: String,
    removeContent: Boolean,
  },
  validations: {
    suggestion: {
      message: {
        required,
      },
    },
  },
  data() {
    return {
      widget: undefined,
      isToggled: false,
      suggestion: {
        parent_id: 1,
        message: "",
      },
      submitted: false,
    };
  },
  methods: {
    toggleNav() {
      this.isToggled = !this.isToggled;
    },
    addSuggestion(event) {

      event.preventDefault();

      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$store.commit("updateLoadState", true);
      // this.$bvModal.hide("modal-new-user");
      this.$store
        .dispatch("addSuggestion", this.suggestion)
        .then(() => {


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
    openSidebar() {
      this.$store.commit("updateSidebarState", true);
    }
  },
  mounted() {
    let $vm = this;
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

    document.addEventListener('mouseup', function (e) {
     
        var container = $(".close-click-outside");

      
        if ($vm.isToggled) {

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                //container.removeClass('show-visible');
                $vm.isToggled = false;
            }
        }
    });
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
  z-index: 1;
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
  font-size: 0.9rem;
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

.navbar-toggler-icon {
  padding: 0rem 0.75rem;
  background-image: url('https://mdbootstrap.com/img/svg/hamburger6.svg?color=000') !important;
}

.dropdown-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  content: "";
  background-image: url('https://mdbootstrap.com/img/svg/hamburger8.svg?color=000');
}

.btn-toggle-dropdown {
  position: relative;
}

.sidebar-toggler {
  display: none;
}

.sidebar-toggler .side-logo {
  width: 8rem;
}

.nav-drop-mobile {
  position: absolute;
  background-color: #ffffff;
  right: 13px;
  top: 140%;
  width: 9rem;
  box-shadow: -2px 2px 5px #0e0d0d38;
  padding: 0.5rem 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 1367px) {
  .menu-section .nav-link {
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 1024px) {
  .sidebar-toggler {
    display: flex;
  }
}

@media screen and (max-width: 480px) {
  .d-none-mobile {
    display: none;
  }
}
</style>