<template>
<div class="container-fluid px-0">
    <div class="flex-main-wrap">
        <sidebar :user-name="this.$store.state.user.first_name" current-active="roles"></sidebar>
        <div class="content-section">
            <navbar :remove-content="true"></navbar>
            <div class="container scroll-content">
                <div class="sec-padding">
                    <div class="
                dashboard-top
                d-flex
                justify-content-between
                align-items-center
                mb-5
              ">
                        <h6 class="title mb-0">Set Permissions for {{ role.name }}</h6>
                        <div class="d-flex align-items-center">
                            <button @click="updatePermission($route.params.id)" class="btn btn-create py-2" v-b-modal.modal-new-client>
                                Save
                            </button>
                        </div>
                    </div>

                    <div class="content-wrap set-min-h pt-4 pb-5">
                        <div class="search-form mb-2">
                            <button class="btn search-btn">
                                <i class="flaticon-loupe icons"></i>
                            </button>
                            <input class="form-control no-shadow search-input" type="text" placeholder="Search" />
                        </div>
                        <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
                        <div v-if="permissions.length === 0" class="no-data-info">
                            Permissions will display here.
                        </div>
                        <table v-else class="table table-custom">
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>ID</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(permission, index) in permissions" :key="permission.id">
                                    <td class="">{{ permission.name }}</td>
                                    <td>{{ permission.id }}</td>
                                    <td>
                                        <label class="switch mb-0">
                                            <input :value="permission.name" v-model="select[index].selected" type="checkbox" />
                                            <span class="slider round"></span>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-center">
                        <b-pagination v-model="currentPage" :total-rows="1" :per-page="perPage" aria-controls="my-table" size="sm" :hide-goto-end-buttons="true" prev-text="<" next-text=">" @change="handlePageChange"></b-pagination>
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
    name: "Permission",
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
            permissions: [],
            role: [],
            error: "",
            triggerEdit: false,
            editId: null,
            select: [],
        };
    },
    methods: {
        handlePageChange(value) {
            this.currentPage = value;
            this.getAllPermissions();
            console.log("Value: " + value);
        },
        getRole(id) {
            this.$store
                .dispatch("getOneRole", id)
                .then((res) => {
                    this.role = res.data[0];

                    this.$store.commit("updateLoadState", false);
                })
                .catch((error) => {
                    console.log(error);
                    //this.loading = false;
                    this.$store.commit("updateLoadState", false);
                });
        },
        getAllPermissions() {
            this.$store.commit("updateLoadState", true);
            this.$store
                .dispatch("getAllPermissions")
                .then((res) => {
                    this.permissions = res.data.data;
                    this.updateSelected(res.data.data);
                    this.$store.commit("updateLoadState", false);
                })
                .catch((error) => {
                    console.log(error);
                    this.$store.commit("updateLoadState", false);
                });
        },
        updatePermission(id) {
            this.$store.commit("updateLoadState", true);
            this.$store
                .dispatch("addPermissionsToRole", {
                    id: id,
                    data: {
                        permissions: this.selectedPermissions,
                        type: "permission"
                    },
                })
                .then(() => {
                    this.makeToast("success", "Updated successfully");
                    this.getRole(this.$route.params.id);
                    this.getAllPermissions();
                    this.$store.commit("updateLoadState", false);
                })
                .catch((error) => {
                    console.log(error);
                    this.$store.commit("updateLoadState", false);
                });
        },
        updateSelected(data) {
            this.select = [];
            for (var i = 0; i < data.length; i++) {
                this.select.push({
                    name: data[i].name,
                    selected: this.isPermissionAvailable(data[i].name)
                });
            }
        },
        isPermissionAvailable(elem) {

            console.log(elem);

            let found;

            console.log("before 3 sec " + this.role.permissions);

            if (this.role.permissions) {
                found = this.role.permissions.find((element) => element.name == elem);
            } else {
                setTimeout(() => {
                    console.log("after 3 secs" + this.role.permissions)
                    found = this.role.permissions.find((element) => element.name == elem);
                }, 3000);
            }

            console.log(found);

            if (found) {
                return true;
            } else {
                return false;
            }
        },
    },
    mounted() {
        this.getRole(this.$route.params.id);
        this.getAllPermissions();
    },
    computed: {
        selectedPermissions() {
            return this.select
                .filter(sel => sel.selected)
                .map(sel => sel.name);
        }
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
