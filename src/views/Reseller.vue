<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap">
      <sidebar current-active="reseller"></sidebar>
      <div class="content-section">
        <navbar></navbar>
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
            <h6 class="title">Reseller</h6>

            <button class="btn btn-create" v-b-modal.modalPopover>
              <span>+</span>
              New Account
            </button>
          </div>

          <div class="content-wrap pt-4 pb-5">
            <div class="search-form">
              <button class="btn search-btn">
                <i class="flaticon-loupe icons"></i>
              </button>
              <input
                class="form-control no-shadow search-input"
                type="text"
                placeholder="Search"
              />
            </div>

            <div class="sort-wrap">
              <div class="acct-desc">2/50 Account</div>

              <select class="sort-select" name="" id="">
                <option selected>Sort</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <table class="table table-custom">
              <tbody>
                <tr>
                  <td scope="row">John Doe</td>
                  <td>Active</td>
                  <td>john@gmail.com</td>
                  <td>05/072021</td>
                  <td>
                    <b-dropdown
                      offset="-30"
                      toggle-class="no-shadow drop-toogle-btn"
                      menu-class="drop-main-wrap"
                      size="sm"
                      no-caret
                    >
                      <template #button-content>
                        <i class="flaticon-menu icons"></i>
                      </template>
                      <b-dropdown-item link-class="drop-link" href="#">
                        <i class="flaticon-pencil icons table-drop-icon"></i>
                        Edit
                      </b-dropdown-item>
                      <b-dropdown-item link-class="drop-link" href="#">
                        <i class="flaticon-trash icons table-drop-icon"></i>
                        Delete
                      </b-dropdown-item>
                    </b-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      :hide-header="true"
      id="modalPopover"
      centered
      size="md"
      :hide-footer="true"
      dialog-class="control-width"
      content-class="modal-main"
    >
      <b-form-group label="Name" label-for="name" label-class="form-label">
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Name"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Email" label-for="email" label-class="form-label">
        <b-form-input
          id="email"
          v-model="form.email"
          type="text"
          placeholder="user@domain.com"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="pwd" label-class="form-label">
        <b-form-input
          id="password"
          v-model="form.pwd"
          type="password"
          class="input-table"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Access" label-for="pwd" label-class="form-label">
        <b-form-select
          class="input-table"
          v-model="form.access"
          :options="accessOptions"
        ></b-form-select>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button class="close-modal">Close</b-button>
        <b-button class="save-modal">Save</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        pwd: "",
        access: "null",
      },
      accessOptions: [{ value: null, text: "Select Plans" }],
    };
  },
};
</script>

<style>
.save-btn {
  background-color: pink;
}

.modal-main {
  border-radius: 0.5rem !important;
}

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

.drop-main-wrap {
  min-width: 6rem !important;
  font-size: 0.8rem !important;
  box-shadow: -3px 3px 6px #eee;
}

.form-label {
  font-size: 0.9rem;
}

.input-table {
  border: 1px solid #c2c8d1 !important;
  font-size: 0.9rem !important;
  border-radius: 0.5rem !important;
  width: 100%;
  padding: 0.55rem 0.75rem;
}

.control-width {
  max-width: 420px !important;
}

.form-group {
  margin-bottom: 0.7rem;
}

.close-modal, .save-modal {
  font-size: 0.8rem !important;
  padding: 0.45rem 1.5rem !important;
  border: none !important;
  border-radius: 0.5rem !important;
}

.close-modal {
margin-right: 0.8rem;
color: #8338ec !important;
background-color: #fff !important;
border: 1px solid #8338ec !important;
}

.save-modal {
background-color: #8338ec !important;
color: #fff !important;
}
</style>
