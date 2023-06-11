<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="audio-prompt"></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="sec-padding">
              <div class="
                    dashboard-top
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-5
                  ">
                <h6 class="title">Chat prompt</h6>
                <div class="d-flex align-items-center">
                  <button @click="clearField" class="btn btn-create" v-b-modal.modal-new-prompt>
                    <span>+</span>
                    Add New
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
                <div v-if="chatPrompts.length === 0" class="no-data-info">
                  Created chat prompts will display here.
                </div>
                <table v-else class="table table-custom">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th class="text-center">Prompt</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="searchResult.length > 0">
                    <tr v-for="result in searchResult" :key="result.id">
                      <td scope="row">{{ result.name }}</td>

                      <td>{{ result.prompt }}</td>
                      <td>
                        <dropdown-tool @edit-clicked="openEditModal(result.id, {
                          name: result.name,
                        })
                          " @delete-proceed="deletePrompt(result.id)" delete-what="prompt">
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="chatPrompts && searchKey.length < 1">
                    <tr v-for="prompt in chatPrompts" :key="prompt.id">
                      <td scope="row">{{ prompt.name }}</td>
                      <td class="text-center">{{ prompt.prompt }}</td>
                      <td>
                        <dropdown-tool @edit-clicked="openEditModal(prompt.id, prompt)
                          " @delete-proceed="deletePrompt(prompt.id)" delete-what="prompt">
                        </dropdown-tool>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-center">
                <b-pagination v-model="currentPage" :total-rows="promptLength" :per-page="perPage"
                  aria-controls="my-table" size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">"
                  @change="handlePageChange"></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :hide-header="true" id="modal-new-prompt" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">
      <!-- <div class="modal-head">
          <h3 class="title">Give your campaign a name</h3>
          <p class="desc">Only you can see this</p>
        </div> -->

      <b-form-group label="Name">
        <b-form-input id="name" v-model="promptData.name" type="text" class="input-table">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Prompt">
        <b-form-textarea id="name" v-model="promptData.prompt" type="text" class="input-table" rows="4">
        </b-form-textarea>
      </b-form-group>

      <b-form-group label="Category" label-class="input-label">
        <b-form-select class="input-table" v-model="promptData.script_type_category_id"
          :options="categoryOptions"></b-form-select>
      </b-form-group>



      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-prompt')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editPrompt(editId, promptData) : addPrompt()
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
  name: "prompt",
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
      promptLength: 0,
      chatPrompts: [],
      promptData: {
        name: "",
        prompt: "",
        script_type_category_id: null
      },
      categoryOptions: [
        {
          value: null,
          text: "None",
        },
      ],
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllChatPrompts();
      console.log("Value: " + value);
    },
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/script-type-categories",
          keyword: this.searchKey,
        })
        .then((res) => {
          this.searchResult = res.data.data;

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
    getAllChatPrompts() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getChatPrompts")
        .then((res) => {
          this.chatPrompts = res.data.response.data;
          // this.rolesLength = res.data.meta.total;
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
    addPrompt() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-prompt");
      this.$store
        .dispatch("addChatPrompt", this.promptData)
        .then((res) => {
          console.log(res);
          this.getAllChatPrompts();
          this.promptData = {
            name: "",
            prompt: "",
            script_type_category_id: null
          };
          this.makeToast("success", "prompt added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editPrompt(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-prompt");
      this.$store
        .dispatch("editChatPrompt", {
          id: id,
          data: this.promptData,
        })
        .then((res) => {
          console.log(res);
          this.getAllChatPrompts();
          this.promptData = {
            name: "",
            prompt: "",
            script_type_category_id: null
          };
          this.makeToast("success", "prompt edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deletePrompt(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteChatPrompt", id)
        .then((res) => {
          console.log(res);
          this.getAllChatPrompts();
          this.makeToast("success", "prompt deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
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

    openEditModal(id, data) {
      this.$bvModal.show("modal-new-prompt");
      this.triggerEdit = true;
      this.editId = id;
      this.promptData = data;
    },
    clearField() {
      this.promptData = {
        name: "",
        prompt: "",
        script_type_category_id: null
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.promptData.name = data;
    },
  },

  mounted() {
    this.getAllChatPrompts();
    this.getCategories();
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
  