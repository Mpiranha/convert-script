<template>
  <div v-if="loadingState" class="loader-modal">
    <img class="loader-img" src="@/assets/image/Rolling-2s-221px.svg" alt="" />
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