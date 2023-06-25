<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="voice-voice"></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="">
              <div class="
                    dashboard-top
                    d-flex
                    justify-content-between
                    align-items-center
                   
                  ">
                <h6 class="title">Voices</h6>
                <div class="d-flex align-items-center">
                  <button @click="clearField" class="btn btn-create" v-b-modal.modal-new-voice>
                    <span>+</span>
                    New Voice
                  </button>
                </div>
              </div>
              <div class="content-wrap set-min-h pt-4 pb-5">
                <div class="search-form mb-2">
                  <button class="btn search-btn">
                    <i class="flaticon-loupe icons"></i>
                  </button>
                  <input v-model="searchKey" @input="searchKeyWord" class="form-control no-shadow search-input"
                    type="text" placeholder="Search" />
                </div>
                <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
                <div v-if="voices.length === 0" class="no-data-info">
                  Created Voices will display here.
                </div>
                <table v-else class="table table-custom">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Voice</th>
                      <th>Avatar</th>
                      <th class="text-center">Sample Audio</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="result in searchResult" :key="result.id">
                      <td scope="row">{{ result.name }}</td>
                      <td class="text-left">{{ result.language }}</td>
                      <td class="text-left">{{ result.name }}</td>
                      <td>
                        <img class="avatar_view" :src="result.avatar_url" alt="audio avatar">
                      </td>
                      <td>
                        <audio controls :src="result.sample_voice_url"></audio>
                      </td>
                      <td>
                        <dropdown-tool @edit-clicked="openEditModal(result.id, result)
                          " @delete-proceed="deletevoice(result.id)" delete-what="voice">
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="voices && searchKey.length < 1">
                    <tr v-for="voice in voices" :key="voice.id">
                      <td scope="row">{{ voice.name }}</td>
                      <td class="text-left">{{ voice.language }}</td>
                      <td>
                        <img class="avatar_view" :src="voice.avatar_url" alt="audio avatar">
                      </td>
                      <td>
                        <audio controls :src="voice.sample_voice_url"></audio>
                      </td>
                      <td>
                        <dropdown-tool @edit-clicked="openEditModal(voice.id, voice)
                          " @delete-proceed="deleteVoice(voice.id)" delete-what="voice">
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center mb-5">
                <b-pagination v-model="currentPage" :total-rows="voiceLength" :per-page="perPage" aria-controls="my-table"
                  size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">"
                  @change="handlePageChange"></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :hide-header="true" id="modal-new-voice" centered size="md" :hide-footer="true" dialog-class=""
      content-class="modal-main">
      <!-- <div class="modal-head">
          <h3 class="title">Give your campaign a name</h3>
          <p class="desc">Only you can see this</p>
        </div> -->

      <div class="row">
        <div class="col-6">
          <b-form-group label="Name">
            <b-form-input id="name" v-model="voiceData.name" type="text" class="input-table">
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group label="Gender">
            <b-form-select class="form-control" v-model="voiceData.gender" :options="genderOption"></b-form-select>
          </b-form-group>
        </div>
      </div>

      <b-form-group label="Language">
        <b-form-select class="form-control" v-model="voiceData.language_id" :options="language_option"></b-form-select>
      </b-form-group>

      <!-- <b-form-group label="Engine">
        <b-form-select class="form-control" v-model="voiceData.engine" :options="engineOption"></b-form-select>
      </b-form-group> -->

      <b-form-group label="Description">
        <b-form-input id="voice-id" v-model="voiceData.description" type="text" class="input-table">
        </b-form-input>
      </b-form-group>

      <div class="row">
        <div class="col-6">
          <b-form-group label="Pitch">
            <b-form-input id="name" v-model="voiceData.pitch" type="text" class="input-table">
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col-6">
          <b-form-group label="Speaking rate">
            <b-form-input id="name" v-model="voiceData.speaking_rate" type="text" class="input-table">
            </b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <!-- <div class="col-6">
          <b-form-group label="Language code">
            <b-form-input id="name" v-model="voiceData.language_code" type="text" class="input-table">
            </b-form-input>
          </b-form-group>
        </div> -->
        <div class="col-12">
          <b-form-group label="Voice name code">
            <b-form-input id="name" v-model="voiceData.voice_code" type="text" class="input-table">
            </b-form-input>
          </b-form-group>
        </div>
      </div>

      <!-- <b-form-group label="Upload voice sample">
        <b-form-file v-model="icon" :state="Boolean(icon)" placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..." @change="onIconChange($event)">
        </b-form-file>
      </b-form-group> -->

      <b-form-group label="Upload Voice Sample">
        <b-form-input id="voice-id" v-model="voiceData.sample_voice_url" type="text" class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Voice Avatar Photo">
        <b-form-input id="voice-id" v-model="voiceData.avatar_url" type="text" class="input-table">
        </b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-voice')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editVoice(editId, voiceData) : addVoice()
          " class="save-modal">{{ triggerEdit ? "Edit" : "Save" }}</b-button>
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
  name: "Voice",
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
      voiceLength: 0,
      language_option: [{ text: "Select Language", value: null }],
      // engineOption: [{ text: "Select Engine", value: null }, { text: "Standard", value: "standard" }, { text: "Neural", value: "neural" }],
      genderOption: [{ text: "Select Gender", value: null }, { text: "Male", value: "Male" }, { text: "Female", value: "Female" }],
      voices: [],
      voiceData: {
        name: "",
        gender: null,
        language_id: null,
        // engine: null,
        description: "",
        pitch: "",
        speaking_rate: "",
        // language_code: "",
        voice_code: "",
        sample_voice_url: "",
        avatar_url: ""
      },
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllVoices();
      console.log("Value: " + value);
    },
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/voices",
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
    getAllVoices() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllVoices", { number: this.currentPage, perPage: this.perPage })
        .then((res) => {
          this.voices = res.data.response.data;
          this.voiceLength = res.data.response.meta.total;
          console.log(res.data);
          console.log("Current Page: " + this.currentPage);
          console.log("Per Page: " + this.perPage);

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addVoice() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-voice");
      this.$store
        .dispatch("addVoice", this.voiceData)
        .then(() => {

          this.getAllVoices();
          this.voiceData = {
            name: "",
            // engine: null,
            gender: null,
            language_id: null,
            description: "",
            pitch: "",
            speaking_rate: "",
            // language_code: "",
            voice_code: "",
            sample_voice_url: "",
            avatar_url: ""
          };
          this.makeToast("success", "voice added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editVoice(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-voice");
      this.$store
        .dispatch("editVoice", {
          id: id,
          data: this.voiceData,
        })
        .then((res) => {
          console.log(res);
          this.getAllvoices();
          this.voiceData = {
            name: "",
            // engine: null,
            gender: null,
            language_id: null,
            description: "",
            pitch: "",
            speaking_rate: "",
            // language_code: "",
            voice_code: "",
            sample_voice_url: "",
            avatar_url: ""
          };
          this.makeToast("success", "voice edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteVoice(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteVoice", id)
        .then((res) => {
          console.log(res);
          this.getAllVoices();
          this.makeToast("success", "voice deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getAllLanguages() {
      this.$store
        .dispatch("getAllVoiceLanguages")
        .then((res) => {
          var data = res.data.response.data.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          for (var i = 0; i < data.length; i++) {

            this.language_option.push({
              text: data[i].name,
              value: data[i].id
            });
          }


        })
        .catch((error) => {
          console.log(error);

        });
    },
    openEditModal(id, data) {
      this.$bvModal.show("modal-new-voice");
      this.triggerEdit = true;
      this.editId = id;
      console.log(data)

      this.voiceData = {
        name: data.name,
        // engine: data.engine,
        gender: data.gender,
        language_id: data.language_id,
        description: data.description,
        pitch: data.pitch,
        speaking_rate: data.speaking_rate,
        // language_code: data.language_code,
        voice_code: data.voice_code,
        sample_voice_url: data.sample_voice_url,
        avatar_url: data.avatar_url
      }
    },
    clearField() {
      this.voiceData = {
        name: "",
        engine: null,
        gender: null,
        language_id: null,
        description: "",
        pitch: "",
        speaking_rate: "",
        // language_code: "",
        voice_code: "",
        sample_voice_url: "",
        avatar_url: ""
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.voiceData.name = data;
    },
  },

  mounted() {
    this.getAllLanguages();
    this.getAllVoices();
  },
};
</script>
  
<style>
.avatar_view {
  width: 1.5rem;
}

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
  