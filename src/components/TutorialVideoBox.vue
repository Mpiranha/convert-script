<template>
  <div class="col-12 col-lg-6">
    <div class="vid-wrap">
      <iframe
        :src="link"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen=""
        frameborder="0"
      ></iframe>

      <div class="vid-info">
        <p class="title">
          {{ title }}
        </p>
        <!-- <a :href="link" target="_blank">
          Watch video
          <span>
            <img
              class="arrow-icon"
              src="@/assets/icons/convert-icon/keyboard.svg"
              alt=""
            />
          </span>
        </a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TutorialVideoBox",
  props: {
    link: {
      type: String,
      required: true,
    },
    title: String,
  },
};
</script>

<style scoped>
.vid-wrap {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  box-shadow: 2px 1px 2px #d9d2d2, -1px 2px 2px #d9d2d2;
}

.vid-wrap .vid-info {
  padding: 0.7rem 2rem 0.7rem 1rem;
}

.vid-wrap .vid-info .title {
  font-size: 1rem;
  color: #79869d;
  margin-bottom: 0.6rem;
}

.vid-wrap iframe {
  width: 100%;
  height: 300px;
  border-radius: 0.4rem 0.4rem 0 0;
}

.vid-info a {
  color: #8338ec;
  font-size: 1rem;
  text-decoration: none !important;
}

.vid-info a span .arrow-icon {
  width: 1rem;
}

.vid-info a span {
  transition: all 0.5s linear;
}

.vid-info a:hover span {
  margin-left: 0.5rem;
}
</style>