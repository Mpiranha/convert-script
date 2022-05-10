<template>
  <div class="container-fluid px-0">
    <div class="flex-main-wrap justify-content-center">
      <div class="form-section">
        <div class="login-form-wrap">
          <div class="d-flex justify-content-center mb-5">
            <img
              class="img-logo"
              src="../assets/image/Logo.svg"
              alt="Logo Image"
            />
          </div>
          <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
            {{message}}
          </b-alert>

          <div class="alert-message">
            A Verification mail has been sent to your email account.
          </div>

          <h1 class="title">Didn't get the mail? Click below.</h1>

          <form action="#" method="post">
            <button
              @click="resendVerificationEmail($event)"
              class="btn btn-block btn-login"
            >
              Resend
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Verify",
  data() {
    return {
      // isText: false,
      error: null,
      message: '',
      showDismissibleAlert: true
    };
  },
  mounted: function () {
    //  if (this.$store.getters.isAuthenticated) {
    //   this.$router.push("/");
    // }
  },
  methods: {
    resendVerificationEmail: function (event) {
      event.preventDefault();

      this.$store
        .dispatch("resendVerificationEmail")
        .then((res) => {
          this.error = null;
          this.message = res.data;
          //   this.$router.push("/").catch(() => {
          //     // console.log(error);
          //   });

          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.error);
          this.error = error.error;
          // this.error = error;
        });
    },
  },
};
</script>

<style scoped>
.alert-message {
  color: green;
  text-align: center;
  margin-bottom: 1rem;
}
</style>