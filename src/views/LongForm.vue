<template>
  <div class="container-fluid px-0">
    <loader-modal :loading-state="this.$store.state.loading"></loader-modal>
    <div class="flex-main-wrap">
      <sidebar :user-name="this.$store.state.user.first_name" current-active="long-form"></sidebar>
      <div class="content-section">
        <navbar></navbar>
        <div class="scroll-content">
          <div class="container">
            <div class="d-flex flex-wrap">
              <div class="dashboard-top">
                <h6 class="title">Long-Form Template</h6>
              </div>

              <div class="select-script-forms">

                <div class="search-form">
                  <button class="btn search-btn">
                    <i class="flaticon-loupe icons"></i>
                  </button>
                  <input v-model="searchKey" @input="searchKeyWord" class="form-control no-shadow search-input"
                    type="text" placeholder="Search" />
                </div>
              </div>
            </div>


            <!-- <div v-if="searchResult.length > 0" class="row mb-5">
              <script-select-type-box v-for="scriptType in searchResult" :key="scriptType.id" :img-url="
                scriptType.icon
                  ? scriptType.icon
                  : require(`@/assets/icons/convert-icon/Aweber.svg`)
              " :link-url="
  $route.params.id
    ? {
      name: 'CampaignCreateScript',
      params: {
        campaignId: $route.params.id,
        id: scriptType.id,
      },
    }
    : {
      name: 'CreateScript',
      params: { id: scriptType.id },
    }
" :type-title="scriptType.name" :desc="scriptType.description"></script-select-type-box>
            </div> -->
            <div class="row mb-5">
              <script-select-type-box :img-url="require(`@/assets/icons/blog 1.svg`)"
                :link-url="{ name: 'BlogPostWriter' }" type-title="Blog Post Writer"
                desc="Write SEO blog post that hook and educate your reader with a few input."></script-select-type-box>

              <script-select-type-box :img-url="require(`@/assets/icons/book 1.svg`)" type-title="Book Writer"
                desc="Write a well researched and detailed book for your audience." :no-link="true">
                <div class="soon_text">Coming Soon</div>
              </script-select-type-box>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/TheSidebar.vue";
import Navbar from "@/components/TheNav.vue";
import ScriptSelectTypeBox from "@/components/ScriptSelectTypeBox";

export default {
  name: "SelectScript",
  components: {
    Sidebar,
    Navbar,
    ScriptSelectTypeBox,
  },
  data() {
    return {
      searchKey: "",
      searchResult: [],
      scriptTypes: [],
      categoryOptions: [{ value: null, text: "All Categories (0)" }],
      categories: [],
      category: null,
      totalScripts: 0,
    };
  },
  methods: {
    searchKeyWord() {
      this.$store
        .dispatch("search", {
          endpoint: "/api/v1/script-types",
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
    getScriptType() {
      this.$store.commit("updateLoadState", true);
      this.$store
        .dispatch("getScriptTypes")
        .then((res) => {
          // this.$set(this.categoryOptions, 0, {
          //   value: null,
          //   text: "All Categories (" + res.data.data.length + ")",
          // });
          this.totalScripts = res.data.data.length;
          this.scriptTypes = res.data.data;

          // console.log(res.data);
          this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("updateLoadState", false);
        });
    },
    getCategories() {
      this.$store
        .dispatch("getAllCategories")
        .then((res) => {
          //this.categoryOptions = res.data.data;

          this.categories = res.data.data.reverse();

          // cat.forEach(function (data) {
          //   console.log( "cat data " + data);
          //   this.categoryOptions.push({ value: data.id, text: data.name });
          // });

          // for (let index = 0; index < this.categories.length; index++) {
          //   this.categoryOptions.push({
          //     value: this.categories[index].id,
          //     text: this.categories[index].name + " (" + this.categories[index].scripts + ")",
          //   });
          // }



          // this.$store.commit("updateLoadState", false);
        })
        .catch((error) => {
          console.log(error);
          //this.loading = false;
          this.$store.commit("updateLoadState", false);
        });
    },
    setActiveCategory(cat) {
      this.category = cat;
    },
    resetCategory() {
      this.category = null;
    }
  },
  computed: {
    filteredCategory() {
      return this.scriptTypes.filter((cat) => {
        // return this.category == cat.script_type_category;
        // console.log(cat);
        // for (var i = 0; i < cat.script_type_category.length; i++) {
        //   console.log(i);
        //   console.log(cat.script_type_category.length);
        //   return this.category == cat.script_type_category[i].id;
        // }
        return cat.script_type_category.some((id) => {
          // console.log(id)
          return this.category == id.id;
        });
      });
    },
  },
  mounted() {
    this.getScriptType();
    this.getCategories();
  },
};
</script>

<style>
.soon_text {
  background-color: red;
  color: #fff;
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.3rem;
  width: 83px;
  text-align: center;
  border-radius: 1rem;
}
</style>

<style scoped>
.template-categories-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.category-item {
  border: 1px solid #566677;
  font-size: 0.9rem;
  color: #566677;
  cursor: pointer;
  padding: 0.2rem 0.75rem;
  margin: 0 1rem 1rem 0;
  font-weight: 500;
  border-radius: 1rem;
  transition: all 0.5s;
}


.category-item:hover,
.category-item.active {
  border-color: rgb(131 56 236);
  background-color: rgb(131 56 236);
  color: #fff;
}
</style>
