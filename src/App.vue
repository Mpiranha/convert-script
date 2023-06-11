<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
  //  created: function () {
  //   this.$http.interceptors.response.use(undefined, function (err) {
  //     return new Promise(function (resolve, reject) {
  //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //         this.$store.dispatch('logout')
  //       }
  //       throw err;
  //     });
  //   });
  // }
  // mounted: function () {
  //   if (this.$store.getters.isAuthenticated) {
  //     console.log("Authenticated");
  //     this.$store.dispatch("getUser");
  //   }
  // },
  mounted: function () {
    if (!this.$route.meta.adminAuth) {
      let supportChat = document.createElement("script");
      supportChat.setAttribute("id", "helpspace-widget-script");
      supportChat.setAttribute("data-auto-init", "true");
      supportChat.setAttribute(
        "data-token",
        "4QknI814I1IYOI7B9psPtLbddeOal1Dbf2JBBo5H"
      );
      supportChat.setAttribute(
        "data-client-id",
        "f721cf3bb2f545eaa3291e048876f304"
      );
      supportChat.setAttribute(
        "data-widget-id",
        "f3be669a-84c0-4060-937d-d16abfce6dc0"
      );
      supportChat.setAttribute(
        "src",
        "https://cdn.helpspace.com/widget/widget-v1.js"
      );
      supportChat.setAttribute("async", "true");
      document.head.appendChild(supportChat);
    }

    this.$store.dispatch("getUser");




  },
  computed: {
    userFirstName() {
      return this.$store.state.user.first_name;
    },
    userLastName() {
      return this.$store.state.user.last_name;
    }
  }
};
</script>

<style src="@/assets/css/style.css">

</style>
