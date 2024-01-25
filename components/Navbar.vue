<template>
  <!-- мобильное меню -->
  <section
    :class="{ 'mobile-menu': true, 'mobile-menu--open': mobileMenuOpened }"
  >
    <div class="container">
      <nav class="mobile-menu__wrapper">
        <ul class="mobile-menu__list">
          <li class="mobile-menu__item-name">{{ UserDetails.username }}</li>
          <li class="mobile-menu__item-link mobile-menu__item-link--data">
            <button type="button" @click="toPersonSettings">
              Персональные данные
            </button>
          </li>
          <li class="mobile-menu__item-link mobile-menu__item-link--history">
            <button type="button" @click="toHistory">История пробивов</button>
          </li>
        </ul>
        <div class="mobile-menu__item-out">
          <a href="#" @click="logout">Выход</a>
        </div>
      </nav>
    </div>
  </section>
  <!--  header-preloader&#45;&#45;off-->
  <header class="header header-preloader" ref="header">
    <div class="container header__inner">
      <ul class="header-left__list">
        <li class="logo-wrapper">
          <router-link to="/" class="logo"
            >Unmasking<span>™</span></router-link
          >
        </li>
        <slot></slot>
      </ul>
      <div class="header__wrapper" style="" v-if="IsAuthenticated">
        <div class="darts" @click="$emit('openBuyPopup')">
          {{ UserDetails.available_searches }}
        </div>
        <nav class="menu">
          <button
            type="button"
            class="menu__button-mobile"
            @click="toggleMobileMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button
            :class="{ menu__button: true, 'menu__button--open': !menuOpened }"
            @click="this.menuOpened = !this.menuOpened"
          >
            <img
              width="36"
              height="36"
              src="@/assets/img/icons/mask.webp"
              alt="маска"
            />
            {{ UserDetails.username }}
          </button>
          <ul
            :class="{ menu__list: true, 'menu__list--open': this.menuOpened }"
          >
            <li class="menu__list-item profile">
              <router-link to="/profile" class="menu__list-link"
                >Профиль</router-link
              >
            </li>
            <li class="menu__list-item logout">
              <a href="#" class="menu__list-link" @click="logout">Выход</a>
            </li>
          </ul>
        </nav>
      </div>
      <button
        class="header-login white-button"
        id="log-button"
        @click="openAuthPopup"
        v-else
      >
        Войти
      </button>
    </div>
  </header>
  <auth-popup
    :authPopupOpened="authPopupOpened"
    @auth="onAuth"
    @close="openAuthPopup"
  ></auth-popup>
</template>

<script>
import AuthPopup from "@/components/AuthPopup.vue";
import store from "~/store/index.js";

export default {
  emits: ["auth", "openBuyPopup"],
  data() {
    return {
      menuOpened: false,
      mobileMenuOpened: false,
    };
  },
  computed: {
    authPopupOpened() {
      return store.getters["getShow"];
    },
  },
  components: {
    AuthPopup,
  },
  props: {
    IsAuthenticated: {
      type: Boolean,
      default: false,
    },
    UserDetails: {
      type: Object,
    },
    currentTab: {
      type: Number,
      default: null,
      required: false,
    },
  },
  methods: {
    openAuthPopup() {
      store.commit("setShow");
    },
    onAuth() {
      this.$emit("auth");
    },
    async logout() {
      const token = localStorage.getItem("token");
      const endpoint = this.$config.public.API_BASE_URL + "auth/logout/";
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      });
      localStorage.removeItem("token");
      this.onAuth();
      this.IsAuthenticated = false;
      window.location.reload();
      if (this.mobileMenuOpened) {
        this.toggleMobileMenu();
      }
      this.$router.push("/");
    },
    scroll() {
      this.$refs.header.scrollIntoView({ block: "center", inline: "center" });
    },
    toggleMobileMenu() {
      this.mobileMenuOpened = !this.mobileMenuOpened;
      if (this.mobileMenuOpened) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    toPersonSettings() {
      this.toggleMobileMenu();
      if (this.currentTab === null) {
        this.$router.push({
          name: "profile",
          query: {
            tab: 0,
          },
        });
      } else {
        this.$emit("updateCurrentTab", 0);
      }
    },
    toHistory() {
      this.toggleMobileMenu();
      if (this.currentTab === null) {
        this.$router.push({
          name: "profile",
          query: {
            tab: 1,
          },
        });
      } else {
        this.$emit("updateCurrentTab", 1);
      }
    },
  },
};
</script>

<style scoped></style>
