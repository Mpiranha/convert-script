<template>
  <div class="content-head" :class="removeContent ? 'fix-height' : ''">
    <div class="sidebar-toggler" :class="toggleClass">
      <button @click="openSidebar" class="navbar-toggler" type="button" aria-expanded="false"
        aria-label="Toggle navigation">
        <!-- <span class="navbar-toggler-icon"></span> -->
        <div class="aux-burger aux-lite-small"><span class="mid-line"></span></div>
      </button>

      <router-link to="/" :class="logoLinkClass">
        <img class="side-logo" src="@/assets/image/Logo.svg" alt="logo" />
      </router-link>
      <div class="
      dashboard-top
      d-flex
      justify-content-between
      align-items-center
      my-0
    ">
        <h6 class="title mb-0">
          <img v-if="scriptTypeIcon" class="script-type-icon" :src="scriptTypeIcon" alt="" />
          {{ scriptTypeName }}
        </h6>
        <slot></slot>
      </div>

    </div>
    <div class="menu-section">
      <div class="workspace_ps_relative" :class="removeContent ? 'hide-content' : ''">
        <div class="workspace-input_custom" @click="isOpen = !isOpen">
          <span class="selected_workspace">{{ this.$store.state.user.default_workspace ?
            this.$store.state.user.default_workspace.name : 'Choose Workspace' }} </span>
          <img class="collapse-icon_workspace" src="@/assets/icons/down.png" alt="up icon">
        </div>


        <div v-if="isOpen" class="workspace_items_wrap close-click-outside">
          <ul class="nav">
            <li v-if="this.$store.state.user.default_workspace" class="cur_active"> {{ this.$store.state.user.default_workspace.name }}
              <img src="@/assets/icons/check-mark 1.svg" alt="check mark">
            </li>
            <li v-for="workspace in firstTwoWorkspaces" :key="workspace.id" @click="setDefaultWorkspace(workspace.id)">
              {{ workspace.name }}
            </li>
          </ul>
          <div class="workspace_item_footer">
            <router-link class="btn btn_view_all" to="/workspace">
              View All

              <img src="@/assets/icons/hamburger_icon.svg" alt="view all workspace">
            </router-link>
          </div>
        </div>
      </div>
      <slot name="create-btn"></slot>
      <ul class="nav align-items-center" :class="removeContent ? 'hide-content' : ''">
        <li class="nav-item d-none-mobile">
          <a class="nav-link" target="_blank" href="http://go.onecopy.ai/suggestions">
            Suggest Feature
          </a>
        </li>

        <li class="nav-item d-none-mobile">
          <a class="nav-link" href="https://onecopy.ai/help/" target="_blank">
            Help & Support
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link notification-icon" href="#">
            <i class="flaticon-bell icons head-icon"></i>
            <div class="nofi-anchor"></div>
          </a>
        </li>
        <li class="nav-item mobile-toggler-right">
          <button class="btn no-shadow btn-toggle-dropdown" @click="toggleNav">
            <span class="dropdown-toggler-icon"></span>
            <Transition name="fade">
              <ul v-if="isToggled" class="nav close-click-outside nav-drop-mobile">
                <li class="nav-item">
                  <a class="nav-link" target="_blank" href="http://go.onecopy.ai/suggestions">
                    Suggest Feature
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="https://onecopy.ai/help/" target="_blank">
                    Help & Support
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
    toggleClass: String,
    scriptTypeIcon: String,
    scriptTypeName: String,
    logoLinkClass: String
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
      isOpen: false,
      widget: undefined,
      isToggled: false,
      suggestion: {
        parent_id: 1,
        message: "",
      },
      workspaces: [],

      submitted: false,
    };
  },
  methods: {
    getWorkspaces() {
      // this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getWorkspaces")
        .then((res) => {

          this.workspaces = res.data.response.data;
          //this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          console.log(error);
          //this.$store.commit("updateLoadState", false);
        });
    },
    toggleNav() {
      this.isToggled = !this.isToggled;
    },
    setDefaultWorkspace(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("addDefaultWorkspace", {
          workspace_id: id
        })
        .then(() => {
          this.isOpen = false;
          this.error = null;
          window.location.reload();
          this.makeToast("success", "Workspace successfully set as Default");
          // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
         // console.log(error);
          this.error = error.response.data.message;
          this.$store.commit("updateLoadState", false);
          this.makeToast("danger", this.error);

        });
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
         // console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    openSidebar() {
      this.$store.commit("updateSidebarState", true);
    }
  },
  computed: {
    firstTwoWorkspaces() {
      return this.workspaces.filter((workspace, indx) => workspace.id != this.$store.state.user.default_workspace_id && indx < 6);
    },
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

        if ($('.btn-toggle-dropdown').has(e.target).length > 0 || $('.btn-toggle-dropdown').is(e.target)) {
          return;
        }

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          //container.removeClass('show-visible');
          $vm.isToggled = false;
        }
      }

      if ($vm.isOpen) {

        if ($('.workspace-input_custom').has(e.target).length > 0 || $('.workspace-input_custom').is(e.target)) {
          return;
        }

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          //container.removeClass('show-visible');
          $vm.isOpen = false;
        }
      }
    });
    this.getWorkspaces();
  },
};
</script>

