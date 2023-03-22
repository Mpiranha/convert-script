<template>
  <div class="side-bar">
    <img class="side-logo" src="@/assets/image/Logo.svg" alt="logo" srcset="" />
    <nav class="nav flex-column nav-wrap">
      <li class="nav-item">
        <router-link class="nav-link" :class="currentActive == 'stat' ? 'active' : ''" to="/admin">

          <span class="nav-text"> Stat </span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" :class="currentActive == 'users' ? 'active' : ''" to="/admin/users">

          <span class="nav-text"> Users </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="currentActive == 'transaction' ? 'active' : ''" to="/admin/transactions">
          <span class="nav-text"> Transactions </span>
        </router-link>
      </li>
      <li class="nav-item">
        <button class="btn no-shadow nav-link" @click="toggleCollapse('text')">
          <span class="nav-text"> Text </span>
          <img class="collapse-icon" :class="isCollapse == 'text' ? 'open' : ''" src="@/assets/icons/down.png"
            alt="up icon">
        </button>
      </li>
      <li class="nav-item collapsible" :class="isCollapse == 'text' ? 'open' : ''">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'script-type' ? 'active' : ''" to="/admin/script/type">
              <span class="nav-text"> Script Type </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'category' ? 'active' : ''" to="/admin/category">
              <span class="nav-text"> Category </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'language' ? 'active' : ''" to="/admin/languages">
              <span class="nav-text"> Language </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'tone' ? 'active' : ''" to="/admin/tone">

              <span class="nav-text"> Tone </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'flagged-script' ? 'active' : ''"
              to="/admin/scripts/flagged">
              <span class="nav-text"> Flagged Script </span>
            </router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <button class="btn no-shadow nav-link" @click="toggleCollapse('image')">
          <span class="nav-text"> Images </span>
          <img class="collapse-icon" :class="isCollapse == 'image' ? 'open' : ''" src="@/assets/icons/down.png"
            alt="up icon">
        </button>
      </li>
      <li class="nav-item collapsible" :class="isCollapse == 'image' ? 'open' : ''">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'image-style' ? 'active' : ''" to="/admin/image/style">
              <span class="nav-text"> Image Style
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'medium' ? 'active' : ''" to="/admin/image/medium">
              <span class="nav-text"> Medium
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'filter' ? 'active' : ''" to="/admin/image/filter">
              <span class="nav-text"> Filter </span>
            </router-link>
          </li>

        </ul>
      </li>
      <li class="nav-item">
        <button class="btn no-shadow nav-link" @click="toggleCollapse('audio')">
          <span class="nav-text"> Audio </span>
          <img class="collapse-icon" :class="isCollapse == 'audio' ? 'open' : ''" src="@/assets/icons/down.png" alt="up icon">
        </button>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="currentActive == 'promo-code' ? 'active' : ''" to="/admin/promo-codes">
          <span class="nav-text"> Promo Code </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="currentActive == 'roles' ? 'active' : ''" to="/admin/roles">
          <span class="nav-text"> Roles and Permissions </span>
        </router-link>
        <!-- </li>
        <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'plans' ? 'active' : ''"
          to="/admin/plans"
          
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
          <span class="nav-text"> Plans </span>
        </router-link>
      </li> -->

        <!-- <li class="nav-item">
        <router-link
          class="nav-link"
          :class="currentActive == 'integrationadmin' ? 'active' : ''"
          to="/admin/integration"
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
      </li> -->
      </li>

      <li class="nav-item">
        <router-link class="nav-link" :class="currentActive == 'suggestion' ? 'active' : ''" to="/admin/suggestions">

          <span class="nav-text"> Suggestion </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="currentActive == 'configuration' ? 'active' : ''" to="/admin/config">

          <span class="nav-text"> Configuration </span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="currentActive == 'keyword' ? 'active' : ''" to="/admin/keywords">
          <span class="nav-text"> Keyword </span>
        </router-link>
      </li>
     
      <li class="nav-item">
        <button class="btn no-shadow nav-link" @click="toggleCollapse('files')">
          <span class="nav-text"> Files </span>
          <img class="collapse-icon" :class="isCollapse == 'files' ? 'open' : ''" src="@/assets/icons/down.png" alt="up icon">
        </button>
      </li>
      <li class="nav-item collapsible" :class="isCollapse == 'files' ? 'open' : ''">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'agency-files' ? 'active' : ''"
              to="/admin/agency/files">
              <span class="nav-text"> Agency Files </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'bonuses' ? 'active' : ''" to="/admin/bonuses">
              <span class="nav-text"> Bonuses </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="currentActive == 'tutorials' ? 'active' : ''" to="/admin/tutorials">
    
              <span class="nav-text"> Tutorials </span>
            </router-link>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <a @click="logout($event)" class="btn nav-link" href="#">
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
      isCollapse: false,
    };
  },
  methods: {
    toggleShow: function () {
      this.isShowing = !this.isShowing;
    },
    toggleCollapse(item) {
      if (this.isCollapse == item) {
        this.isCollapse = null;
        return
      } 
      this.isCollapse = item;
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


.collapse-icon {
  width: 1.5rem;
  margin-left: 0.5rem;
  transition: all 0.5s;
}

.collapsible {
  height: 0;
  overflow: hidden;
  padding-left: 2rem;
  transition: all 0.5s linear;
}

.collapsible.open {
  height: initial !important;
}

.collapse-icon.open {
  transform: rotate(180deg);
}

@media screen and (min-width: 1350px) {
  .nav-wrap .nav-link {
    font-size: 0.9rem;
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
