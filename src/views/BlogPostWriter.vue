<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading" class="fullscreen-loader"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" logo-class="permanent-logo"
        dismiss-class="permanent-dismiss" current-active="new-copy" class="always-hidden"></sidebar>
      <div class="content-section">
        <navbar script-type-name="Blog Post Writer" logo-link-class="hide-logo" toggle-class="permanent-toggler"></navbar>
        <div class="scroll-content script-content-fs">
          <div class="container-fluid pt-3">


            <div class="content-wrap script-custom-height mb-0">
              <div class="row h-100">
                <div class="col-12 col-lg-4 pr-lg-0">
                  <div class="bordered-right h-100 md-bordered-bottom">
                    <div v-if="generatingBlogPost" class="blog_post_generated_wrap">
                      <div class="blog_post_generated_input_wrap">
                        <div class="action_buttons">
                          <button class="btn btn-block btn_save_blog_post">
                            Save
                          </button>

                          <button class="btn btn-block btn_copy_clipboard">
                            Copy to Clipboard
                          </button>
                        </div>

                        <div class="blog_post_report">
                          <div class="blog_stat">
                            WORDS <br>
                            <span class="word_count">5,276</span>
                          </div>

                          <div class="blog_stat">
                            HEADING <br>
                            <span class="word_count">8</span>
                          </div>

                          <div class="blog_stat">
                            PARAGRAPHS <br>
                            <span class="word_count">10</span>
                          </div>
                        </div>
                      </div>

                      <div class="plagiarism_checker_wrap">
                        <div class="tt">Plagiarism checker</div>

                        <button class="btn btn-block btn_check_plagiarism">
                          Check plagiarism
                        </button>

                        <div class="plagiarism_desc">
                          A plagiarism rate that is less than 5% is excellent, while rate that is between 5% and 10%
                          is okay.
                        </div>
                      </div>

                      <div class="focus_keywords_wrap">
                        <div class="form-group">
                          <label for="">Focus Keywords</label>
                          <div ref="keywordInput" class="multi-search-filter">
                            <div v-for="(keyword, index) in genOutlineData.keywords" :key="index"
                              class="multi-search-item">
                              {{ keyword }}
                              <button class="btn no-shadow btn_remove_item">
                                <img src="@/assets/icons/plus.png" alt="close icon">
                              </button>
                            </div>
                            <input ref="inputElem" type="text">
                          </div>
                        </div>
                      </div>



                    </div>
                    <div class="script-form-wrap blog-form-wrap pb-3 pb-lg-0">
                      <div class="script-form d-flex flex-column h-100">

                        <div class="inner_wrap_long_form">
                          <div class="disabler" v-if="generatedSubsection.length > 0"></div>
                          <div class="form-group">
                            <label for="">Blog Post Title</label>
                            <input type="text" name="" :class="{
                                'is-invalid':
                                  $v.genOutlineData.title.$error,
                              }" id="" v-model="genOutlineData.title" class="form-control"
                              placeholder="Enter blog title" />

                            <div v-if="isSubmitted && $v.genOutlineData.title.$error" class="invalid-feedback">
                              <span v-if="!$v.genOutlineData.title.required">* Title is required <br /></span>

                            </div>

                          </div>

                          <div class="form-group">
                            <label for="">Description</label>
                            <textarea :class="{
                                'is-invalid':
                                  $v.genOutlineData.description.$error,
                              }" v-model="genOutlineData.description" rows="5" cols="10"
                              placeholder="Enter a description" class="form-control"></textarea>
                            <div v-if="isSubmitted && $v.genOutlineData.description.$error" class="invalid-feedback">
                              <span v-if="!$v.genOutlineData.description.required">* Description is required <br /></span>

                            </div>
                          </div>

                          <div class="form-group">
                            <label for="">Focus Keywords</label>
                            <div ref="keywordInput" class="multi-search-filter" :class="{
                                'is-invalid':
                                  $v.genOutlineData.keywords.$error,
                              }"
                              @click="Array.from($refs.keywordInput.children).find(n => n.tagName === 'INPUT').focus()">
                              <div v-for="(keyword, index) in genOutlineData.keywords" :key="index"
                                class="multi-search-item">
                                {{ keyword }}
                                <button @click="deleteKeyword($event, index)" class="btn no-shadow btn_remove_item">
                                  <img src="@/assets/icons/plus.png" alt="close icon">
                                </button>
                              </div>
                              <input ref="inputElem" type="text" @keyup="multiSearchKeyup($event, $refs.inputElem)">
                            </div>

                            <div v-if="isSubmitted && $v.genOutlineData.keywords.$error" class="invalid-feedback">
                              <span v-if="!$v.genOutlineData.keywords.required">* Keyword is required <br /></span>

                            </div>
                          </div>

                          <b-form-group label="Tone" label-class="input-label">
                            <b-form-select :class="{
                                'is-invalid':
                                  $v.genOutlineData.tone_id.$error,
                              }" v-model="genOutlineData.tone_id" class="form-control"
                              :options="toneOptions"></b-form-select>

                            <div v-if="isSubmitted && $v.genOutlineData.tone_id.$error" class="invalid-feedback">
                              <span v-if="!$v.genOutlineData.tone_id.required">* Tone is required <br /></span>

                            </div>
                          </b-form-group>

                          <div class="row">
                            <div class="col-12 col-md-6">
                              <div class="form-group">
                                <label for="">Input Language (Optional)</label>
                                <b-form-select v-model="genOutlineData.input_language_id" class="form-control"
                                  :options="languageOptions"></b-form-select>

                              </div>
                            </div>

                            <div class="col-12 col-md-6">
                              <div class="form-group">
                                <label for="">Output Language (Optional)</label>
                                <b-form-select v-model="genOutlineData.output_language_id" class="form-control"
                                  :options="languageOptions"></b-form-select>
                              </div>
                            </div>
                          </div>

                          <div class="d-flex justify-content-end outline_btn_wrap mb-5">
                            <button @click="generateOutline($event)" class="btn btn_gen_outline">
                              <img src="@/assets/icons/outline.png" alt="outline icon">
                              Write outline for me
                            </button>
                          </div>

                        </div>

                        <div v-if="!isEmpty(generatedSubsection)" class="d-flex justify-content-end mt-auto mb-3">
                          <button class="btn close-modal px-4 py-3">Go Back</button>
                          <button class="btn btn-create px-4 py-3">
                            Write Blog Post
                          </button>
                        </div>
                        <div v-else-if="generatedOutlines.length > 0" class="d-flex justify-content-end mt-auto mb-3">
                          <button class="btn btn-create px-4 py-3 mb-3" @click="fromOutlineGenerateSubsection">
                            Expand Outlines
                          </button>
                        </div>









                      </div>



                    </div>

                  </div>
                </div>
                <div class="col-12 col-lg-8 pl-lg-0">
                  <div class="d-flex flex-column h-100">
                    <div class="section-head bordered-bottom">
                      <div class="section-head-right mb-0 py-1">

                        <button v-if="generatingBlogPost" class="btn btn-export-all mb-0">
                          Export
                        </button>
                      </div>
                    </div>
                    <div class="text_speech_word_form_wrap">
                      <quill-editor v-if="generatingBlogPost" ref="myQuillEditor"
                        class="mb-3 script-editor blog_post_editor" v-model="blogPost" :options="editorOption">

                      </quill-editor>
                      <div v-else-if="!isEmpty(generatedSubsection)" class="outline_subsection_list_wrap">
                        <blog-post-outline-subsection v-for="(subsection, index) in generatedSubsection" :key="index"
                          :outline-title="index" :sub-section="subsection"></blog-post-outline-subsection>
                      </div>
                      <div v-else class="outline_list_wrap">
                        <div class="outline_wraps">
                          <blog-post-outline @delete-clicked="deleteOutline($event, outline)"
                            v-for="(outline, index) in generatedOutlines" :key="index" :text="outline"
                            v-model="generatedOutlines[index]"></blog-post-outline>
                        </div>



                        <div class="btn_wrap_add_section">
                          <button @click="addOutline" class="btn btn_add_section">
                            <img src="@/assets/icons/plus_dark.png" alt="plus icon">
                            Add Outline
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
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import { required, minLength } from "vuelidate/lib/validators";
import alertMixin from "@/mixins/alertMixin";
import BlogPostOutline from '@/components/BlogPostOutline';
import BlogPostOutlineSubsection from '@/components/BlogPostOutlineSubsection';
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// import $ from 'jquery'

