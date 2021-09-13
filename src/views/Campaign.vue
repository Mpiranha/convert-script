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
            <h6 class="title">All Campaign</h6>

            <button class="btn btn-create" v-b-modal.modal-new-campaign>
              <span>+</span>
              New Campaigns
            </button>
          </div>

          <div class="content-wrap pt-4 pb-5">
            <div class="search-form">
              <button class="btn search-btn">
                <i class="flaticon-loupe icons"></i>
              </button>
              <input
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>

            <div class="sort-wrap">
              <div class="acct-desc">2 Campaign(s)</div>

              <select class="sort-select" name="" id="">
                <option value="none" selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <table class="table table-custom">
              <tbody>
                <tr>
                  <td scope="row">Campaign Name</td>
                  <td>5</td>
                  <td>05/072021</td>
                  <td>
                    <dropdown-tool></dropdown-tool>
                  </td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      :hide-header="true"
      id="modal-new-campaign"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <div class="modal-head">
        <h3 class="title">Give your campaign a name</h3>
        <p class="desc">Only you can see this</p>
      </div>

      <b-form-group>
        <b-form-input
          id="name"
          v-model="campaignName"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button
          @click="$bvModal.hide('modal-new-campaign')"
          class="close-modal"
          >Close</b-button
        >
        <b-button class="save-modal">Create</b-button>
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
      accessOptions: [{ value: null, text: "Select Plans" }],
    };
  },
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
