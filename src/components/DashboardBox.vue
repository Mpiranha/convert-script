<template>
  <div class="col-12 col-md-6 col-lg-3">
    <div class="stat-box" :class="boxType">
      <div class="title">{{ text }}</div>
      <div class="stat-details">
        <div class="icon-wrap">
          <img :src="require(`@/assets/icons/${imageUrl}`)" alt="box icon" />
        </div>
        <div class="value">{{ boxValue }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'imageUrl',
    'text',
    'boxValue',
    'boxType'
  ]
};
</script>

<style scoped>
.stat-box {
  height: 120px;
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  border-radius: 0.6rem;
  /* max-width: 215px; */
  box-shadow: 0px 3px 6px #99949482;
  margin-bottom: 1rem;
}

.stat-box .title {
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: right;
  margin-bottom: 0.6rem;
}

.stat-box .stat-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-box .icon-wrap {
  width: 48px;
  height: 44px;
  background-color: #ffffffb3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
}

.stat-box .icon-wrap img {
  width: 1.2rem;
}



.stat-box .value {
  color: #ffffff;
  font-size: 2rem;
}



.stat-box.leads {
  background: linear-gradient(to right, #5c7ae4, #a13fdd);
}

.stat-box.links {
  background: linear-gradient(to right, #df0c8b, #9116a8);
}

.stat-box.campaign {
  background: linear-gradient(to right, #73dded, #5a8dee);
}

.stat-box.html-box {
  background: linear-gradient(to right, #ca50f5, #52395b);
}
</style>