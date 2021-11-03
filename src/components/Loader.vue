<template>
  <div v-if="loadingState">
    <div class="loader-modal">
      <img class="loader-img" src="@/assets/image/loader.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadingState: {
      type: Boolean,
    },
  },
};
</script>