<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
        current-active="script"
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
            <h6 class="title">Generate New Script</h6>

            <button class="btn btn-create" v-b-modal.modal-new-campaign>
              <span>+</span>
              Add Script
            </button>
          </div>

          <div class="content-wrap script-custom-height">
            <div class="row h-100">
              <div class="col-6 no-gutter-right">
                <div class="bordered-right h-100">
                  <div class="script-form-wrap">
                    <div class="script-form">
                      <div class="form-group">
                        <label for="">Question 1</label>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group">
                        <label for="">Question 2</label>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group">
                        <label for="">Question 3</label>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group">
                        <label for="">Question 4</label>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group">
                        <label for="">Question 5</label>
                        <input
                          type="text"
                          name=""
                          id=""
                          class="form-control"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="script-form-footer">
                      <div class="desc">Variation</div>
                      <button class="btn btn-variation">2</button>
                      <button class="btn btn-create btn-script">
                        Generate Script
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 no-gutter-left">
                <div class="d-flex flex-column h-100">
                  <div class="section-head bordered-bottom">
                    <div class="section-head-right">
                      <select class="sort-select" name="" id="">
                        <option value="none" selected>Export All</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                  </div>
                  <div class="control-overflow">
                    <script-box> </script-box>
                    <script-box> </script-box>
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
import ScriptBox from "@/components/ScriptBox";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
    ScriptBox,
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

.script-form-wrap {
  padding: 2.5rem 2rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.script-form-wrap label {
  font-size: 0.7rem;
  color: #848688;
}

.script-form-wrap .form-control {
  padding: 0.175rem 0.75rem;
}

.script-form-wrap .form-control:focus {
  border-color: #1a01ff;
  outline: 0;
  box-shadow: 0 0 0 0.25rem #2c03e440 !important;
}

.script-form-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.script-form-footer .desc {
  color: #949fb0;
  font-size: 0.7rem;
  margin-right: 0.5rem;
}

.btn-variation {
  border: 1px solid #ddc8fa !important;
  color: #949fb0 !important;
  font-size: 0.7rem !important;
  margin-right: 0.5rem;
}

.btn-variation,
.btn-script {
  padding: 0.375rem 0.65rem !important;
}
</style>
