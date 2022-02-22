<template>
  <div class="container-fluid px-0">
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
              mb-5
            "
          >
            <h6 class="title">All Script Type ({{ scriptTypeLength }})</h6>
            <div class="d-flex align-items-center">
              <button
                @click="clearField"
                class="btn btn-create"
                v-b-modal.modal-new-script
              >
                <span>+</span>
                New Script Type
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
            <div v-if="scriptTypeLength === 0" class="no-data-info">
              Created Script Type will display here.
            </div>
            <table v-else class="table table-custom">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Script Type</th>
                  <th>Usage</th>
                  <th>Status</th>
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody v-if="searchResult.length > 0">
                <tr v-for="result in searchResult" :key="result.id">
                  <td scope="row">{{ result.id }}</td>
                  <td class="text-left">{{ result.name }}</td>
                  <td>{{ result.usage }}</td>
                  <td>
                    <label class="switch mb-0">
                      <input :checked="result.activate" type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <dropdown-tool
                      @edit-clicked="
                        openEditModal(result.id, {
                          name: result.name,
                          desc: result.desc,
                          icon: result.icon,
                        })
                      "
                      @delete-proceed="deleteScriptType(result.id)"
                    >
                      <template v-slot:secondary>
                        <b-dropdown-item
                          v-b-modal.modal-campaign
                          link-class="drop-link"
                          href="#"
                        >
                          <router-link
                            class="drop-link"
                            :to="{
                              name: 'ScriptTypesInput',
                              params: { id: result.id },
                            }"
                          >
                            <img
                              class="drop-img-icon"
                              src="@/assets/icons/admin/sidebar-icon/Input.svg"
                              alt=""
                            />
                            Input
                          </router-link>
                        </b-dropdown-item>
                      </template>
                    </dropdown-tool>
                  </td>
                </tr>
              </tbody>
              <tbody v-else-if="scriptTypes && searchKey.length < 1">
                <tr v-for="scriptType in scriptTypes" :key="scriptType.id">
                  <td scope="row">{{ scriptType.id }}</td>
                  <td class="text-left">{{ scriptType.name }}</td>
                  <td>{{ scriptType.usage }}</td>
                  <td>
                    <label class="switch mb-0">
                      <input :checked="scriptType.activate" type="checkbox" />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <dropdown-tool
                      @edit-clicked="
                        openEditModal(scriptType.id, {
                          name: scriptType.name,
                          desc: scriptType.desc,
                          icon: scriptType.icon,
                        })
                      "
                      @delete-proceed="deleteScriptType(scriptType.id)"
                    >
                      <template v-slot:secondary>
                        <b-dropdown-item
                          v-b-modal.modal-campaign
                          link-class="drop-link"
                          href="#"
                        >
                          <router-link
                            class="drop-link"
                            :to="{
                              name: 'ScriptTypesInput',
                              params: { id: scriptType.id },
                            }"
                          >
                            <img
                              class="drop-img-icon"
                              src="@/assets/icons/admin/sidebar-icon/Input.svg"
                              alt=""
                            />
                            Input
                          </router-link>
                        </b-dropdown-item>
                      </template>
                    </dropdown-tool>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-center">
            <b-pagination
              v-model="currentPage"
              :total-rows="scriptTypeLength"
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

    <b-modal
      :hide-header="true"
      id="modal-new-script"
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

      <b-form-group label="Name">
        <b-form-input
          id="name"
          v-model="scriptTypeData.name"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Description">
        <b-form-textarea
          id="name"
          v-model="scriptTypeData.desc"
          type="text"
          class="input-table"
          rows="4"
        >
        </b-form-textarea>
      </b-form-group>

      <b-form-group label="Upload">
        <b-form-file
          v-model="scriptTypeData.icon"
          :state="Boolean(scriptTypeData.icon)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        >
        </b-form-file>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-script')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editScriptType(editId) : addScriptType()"
          class="save-modal"
          >{{ triggerEdit ? "Edit" : "Add Script" }}</b-button
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
  name: "ScriptType",
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
      perPage: 5,
      currentPage: 1,
      scriptTypes: [],
      scriptTypeLength: 0,
      scriptTypeData: {
        name: "",
        desc: "",
        icon: null,
      },
      error: "",
      triggerEdit: false,
      editId: null,
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/script-type",
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
    getAllScriptType() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllScriptType", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.scriptTypes = res.data.data;
          this.scriptTypeLength = res.data.meta.total;
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
    addScriptType() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-script");

      const formData = new FormData();

      for (const property in this.scriptTypeData) {
        if (property == "icon") {
          console.log();
          formData.append(`${property}`, this.scriptTypeData.icon);
          continue;
        }
        formData.append(`${property}`, `${this.scriptTypeData[property]}`);
      }

      this.$store
        .dispatch("addScriptType", formData)
        .then((res) => {
          console.log(res);
          this.getAllScriptType();
          this.scriptTypeData = {
            name: "",
            desc: "",
            icon: null,
          };
          this.makeToast("success", "ScriptType added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editScriptType(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-video");
      this.$store
        .dispatch("editScriptType", {
          id: id,
          data: this.scriptTypeData,
        })
        .then((res) => {
          console.log(res);
          this.getAllScriptType();
          this.scriptTypeData = {
            name: "",
            desc: "",
            icon: null,
          };
          this.makeToast("success", "Script Type edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteScriptType(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteScriptType", id)
        .then((res) => {
          console.log(res);
          this.getAllScriptType();
          this.makeToast("success", "Script Type deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },

    openEditModal(id) {
      // this.$bvModal.show("modal-new-script");
      // this.triggerEdit = true;
      // this.editId = id;
      // this.scriptTypeData.name = data.name;
      // this.scriptTypeData.desc = data.desc;
      // this.scriptTypeData.icon = data.icon;

      this.$router.push({ name: "ScriptTypesInput", params: { id: id } });
    },
    clearField() {
      this.scriptTypeData = {
        name: "",
        desc: "",
        icon: null,
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.client.name = data;
    },
    orderSort(arr) {
      return arr.sort(function (a, b) {
        return a.id - b.id;
      });
    },
    formatDate(date) {
      var formatedDate = new Date(date);

      return formatedDate.toLocaleDateString();
    },

    handlePageChange(value) {
      this.currentPage = value;
      this.getAllScriptType();
      console.log("Value: " + value);
    },
  },
  mounted() {
    this.getAllScriptType();
  },
  computed: {},
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
