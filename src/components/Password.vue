<template>
  <div class="form-group">
    <label for="my-input">{{ label }}</label>
    <div class="custom-pwd-box">
      <input
        id="my-input"
        class="form-control no-shadow input-signin"
        :type="isText ? 'text' : 'password'"
        name=""
        v-model="password"
        @input="$emit('input', password)"
      />
      <a data-toggle="pwd" href="#">
        <img
          @click="toggleText()"
          src="@/assets/icons/convert-icon/visibility.svg"
          alt="visibitity"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Password",
  props: {
      label: String,
      
  },
  computed: {
   
  },
  data() {
    return {
      isText: false,
      password: ''
    };
  },

  methods: {
    toggleText: function () {
      this.isText = !this.isText;
    },
  },
};
</script>

<style scoped>
</style>