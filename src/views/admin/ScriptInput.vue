<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar
        :user-name="this.$store.state.user.name"
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
              <button class="btn btn-create py-2">Save</button>
            </div>
          </div>

          <div class="content-wrap set-min-h">
            <div class="row set-min-h input-main-container">
              <div class="col-6 py-3 pl-4 bordered-right">
                <div class="title">Backend Input</div>
                <b-form-group label-class="input-label" label="Prompt 1">
                  <b-form-input id="name" type="text" class="input-table">
                  </b-form-input>
                </b-form-group>
                <b-form-group label-class="input-label" label="Prompt 2">
                  <b-form-input id="name" type="text" class="input-table">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  label="Engine"
                  label-for="pwd"
                  label-class="input-label"
                >
                  <b-form-select
                    class="input-table"
                    v-model="data"
                    :options="sendOptions"
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
                  <b-form-input id="name" type="text" class="input-table">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  label-class="input-label"
                  label="Top P (0.00 - 1.00)"
                >
                  <b-form-input id="name" type="text" class="input-table">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  label-class="input-label"
                  label="Frequency Penalty (0.00 - 1.00)"
                >
                  <b-form-input id="name" type="text" class="input-table">
                  </b-form-input>
                </b-form-group>
                <b-form-group label-class="input-label" label="Best of (1-20)">
                  <b-form-input id="name" type="text" class="input-table">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  label="Show Probabilities"
                  label-class="input-label"
                >
                  <b-form-select
                    class="input-table"
                    v-model="data"
                    :options="sendOptions"
                  ></b-form-select>
                </b-form-group>
              </div>
              <div class="col-6 py-3 pr-4">
                <div class="title">User Input</div>
                <div
                  v-for="(input, index) in inputs"
                  :key="index"
                  class="input-box"
                >
                  <div class="row">
                    <div class="col-8">
                      <b-form-group label-class="input-label" label="Label">
                        <b-form-input
                          id="name"
                          type="text"
                          v-model="input.value.label"
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
                          v-model="input.value.fieldType"
                          :options="sendOptions"
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
                      v-model="input.value.placeholderText"
                      id="name"
                      type="text"
                      class="input-table"
                    >
                    </b-form-input>
                  </b-form-group>
                  <div class="d-flex justify-content-end">
                    <button class="btn btn-delete no-shadow">Delete</button>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button @click="addInput" class="btn btn-add-input">+</button>
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
import Sidebar from "@/components/admin/TheSidebarAdmin.vue";
import Navbar from "@/components/TheNav.vue";
import alertMixin from "@/mixins/alertMixin";

export default {
  name: "Users",
  mixins: [alertMixin],
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      file: null,
      users: [
        {
          email: "test@gmail.com",
          firstName: "Test",
          lastName: "Test",
          status: false,
          plan: ["FE", "0T1"],
          created_at: "04/09/2021",
        },
        {
          email: "test@gmail.com",
          firstName: "Test",
          lastName: "Test",
          status: false,
          plan: ["FE", "0T1"],
          created_at: "04/09/2021",
        },
      ],
      userData: {
        name: "",
        email: "",
      },
      error: "",
      triggerEdit: false,
      editId: null,
      selectedPlan: [], // Must be an array reference!
      selectedRole: null,
      optionsRole: [
        { value: null, text: "Select a Role" },
        { value: "User", text: "User" },
        { value: "Admin", text: "Admin" },
      ],
      optionsPlan: [
        { text: "FE", value: "FE" },
        { text: "0T01", value: "0T01" },
        { text: "0T02", value: "0T02" },
        { text: "0T03", value: "0T03" },
        { text: "0T04", value: "0T04" },
      ],
      inputs: [],
    };
  },
  methods: {
    addInput() {
      this.inputs.push({
        value: {
          label: "",
          fieldType: "",
          placeholderText: "",
        },
      });
    },
  },

  mounted() {
    this.addInput();
  },
  computed: {},
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

.btn-add-input {
  font-size: 1.5rem !important;
  color: #566677 !important;
  border: 1px dashed #474e56 !important;
  padding: 0.075rem 0.75rem !important;
}
</style>
