<template>
  <div class="script-content-wrap">
    <div class="box-head">
      <div class="left-section">
        <div class="d-flex align-items-center">
          <img
            class="icon-save"
            src="@/assets/icons/convert-icon/save 1.svg"
            alt=""
          />
          <span> Save to </span>
        </div>
      </div>
      <div class="right-section">
        <div class="d-flex align-items-center">
          <div class="d-flex align-items-center">
            <img
              class="icon-fav"
              src="@/assets/icons/convert-icon/my Favourites.svg"
              alt=""
            />
            <a href="#">Export</a>
          </div>
        </div>
      </div>
    </div>
    <div class="script-content">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>

    <div class="script-footer">
      <button class="btn no-shadow btn-share">
        <img
          class="foot-icons"
          src="@/assets/icons/convert-icon/draw.svg"
          alt=""
        />
      </button>
      <button class="btn no-shadow btn-copy">
        <img
          class="foot-icons"
          src="@/assets/icons/convert-icon/copy.svg"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.script-content-wrap {
  color: #5f6f7f;
  border-top: 2px solid #f6f8f9;
  border-left: 2px solid #f6f8f9;
  border-bottom: 2px solid #f6f8f9;
  padding: 1rem 1rem 0.5rem 1rem;
}

.box-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  margin-bottom: 0.7rem;
}

.box-head .icon-save,
.box-head .icon-fav {
  width: 1rem;
}

.box-head .icon-save {
  margin-right: 0.3rem;
}

.box-head a {
  color: inherit;
  text-decoration: none;
}

.box-head .icon-fav {
  margin-right: 1rem;
}

.script-content-wrap .script-content {
  font-size: 0.7rem;
  margin-bottom: 1.3rem;
  line-height: 20px;
  text-align: justify;
}

.script-footer {
    display: flex;
    justify-content: space-between;
}

.script-footer .btn {
    padding: 0;
}
.script-footer .foot-icons {
    width: 1rem;
}
</style>