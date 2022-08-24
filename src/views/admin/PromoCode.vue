<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="promo-code"></sidebar>
      <div class="content-section">
        <navbar :remove-content="true"></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-5
              ">
              <h6 class="title">Promo Code ({{ codeLength }})</h6>
              <div class="d-flex align-items-center">
                <a href="http://api.onecopy.ai/api/v1/export/excel/model?model=User&type=Admin&export=UsersExport"
                  target="_blank" class="btn btn-border-secondary no-shadow" to="/agency/setup">
                  Used Code
                </a>
                <button @click="clearField" class="btn btn-create" v-b-modal.modal-new-user>
                  <span>+</span>
                  New Codes
                </button>
              </div>
            </div>

            <div class="content-wrap set-min-h pt-4 pb-5">
              <div class="search-form mb-2">
                <button class="btn search-btn">
                  <i class="flaticon-loupe icons"></i>
                </button>
                <input @input="searchKeyWord" class="form-control no-shadow search-input" type="text"
                  placeholder="Search" v-model="searchKey" />
              </div>
              <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
              <div v-if="codes.length === 0" class="no-data-info">
                Created Promo Code will display here.
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody v-if="searchResult.length > 0">
                  <tr v-for="result in searchResult" :key="result.id">
                    <td scope="row">{{ result.code }}</td>
                    <td class="text-left">{{ result.role_name }}</td>
                    <td>
                      {{ result.is_active ? 'Used' : 'Available' }}
                    </td>
                    <td>
                      {{ result.email }}
                    </td>
                    <td>
                      <dropdown-tool @edit-clicked="
                        openEditModal(result.id, {
                          role_id: result.role_id,
                         code: result.code,
                        })
                      " @delete-proceed="deletePromoCode(result.id)" delete-what="Code">
                      </dropdown-tool>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="codes && searchKey.length < 1">
                  <tr v-for="code in codes" :key="code.id">
                    <td scope="row">{{ code.code }}</td>
                    <td class="text-left">{{ code.role_name }}</td>
                    <td>
                      {{ code.is_active ? 'Used' : 'Available' }}
                    </td>
                    <td>
                      {{ code.email }}
                    </td>

                    <td class="text-center">
                      <dropdown-tool @edit-clicked="
                        openEditModal(code.id, {
                          role_id: code.role_id,
                          code: code.code,
                        })
                      " @delete-proceed="deletePromoCode(code.id)" delete-what="Code">

                      </dropdown-tool>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center">
              <b-pagination v-model="currentPage" :total-rows="codeLength" :per-page="perPage" aria-controls="my-table"
                size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">" @change="handlePageChange">
              </b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal :hide-header="true" id="modal-new-user" centered size="md" :hide-footer="true" dialog-class="control-width"
      content-class="modal-main">


      <b-form-group label="Plan">
        <b-form-select v-model="codeData.role_id" :options="optionsRole"></b-form-select>
      </b-form-group>
      <b-form-group label="Paste Multiple Codes(Seperated by comma)">
        <b-form-textarea id="textarea" v-model="codeData.code" rows="3" max-rows="6">
        </b-form-textarea>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-user')" class="close-modal">Close</b-button>
        <b-button @click="triggerEdit ? editPromoCode(editId) : addPromoCode()" class="save-modal">{{ triggerEdit ? "Edit" :
            "Add Purchase Code"
        }}</b-button>
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
  name: "PromoCode",
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
      codes: [],
      codeLength: 0,
      codeData: {
        role_id: null,
        code: ""
      },
      error: "",
      triggerEdit: false,
      editId: null,
      optionsRole: [
        { value: null, text: "Select a Plan" },
      ],

      optionsPlan: [{ text: "", value: "" }],
      roles: [],
    };
  },
  methods: {
    b64toBlob(b64Data, contentType = "", sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/admin/users",
          keyword: this.searchKey,
        })
        .then((res) => {
          this.searchResult = res.data.data;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    getSharedPlans() {
      this.$store
        .dispatch("getAllRoles")
        .then((res) => {
          this.roles = res.data;
          this.filterRoles(this.roles);

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {

          console.log(error);

          this.$store.commit("updateLoadState", false);
        });
    },
    filterRoles(roles) {
      roles.forEach((role) => {
        this.optionsRole.push({
          text: role.name.toUpperCase(),
          value: role.id,
        });
      });
    },

    getAllPromoCode() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllPromoCodes", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.codes = res.data.response.data;
          this.codeLength = res.data.response.meta.total;

          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    addPromoCode() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-user");
      this.$store
        .dispatch("addPromoCode", this.codeData)
        .then(() => {

          this.getAllPromoCode();
          this.codeData = {
            role_id: null,
            code: ""
          };
          this.makeToast("success", "Code(s) added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editPromoCode(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-user");
      this.$store
        .dispatch("editPromoCode", {
          id: id,
          data: this.codeData,
        })
        .then((res) => {
          console.log(res);
          this.getAllPromoCode();
          this.codeData = {
            role_id: null,
            code: ""
          };
          this.makeToast("success", "Code edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error);
          this.error = error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deletePromoCode(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deletePromoCode", id)
        .then((res) => {
          console.log(res);
          this.getAllPromoCode();
          this.makeToast("success", "Code deleted successfully");
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
     
      this.$bvModal.show("modal-new-user");
      this.triggerEdit = true;
      this.editId = id;
      
     this.codeData = {
        role_id: data.role_id,
        code: data.code
      };


     

     
    },
    clearField() {
      this.codeData = {
        role_id: null,
        code: ""
      };
      this.triggerEdit = false;
    },

    handlePageChange(value) {
      this.currentPage = value;
      this.getAllPromoCode();
      console.log("Value: " + value);
    },
  },

  mounted() {
    this.getAllPromoCode();
    this.getSharedPlans();
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

.custom-control-inline {
  margin-bottom: 1rem;
}
</style>
