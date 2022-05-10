<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.first_name"
        current-active="tutorials"
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
              <h6 class="title mb-0">Tutorials</h6>
              <div class="d-flex align-items-center">
                <button
                  @click="clearField"
                  class="btn btn-create"
                  v-b-modal.modal-new-video
                >
                  <span>+</span>
                  New Video
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
              <div v-if="videos.length === 0" class="no-data-info">
                Created Tutorials will display here.
              </div>
              <table v-else class="table table-custom">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody v-if="searchResult.length > 0">
                  <tr v-for="result in searchResult" :key="result.id">
                    <td scope="row">{{ result.title }}</td>

                    <td class="text-right">
                      <dropdown-tool
                        @edit-clicked="openEditModal(result.id, video)"
                        @delete-proceed="deleteVideo(result.id)"
                        delete-what="Tutorial"
                      >
                      </dropdown-tool>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="videos && searchKey.length < 1">
                  <tr v-for="video in videos" :key="video.id">
                    <td scope="row">{{ video.title }}</td>

                    <td class="text-right">
                      <dropdown-tool
                        @edit-clicked="openEditModal(video.id, video)"
                        @delete-proceed="deleteVideo(video.id)"
                        delete-what="Tutorial"
                      >
                      </dropdown-tool>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center">
              <b-pagination
                v-model="currentPage"
                :total-rows="videoLength"
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
      id="modal-new-video"
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
          v-model="videoData.title"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Description">
        <b-form-textarea
          id="name"
          v-model="videoData.description"
          type="text"
          class="input-table"
          rows="3"
        >
        </b-form-textarea>
      </b-form-group>

      <b-form-group label="Youtube URL">
        <b-form-input
          id="name"
          v-model="videoData.link"
          type="text"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button @click="$bvModal.hide('modal-new-video')" class="close-modal"
          >Close</b-button
        >
        <b-button
          @click="triggerEdit ? editVideo(editId) : addVideo()"
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
import orderSort from "@/mixins/orderSort";

export default {
  name: "Tutorials",
  mixins: [alertMixin, orderSort],
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
      videos: [],
      videoLength: 0,
      videoData: {
        title: "",
        description: "",
        link: "",
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
          endpoint: "/api/v1/admin/tutorials",
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
    getAllVideos() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getAllVideos", {
          number: this.currentPage,
          perPage: this.perPage,
        })
        .then((res) => {
          this.videos = res.data.data;
          this.videoLength = res.data.meta.total;
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
    addVideo() {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-video");
      this.$store
        .dispatch("addVideo", this.videoData)
        .then((res) => {
          console.log(res);
          this.getAllVideos();
          this.videoData = {
            title: "",
            description: "",
            link: "",
          };
          this.makeToast("success", "Video added successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    editVideo(id) {
      this.$store.commit("updateLoadState", true);
      this.$bvModal.hide("modal-new-video");
      this.$store
        .dispatch("editVideo", {
          id: id,
          data: this.videoData,
        })
        .then((res) => {
          console.log(res);
          this.getAllVideos();
          this.videoData = {
            title: "",
            description: "",
            link: "",
          };
          this.makeToast("success", "Video edited successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log("error: " + error.response.data.message);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
    },
    deleteVideo(id) {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("deleteVideo", id)
        .then((res) => {
          console.log(res);
          this.getAllVideos();
          this.makeToast("success", "Video deleted successfully");
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
          this.makeToast("danger", this.error);
          this.$store.commit("updateLoadState", false);
        });
      // this.$store
      //   .dispatch("deleteAgency", id)
      //   .then((res) => {
      //     this.error = null;
      //     this.getAgency();
      //     console.log(res.data);
      //     //   this.loading = false;
      //      this.$store.commit("updateLoadState", false);
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //     //   this.loading = false;
      //      this.$store.commit("updateLoadState", false);
      //     // this.error = error.response.data.errors.root;
      //     // this.error = error;
      //   });

      // this.getCampaign();
    },

    openEditModal(id, data) {
      this.$bvModal.show("modal-new-video");
      this.triggerEdit = true;
      this.editId = id;
      this.videoData.title = data.title;
      this.videoData.description = data.description;
      this.videoData.link = data.link;
    },
    clearField() {
      this.videoData = {
        title: "",
        description: "",
        link: "",
      };
      this.triggerEdit = false;
    },
    getCurrent(data) {
      this.client.name = data;
    },
    handlePageChange(value) {
      this.currentPage = value;
      this.getAllVideos();
      console.log("Value: " + value);
    },
  },

  mounted() {
    this.getAllVideos();
  },
  computed: {
    orderedVideo() {
      return this.orderSort(this.videos);
    },
  },
};
</script>

<style>
.sec-padding {
  padding-left: 200px;
  padding-right: 200px;
}
</style>
