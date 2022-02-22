<template>
  <div class="col-4">
    <div class="box-wrap">
      <img class="img-icon" :src="imgUrl" />
      <h6 class="title">{{ typeTitle }}</h6>
      <p class="desc">{{ desc }}</p>
      <router-link :to="linkUrl">
        Get Started
        <span>
          <img
            class="arrow-icon"
            src="@/assets/icons/convert-icon/keyboard.svg"
            alt=""
          />
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeTitle: String,
    desc: String,
    linkUrl: Object,
    imgUrl: String,
  },
};
</script>


<style scoped>
.box-wrap {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  padding: 1rem 5rem 1rem 0.7rem;
  box-shadow: 2px 1px 2px #d9d2d2, -1px 2px 2px #d9d2d2;
  height: 230px;
  /* max-width: 284px; */
}

.box-wrap .img-icon {
  width: 2.5rem;
  margin-bottom: 0.5rem;
}

.box-wrap .title {
  font-size: 0.9rem;
  font-weight: bold;
}

.box-wrap .desc {
  font-size: 0.9rem;
  color: #79869d;
}
.box-wrap a {
  color: #8338ec !important;
  margin-top: auto;
  font-size: 0.85rem;
  text-decoration: none !important;
}

.box-wrap a span .arrow-icon {
  width: 1rem;
}

.box-wrap a span {
  transition: all 0.5s linear;
}

.box-wrap a:hover span {
  margin-left: 0.5rem;
}
</style>