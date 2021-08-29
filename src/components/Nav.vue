<template>
  <div class="content-head">
    <div class="menu-section">
      <ul class="nav">
        <li class="nav-item">
          <a
            class="nav-link" href="#"
          >
            Suggest Feature
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
          :class="currentActive == 'tutorials' ? 'active' : ''"
           href="#"> Tutorials </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
          :class="currentActive == 'support' ? 'active' : ''"
           href="#"> Support </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="flaticon-bell icons head-icon"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    // msg: String
    currentActive: String
  },
};
</script>

<style scoped>
.content-head {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0.7rem 0.7rem;
  box-shadow: 1px 1px 3px #a69f9f;
}

.content-head .menu-section {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.menu-section .nav-link {
  padding: 0.5rem 0.8rem;
  color: #566677;
  font-size: 0.8rem;
}

.menu-section .nav-link.active {
  color: #8338ec;
}

.menu-section .nav-link .head-icon::before {
  font-size: 1rem;
  font-weight: bold;
  color: #000;
}
</style>