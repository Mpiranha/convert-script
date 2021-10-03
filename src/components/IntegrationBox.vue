<template>
  <div class="col-4">
    <div class="box-wrap">
      <div class="top-section">
        <img class="img-icon" :src="require(`@/assets/${imgUrl}`)" alt="" />
        <h6 class="title">{{ typeTitle }}</h6>
      </div>
      <div class="d-flex w-100 justify-content-end">
        <a :href="linkUrl" v-b-modal.modal-api>
          Setup
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
  </div>
</template>

<script>
export default {
  props: {
    typeTitle: String,
    linkUrl: String,
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
  padding: 0.7rem;
  box-shadow: 2px 1px 2px #d9d2d2, -1px 2px 2px #d9d2d2;
  height: 145px;
}

.box-wrap .top-section {
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
}

.box-wrap .title {
  font-size: 1rem;
  font-weight: bold;
}

.box-wrap a {
  color: #8338ec !important;
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

.box-wrap .img-icon {
  width: 2rem;
  margin-bottom: 0.5rem;
}
</style>