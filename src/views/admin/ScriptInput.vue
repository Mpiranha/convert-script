<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="script-type"
      ></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="container scroll-content">
          <div
            class="
              dashboard-top
              d-flex
              justify-content-between
              align-items-center
              mb-2
            "
          >
            <h6 class="title">Add Input - Script Name</h6>
            <div class="d-flex align-items-center">
              <button
                @click="$route.params.id ? editScript() : addScriptType()"
                class="btn btn-create py-2"
              >
                Save
              </button>
            </div>
          </div>

          <div class="content-wrap set-min-h">
            <form
              ref="scriptForm"
              enctype="multipart/form-data"
              action=""
              method="post"
            >
              <div class="row set-min-h input-main-container">
                <div class="col-6 py-3 pl-4 bordered-right">
                  <b-form-group label="Name" label-class="input-label">
                    <b-form-input
                      id="name"
                      v-model="scriptTypeData.name"
                      type="text"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group label="Description" label-class="input-label">
                    <b-form-textarea
                      id="name"
                      v-model="scriptTypeData.description"
                      type="text"
                      class="input-table"
                      rows="4"
                    >
                    </b-form-textarea>
                  </b-form-group>

                  <b-form-group label="Category" label-class="input-label">
                    <b-form-select
                      class="input-table"
                      v-model="scriptTypeData.script_type_category_id"
                      :options="categoryOptions"
                    ></b-form-select>
                  </b-form-group>

                  <b-form-group label="Upload" label-class="input-label">
                    <b-form-file
                      v-model="icon"
                      :state="Boolean(icon)"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here..."
                      @change="onIconChange($event)"
                    >
                    </b-form-file>
                  </b-form-group>
                  <img
                    class="icon-prev"
                    :src="
                      currentIcon
                        ? currentIcon
                        : '@/assets/icons/convert-icon/Aweber.svg'
                    "
                    alt=""
                  />
                  <hr class="my-4" />
                  <div class="title">Backend Input</div>

                  <b-form-group label-class="input-label" label="Prompt 1">
                    <b-form-input
                      v-model="scriptTypeData.prompt_1"
                      type="text"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group label-class="input-label" label="Prompt 2">
                    <b-form-input
                      v-model="scriptTypeData.prompt_2"
                      type="text"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Engine"
                    label-for="pwd"
                    label-class="input-label"
                  >
                    <b-form-select
                      class="input-table"
                      v-model="scriptTypeData.engine"
                      :options="endineOptions"
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    label-class="input-label"
                    label="Response length (1-2048)"
                  >
                    <b-form-input id="name" type="text" class="input-table">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-class="input-label"
                    label="Temperature (0.00 - 1.00)"
                  >
                    <b-form-input
                      id="name"
                      v-model="scriptTypeData.temperature"
                      type="number"
                      min="0.00"
                      max="1.00"
                      step="0.01"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-class="input-label"
                    label="Top P (0.00 - 1.00)"
                  >
                    <b-form-input
                      id="name"
                      v-model="scriptTypeData.top_p"
                      type="number"
                      min="0.00"
                      max="1.00"
                      step="0.01"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-class="input-label"
                    label="Frequency Penalty (0.00 - 1.00)"
                  >
                    <b-form-input
                      id="name"
                      v-model="scriptTypeData.frequency_penalty"
                      type="number"
                      min="0.00"
                      max="1.00"
                      step="0.01"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-class="input-label"
                    label="Presence Penalty (0.00 - 1.00)"
                  >
                    <b-form-input
                      id="name"
                      v-model="scriptTypeData.presence_penalty"
                      type="number"
                      min="0.00"
                      max="1.00"
                      step="0.01"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-class="input-label"
                    label="Best of (1-20)"
                  >
                    <b-form-input
                      id="name"
                      v-model="scriptTypeData.best_of"
                      type="number"
                      step="1"
                      min="0"
                      max="20"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label-class="input-label"
                    label="Max Tokens (0 - 100)"
                  >
                    <b-form-input
                      id="name"
                      v-model="scriptTypeData.max_tokens"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Show Probabilities"
                    label-class="input-label"
                  >
                    <b-form-select class="input-table"></b-form-select>
                  </b-form-group>
                </div>
                <div class="col-6 py-3 pr-4">
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-between
                      mb-3
                    "
                  >
                    <div class="title mb-0">User Input</div>

                    <div class="d-flex">
                      <b-form-checkbox
                        v-model="scriptTypeData.tone"
                        name="checkbox-tone"
                        :value="1"
                        class="check-text mr-4"
                        :unchecked-value="0"
                      >
                        Tone
                      </b-form-checkbox>
                      <b-form-checkbox
                        v-model="scriptTypeData.language"
                        name="checkbox-language"
                        :value="1"
                        class="check-text"
                        :unchecked-value="0"
                      >
                        Language
                      </b-form-checkbox>
                    </div>
                  </div>

                  <div
                    draggable
                    @dragstart="startDrag($event, index)"
                    @drop="onDrop($event, index)"
                    @dragover.prevent
                    @dragenter.prevent
                    v-for="(
                      script_type_preset, index
                    ) in scriptTypeData.script_type_presets"
                    :key="index"
                    class="input-box"
                  >
                    <div class="row">
                      <div class="col-12">
                        <b-form-group
                          label-class="input-label"
                          label="Question"
                        >
                          <b-form-input
                            v-model="script_type_preset.question"
                            type="text"
                            class="input-table"
                          >
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-8">
                        <b-form-group label-class="input-label" label="Label">
                          <b-form-input
                            id="name"
                            type="text"
                            v-model="script_type_preset.label"
                            class="input-table"
                          >
                          </b-form-input>
                        </b-form-group>
                      </div>
                      <div class="col-4">
                        <b-form-group
                          label="Field Type"
                          label-class="input-label"
                        >
                          <b-form-select
                            class="input-table"
                            v-model="script_type_preset.field_type"
                            :options="fieldOptions"
                          ></b-form-select>
                        </b-form-group>
                      </div>
                    </div>
                    <b-form-group
                      label-class="input-label"
                      label="Placeholder text"
                      class="mb-0"
                    >
                      <b-form-input
                        v-model="script_type_preset.placeholder"
                        id="name"
                        type="text"
                        class="input-table"
                      >
                      </b-form-input>
                    </b-form-group>
                    <div class="d-flex justify-content-end">
                      <button
                        @click="deleteInput($event, index)"
                        class="btn btn-delete no-shadow"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button @click="addInput($event)" class="btn btn-add-input">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "ScriptTypeInput",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      scriptTypeData: {
        script_type_presets: [
          // {
          //   script_type_id: "",
          //   question: "",
          //   field_type: null,
          //   label: "",
          //   placeholder: "",
          // },
        ],
        name: "",
        prompt_1: "",
        prompt_2: "",
        script_type_category_id: "",
        icon: [],
        description: "",
        presence_penalty: "",
        frequency_penalty: "",
        best_of: "",
        stream: "",
        tone: false,
        language: false,
        documents: "",
        query: "",
        max_tokens: "",
        temperature: "",
        top_p: "",
        engine: null,
      },
      error: "",
      endineOptions: [
        { value: null, text: "Select an Engine" },
        { value: "davinci-instruct-beta", text: "davinci-instruct-beta" },
      ],
      fieldOptions: [
        { value: null, text: "None" },
        { value: "text", text: "text" },
        { value: "textarea", text: "textarea" },
        { value: "number", text: "number" },
        { value: "email", text: "email" },
      ],
      categoryOptions: [{ value: null, text: "None" }],
      icon: null,
      iconRes: null,
      currentIcon: null,
      script: [],
    };
  },
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item);
      console.log("drag index " + item);
    },
    onDrop(evt, id) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.scriptTypeData.script_type_presets[itemID];
      const itemTwo = this.scriptTypeData.script_type_presets[id];
      this.$set(this.scriptTypeData.script_type_presets, itemID, itemTwo);
      this.$set(this.scriptTypeData.script_type_presets, id, item);
    },
    getScript(id) {
      this.$store
        .dispatch("getOneScript", id)
        .then((res) => {
          this.script = res.data.data;

          this.updateData(res.data.data);

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getCategories() {
      this.$store
        .dispatch("getAllCategories")
        .then((res) => {
          //this.categoryOptions = res.data.data;

          let cat = res.data.data;

          // cat.forEach(function (data) {
          //   console.log( "cat data " + data);
          //   this.categoryOptions.push({ value: data.id, text: data.name });
          // });

          for (let index = 0; index < cat.length; index++) {
            this.categoryOptions.push({
              value: cat[index].id,
              text: cat[index].name,
            });
          }

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    addInput(event) {
      if (event) {
        event.preventDefault();
      }

      this.scriptTypeData.script_type_presets.push({
        script_type_id: this.$route.params.id ? this.$route.params.id : "",
        question: "",
        field_type: null,
        label: "",
        placeholder: "",
      });
    },
    deleteInput(event, index) {
      event.preventDefault();
      this.scriptTypeData.script_type_presets =
        this.scriptTypeData.script_type_presets.filter(function (value, indx) {
          return indx != index;
        });
    },
    updateData(data) {
      console.log(data);
      this.scriptTypeData.script_type_presets = [];
      console.log("presset length " + data.presets.length);
      for (let i = 0; i < data.presets.length; i++) {
        // console.log(data.presets[i]);
        // this.scriptTypeData.script_type_presets[i].script_type_id = data.id;
        // question: "",
        // field_type: null,
        // label: "",
        // placeholder: "",
        console.log(data.presets[i]);
        this.addInput();
        // this.scriptTypeData.script_type_presets[i].script_type_id =
        //   data.presets[i].id;
        this.scriptTypeData.script_type_presets[i].script_type_id = data.id;
        this.scriptTypeData.script_type_presets[i].question =
          data.presets[i].question;
        this.scriptTypeData.script_type_presets[i].field_type =
          data.presets[i].field_type;
        this.scriptTypeData.script_type_presets[i].label =
          data.presets[i].label;
        this.scriptTypeData.script_type_presets[i].placeholder =
          data.presets[i].placeholder;
      }

      // data.presets.forEach(function (preset, index) {
      //   console.log(preset);
      //   console.log(index);
      //   console.log(this.scriptTypeData.script_type_presets)
      // });

      // console.log(this.scriptTypeData.script_type_presets.length);

      // console.log(data.presets.length);

      this.scriptTypeData.name = data.name;
      this.scriptTypeData.prompt_1 = data.prompt_1;
      this.scriptTypeData.prompt_2 = data.prompt_2;
      this.scriptTypeData.engine = data.engine;
      this.scriptTypeData.temperature = data.temperature;
      // this.scriptTypeData.icon = data.icon;
      this.scriptTypeData.script_type_category_id =
        data.script_type_category;
      this.scriptTypeData.tone = data.tone;
      this.scriptTypeData.language = data.language;
      this.currentIcon = data.icon;
      this.scriptTypeData.description = data.description;
      this.scriptTypeData.presence_penalty = data.presence_penalty;
      this.scriptTypeData.frequency_penalty = data.frequency_penalty;
      this.scriptTypeData.best_of = data.best_of;
      this.scriptTypeData.stream = data.stream;
      this.scriptTypeData.documents = data.documents;
      this.scriptTypeData.query = data.query;
      this.scriptTypeData.max_tokens = data.max_tokens;
      this.scriptTypeData.top_p = data.top_p;

      // this.scriptTypeData = {
      //   script_type_presets: [
      //     {
      //       script_type_id: "",
      //       question: "",
      //       field_type: null,
      //       label: "",
      //       placeholder: "",
      //     },
      //   ],
      //   name: "",
      //   icon: null,
      //   description: "",
      //   presence_penalty: "",
      //   frequency_penalty: "",
      //   best_of: "",
      //   stream: "",
      //   documents: "",
      //   query: "",
      //   max_tokens: "",
      //   temperature: "",
      //   top_p: "",
      //   engine: null,
      // };
    },
    onIconChange(e) {
      console.log(e.target.files[0]);
      const formData = new FormData();

      formData.append("file", e.target.files[0]);
      formData.append("path", "script_type");

      console.log(formData.get("path"));

      //this.scriptTypeData.icon = e.target.files[0];
      // console.log(this.icon);
      this.$store
        .dispatch("uploadIcon", formData)
        .then((res) => {
          console.log(res.data.data);
          this.iconRes = res.data.data;

          // this.scriptTypeData.icon = res.data.data.file_url;
          this.currentIcon = res.data.data.file_url;

          this.makeToast("success", "File Uploaded successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error);
          this.error = error;

          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addScriptType() {
      this.$store.commit("updateLoadState", true);

      if (this.iconRes) {
        this.scriptTypeData.icon = [];
        this.scriptTypeData.icon.push(this.iconRes.id);
      }

      this.$store
        .dispatch("addScriptType", this.scriptTypeData)
        .then((res) => {
          console.log(res);

          

          this.makeToast("success", "Script Type Added successfully");
          this.$router.push({
            name: "ScriptTypes",
          });
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.errors;
          for (const key in this.error) {
            if (Object.hasOwnProperty.call(this.error, key)) {
              //const element = [key];
              if (this.error[key] !== "undefined") {
                this.makeToast("danger", this.error[key]);
              }
            }
          }
          // this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editScript() {
      this.$store.commit("updateLoadState", true);

      if (this.iconRes) {
        this.scriptTypeData.icon = [];
        this.scriptTypeData.icon.push(this.iconRes.id);
      }

      this.$store
        .dispatch("editScriptType", {
          id: this.$route.params.id,
          data: this.scriptTypeData,
        })
        .then((res) => {
          console.log(res);
          this.getScript(this.$route.params.id);

          this.makeToast("success", "Script Type edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.errors;
          for (const key in this.error) {
            if (Object.hasOwnProperty.call(this.error, key)) {
              //const element = [key];
              if (this.error[key] !== "undefined") {
                this.makeToast("danger", this.error[key]);
              }
            }
          }
          // this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
  },

  mounted() {
    if (this.$route.params.id) {
      this.getScript(this.$route.params.id);
    }
    this.getCategories();
  },
  computed: {},
  watch: {
    icon: function () {
      // this.onIconChange(this.$event);
      // console.log(this.icon);
    },
  },
};
</script>

<style>
.input-main-container .title {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-weight: bold;
  color: #474e56;
}

.input-label {
  font-size: 0.8rem !important;
  color: #474e56;
}

.check-text {
  color: #474e56;
}

.input-box {
  border: 1px dashed #474e56;
  border-radius: 0.4rem;
  padding: 0.5rem 0.7rem;
  margin-bottom: 1rem;
}

.input-box .btn-delete {
  font-size: 0.9rem;
  color: blue;
}

.icon-prev {
  width: 40px;
  height: 40px;
}

.btn-add-input {
  font-size: 1.5rem !important;
  color: #566677 !important;
  border: 1px dashed #474e56 !important;
  padding: 0.075rem 0.75rem !important;
}
</style>
