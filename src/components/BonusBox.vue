<template>
  <div class="col-4">
    <div class="box-wrap">
      <h6 class="title">{{ bonusTitle }}</h6>
      <p class="desc">{{ desc }}</p>
      <a :href="bonusLink" target="_blank">
        Download
        <span>
          <img
            class="arrow-icon"
            src="@/assets/icons/convert-icon/keyboard.svg"
            alt=""
          />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bonusTitle: String,
    desc: String,
    bonusLink: String,
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
  padding: 1rem 2rem 1rem 1rem;
  box-shadow: 2px 1px 2px #d9d2d2, -1px 2px 2px #d9d2d2;
  height: 133px;
}

.box-wrap .title {
  font-size: 1.1rem;
  font-weight: bold;
}

.box-wrap .desc {
  font-size: 0.8rem;
  color: #9aa4b5;
}
.box-wrap a {
  color: #8338ec;
  margin-top: auto;
  font-size: 0.8rem;
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