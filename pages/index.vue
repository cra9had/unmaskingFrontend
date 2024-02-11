<template>
  <navbar
    :IsAuthenticated="IsAuthenticated"
    v-if="!pageLoading"
    @auth="$emit('auth')"
    @openBuyPopup="openBuyPopup"
    :UserDetails="UserDetails"
    ref="navbar"
    ><li class="header-left__item">
      <a href="#!" id="about" @click="toHowWork">О нас</a>
    </li>
    <li class="header-left__item">
      <a href="#!" id="faq" @click="toFaq">Частые вопросы</a>
    </li></navbar
  >

  <div class="section-preloader">
    <section class="home-default">
      <div class="container home-default__inner">
<HeroComponent />
        <search-input
          v-model:currentSearchType="currentSearchType"
          @search="search"
          ref="searchInput"
        >
        </search-input>
      <PolicyComponent />
      </div>
    </section>
    <section
      :class="{
        'telegram-subscription': true,
        'telegram-subscription--off': UserDetails?.bonus_used,
      }"
    >
      <div class="container telegram-subscription__inner">
        <div class="telegram-subscription__image">
          <NuxtImg src="/img/airplane.webp" alt="кто звонил"

                   loading="lazy"
          />
        </div>

        <p class="telegram-subscription__title darts-element">
          Подпишитесь на наш телеграмм канал и получите
          <span>1</span> бесплатный пробив
        </p>
        <button
          type="button"
          class="white-button telegram-subscription__button"
          @click="gotToTelegram"
        >
          Получить бонус
        </button>
      </div>
    </section>
    <section class="result" v-if="searchStatus !== 0">
      <div class="container result__container">
        <h4 class="result__title" v-if="searchStatus !== 0">
          Результаты поиска
          <span v-if="currentSearchType === 0"
            >по номеру {{ $refs.searchInput.phoneNumber }}</span
          >
        </h4>
        <searching-loader
          v-show="searchStatus === 1"
          ref="searchingLoader"
        ></searching-loader>
        <section class="result__notfound" v-if="searchStatus === 3">
          <NuxtImg
            class="result__notfound-img"
            src="/img/result-notfound.webp"
            alt="чей номер"
            loading="lazy"

          />
          <p class="result__notfound-title">
            Ничего не найдено, попробуйте изменить данные
          </p>
          <button
            class="button result__notfound-button"
            @click="$refs.navbar.scroll()"
          >
            Попробовать еще
          </button>
        </section>
        <section v-if="searchStatus === 2">
          <ul class="result-list main-page__result-list">
            <li class="result-item__title">
              <h5>Персональная информация</h5>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.fullname"
            >
              <p class="result-item__descript">ФИО:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.fullname }}
                </span>
              </div>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.birthday"
            >
              <p class="result-item__descript">Дата рождения:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.birthday }}
                </span>
              </div>
            </li>

            <li
              class="result-item main__page-result__address"
              v-if="personData.email"
            >
              <p class="result-item__descript">Почта:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.email }}
                </span>
              </div>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.car_number"
            >
              <p class="result-item__descript">Водительские права:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.car_number }}
                </span>
              </div>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.passport"
            >
              <p class="result-item__descript">Паспорт:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.passport }}
                </span>
              </div>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.insurance"
            >
              <p class="result-item__descript">СНИЛС:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.insurance }}
                </span>
              </div>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.inn"
            >
              <p class="result-item__descript">ИНН:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.inn }}
                </span>
              </div>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.possibles_addresses"
            >
              <p class="result-item__descript">Возможные адреса:</p>
              <div class="address-wrapper">
                <address class="result-item__info">
                  {{ personData.possibles_addresses }}
                </address>
              </div>
            </li>
          </ul>
          <ul
            class="result-list main-page__result-list"
            v-if="personData.phone_number"
          >
            <li class="result-item__title">
              <h5>Социальные сети</h5>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.whatsapp"
            >
              <p class="result-item__descript">WhatsApp:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.whatsapp }}
                </span>
              </div>
            </li>
            <li
              class="result-item main__page-result__address"
              v-if="personData.telegram"
            >
              <p class="result-item__descript">Telegram:</p>
              <div class="address-wrapper">
                <span class="result-item__info">
                  {{ personData.telegram }}
                </span>
              </div>
            </li>
          </ul>
          <div class="result__buttons">
            <button class="button main-page__result-button" @click="buySearch">
              Открыть за <span>1</span>
            </button>
            <a
              href="https://t.me/+SDfzDeobb09mOWU6"
              class="transparent-button result__button-transparent"
              v-if="!UserDetails.bonus_used"
              >Получить бонус</a
            >
          </div>
          <div class="policy main-page__policy">
            <span>Нажимая кнопку, вы подтверждаете согласие с </span>
            <a href="#">Условиями предоставления услуги</a>
          </div>
        </section>
      </div>
    </section>
    <faq></faq>
  </div>
  <buy-search
    v-model:warning-popup-opened="warningPopupOpened"
    :current-search-pk="currentSearchPk"
    :user-details="UserDetails"
    @updateData="updateData"
    @updateUserDetails="updateUserDetails"
  ></buy-search>
  <buy-popup v-model:buy-popup-opened="buyPopupOpened"></buy-popup>
  <Footer> </Footer>
