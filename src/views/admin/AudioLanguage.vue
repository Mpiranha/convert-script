<template>
    <div class="container-fluid px-0">
      <div class="flex-main-wrap">
        <sidebar
          :user-name="this.$store.state.user.first_name"
          current-active="audio-language"
        ></sidebar>
        <div class="content-section">
          <navbar :remove-content="true"></navbar>
          <div class="scroll-content">
            <div class="container">
              <div class="sec-padding">
                <div
                  class="
                    dashboard-top
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-5
                  "
                >
                  <h6 class="title">Voice Languages</h6>
                  <div class="d-flex align-items-center">
                    <button
                      @click="clearField()"
                      class="btn btn-create"
                      v-b-modal.modal-new-language
                    >
                      <span>+</span>
                      New Language
                    </button>
                  </div>
                </div>
                <div class="content-wrap set-min-h pt-4 pb-5">
                  <div class="search-form mb-2">
                    <button class="btn search-btn">
                      <i class="flaticon-loupe icons"></i>
                    </button>
                    <input
                      v-model="searchKey"
                      @input="searchKeyWord"
                      class="form-control no-shadow search-input"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                  <loader-modal
                    :loading-state="this.$store.state.loading"
                  ></loader-modal>
                  <div v-if="languages.length === 0" class="no-data-info">
                    Created Languages will display here.
                  </div>
                  <table v-else class="table table-custom">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th class="text-center">Code</th>
                        <th class="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody v-if="searchResult.length > 0">
                      <tr v-for="result in searchResult" :key="result.id">
                        <td scope="row">{{ result.name }}</td>
                        <td>{{ result.code }}</td>
                        <td>
                          <dropdown-tool
                            @edit-clicked="
                              openEditModal(result.id, {
                                name: result.name,
                                code: result.code
                              })
                            "
                            @delete-proceed="deleteLanguage(result.id)"
                            delete-what="Language"
                          >
                          </dropdown-tool>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else-if="languages && searchKey.length < 1">
                      <tr v-for="language in languages" :key="language.id">
                        <td scope="row">{{ language.name }}</td>
                        <td class="text-center">{{ language.code }}</td>
                        <td>
                          <dropdown-tool
                            @edit-clicked="
                              openEditModal(language.id, {
                                name: language.name,
                                code: language.code
                              })
                            "
                            @delete-proceed="deleteLanguage(language.id)"
                            delete-what="Language"
                          >
                          </dropdown-tool>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-center mb-4">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="languageLength"
                    :per-page="perPage"
                    aria-controls="my-table"
                    size="sm"
                    :hide-goto-end-buttons="true"
                    prev-text="<"
                    next-text=">"
                    @change="handlePageChange"
                  ></b-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <b-modal
        :hide-header="true"
        id="modal-new-language"
        centered
        size="md"
        :hide-footer="true"
        dialog-class="control-width"
        content-class="modal-main"
      >
        <!-- <div class="modal-head">
          <h3 class="title">Give your campaign a name</h3>
          <p class="desc">Only you can see this</p>
        </div> -->
  
        <b-form-group label="Language">
          <b-form-input
            id="name"
            v-model="languageData.name"
            type="text"
            class="input-table"
          >
          </b-form-input>
        </b-form-group>
  
        <b-form-group label="Code">
          <b-form-input
            id="language-id"
            v-model="languageData.code"
            type="text"
            class="input-table"
          >
          </b-form-input>
        </b-form-group>
        <div class="d-flex justify-content-end">
          <b-button
            @click="$bvModal.hide('modal-new-language')"
            class="close-modal"
            >Close</b-button
          >
          <b-button
            @click="
              triggerEdit ? editLanguage(editId, languageData) : addLanguage()
            "
            class="save-modal"
            >{{ triggerEdit ? "Edit" : "Save" }}</b-button
          >
        </div>
      </b-modal>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
  import Navbar from "@/components/TheNav.vue";
  import DropdownTool from "@/components/DropdownTool";
  import alertMixin from "@/mixins/alertMixin";
  
  export default {
    name: "Language",
    mixins: [alertMixin],
    components: {
      Sidebar,
      Navbar,
      DropdownTool,
    },
    data() {
      return {
        searchKey: "",
        searchResult: [],
        perPage: 20,
        currentPage: 1,
        languageLength: 0,
        languages: [],
        languageData: {
          name: "",
          code: "",
        },
        error: "",
        triggerEdit: false,
        editId: null,
      };
    },
    methods: {
      handlePageChange(value) {
        this.currentPage = value;
        this.getAllLanguages();
        console.log("Value: " + value);
      },
      searchKeyWord() {
        this.$store
          .dispatch("search", {
            endpoint: "/api/v1/admin/voice-languages",
            keyword: this.searchKey,
          })
          .then((res) => {
            this.searchResult = res.data.response.data;
  
            // console.log(res.data + "called now");
            //this.loading = false;
            this.$store.commit("updateLoadState", false);
          })
          .catch((error) => {
            // // console.log(error);
            // this.error = error.response.data.errors.root;
            // // this.error = error;
            console.log(error);
            //this.loading = false;
            this.$store.commit("updateLoadState", false);
          });
      },
      getAllLanguages() {
        this.$store.commit("updateLoadState", true);
        this.$store
          .dispatch("getAllVoiceLanguages", {number: this.currentPage, perPage: this.perPage})
          .then((res) => {
            this.languages = res.data.response.data;
            this.languageLength = res.data.response.meta.total;
  
            this.$store.commit("updateLoadState", false);
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("updateLoadState", false);
          });
      },
      addLanguage() {
        this.$store.commit("updateLoadState", true);
        this.$bvModal.hide("modal-new-language");
        this.$store
          .dispatch("addVoiceLanguage", this.languageData)
          .then((res) => {
            console.log(res);
            this.getAllLanguages();
            this.languageData = {
              name: "",
              code: ""
            };
            this.makeToast("success", "Language added successfully");
            this.$store.commit("updateLoadState", false);
          })
          .catch((error) => {
            console.log(error.response);
            this.error = error.response.data.error;
            this.makeToast("danger", this.error);
            this.$store.commit("updateLoadState", false);
          });
      },
      editLanguage(id) {
        this.$store.commit("updateLoadState", true);
        this.$bvModal.hide("modal-new-language");
        this.$store
          .dispatch("editVoiceLanguage", {
            id: id,
            data: this.languageData,
          })
          .then((res) => {
            console.log(res);
            this.getAllLanguages();
            this.languageData = {
              name: "",
              code: ""
            };
            this.makeToast("success", "Language edited successfully");
            this.$store.commit("updateLoadState", false);
          })
          .catch((error) => {
            console.log("error: " + error.response.data.message);
            this.error = error.response.data.message;
            this.makeToast("danger", this.error);
            this.$store.commit("updateLoadState", false);
          });
      },
      deleteLanguage(id) {
        this.$store.commit("updateLoadState", true);
        this.$store
          .dispatch("deleteVoiceLanguage", id)
          .then((res) => {
            console.log(res);
            this.getAllLanguages();
            this.makeToast("success", "Language deleted successfully");
            this.$store.commit("updateLoadState", false);
          })
          .catch((error) => {
            console.log(error);
            this.error = error.response.data.message;
            this.makeToast("danger", this.error);
            this.$store.commit("updateLoadState", false);
          });
      },
  
      openEditModal(id, data) {
        this.$bvModal.show("modal-new-language");
        this.triggerEdit = true;
        this.editId = id;
        this.languageData.name = data.name;
        this.languageData.code = data.code;
      },
      clearField() {
        this.lanuguageData = {
          name: "",
          code: ""
        };
        this.triggerEdit = false;
      },
      getCurrent(data) {
        this.languageData.name = data;
      },
    },
  
    mounted() {
      this.getAllLanguages();
    },
  };
  </script>
  
  <style>
  .control-width {
    max-width: 500px !important;
  }
  .plan-types {
    padding-right: 0.4rem;
    display: inline-flex;
  }
  
  .plan-types::after {
    content: ",";
  }
  </style>
  