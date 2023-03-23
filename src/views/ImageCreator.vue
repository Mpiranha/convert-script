<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading" class="fullscreen-loader"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" logo-class="permanent-logo"
        dismiss-class="permanent-dismiss" current-active="ai-image" class="always-hidden"></sidebar>
      <div class="content-section">
        <navbar script-type-icon="/img/ai-tool.7ea5d7e9.svg" script-type-name="Image Creator" logo-link-class="hide-logo"
          toggle-class="permanent-toggler"></navbar>
        <div class="scroll-content script-content-fs">
          <div class="container-fluid pt-3">
            <!-- <div class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-3
              ">
              <h6 class="title">
                <img class="script-type-icon" :src="scriptType.icon" alt="" />
                {{ scriptType.name }}
              </h6>
            </div> -->

            <div class="content-wrap script-custom-height mb-0">
              <div class="row h-100">
                <div class="col-12 col-lg-4 pr-lg-0">
                  <div class="bordered-right h-100 md-bordered-bottom">
                    <div class="script-form-wrap pb-3 pb-lg-0">
                      <form action="#" method="GET" @submit.prevent="onSubmit">
                        <div class="script-form">
                          <div class="form-group">
                            <label for="">
                              Image Description
                            </label>
                            <textarea :class="{
                              'is-invalid':
                                $v.answerQuery.desc.$error,
                            }" rows="5" cols="10" v-model="answerQuery.desc" placeholder=""
                              class="form-control"></textarea>

                            <div class="invalid-feedback">
                              <div v-if="
                                !$v.answerQuery.desc
                                  .required && isSubmitted
                              ">
                                Answer is required
                              </div>
                            </div>
                          </div>

                          <b-form-group label="Image Style (Optional)" label-class="input-label">
                            <b-form-select class="form-control" v-model="answerQuery.imageStyle"
                              :options="imageStyleOptions">
                            </b-form-select>
                          </b-form-group>

                          <b-form-group label="Medium (Optional)" label-class="input-label">
                            <b-form-select class="form-control" v-model="answerQuery.medium" :options="mediumOptions">
                            </b-form-select>
                          </b-form-group>

                          <b-form-group label="Filter (Optional)" label-class="input-label">
                            <b-form-select class="form-control" v-model="answerQuery.filter" :options="filterOptions">
                            </b-form-select>
                          </b-form-group>
                        </div>
                        <div class="script-form-footer">
                          <!-- <div class="desc">Variation</div>
                        <input
                          type="text"
                          size="1"
                          v-model="variation"
                          class="btn btn-variation"
                        /> -->
                          <loader-modal :loading-state="loading"></loader-modal>

                          <button class="btn btn-create py-2 btn-script">
                            Generate
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-8 pl-lg-0">
                  <div class="d-flex flex-column h-100">
                    <div class="section-head bordered-bottom">
                      <div class="section-head-right">
                        <button v-if="generatedImage.length > 0" @click="exportAllScripts()"
                          class="btn btn-export-all mb-0">
                          Download All
                        </button>
                      </div>
                    </div>
                    <div class="control-overflow">
                      <div v-if="generatedImage.length > 0">
                        <div class="container pt-5">
                          <div class="row px-5">
                            <image-display v-for="(image, index) in generatedImage" :key="index" 
                            :image-url="image.url"
                              @image-clicked="openImageModal(image.url)">

                            </image-display>

                          </div>
                        </div>
                      </div>
                      <div v-else class="empty-script">
                        Generated image will display here.
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal :hide-header="true" id="modal-edit-script" centered size="lg" :hide-footer="true"
      dialog-class="control-modal-width" content-class="modal-main">
      <div class="large_image_display" :style="`background-image: url(${currentImageDisplay})`">

      </div>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-edit-script')" class="close-modal">Close</b-button>
        <b-button @click="editScript(editId, content)" class="save-modal">Download</b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import ImageDisplay from "../components/ImageDisplay.vue";
import { required, minLength } from "vuelidate/lib/validators";
import alertMixin from "@/mixins/alertMixin";
import $ from 'jquery'

export default {
  name: "ScriptGenerate",
  components: {
    Sidebar,
    Navbar,
    ImageDisplay
  },
  mixins: [alertMixin],
  data() {
    return {
      imageStyleOptions: [{ value: null, text: "Select Style" }],
      mediumOptions: [{ value: null, text: "Select Medium" }],
      filterOptions: [{ value: null, text: "Select Filter" }],
      loading: false,
      answerQuery: {
        desc: "",
        imageStyle: null,
        medium: null,
        filter: null
      },
      currentImageDisplay: null,
      generatedImage: [],
      isSubmitted: false,
      editId: "",
    };
  },
  validations: {
    answerQuery: {
      desc: {
        required,
        minLength: minLength(10),
      },
    },
  },
  methods: {
    openImageModal(data) {
      this.$bvModal.show("modal-edit-script");
      this.currentImageDisplay = data;
    },
    generateImage() {
      this.loading = true;

      this.$store
        .dispatch("generateImage", {
          image_description: this.answerQuery.desc,
          image_style_id: this.answerQuery.imageStyle,
          medium_id: this.answerQuery.medium,
          filter_id: this.answerQuery.filter,
        })
        .then((res) => {
          this.loading = false;
          if (res.data.data.images.length > 0 || !$.isEmptyObject(res.data.data.images)) {
            this.generatedImage = res.data.data.images;
          } else {
            this.makeToast("danger", res.data.message);
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch(() => {
          this.loading = false;
          // this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    onSubmit() {
      // set all fields to touched
      this.$v.$touch();

      // set isSubmite to true
      this.isSubmitted = true;
      // stop here if form is invalid
      if (this.$v.$invalid) return;

      this.generateImage();

    },
    getImageStyle() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getImageStyleUser")
        .then((res) => {
          console.log(res.data)
          for (let i = 0; i < res.data.data.length; i++) {
            this.imageStyleOptions.push({
              value: res.data.data[i].id,
              text: res.data.data[i].name,
            });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },



    getImageFilters() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getImageFiltersUser")
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.filterOptions.push({
              value: res.data.data[i].id,
              text: res.data.data[i].name,
            });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getImageMedium() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getImageMediumUser")
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.mediumOptions.push({
              value: res.data.data[i].id,
              text: res.data.data[i].name,
            });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
  },
  mounted() {
    this.getImageStyle();
    this.getImageFilters();
    this.getImageMedium();
  },
};
</script>

<style>
.large_image_display {
  height: 90vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #000;
}

.script-form-wrap {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: calc(100% - 24px);
  overflow-y: auto;
}

.script-form-wrap label {
  font-size: 0.8rem;
  color: #474e56;
}

.script-form-wrap form {
  height: 100%;
  display: flex;
  flex-direction: column;
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

.empty-script {
  color: #848688;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title .script-type-icon {
  width: 2.5rem;
  margin-right: 0.7rem;
}

.always-hidden {
  position: fixed;
  z-index: 9999999;
  min-width: 215px;
  width: 215px;
  left: -215px;
}

.permanent-toggler {
  display: flex !important;
}

.permanent-logo {
  display: inline !important;
}

.permanent-dismiss {
  display: inline-block !important;
}

.hide-logo {
  display: none;
}

.fullscreen-loader {
  top: 61px !important;
  width: 100% !important;
  left: 0 !important;
  height: 100% !important;
}

@media screen and (max-width: 768px) {
  .script-form-wrap {
    height: auto !important;
  }
}
</style>

<style scoped>
.script-custom-height {
  height: 80vh;
}

.control-overflow {
  height: 79vh;
}
</style>