<style>
.content-head {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0.7rem 0.7rem;
  /*box-shadow: 1px 1px 3px #a69f9f; */
  border-bottom: 1px solid #e8e9e9;
  z-index: 1022;
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
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  display: inline-table;
  vertical-align: bottom;
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
  width: 1.7em;
  height: 1.7em;
  vertical-align: middle;
  content: "";
  background-image: url('https://mdbootstrap.com/img/svg/hamburger8.svg?color=000');
}

.btn-toggle-dropdown {
  position: relative;
}

.mobile-toggler-right {
  display: none;
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

.aux-burger {
  position: relative;
  cursor: pointer;
}

.aux-burger[class*="small"] {
  width: 20px;
}

.aux-burger .mid-line {
  border-color: #222534 !important;
}

.aux-burger[class*="lite"] .mid-line,
.aux-burger[class*="lite"]::before,
.aux-burger[class*="lite"]::after {
  border-width: 1px;
}

.aux-burger::before {
  /*border-top: solid;*/
  border-bottom: none;
  border-color: #222;
  transform-origin: 0 0%;
}

.aux-burger .mid-line,
.aux-burger::before,
.aux-burger::after {
  width: 100%;
  content: "";
  display: block;
  border-bottom: solid;
  box-sizing: border-box;
  border-color: #222;
  transition: all 300ms;
}

.aux-burger.aux-lite-small .mid-line {
  margin: 8.5px 0;
}

.aux-burger[class*="lite"] .mid-line,
.aux-burger[class*="lite"]::before,
.aux-burger[class*="lite"]::after {
  border-width: 1px;
}

.workspace-input_custom {
  display: flex;
  align-items: center;
  border: 1px solid rgb(158 161 164);
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
  cursor: pointer;
  min-width: 182px;
  margin-right: 1rem;
}

.selected_workspace {
  font-size: 0.9rem;

}

.cur_active {
  display: flex;
  align-items: center;
}

.cur_active img {
  margin-left: auto;
  width: 1rem;
}

.workspace_ps_relative {
  position: relative;
}

.workspace_items_wrap {
  position: absolute;
  width: 100%;
  top: 126%;
  box-shadow: -1px -1px 7px #5151541f, 1px 1px 7px #5151541f;
  background-color: #ffffff;
  border-radius: 0.3rem;
}

.workspace_items_wrap .nav {
  flex-direction: column;
  padding: 0.7rem 0.7rem 0 0.7rem;
}

.workspace_items_wrap .nav li {
  font-size: 0.9rem;
  margin-bottom: .8rem;

}

.workspace_items_wrap .nav li:not(:first-child) {
  cursor: pointer;
}

.collapse-icon_workspace {
  width: 1.6rem;
  margin-left: auto;
}

.workspace_item_footer {
  border-top: 1px solid #E5E5E5;
}

.btn_view_all {
  width: 100%;
  display: flex !important;
  align-items: center;
  font-size: 0.8rem !important;
  text-align: left !important;
  padding: 0.475rem 0.75rem !important;
}

.btn_view_all img {
  margin-left: auto;
  width: 1.1rem;
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

  .mobile-toggler-right {
    display: inline-block;
  }
}
</style>

<style scoped>
@media screen and (max-width: 768px) {
  .dashboard-top .title {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 520px) {
  .title .script-type-icon {
    width: 1.3rem !important;
  }

  .dashboard-top .title {
    font-size: 0.8rem !important;
    white-space: nowrap;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>