export default {
  name: "TextToSpeech",
  components: {
    Sidebar,
    Navbar,
    BlogPostOutline,
    BlogPostOutlineSubsection,
    quillEditor
  },
  mixins: [alertMixin],
  data() {
    return {
      toneOptions: [{ value: null, text: "Select Tone" }],
      languageOptions: [{ value: null, text: "Select Language" }],
      loading: false,
      genOutlineData: {
        title: "",
        description: "",
        keywords: [],
        campaign_id: null,
        tone_id: null,
        output_language_id: null,
        input_language_id: null,
        workspace_id: ""
      },
      generatingBlogPost: false,
      generatedOutlines: [],
      generatedSubsection: [],
      outlines: "Hello",
      blogPost: "",
      sections: [],
      isSubmitted: false,
      editId: "",
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline"], // toggled buttons
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],

            ],
          },
        },
      },
    };
  },
  validations: {
    genOutlineData: {
      title: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      },
      keywords: {
        required
      },
      tone_id: {
        required
      },
    }
  },
  methods: {
    getAllTones() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllTones")
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.toneOptions.push({
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
    multiSearchKeyup(event, inputElement) {
      if (event.keyCode === 13) {
        this.genOutlineData.keywords.push(inputElement.value);
        inputElement.value = "";
      }

    },
    deleteKeyword(event, index) {
      event.preventDefault();
      this.genOutlineData.keywords =
        this.genOutlineData.keywords.filter(function (value, indx) {
          return indx != index;
        });
    },
    addOutline(event) {
      if (event) {
        event.preventDefault();
      }

      this.generatedOutlines.push("Type in here to add outline manualy");
    },
    deleteOutline(event, value) {
      if (event) {
        event.preventDefault();
      }

      this.generatedOutlines =
        this.generatedOutlines.filter(function (val) {
          return value != val;
        });
    },
    openEditModal(id, data) {
      this.$bvModal.show("modal-edit-script");
      this.editId = id;
      // this.triggerEdit = true;
      // this.$store.commit("triggerEdit", {
      //   editStatus: true,
      //   id: id,
      // });
      this.content = data;
      // this.editId = id;
      // this.campaignName = data;
    },
    onSubmit() {
      // set all fields to touched
      this.$v.$touch();

      // set isSubmite to true
      this.isSubmitted = true;
      // stop here if form is invalid
      if (this.$v.speechData.$invalid) return;


      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("initiateTextToSpeech", this.speechData)
        .then((res) => {
          console.log(res);
          this.generatedAudio = res.data.data;
          this.makeToast("success", res.data.message);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getAllLanguages() {

      this.$store
        .dispatch("getAllLanguages")
        .then((res) => {
          this.languages = res.data.data.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          console.log(this.languages);

          for (let i = 0; i < res.data.data.length; i++) {
            this.languageOptions.push({
              value: res.data.data[i].id,
              text: res.data.data[i].name,
            });
          }


        })
        .catch((error) => {
          console.log(error);

        });
    },

    generateOutline() {
      // set all fields to touched
      this.$v.$touch();

      // set isSubmite to true
      this.isSubmitted = true;
      // stop here if form is invalid
      if (this.$v.genOutlineData.$invalid) return;

      let data = {
        title: this.genOutlineData.title,
        description: this.genOutlineData.description,
        keywords: this.genOutlineData.keywords.join(", "),
        tone_id: this.genOutlineData.tone_id,
        output_language_id: this.genOutlineData.output_language_id,
        input_language_id: this.genOutlineData.input_language_id,
        workspace_id: this.$store.state.user.default_workspace_id
      };

      console.log(data);

      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("generateOutline", data)
        .then((res) => {
          this.generatedOutlines = res.data.data.outlines;
          this.makeToast("success", res.data.message);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.loading = false;
          console.log("error: " + error);
          this.error = error.response.data.errors;

          // this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    fromOutlineGenerateSubsection() {
      // set all fields to touched

      let data = {
        outlines: this.generatedOutlines.join(", "),
        tone_id: this.genOutlineData.tone_id,
        output_language_id: this.genOutlineData.output_language_id,
        input_language_id: this.genOutlineData.input_language_id,
        workspace_id: this.$store.state.user.default_workspace_id,
      };

      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("fromOutlineGenSubsection", data)
        .then((res) => {
          this.generatedSubsection = this.convertToObject(res.data.data);
          this.makeToast("success", res.data.message);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          this.loading = false;
          console.log("error: " + error);
          this.error = error.response.data.errors;

          // this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },

    convertToObject(text) {
      var obj = {};
      var key = "";

      text.split("\n").forEach(function (item) {
        // console.log("item " + item);
        console.log(item.charAt(0))
        if (!(["*", "-"].includes(item.charAt(0)))) {
          if (item.length > 0) {
            key = item;
            obj[key] = [];
          }

        } else {
          obj[key].push(item);
        }

      });

      return obj;
    },
    isEmpty(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          return false;
        }
      }

      return true
    }
  },
  mounted() {
    // this.getAllLanguages();
    // this.getAllVoices();
    // this.addSection();
    this.getAllTones();
    this.getAllLanguages();
  },
  computed: {

  }
};
</script>

<style>
.script-form-wrap.blog-form-wrap {
  height: 89vh;
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

.btn-script {
  padding: 0.375rem 0.65rem !important;
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

.multi-search-filter {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 3px;
  min-height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  display: flex;
  flex-wrap: wrap;
}

.multi-search-filter.is-invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.multi-search-filter>input {
  border: 0px;
  outline: none;
  font-size: 1rem;
  color: #495057;
}

.multi-search-item {
  margin: 2px;
  align-items: center;
  float: left;
  display: flex;
  font-size: 0.7rem;
  background-color: #8338EC;
  border-radius: 1rem !important;
  color: #fff;
  border-radius: 3px;
  position: relative;
  padding: 0.1rem 0.3rem 0rem 0.6rem;
}

.multi-search-item>span {
  font-family: 'Muli';
  line-height: 18px;
}

.multi-search-item>.fa {
  font-size: 12px;
  line-height: 18px;
  margin-left: 8px;
  position: absolute;
  right: 8px;
  top: 2px;
}

.btn_remove_item {
  padding: 0 !important;
  margin-left: 0.3rem;
}

.btn_gen_outline {
  display: flex;
  border: 1px solid #393F46 !important;
  align-items: center;
  padding: 0.8rem 1rem !important;
  color: #393F46 !important;
  border-radius: 0.4rem !important;
  background-color: #fff !important;
}

.btn_gen_outline img {
  margin-right: 0.5rem;
  margin-bottom: 4px;
}

.outline_wrap {
  display: flex;
  flex-direction: column;
}

.outline_item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.9rem 1.3rem;
  border-bottom: 2px solid #f6f6f6;
}

.outline_item .outline_icon {
  margin-right: 1.5rem;
}

.outline_item .outline_actions {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.outline_item .text {
  font-size: 1.2rem;
  color: #393F46;
}

.outline_item .text:focus {
  outline: none;
  border-bottom: 1px solid #000000;
}

.outline_item .outline_actions .btn {
  padding: 0 !important;

}

.outline_item .outline_actions .btn:first-child {
  margin-right: 1rem;
}

.inner_wrap_long_form {
  position: relative;
}

.disabler {
  background-color: #474e56;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.blog_post_editor .ql-container {
  height: 72vh !important;
}

.btn_save_blog_post {
  background: #8338EC !important;
  border: 0.5px solid #8338EC !important;
  border-radius: 7px !important;
  color: #fff !important;
  margin-bottom: 1.5rem;
  font-size: 0.9rem !important;
  padding: 0.8rem 0.75rem !important;
}

.btn_copy_clipboard {
  border: 0.5px solid #393F46 !important;
  border-radius: 7px !important;
  color: #393F46 !important;
  font-size: 0.9rem !important;
  padding: 0.8rem 0.75rem !important;
  margin-bottom: 2rem;
}

.blog_post_report {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.blog_post_report .blog_stat {
  text-align: center;
  font-size: 0.9rem;
}

.blog_post_report .blog_stat .word_count {
  font-size: 1.8rem;
}

.blog_post_generated_input_wrap {
  border-bottom: 1px solid #E5E5E5;
  padding: 1.3rem 1.1rem 1.7rem 1.1rem;
}

.plagiarism_checker_wrap {
  color: #393F46;
  padding: 1.3rem 1.1rem 1.7rem 1.1rem;
  border-bottom: 1px solid #E5E5E5;
}

.plagiarism_checker_wrap .tt {
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 112.9%;
  color: #393F46;
  margin-bottom: 0.5rem;
}


.btn_check_plagiarism {
  border: 1px solid #393F46 !important;
  border-radius: 7px !important;
  margin-bottom: 1rem;
  font-size: 0.9rem !important;
  padding: 0.8rem 0.75rem !important;
}

.plagiarism_desc {
  font-size: 0.9rem;
}

.focus_keywords_wrap {
  padding: 1.3rem 1.1rem 1.7rem 1.1rem;
  ;
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
  height: 70vh;
}
</style>
