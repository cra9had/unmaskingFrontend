<template>
  <navbar
      :IsAuthenticated="IsAuthenticated"
      v-if="!pageLoading"
      @auth="$emit('auth')"
      @openBuyPopup="openBuyPopup"
      :UserDetails="UserDetails"
      ref="navbar"
  ></navbar>
  <main>
    <section class="not-found">
      <div class="container not-found__inner">
        <img
            class="not-found__image"
            src="~@/assets/img/notfound.webp"
            alt="изображение"
        />

        <div class="not-found__wrapper">
          <h1 class="not-found__title">
            <span>Упс,</span> что-то пошло не так
          </h1>
          <p class="not-found__subtitle">
            Пожалуйста перезагрузите страницу или вернитесь на главную
          </p>
          <div class="button not-found__button" @click="handleError">
            На главную
          </div>
        </div>
      </div>
    </section>
  </main>
  <buy-popup v-model:buy-popup-opened="buyPopupOpened"></buy-popup>
  <Footer style="position: fixed; bottom: 0; right: 0; left: 0"></Footer>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import BuyPopup from "@/components/BuyPopup.vue";

export default {
  components: { BuyPopup, Navbar, Footer },
  data() {
    return {
      buyPopupOpened: false,
      IsAuthenticated: false,
      UserDetails: {},
      pageLoading: false,
    };
  },
  methods: {
    openBuyPopup() {
      this.buyPopupOpened = true;
    },
    async getUserDetails() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.IsAuthenticated = false;
      } else {
        this.pageLoading = true;
        const response = await fetch(
            this.$config.public.API_BASE_URL + "auth/user/",
            {
              headers: {
                Authorization: "Token " + token,
              },
              method: "GET",
            }
        );
        console.log(response);
        if (response.status === 200) {
          this.UserDetails = await response.json();
          this.IsAuthenticated = true;
        } else {
          this.IsAuthenticated = false;
          localStorage.removeItem("token");
        }
        this.$nextTick(() => {
          this.pageLoading = false;
        });
      }
    },
  },
};
</script>

<script setup>
import "@/assets/styles/style.css";

useHead({
  bodyAttrs: {
    class: "error_page",
  },
});
const handleError = () => clearError({redirect: "/"});
</script>

<style>
.error_page .main-preloader {
  display: none !important;
}
</style>
