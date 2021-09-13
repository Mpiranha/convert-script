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
};
</script>

<style src="@/assets/css/style.css">
</style>