</template>

<script>

import Navbar from "@/components/Navbar.vue";
import SearchInput from "@/components/SearchInput.vue";
import Footer from "@/components/Footer.vue";
import SearchingLoader from "@/components/SearchingLoader.vue";
import BuyPopup from "@/components/BuyPopup.vue";
import BuySearch from "@/components/BuySearch.vue";
import Faq from "@/components/faq/Faq.vue";

export default {
  data() {
    return {
      searchStatus: 0, // 0 - Not searching, 1 - Search in progress, 2 - Found, 3 - Not Found
      currentSearchType: 0,
      intervalId: null,
      warningPopupOpened: false,
      buyPopupOpened: false,
      currentSearchPk: 0,
    };
  },
  props: {
    pageLoading: {
      type: Boolean,
      default: false,
    },
    IsAuthenticated: {
      type: Boolean,
      default: false,
    },
    UserDetails: {
      type: Object,
    },
  },
  components: {
    Navbar,
    SearchInput,
    Footer,
    SearchingLoader,
    BuyPopup,
    BuySearch,
    Faq,
  },
  methods: {
    updateData(data) {
      this.personData = data;
    },
    updateUserDetails(details) {
      this.$emit("update:UserDetails", details);
    },
    openBuyPopup() {
      this.buyPopupOpened = true;
    },
    gotToTelegram() {
      document.location.href = "https://t.me/+SDfzDeobb09mOWU6";
    },
    async getSearchResult(pk) {
      const token = localStorage.getItem("token");
      const endpoint =
        this.$config.public.API_BASE_URL + "search/result/" + pk + "/";
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      });
      if (response.status === 204) {
      } else if (response.status === 200) {
        const data = await response.json();
        if (data.status === 404) {
          this.searchStatus = 3;
          clearInterval(this.intervalId);
        } else {
          this.searchStatus = 2;
          this.personData = data.result;
          clearInterval(this.intervalId);
        }
      } else {
        this.searchStatus = 0;
        clearInterval(this.intervalId);
      }
    },

    async search() {
      const token = localStorage.getItem("token");
      if (!token) {
        return this.$refs.navbar.openAuthPopup();
      }
      let searchQuery = {};
      if (this.currentSearchType === 0) {
        searchQuery = {
          phone_number: this.$refs.searchInput.phoneNumber.replace(/\D/g, ""),
        };
      } else if (this.currentSearchType === 1) {
        searchQuery = {
          fullname: this.$refs.searchInput.fullname,
          birthday: this.$refs.searchInput.birthday,
        };
      }
      const endpoint = this.$config.public.API_BASE_URL + "search/";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({
          search_type: this.currentSearchType,
          search_query: searchQuery,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        this.searchStatus = 1; // Search in progress
        this.$nextTick(() => {
          this.$refs.searchingLoader.scroll();
        });
        this.currentSearchPk = data.pk;
        this.intervalId = setInterval(
          () => this.getSearchResult(data.pk),
          2000
        );
      }
    },
    buySearch() {
      if (this.UserDetails.available_searches > 0) {
        this.warningPopupOpened = true;
      } else {
        this.buyPopupOpened = true;
      }
    },
    toFaq() {
      document
        .querySelector(".faq")
        .scrollIntoView({ block: "start", inline: "start" });
    },
    toHowWork() {
      document
        .querySelector(".howwork")
        .scrollIntoView({ block: "start", inline: "start" });
    },
  },
};
</script>
<script setup>
import HeroComponent from "~/components/HeroComponent.vue";
import PolicyComponent from "~/components/PolicyComponent.vue";

name: "index";

definePageMeta({
  layout: "default",
});
</script>
<style>
.left-mask,
.right-mask {
  width: auto !important;
  object-fit: contain !important;
}
</style>
