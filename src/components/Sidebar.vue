<template>
  <div class="side-bar">
    <img
      class="side-logo"
      src="@/assets/image/ConvertScript Logo.png"
      alt="logo"
      srcset=""
    />
    <nav class="nav flex-column nav-wrap">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'dashboard' ? 'active' : ''"
          href="/"
        >
          <img
            class="main-icon"
            src="@/assets/icons/sidebar/dashboard.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/convert-icon/dashboard.svg"
            alt=""
          />
          <span class="nav-text"> Dashboard </span>
        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'campaign' ? 'active' : ''"
          href="pages/campaign.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/Campaign.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/sidebar-white/Campaigns 1.svg"
            alt=""
          />
          <span class="nav-text"> Campaigns </span>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'script' ? 'active' : ''"
          href="pages/links.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/All script.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/sidebar-white/Link 1.svg"
            alt=""
          />
          <span class="nav-text"> All Scripts </span>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'favourites' ? 'active' : ''"
          href="pages/leads.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/my Favourites.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/sidebar-white/leads 1.svg"
            alt=""
          />
          <span class="nav-text"> My Favourites </span>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'presets' ? 'active' : ''"
          href="pages/pop-up.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/Presets.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/sidebar-white/Pop Ups 1.svg"
            alt=""
          />
          <span class="nav-text"> Presets </span>
        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'integration' ? 'active' : ''"
          href="pages/settings.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/integration.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/sidebar-white/setting 1.svg"
            alt=""
          />
          <span class="nav-text"> Integration </span>
        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'settings' ? 'active' : ''"
          href="pages/training.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/settings.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/sidebar-white/Training & tutorials 1.svg"
            alt=""
          />
          <span class="nav-text"> Settings </span>
        </a>
      </li>
    </nav>
    <nav class="nav flex-column nav-wrap mt-auto">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'marketplace' ? 'active' : ''"
          href="index.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/Marketplace.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/convert-icon/dashboard.svg"
            alt=""
          />
          <span class="nav-text"> Marketplace </span>
        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'agency' ? 'active' : ''"
          href="pages/campaign.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/Agency.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/sidebar-white/Campaigns 1.svg"
            alt=""
          />
          <span class="nav-text"> Agency </span>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="currentActive == 'reseller' ? 'active' : ''"
          href="pages/links.html"
        >
          <img
            class="main-icon"
            src="@/assets/icons/convert-icon/Reseller.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/sidebar-white/Link 1.svg"
            alt=""
          />
          <span class="nav-text"> Reseller </span>
        </a>
      </li>
      <li class="nav-item">
        <div class="user-info">
          <div
            class="btn-drop"
            href="#"
            @click="toggleShow()"
            data-target=".user-drop"
          >
            <img
              class="user-img"
              src="@/assets/icons/profile-user.svg"
              alt=""
            />
            <div class="name">Emma</div>
            <div v-if="isShowing" class="user-drop">
              <div class="setup-drop-inner">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <img
                        src="@/assets/icons/convert-icon/account.svg"
                        alt="icon"
                      />
                      Account</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <img
                        src="@/assets/icons/convert-icon/bonus.svg"
                        alt="icon"
                      />
                      Bonuses</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <img
                        src="@/assets/icons/convert-icon/billiing.svg"
                        alt="icon"
                      />
                      Billing</a
                    >
                  </li>
                  <li class="nav-item">
                    <a @click="logout($event)" class="nav-link" href="#">
                      <img
                        src="@/assets/icons/convert-icon/logout.svg"
                        alt="icon"
                      />
                      Logout</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    // msg: String
    currentActive: String,
  },
  data() {
    return {
      isShowing: false,
    };
  },
  methods: {
    toggleShow: function () {
      this.isShowing = !this.isShowing;
    },
    logout: function (event) {
      event.preventDefault();
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login")
        })


    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-bar {
  height: 100vh;
  min-width: 215px;
  border-right: 1px solid #e8e9e9;
  padding: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #ffffff;
}

.nav-wrap .nav-link {
  color: #393f46;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  padding: 0.7rem 1.5rem;
}

.nav-wrap .nav-link.active {
  color: #8338ec;
}

.main-icon,
.active-icon {
  width: 1.1rem;
  margin-right: 0.6rem;
}

.active-icon {
  display: none;
}

.nav-wrap .nav-link.active .main-icon {
  display: none;
}

.nav-wrap .nav-link.active .active-icon {
  display: inline;
}

.side-bar .side-logo {
  width: 8rem;
  margin: 0 1rem 2.5rem 1.5rem;
}

.btn-drop {
  cursor: pointer;
}

.user-drop {
  position: absolute;
  bottom: 57px;
  right: 13px;
}

.setup-drop .setup-drop-inner,
.user-drop .setup-drop-inner {
  background-color: #ffffff;
  border-radius: 0.3rem;
  box-shadow: 1px 1px 3px #bfb9b9;
  padding: 0.8rem 0;
  position: relative;
}

.setup-drop .setup-drop-inner::before,
.user-drop .setup-drop-inner::before {
  content: "";
  border: 6px solid;
  border-color: #fbfbfb transparent transparent transparent;
  position: absolute;
  bottom: -12px;
  right: 50%;
  margin-right: -5px;
}

.setup-drop-inner .nav-link {
  font-size: 0.85rem;
  padding: 0.1rem 1rem;
}

.user-drop .nav-link {
  padding: 0.5rem 1.1rem;
  color: #000;
  font-size: 0.8rem;
}

.user-drop {
  z-index: 9999;
}

.user-drop .setup-drop-inner {
  padding: 0.3rem 0rem;
  width: 119px;
}

.user-drop .nav-link img {
  width: 1.1rem;
  margin-right: 0.5rem;
}

.user-drop {
  bottom: 57px;
  right: 13px;
}

.user-info .user-img {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

[data-target=".user-drop"] {
  display: flex;
  align-items: center;
  box-shadow: 0px -2px 5px #eee;
  position: relative;
  padding: 0.4rem 1rem;
  text-decoration: none !important;
}

.btn-drop .name {
  font-size: 0.8rem;
  color: #000;
  margin-right: 0.5rem;
}
</style>
