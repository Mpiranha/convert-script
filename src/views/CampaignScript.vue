<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="campaign"
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
            <h6 class="title">All Campaigns</h6>

            <button class="btn btn-create" v-b-modal.modal-new-campaign>
              <span>+</span>
              Add Scripts
            </button>
          </div>

          <div class="content-wrap script-custom-height">
            <div class="row h-100">
              <div class="col-6 bordered-right pr-0">
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
                    <!-- <select class="sort-select" name="" id="">
                      <option value="none" selected>Export All</option>
                      <option value=""></option>
                      <option value=""></option>
                      <option value=""></option>
                    </select> -->
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
              </div>
              <div class="col-6">
                <div class="d-flex flex-column h-100">
                  <div class="section-head">
                    <div class="section-head-right">
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
      accessOptions: [{ value: null, text: "Select Plans" }],
    };
  },
};
</script>

<style>
</style>
