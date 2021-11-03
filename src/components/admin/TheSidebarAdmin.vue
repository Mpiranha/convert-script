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
        <router-link
          class="nav-link"
          :class="currentActive == 'stat' ? 'active' : ''"
          to="/admin"
        >
          <img
            class="main-icon"
            src="@/assets/icons/sidebar/dashboard.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/convert-icon/active-icons/dashboard 1.svg"
            alt=""
          />
          <span class="nav-text"> Stat </span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'users' ? 'active' : ''"
          to="/admin/users"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/user.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/user.svg"
            alt=""
          />
          <span class="nav-text"> Users </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'transaction' ? 'active' : ''"
          to="/admin/transactions"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/transaction.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/transaction.svg"
            alt=""
          />
          <span class="nav-text"> Transactions </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'script-type' ? 'active' : ''"
          to="/admin/script/type"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/scripts-type.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/scripts-type.svg"
            alt=""
          />
          <span class="nav-text"> Script Type </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'flagged-script' ? 'active' : ''"
          to="/admin/scripts/flagged"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/flagged-script.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/flagged-script.svg"
            alt=""
          />
          <span class="nav-text"> Flagged Script </span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'role' ? 'active' : ''"
          to="/admin/roles"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/roles-permissions.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/roles-permissions.svg"
            alt=""
          />
          <span class="nav-text"> Roles and Permissions </span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'integration' ? 'active' : ''"
          to="/admin/integrations"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/integration.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/Integration.svg"
            alt=""
          />
          <span class="nav-text"> Integration </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'suggestion' ? 'active' : ''"
          to="/admin/suggestions"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/suggestion.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/suggestion.svg"
            alt=""
          />
          <span class="nav-text"> Suggestion </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'configuration' ? 'active' : ''"
          to="/admin/config"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/configuration.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/configuration.svg"
            alt=""
          />
          <span class="nav-text"> Configuration </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'bonuses' ? 'active' : ''"
          to="/admin/bonuses"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/bonuses.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/bonuses.svg"
            alt=""
          />
          <span class="nav-text"> Bonuses </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'tutorials' ? 'active' : ''"
          to="/admin/tutorials"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/tutorials.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/tutorial.svg"
            alt=""
          />
          <span class="nav-text"> Tutorials </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'agency-files' ? 'active' : ''"
          to="/admin/agency/files"
        >
          <img
            class="main-icon"
            src="@/assets/icons/admin/sidebar-icon/agency-file.svg"
            alt=""
          />
          <img
            class="active-icon"
            src="@/assets/icons/admin/sidebar-active/agency-files.svg"
            alt=""
          />
          <span class="nav-text"> Agency Files </span>
        </router-link>
      </li>
      <li class="nav-item">
        <a @click="logout($event)" class="btn nav-link" href="#">
          <img class="main-icon" src="@/assets/icons/admin/sidebar-icon/logout.svg" alt="icon" />
          Logout
        </a>
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
    userName: {
      type: String,
    },
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
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
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
  width: 1rem;
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

@media screen and (min-width: 1350px) {
  .nav-wrap .nav-link {
    font-size: 0.8rem;
  }

  .main-icon,
  .active-icon {
    width: 1.3rem;
  }

  .btn-drop .name {
    font-size: 1rem;
  }

  .user-info .user-img {
    width: 2rem;
    height: 2rem;
  }
}
</style>
