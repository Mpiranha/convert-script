<template>
  <b-dropdown offset="-30" toggle-class="no-shadow drop-toogle-btn" menu-class="drop-main-wrap" size="sm" no-caret>
    <template #button-content>
      <i class="flaticon-menu icons"></i>
    </template>
    <!-- <router-link class="nav-link" :to="{ path: '/campaign', params: { id: 1 } }">
      Account
    </router-link> -->
    <b-dropdown-item :class="hideEdit ? 'hide' : ''" @click="editAction" link-class="drop-link" href="#" v-if="!noEdit">
      <i class="flaticon-pencil icons table-drop-icon"></i>
      Edit
    </b-dropdown-item>
    <b-dropdown-item :class="hideDelete ? 'hide' : ''" @click="modalShow = !modalShow" link-class="drop-link" href="#" v-if="!noDelete">
      <i class="flaticon-trash icons table-drop-icon"></i>
      Delete
    </b-dropdown-item>
    <slot name="secondary"></slot>

    <b-modal v-model="modalShow" :hide-header="true" id="modal-delete" centered size="md" :hide-footer="true"
      dialog-class="control-width" content-class="modal-main py-3">
      <div class="modal-head text-center mb-4">
        <h3 class="title">
          Are You sure you want to delete this {{ deleteWhat }}?
        </h3>
      </div>

      <div class="d-flex justify-content-center">
        <b-button @click="$bvModal.hide('modal-delete')" class="close-modal">No</b-button>
        <b-button @click="deleteAction" class="save-modal btn-danger">Yes</b-button>
      </div>
    </b-modal>
  </b-dropdown>
</template>

<script>
export default {
  name: "DropdownTool",
  props: ["deleteWhat", "noDelete", "noEdit", 'hideEdit', 'hideDelete'],
  data() {
    return {
      modalShow: false,
    };
  },
  methods: {
    editAction() {
      this.$emit("edit-clicked");
    },
    deleteAction() {
      this.$emit("delete-proceed");
      this.$bvModal.hide("modal-delete");
    },
  },
};
</script>

<style scoped>
.drop-toogle-btn {
  background-color: transparent !important;
  border: none !important;
  color: #000 !important;
  padding: 0.15rem 0.5rem !important;
}

.table-drop-icon::before {
  font-size: 0.9rem;
  margin-right: 0.3rem;
}

.btn-danger {
  background-color: #dc3545 !important;
}

.hide {
  display: none !important;
}
</style>