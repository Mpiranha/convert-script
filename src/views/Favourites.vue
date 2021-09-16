<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="favourites"
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
            <h6 class="title">My Favourites</h6>
          </div>

          <div class="content-wrap script-custom-height">
            <div class="row">
              <div class="col-6">
                <div class="section-head bordered">
                  <div class="section-head-left">
                    <img
                      class="section-head-icon"
                      src="@/assets/icons/convert-icon/All script.svg"
                      alt=""
                    />
                    5
                  </div>
                  <div class="section-head-right">
                    <select class="sort-select" name="" id="">
                      <option value="none" selected>Export All</option>
                      <option value=""></option>
                      <option value=""></option>
                      <option value=""></option>
                    </select>
                  </div>
                </div>
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
                    <button
                      class="btn no-shadow btn-share"
                      v-b-modal.modal-send-script
                    >
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
      id="modal-send-script"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <b-form-group label="Send to" label-for="pwd" label-class="form-label">
        <b-form-select
          class="input-table"
          v-model="data"
          :options="sendOptions"
        ></b-form-select>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-new-campaign')"
          class="close-modal"
          >Close</b-button
        >
        <b-button class="save-modal">Send</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import DropdownTool from "@/components/DropdownTool";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    DropdownTool,
  },
  data() {
    return {
      campaignName: "",
      data: "",
      sendOptions: [{ value: null, text: "Select Integeration" }],
    };
  },

  methods: {},
  computed: {},
};
</script>

<style>
.save-btn {
  background-color: pink;
}

.modal-main {
  border-radius: 0.5rem !important;
}

.drop-main-wrap {
  min-width: 6rem !important;
  font-size: 0.8rem !important;
  box-shadow: -3px 3px 6px #eee;
}

.form-label {
  font-size: 0.9rem;
}

.input-table {
  border: 1px solid #c2c8d1 !important;
  font-size: 0.9rem !important;
  border-radius: 0.5rem !important;
  width: 100%;
  padding: 0.55rem 0.75rem;
}

.control-width {
  max-width: 420px !important;
}

.form-group {
  margin-bottom: 0.7rem;
}

.close-modal,
.save-modal {
  font-size: 0.8rem !important;
  padding: 0.45rem 1.5rem !important;
  border: none !important;
  border-radius: 0.5rem !important;
}

.close-modal {
  margin-right: 0.8rem;
  color: #8338ec !important;
  background-color: #fff !important;
  border: 1px solid #8338ec !important;
}

.save-modal {
  background-color: #8338ec !important;
  color: #fff !important;
}

.modal-head .title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0;
}

.modal-head .desc {
  font-size: 0.7rem;
  color: #848688;
}
</style>
