<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap justify-content-center">
      <div class="form-section w-100">
        <div class="login-form-wrap">
          <div class="d-flex justify-content-center mb-5">
            <img
              class="img-logo"
              src="../assets/image/Logo.svg"
              alt="Logo Image"
            />
          </div>

          <h1 class="title">Redirecting Please Wait...</h1>
         

           <p>If you are not redirected in 5 seconds, <a class="btn btn-primary ml-3" :href="link">click here</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpgradeRedirect",
  data() {
    return {
      link: ""
    };
  },
  mounted: function () {
    this.getUpgradeLink(this.$route.params.id);
  },
  methods: {
     getUpgradeLink(id) {
      this.$store
        .dispatch("getPlanUpgradeLink", id)
        .then((res) => {
          this.link = res.data.data.upgrade_url;

          let meta = document.createElement("meta");
          meta.setAttribute("http-equiv", "refresh");
          meta.setAttribute("content", "1; URL=" + this.link);

          document.head.appendChild(meta);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
p {
  color: #000;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}
</style>