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
          <router-link
            class="nav-link"
            :class="currentActive == 'tutorials' ? 'active' : ''"
            to="/tutorial"
          >
            Tutorials
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :class="currentActive == 'support' ? 'active' : ''"
            to="/support"
          >
            Support
          </router-link>
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
          Tell us about a feature you would love to have on ConvertScript
        </p>
      </div>

      <b-form-group>
        <b-form-textarea
          id="name"
          v-model="campaignName"
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
        <b-button class="save-modal">Submit</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    // msg: String
    currentActive: String,
    removeContent: Boolean,
  },
  data() {
    return {
      campaignName: "",
    };
  },
};
</script>

<style scoped>
.content-head {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0.7rem 0.7rem;
  box-shadow: 1px 1px 3px #a69f9f;
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
</style>