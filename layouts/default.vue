<template>
  <page-loader v-if="pageLoading"></page-loader>
  <router-view
      v-else
      :IsAuthenticated="IsAuthenticated"
      :pageLoading="pageLoading"
      v-model:UserDetails="UserDetails"

  >


  </router-view>
</template>

<script>
import PageLoader from "@/components/PageLoader.vue";
import Footer from "~/components/Footer.vue";

export default {
  emits: ['auth'],
  components: {
    PageLoader,
    Footer
  },
  data() {
    return {
      pageLoading: true,
      IsAuthenticated: false,
      UserDetails: {},
    };
  },

  updated() {
    if (this.pageLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  },
  methods: {
    async getUserDetails() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.IsAuthenticated = false;
        this.$nextTick(() => {
          this.pageLoading = false;
        });
      } else {
        this.pageLoading = true;
        const response = await fetch(
            this.$config.public.API_BASE_URL + "auth/user/",
            {
              headers: {
                Authorization: "Token " + token,
              },
              method: "GET",
            },
        );
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
  async beforeMount() {
    await this.getUserDetails();
  },
};
</script>



<style>
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-family: Roboto , sans-serif;

}

*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Links */

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-size: inherit;
  font-weight: inherit;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

label {
  cursor: pointer;
}

legend {
  display: block;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
}

html,
body {
  min-height: 100vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  scroll-behavior: smooth;
}
body.hidden {
  overflow: hidden;
}

body::-webkit-scrollbar {
  background-color: transparent;
  width: 8px;
}

/* background of the scrollbar except button or resizer */
body::-webkit-scrollbar-track {
  background-color: transparent;
}

/* scrollbar itself */
body::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  //border: 4px solid #fff;
}

/* set button(top and bottom of the scrollbar) */
body::-webkit-scrollbar-button {
  display: none;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder {
  color: transparent;
}
.footer {
  margin-top: auto;
}

body {
  background-color: #1b1b1e;
  font-family: "Inter", sans-serif;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.19;
}

.darts-element > span {
  position: relative;
  margin-left: 16px;
}
.darts-element > span::after {
  content: "";
  position: absolute;
  background-image: url("/img/icons/darts.webp");
  background-size: 24px 24px;
  width: 24px;
  height: 24px;
  right: -28px;
  top: 0px;
}
.container {
  max-width: 1660px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
}
.button {
  width: 400px;
  padding: 16px 10px;
  border-radius: 8px;
  background: #03dac6;
  color: #121212;
  font-weight: 600;
  line-height: 150%;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.button:hover {
  background-color: #00a894;
}
.button:active {
  background-color: #007662;
}
.white-button {
  color: #121212;
  border-radius: 8px;
  background: #fff;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.white-button:hover {
  background: #03dac6;
  color: #fff;
}
.white-button:active {
  background: #007662;
  color: #fff;
}
.transparent-button {
  border-radius: 8px;
  border: 1px solid #fff;
  font-weight: 600;
  line-height: 150%;
  font-size: 20px;
  background: transparent;
  color: #fff;
}
.transparent-button:hover {
  background: #fff;
  color: #121212;
}
.transparent-button:active {
  background: #c3c3c3;
}
.errorpass,
.error-newpassword {
  font-size: 13px;
  color: #ddd;
  line-height: 130%;
  opacity: 0.5;
  margin-top: 8px;
  padding-left: 4px;
  width: 100%;
  text-align: left;
}
.error-newpassword {
  display: block;
  color: red;
}
.input {
  border-radius: 8px;
  background: #121212;
  padding: 16px;
  height: 56px;
  border: 1px solid transparent;
}
.input::placeholder {
  color: #ddd;
  opacity: 0.5;
}

.input-password__control {
  position: absolute;
  right: 21px;
  top: 31px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  background-image: url("/img/icons/eye-close.webp");
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
}
.input-password__control.input-password__control--open {
  background-image: url("/img/icons/eye-open.webp");
}
.input-password__wrapper {
  position: relative;
}
.label-phone {
  position: relative;
}
.text-phone {
  position: absolute;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  line-height: 150%;
  top: 15px;
  left: 50%;
  opacity: 0.5;
  transform: translateX(-50%);
}
.text-phone.none-text-phone {
  display: none;
}
.label-hidden {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.header {
  background-color: #252525;
  padding: 20px 0;
}
.header-preloader{
  display: block;
}
.header-preloader--off,
.section-preloader--off {
  display: none;
}
.header__inner {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.logo {
  font-size: 32px;
  line-height: 1.39;
  color: #fff;
}
.header__wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-column-gap: 20px;
  -moz-column-gap: 20px;
  column-gap: 20px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.darts {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 36px;
  padding: 6px 12px 6px 40px;
  background-color: #1b1b1e;
  border-radius: 46px;
  background-image: url("/img/icons/darts.webp");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position-x: 8px;
  background-position-y: center;
}
.menu {
  position: relative;
  padding-right: 28px;
}
.menu__button-mobile {
  display: none;
  width: 36px;
  height: 36px;
  background-color: #1b1b1e;
  border-radius: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  row-gap: 3px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.menu__button-mobile > span {
  width: 16px;
  height: 2px;
  border-radius: 2px;
  background-color: #8d8d8f;
}
.menu__button-mobile--close.menu__button-mobile > span:nth-child(1) {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  position: absolute;
}
.menu__button-mobile--close.menu__button-mobile > span:nth-child(3) {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
}
.menu__button-mobile--close.menu__button-mobile > span:nth-child(2) {
  display: none;
}
.menu__button {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-column-gap: 8px;
  -moz-column-gap: 8px;
  column-gap: 8px;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.menu__button--open.menu__button::after {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.menu__button::after {
  content: "";
  position: absolute;
  background-image: url("/img/icons/caret.webp");
  background-size: cover;
  width: 24px;
  height: 24px;
  right: -28px;
}
.menu__button > img {
  padding: 7px 6px 5px;
  background-color: #1b1b1e;
  border-radius: 100%;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.75;
}
.menu__list {
  display: none;
  position: absolute;
  bottom: -183px;
  right: 0px;
  padding: 16px;
  background-color: #252525;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.menu__list.menu__list--open {
  display: block;
}
.menu__list-item + .menu__list-item {
  margin-top: 16px;
}
.menu__list-item.profile {
  background-image: url("/img/icons/mask.webp");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 16px;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.75;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.menu__list-item.profile:hover,
.menu__list-item.logout:hover {
  -webkit-filter: grayscale(0%);
  filter: grayscale(0%);
  opacity: 1;
  background-color: #1b1b1e;
}
.menu__list-item.profile:hover > .menu__list-link {
  color: #fff;
}
.menu__list-item.logout {
  background-image: url("/img/icons/logout.webp");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 16px;
  position: relative;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.5;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.menu__list-item.logout::after {
  content: "";
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  border-top: 1px solid rgba(221, 221, 221, 0.87);
}
.menu__list-item.logout:hover > .menu__list-link {
  opacity: 1;
}
.menu__list-item.logout:hover > .menu__list-link {
  opacity: 1;
  color: #fff;
}
.menu__list-item.logout:hover {
  background-color: #1b1b1e;
}
.menu__list-item {
  padding: 16px 48px;
  background-color: transparent;
  font-size: 20px;
  line-height: 1.24;
  border-radius: 8px;
}
.menu__list-link {
  color: #ddd;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.header-login {
  padding: 8px 48px;
}

/* telegram-subscription */
.telegram-subscription {
  //padding: 66px 0;
  background-color: #121212;
  height: 200px;
  overflow-y: hidden;
}

.telegram-subscription--off {
  display: none;
}

.telegram-subscription-absolute {
  position: absolute;
  bottom: 86px;
  width: 100%;
}

.telegram-subscription__inner {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-height: -webkit-fill-available;
}
.telegram-subscription__image {
  width: 308.977px;
  height: 200px;
  transform: translate(-87px, -20px);
}
.telegram-subscription__image > img {
  max-width: 100%;
}
.telegram-subscription__button {
  padding: 18px 48px;
  width: 300px;
  height: 60px;
}
.telegram-subscription__title {
  font-size: 20px;
  line-height: 150%;
  color: rgba(221, 221, 221, 0.7);
  width: 397px;
  text-align: center;
  -webkit-transform: translateX(-21px);
  -ms-transform: translateX(-21px);
  transform: translateX(-21px);
}
.telegram-subscription__title > span {
  margin-left: 5px;
  margin-right: 29px;
  color: #fff;
  opacity: 1;
}

.result {
  padding: 60px 0 80px;
}
.result.result--off {
  display: none;
}
.result-list {
  margin-top: 30px;
}
.result__title {
  text-align: center;
  font-size: 24px;
  color: #ddd !important;
  line-height: 150%;
}
.result__title > span {
  color: #ddd !important;
}

.result-item__title {
  color: #ddd;
  font-size: 20px;
  line-height: 150%;
  opacity: 0.5;
  padding: 12px 0;
  border-bottom: 1px solid #313134;
  margin-bottom: 24px;
}
.result-item {
  display: flex;
}

.result-item > p {
  display: inline;
  font-size: 16px;
  line-height: 150%;
  color: #fff;
}
.result-item__descript {
  color: #ddd;
  opacity: 0.5;
  font-weight: 600;
}
.result-item__info {
  margin-left: 12px;
  font-weight: 400;
}
.result-item + .result-item {
  margin-top: 12px;
}
.result__buttons {
  margin-top: 50px;
  -webkit-column-gap: 16px;
  -moz-column-gap: 16px;
  column-gap: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.result__button-transparent {
  width: 350px;
  height: 60px;
  padding: 18px 48px;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
}
.result__button {
  width: 350px;
  height: 60px;
  padding: 18px 10px;
}
.result-list__button {
  margin-top: 32px;
  font-size: 20px;
  width: 350px;
  padding: 18px 10px;
  padding-right: 30px;
}
.main-page__result-button {
  color: #ddd;
  width: 350px;
  padding: 18px 10px;
  padding-right: 30px;
}
.main-page__result-button > span {
  position: relative;
}
.main-page__result-button > span::after {
  content: "";
  position: absolute;
  background-image: url("/img/icons/darts.webp");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  left: 14px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.result-list__button > span {
  position: relative;
}
.result-list__button > span::after {
  content: "";
  position: absolute;
  background-image: url("/img/icons/darts-dark.webp");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  left: 14px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.result .container > .policy {
  width: 100%;
}
.result__notfound {
  margin-top: 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.result__notfound.result__notfound--off {
  display: none;
}
.result__notfound-img {
  width: 170px;
  height: 130px;
  margin-bottom: 30px;
}
.result__notfound-title {
  font-size: 20px;
  line-height: 150%;
  opacity: 0.5;
  margin-bottom: 40px;
}
.result__notfound-button {
  width: 500px;
  height: 66px;
  padding: 18px 10px;
}
.main__page-result__address {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  row-gap: 4px;
  column-gap: 10px;
}
.main__page-result__address .result-item__descript {
}
.main__page-result__address {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.main__page-result__address .address-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  row-gap: 4px;
  -webkit-column-gap: 4px;
  -moz-column-gap: 4px;
  column-gap: 4px;
  margin-top: 2px;
}
.page-account__address {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.address-wrapper > .result-item__info {
  margin-left: 0px;
}

.account {
  padding: 50px 0 80px;
}
.account__mobile-title {
  color: #ddd;
  opacity: 0.5;
  font-size: 20px;
  display: none;
}
.account__inner {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 260px 160px auto;
  grid-template-columns: 260px auto;
  -webkit-column-gap: 160px;
  -moz-column-gap: 160px;
  column-gap: 160px;
}
.account-name {
  font-size: 32px;
  line-height: 1.7;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 50px;
}
.account-name > img {
  background-color: #121212;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  padding: 9.333px 8px 6.667px 8px;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  margin-right: 20px;
}
.account__menu-data {
  color: #ddd;
  padding: 16px 16px 16px 48px;
  position: relative;
  text-align: left;
  margin-bottom: 24px;
  width: 100%;
}
.account__menu-data::after {
  content: "";
  position: absolute;
  background-image: url("/img/icons/mask.webp");
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: cover;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  left: 16px;
}
.account__menu-history {
  color: #ddd;
  padding: 16px 16px 16px 48px;
  position: relative;
  width: 100%;
  text-align: left;
  height: 56px;
}
.account__menu-history::after {
  content: "";
  position: absolute;
  background-image: url("/img/icons/wallet.webp");
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: cover;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  left: 16px;
}

.account__menu-history.account__menu--active,
.account__menu-data.account__menu--active {
  border-radius: 8px;
  background: #121212;
  height: 56px;
}
.account__menu--active.account__menu-history::after,
.account__menu--active.account__menu-data::after {
  -webkit-filter: grayscale(0%);
  filter: grayscale(0%);
}
.account__content {
  margin-top: 103px;
}
.account__content-data {
  display: none;
}
.account__content-data.account__content--active {
  display: block;
}
.account__content-data__title {
  color: #ddd;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.23;
  margin-bottom: 20px;
}
.account__content-data__form {
  width: 399px;
}
.account__content-data__form > div {
  position: relative;
}
.account__content__input {
  width: 100%;
}
.account__content-data__form > div + div {
  margin-top: 16px;
}
.account__content-data__button {
  margin-top: 20px;
  padding: 16px 24px;
}
.history-person {
  border-bottom: 1px solid rgba(221, 221, 221, 0.2);
}
.history-person + .history-person {
  margin-top: 22px;
}
.history-person.no-border {
  border-bottom: none;
}
.history-person__row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.23;
  padding: 24.5px 0;
}
.history-person__row-phone {
  color: #ddd;
  margin-right: 65px;
  min-width: 179px;
}
.history-person__row-date {
  color: #ddd;
  opacity: 0.5;
  margin-right: 126px;
}
.paid {
  color: #03dac6;
}
.not-paid {
  color: #c21d1d;
}
.history-person__button {
  padding: 8px 24px;
  width: 162px;
  height: 40px;
  background-image: url("/img/icons/white-caret.webp");
  background-repeat: no-repeat;
  background-position-y: 8px;
  background-position-x: 111px;
  background-size: 24px 24px;
  font-size: 16px;
  line-height: 1.19;
  text-align: left;
  -webkit-transition: all 0.1s ease;
  -o-transition: all 0.1s ease;
  transition: all 0.1s ease;
}
.history-person__button.history-person__button--active {
  background-color: #fff;
  color: #121212;
  background-image: url("/img/icons/black-caret.webp");
  background-repeat: no-repeat;
  background-position-y: 7px;
  background-position-x: 111px;
  background-size: 24px 24px;
}
.history-person__button:hover {
  background-image: url("/img/icons/caret-hover.webp");
  background-repeat: no-repeat;
  background-position-y: 8px;
  background-position-x: 111px;
  background-size: 24px 24px;
}
.history-person__button.history-person__button--active:hover {
  background-image: url("/img/icons/black-caret.webp");
  background-size: 24px 24px;
}
.history-person__list {
  border-radius: 8px;
  background: #121212;
  max-height: 0;
  overflow: hidden;
  -webkit-transition: max-height 0.3s ease;
  -o-transition: max-height 0.3s ease;
  transition: max-height 0.3s ease;
}
.history-person__list__inner {
  padding: 8px 32px 32px 32px;
}
.history-person__list > .result-list {
  margin-top: 16px;
}
.history-person__list .result-list .result-item__title {
  margin-bottom: 16px;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
}
.history-person__row-found {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: -webkit-fill-available;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
}
.account__content-button {
  display: block;
  padding: 16px 32px;
  width: 177px;
  height: 51px;
  margin: 30px auto 80px;
}
.account__content-history {
  display: none;
}
.account__content-history.account__content--active {
  display: block;
}
.account__content-history__list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  color: #ddd;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.23;
  opacity: 0.5;
  -webkit-column-gap: 181.5px;
  -moz-column-gap: 181.5px;
  column-gap: 181.5px;
  padding-bottom: 22px;
}
/* footer */

.footer {
  background-color: #252525;
  padding: 20px 0;
  margin-top: auto;
}

.footer__inner {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.footer__inner > .logo,
.footer__copy {
  color: #ddd;
}
.footer__inner > .footer__copy {
  -webkit-transform: translateX(-63px);
  -ms-transform: translateX(-63px);
  transform: translateX(-63px);
}
/* home-default */
.left-mask {
  position: absolute;
  width: 386px;
  height: 466px;
  left: 926px;
  top: -120px;
  z-index: -5;
}
.right-mask {
  position: absolute;
  width: 574.604px;
  height: 700px;
  right: 863px;
  top: -10px;
}
.home-default {
  padding-top: 100px;
  padding-bottom: 60px;
  overflow-x: hidden;
}
.home-default__inner {
  position: relative;
  width: 684px;
  margin: 0 auto;
  text-align: center;
}
.home-default__title {
  font-size: 64px;
  color: #ddd;
  margin-bottom: 24px;
}
.home-default__subtitle {
  font-size: 20px;
  color: #fff;
  opacity: 0.7;
  margin-bottom: 80px;
  line-height: 150%;
}
.home-default__form {
  max-width: 500px;
  margin: 0 auto;
}
.home-default__input {
  width: 100%;
  height: 68px;
  font-size: 24px;
  color: #fff;
  text-align: center;
  opacity: 0.5;
}
.home-default__input::placeholder {
  color: #fff;
  opacity: 0.95;
}
.home-default__input-wrapper {
  margin-top: 30px;
  margin-bottom: 50px;
}
.home-default__input-item + .home-default__input-item {
  margin-top: 16px;
}
.home-default__input:focus,
.home-default__input:active {
  opacity: 1;
}

.home-default__list {
  margin-top: 143px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.home-default__item {
  font-size: 20px;
  line-height: 150%;
  color: #03dac6 !important;
}
.home-default__item > span {
  color: #ddd;
  opacity: 0.7;
}
.home-default__form-button {
  font-size: 20px;
  line-height: 150%;
}
/* popup */

.select__content-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 30px;
}

.select__content-wrapper::-webkit-scrollbar-track {
  background-color: #252525;
  border-radius: 10px;
}

.select__content-wrapper::-webkit-scrollbar-thumb {
  background-color: #03dac6;
  border-radius: 10px;
}
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.popup.popup--open {
  display: block;
}
.popup__content {
  padding: 60px 70px 40px;
  border-radius: 8px;
  background-color: #1b1b1e;
  color: #ddd;
  width: 540px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.popup__close {
  background-image: url("/img/icons/close.webp");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  opacity: 0.6;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.popup__close:hover {
  opacity: 1;
}
.popup__title {
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.28;
  text-align: center;
}

.popup__content {
  text-align: center;
}

.popup-warning__title {
  margin-bottom: 33px;
}
.popup-warning__subtitle {
  display: inline-block;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.23;
  text-align: center;
  margin-bottom: 50px;
  padding-right: 28px;
}
.popup-warning__subtitle > p {
  display: inline-block;
}

.popup-warning__button {
  margin-top: 16px;
  font-weight: 600;
  line-height: 150%;
  color: #fff;
  opacity: 0.5;
  width: 400px;
  padding: 18px 48px;
  text-align: center;
}

.popup-tab__inner {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-column-gap: 50px;
  -moz-column-gap: 50px;
  column-gap: 50px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-bottom: 40px;
}
.popup-log__form,
.popup-regist__form {
  display: none;
}
.popup-log__form.popup-content--active,
.popup-regist__form.popup-content--active {
  display: block;
}
.popup-tab {
  padding-bottom: 12px;
  border-bottom: 1px solid transparent;
  opacity: 0.3;
}
.popup-tab.popup-tab--active {
  opacity: 1;
  border-bottom: 1px solid #ddd;
  color: #ddd;
}
.popup-log > input {
  width: 100%;
}
.popup-log__input-wrapper + .popup-log__input-wrapper,
.popup-regist__input-wrapper + .popup-regist__input-wrapper {
  margin-top: 20px;
}
.recaptcha-wrapper {
  margin: 0 auto;
}
.g-recaptcha div div iframe {
  width: 100%;
  border-radius: 7px;
}
.g-recaptcha {
  margin: 40px 0;
}

.g-recaptcha > div {
  margin: 0 auto;
  width: 300px !important;
}
.popup-regist__input-wrapper > input {
  width: 100%;
}
.policy {
  margin: 0 auto;
  width: 331px;
  margin-top: 16px;
  color: #ddd;
  font-size: 14px;
  line-height: 150%;
}
.policy > span {
  opacity: 0.5;
}
.policy > a {
  display: inline;
  opacity: 0.5;
  color: #ddd;
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.policy > a:hover {
  opacity: 1;
}
.popup-buy__content {
  padding-bottom: 80px;
}
.popup-buy__form {
  margin-top: 50px;
}

/* form-radio */
.form-radio__label-card.label--active {
  opacity: 1;
}
.form-radio__label-cript.label--active {
  opacity: 1;
}
.phone-label.label--active {
  opacity: 1;
}
.name-label.label--active {
  opacity: 1;
}
.phone__input,
.name__input {
  display: none;
}
.phone__input.input--active,
.name__input.input--active {
  display: block;
  position: relative;
}
.form-radio {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.form-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.form-radio label {
  display: block;
  position: relative;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 35px;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 25px;
  opacity: 0.7;
}

.form-radio span {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  background-color: #313134;
  border-radius: 50%;
}

.form-radio label input:checked ~ span {
  background-color: #313134;
}

.form-radio span:after {
  content: "";
  position: absolute;
  display: none;
}

.form-radio label input:checked ~ span:after {
  display: block;
}

.form-radio label span:after {
  top: 6px;
  left: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dddddd;
}

/* прелоадер  */
.main-preloader {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #1b1b1e;
  z-index: 9;
  overflow:hidden;
}
.main-preloader--off {
  display: none;
}
.smiley {
  width: 150px;
  height: 150px;
}
.smiley__eye1,
.smiley__eye2,
.smiley__mouth1,
.smiley__mouth2 {
  -webkit-animation: eye1 3s ease-in-out infinite;
  animation: eye1 3s ease-in-out infinite;
}
.smiley__eye1,
.smiley__eye2 {
  -webkit-transform-origin: 64px 64px;
  -ms-transform-origin: 64px 64px;
  transform-origin: 64px 64px;
}
.smiley__eye2 {
  -webkit-animation-name: eye2;
  animation-name: eye2;
}
.smiley__mouth1 {
  -webkit-animation-name: mouth1;
  animation-name: mouth1;
}
.smiley__mouth2 {
  -webkit-animation-name: mouth2;
  animation-name: mouth2;
  visibility: hidden;
}

@-webkit-keyframes eye1 {
  from {
    -webkit-transform: rotate(-260deg) translate(0, -56px);
    transform: rotate(-260deg) translate(0, -56px);
  }
  50%,
  60% {
    -webkit-animation-timing-function: cubic-bezier(0.17, 0, 0.58, 1);
    animation-timing-function: cubic-bezier(0.17, 0, 0.58, 1);
    -webkit-transform: rotate(-40deg) translate(0, -56px) scale(1);
    transform: rotate(-40deg) translate(0, -56px) scale(1);
  }
  to {
    -webkit-transform: rotate(225deg) translate(0, -56px) scale(0.35);
    transform: rotate(225deg) translate(0, -56px) scale(0.35);
  }
}

@keyframes eye1 {
  from {
    -webkit-transform: rotate(-260deg) translate(0, -56px);
    transform: rotate(-260deg) translate(0, -56px);
  }
  50%,
  60% {
    -webkit-animation-timing-function: cubic-bezier(0.17, 0, 0.58, 1);
    animation-timing-function: cubic-bezier(0.17, 0, 0.58, 1);
    -webkit-transform: rotate(-40deg) translate(0, -56px) scale(1);
    transform: rotate(-40deg) translate(0, -56px) scale(1);
  }
  to {
    -webkit-transform: rotate(225deg) translate(0, -56px) scale(0.35);
    transform: rotate(225deg) translate(0, -56px) scale(0.35);
  }
}
@-webkit-keyframes eye2 {
  from {
    -webkit-transform: rotate(-260deg) translate(0, -56px);
    transform: rotate(-260deg) translate(0, -56px);
  }
  50% {
    -webkit-transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
    transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
  }
  52.5% {
    -webkit-transform: rotate(40deg) translate(0, -56px) rotate(-40deg)
      scale(1, 0);
    transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1, 0);
  }
  55%,
  70% {
    -webkit-animation-timing-function: cubic-bezier(0, 0, 0.28, 1);
    animation-timing-function: cubic-bezier(0, 0, 0.28, 1);
    -webkit-transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
    transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
  }
  to {
    -webkit-transform: rotate(150deg) translate(0, -56px) scale(0.4);
    transform: rotate(150deg) translate(0, -56px) scale(0.4);
  }
}
@keyframes eye2 {
  from {
    -webkit-transform: rotate(-260deg) translate(0, -56px);
    transform: rotate(-260deg) translate(0, -56px);
  }
  50% {
    -webkit-transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
    transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
  }
  52.5% {
    -webkit-transform: rotate(40deg) translate(0, -56px) rotate(-40deg)
      scale(1, 0);
    transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1, 0);
  }
  55%,
  70% {
    -webkit-animation-timing-function: cubic-bezier(0, 0, 0.28, 1);
    animation-timing-function: cubic-bezier(0, 0, 0.28, 1);
    -webkit-transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
    transform: rotate(40deg) translate(0, -56px) rotate(-40deg) scale(1);
  }
  to {
    -webkit-transform: rotate(150deg) translate(0, -56px) scale(0.4);
    transform: rotate(150deg) translate(0, -56px) scale(0.4);
  }
}
@-webkit-keyframes eyeBlink {
  from,
  25%,
  75%,
  to {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  50% {
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
  }
}
@keyframes eyeBlink {
  from,
  25%,
  75%,
  to {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  50% {
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
  }
}
@-webkit-keyframes mouth1 {
  from {
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    stroke-dasharray: 0 351.86;
    stroke-dashoffset: 0;
  }
  25% {
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    stroke-dasharray: 175.93 351.86;
    stroke-dashoffset: 0;
  }
  50% {
    -webkit-animation-timing-function: steps(1, start);
    animation-timing-function: steps(1, start);
    stroke-dasharray: 175.93 351.86;
    stroke-dashoffset: -175.93;
    visibility: visible;
  }
  75%,
  to {
    visibility: hidden;
  }
}
@keyframes mouth1 {
  from {
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    stroke-dasharray: 0 351.86;
    stroke-dashoffset: 0;
  }
  25% {
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    stroke-dasharray: 175.93 351.86;
    stroke-dashoffset: 0;
  }
  50% {
    -webkit-animation-timing-function: steps(1, start);
    animation-timing-function: steps(1, start);
    stroke-dasharray: 175.93 351.86;
    stroke-dashoffset: -175.93;
    visibility: visible;
  }
  75%,
  to {
    visibility: hidden;
  }
}
@-webkit-keyframes mouth2 {
  from {
    -webkit-animation-timing-function: steps(1, end);
    animation-timing-function: steps(1, end);
    visibility: hidden;
  }
  50% {
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    visibility: visible;
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -351.86;
  }
}
@keyframes mouth2 {
  from {
    -webkit-animation-timing-function: steps(1, end);
    animation-timing-function: steps(1, end);
    visibility: hidden;
  }
  50% {
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    visibility: visible;
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -351.86;
  }
}
.preloader__result {
  display: block;
}
.preloader__result.preloader__result--off {
  display: none;
}
/* прелоадер линия */
.preloader__result {
  margin-top: 40px;
}
.line-preloader {
  border-radius: 25px;
  background: #252525;
  width: 100%;
  height: 12px;
  position: relative;
}
.line-preloader--active {
  border-radius: 25px;
  background: #03dac6;
  position: absolute;
  left: 0px;
  top: 0px;
  height: 12px;
  -webkit-animation-duration: 20s;
  animation-duration: 20s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: preloadLine;
  animation-name: preloadLine;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}
@keyframes preloadLine {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
/* прелоадер для текста  */
.text-preloader {
  margin-top: 30px;
}
.line {
  width: 100%;
  height: 1px;
  background: #313134;
  margin-bottom: 12px;
}

.text-preloader__element {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: preloadAnim;
  animation-name: preloadAnim;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  background-color: #252525;
  background-repeat: no-repeat;
  height: 36px;
  border-radius: 8px;
}
.text-preloader__element + .text-preloader__element {
  margin-top: 12px;
}
.text-preloader__element--1 {
  position: relative;
  width: 350px;
  background-image: url("/img/preloader-1.webp");
  background-repeat: no-repeat;
  background-size: contain;
  margin: 12px 0;
}

.text-preloader__element--2 {
  width: 300px;
  background-image: url("/img/preloader-2.webp");
}
.text-preloader__element--3 {
  width: 250px;
  background-image: url("/img/preloader-3.webp");
}
.text-preloader__element--4 {
  width: 200px;
  background-image: url("/img/preloader-4.webp");
}
.text-preloader__element--5 {
  width: 300px;
  background-image: url("/img/preloader-5.webp");
}
.text-preloader__element--6 {
  width: 250px;
  background-image: url("/img/preloader-6.webp");
}
.text-preloader__element--7 {
  width: 800px;
  background-image: url("/img/preloader-7.webp");
}
@keyframes preloadAnim {
  0% {
    background-position: -269px 0;
  }
  100% {
    background-position: 369px 0;
  }
}

/* селект */
.select {
  position: relative;
  width: 100%;
  height: 56px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 40px;
  background-color: #121212;
  color: #ddd;
  font-weight: 400;
  border-radius: 8px;
  padding-right: 30px;
}

.select[data-state="active"] .select__title::before {
  -webkit-transform: translate(-3px, -50%) rotate(-45deg);
  -ms-transform: translate(-3px, -50%) rotate(-45deg);
  transform: translate(-3px, -50%) rotate(-45deg);
}
.select[data-state="active"] .select__title::after {
  -webkit-transform: translate(3px, -50%) rotate(45deg);
  -ms-transform: translate(3px, -50%) rotate(45deg);
  transform: translate(3px, -50%) rotate(45deg);
}
.select[data-state="active"] .select__content {
  opacity: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.select[data-state="active"] .select__label + .select__input + .select__label {
  max-height: 49px;
  border-top-width: 1px;
}
.select__content-wrapper {
  padding-top: 7px;
}
.select__input.last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.select__label.last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.select.none {
  display: none;
}

.select__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px 16px;
  border-radius: 19px;
  border: none;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
}
.select__title.select__title--active {
  opacity: 1;
}
.select__title::before,
.select__title::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 16px;
  display: block;
  width: 10px;
  height: 2px;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  -webkit-transform: translate(-3px, -50%) rotate(45deg);
  -ms-transform: translate(-3px, -50%) rotate(45deg);
  transform: translate(-3px, -50%) rotate(45deg);
  background-color: #959595;
}
.select__title::after {
  -webkit-transform: translate(3px, -50%) rotate(-45deg);
  -ms-transform: translate(3px, -50%) rotate(-45deg);
  transform: translate(3px, -50%) rotate(-45deg);
}
.select__title:hover {
  border-color: #959595;
}
.select__title:hover::before,
.select__title:hover::after {
  background-color: #959595;
}

.select__content {
  position: absolute;
  top: 50px;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #121212;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  opacity: 0;
  z-index: 8;
  max-height: 181px;
  padding-bottom: 6px;
  padding-right: 6px;
  display: none;
}
.select__content.select__content--active {
  display: flex;
  opacity: 1;
}
.select__content-wrapper {
  height: max-content;
  overflow-y: scroll;
  padding: 0px 16px;
}
.select__input {
  display: none;
}
.select__input:checked + label {
  background-color: #121212;
}
.select__input:disabled + label {
  opacity: 0.6;
  pointer-events: none;
}
.select__label-price,
.select__title-price {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-column-gap: 10px;
  -moz-column-gap: 10px;
  column-gap: 10px;
}
.new-price,
.select__title-price-new-price {
  font-weight: 600;
}
.old-price,
.select__title-price-old-price {
  color: #ddd;
  text-decoration: line-through;
  opacity: 0.5;
}
.select__label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 56px;
  max-height: 0;
  padding: 16px;
  -webkit-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
  cursor: pointer;
  overflow: hidden;
  min-height: 56px;
  border-radius: 8px;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.select__label:hover {
  background-color: #1b1b1e !important;
}

.not-found {
  padding-top: 140px;
}

.not-found__wrapper {
  margin-left: 566px;
}
.not-found__title {
  font-size: 64px;
  line-height: 1.77;
  color: #ddd;
  margin-bottom: 20px;
}
.not-found__subtitle {
  color: #ddd;
  font-size: 24px;
  line-height: 1.29;
  opacity: 0.5;
  margin-bottom: 50px;
}
.not-found__image {
  width: 339.655px;
  height: 572.385px;
  position: absolute;
  bottom: 85px;
}
.not-found__button {
  display: block;
  width: 400px;
  height: 56px;
  padding: 16px 10px;
}
.mobile-menu {
  display: none;
  position: absolute;
  z-index: 999;
  top: 95px;
  bottom: -30px;
  right: 0px;
  left: 0px;
  width: 100vw;
  background: #252525;
  border-top: 1px solid rgba(221, 221, 221, 0.2);
  padding-top: 15px;
  max-height: 100vh;
  overflow-y: hidden;
  height: 100vh;
}
.mobile-menu.mobile-menu--open {
  display: block;
}
.mobile-menu__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
}
.mobile-menu__item-name {
  font-size: 20px;
  line-height: 1.24;
  color: #ddd;
  padding: 16px 0;
  display: block;
  text-align: center;
  margin-bottom: 16px;
}
.mobile-menu__item-link {
  position: relative;
  border-bottom: 1px solid rgba(221, 221, 221, 0.2);
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: left;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
.mobile-menu__item-link::after {
  content: "";
  position: absolute;
  background-image: url("/img/icons/caret.webp");
  background-size: 24px 24px;
  width: 24px;
  height: 24px;
  right: 0px;
  top: 15px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.mobile-menu__item-link > button {
  color: #ddd;
  width: 100%;
  display: block;
  height: 100%;
  padding: 16px 0 16px 32px;
  text-align: left;
}
.mobile-menu__item-link--data {
  background-image: url("/img/icons/mask.webp");
  background-size: 24px 24px;
}
.mobile-menu__item-link--history {
  background-image: url("/img/icons/wallet.webp");
  background-size: 24px 24px;
}
.mobile-menu__item-out {
  padding: 16px 0;
  text-align: center;
  border-top: 1px solid rgba(221, 221, 221, 0.87);
}
.mobile-menu__item-out > a {
  position: relative;
  font-size: 20px;
  color: #ddd;
}
.mobile-menu__item-out > a:after {
  content: "";
  position: absolute;
  background-image: url("/img/icons/logout.webp");
  background-repeat: no-repeat;
  background-size: 24px 24px;
  width: 24px;
  height: 24px;
  top: 0px;
  left: -30px;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
.main-page__policy {
  margin: 16px 0 0 0;
  width: 100%;
}

@media (max-width: 1700px) {
  .container {
    max-width: 1229px;
  }

  .home-default__list {
    margin-top: 100px;
  }
  .telegram-subscription__button {
    width: 192px;
    padding: 18px 32px;
  }

  .telegram-subscription__title {
    width: 384px;
  }
  .account__inner {
    -webkit-column-gap: 44px;
    -moz-column-gap: 44px;
    column-gap: 44px;
  }
  .right-mask {
    width: 387.447px;
    height: 472px;
    right: 728px;
    top: 100px;
  }
  .left-mask {
    width: 286px;
    height: 345.275px;
    left: 734px;
  }

  .telegram-subscription__title {
    -webkit-transform: translateX(10px);
    -ms-transform: translateX(10px);
    transform: translateX(10px);
  }
  .not-found__wrapper {
    margin-left: 390px;
  }
  .not-found {
    padding-top: 120px;
  }
}
@media (max-width: 1240px) {
  .not-found__wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-left: 0;
  }
  .not-found__title {
    font-size: 48px;
    line-height: 1.58;
    margin-bottom: 30px;
  }
  .not-found__image {
    width: 218.778px;
    height: 369px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 26px;
    z-index: -1;
  }
}
@media (max-width: 1160px) {
  .history-person__button {
    color: transparent;
    width: 72px;
    background-position-x: center;
  }
  .history-person__button:hover {
    color: transparent;
    background-position-x: center;
  }
  .history-person__button.history-person__button--active {
    color: transparent;
    background-position-x: center;
  }
  .history-person__button.history-person__button--active:hover {
    color: transparent;
  }
}
@media (max-width: 1023px) {
  .account__inner {
    -ms-grid-columns: 100%;
    grid-template-columns: 100%;
  }
  .account__menu-data,
  .account__menu-history {
    max-width: 260px;
    margin-bottom: 0px;
  }
  .telegram-subscription-absolute {
    position: relative;
    bottom: 0;
  }
  .account__content {
    margin-top: 0px;
  }
  .account__content-data {
    margin-top: 30px;
  }
  .account__content-history {
    margin-top: 43px;
  }
  .text-preloader__element--7 {
    width: 100%;
  }
}
@media (max-width: 960px) {
  .home-default {
    padding-top: 60px;
    overflow-x: hidden;
  }
  .home-default__subtitle {
    margin-bottom: 50px;
  }
  .home-default__list {
    margin-top: 80px;
  }
  .telegram-subscription {
    padding: 53px 0;
  }
  .telegram-subscription__title {
    width: 294px;
  }
  .telegram-subscription__image {
    width: 149.001px;
    height: 98px;
    -webkit-transform: translate(-21px, -10px);
    -ms-transform: translate(-21px, -10px);
    transform: translate(-21px, -10px);
  }
  .telegram-subscription__button {
    width: 167px;
    padding: 18px 14px;
  }
  .right-mask {
    width: 270.884px;
    height: 330px;
    right: 621px;
    top: 222px;
  }
  .left-mask {
    width: 202px;
    height: 243.865px;
    top: -68px;
    left: 613px;
  }
  .result__title {
    text-align: left;
  }
  .telegram-subscription-absolute {
    position: relative;
    bottom: 0;
  }
  .footer__inner > .footer__copy {
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
  }
  .telegram-subscription__title {
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
  }
  .not-found__subtitle {
    width: 588px;
    text-align: center;
  }
  .not-found {
    padding-top: 100px;
  }
}
@media (max-width: 737px) {
  .right-mask {
    display: none;
  }
  .left-mask {
    display: none;
  }
  .account {
    padding-top: 30px;
  }
  .account__content-history__list {
    display: none;
  }
  .account__menu {
    display: none;
  }
  .history-person__row {
    position: relative;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    row-gap: 12px;
  }
  .history-person__button {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
  }
  .history-person__row {
    padding: 16px 0;
  }
  .history-person__list__inner {
    padding: 8px 16px 24px 16px;
  }
  .result-list {
    margin-top: 0px;
  }
  .history-person__list .result-list .result-item__title {
    margin-bottom: 24px;
    max-width: 100%;
  }
  .result-item.address {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .result-item.address > .result-item__info {
    margin-left: 0;
    margin-top: 4px;
  }
  .result-list + .result-list {
    margin-top: 30px;
  }
  .history-person + .history-person {
    margin-top: 8px;
  }
  .account__mobile-title {
    display: block;
    margin: 0 auto;
  }
  .account__content-data__title {
    margin-bottom: 16px;
  }
  .account__content-data {
    margin-top: 45px;
  }
  .account__content-data__form {
    width: 100%;
  }
  .account__content-data__button {
    width: 100%;
  }
  .main-page__result-list {
    margin-top: 30px;
  }
}
@media (max-width: 664px) {
  .header {
    padding-top: 40px;
  }
  .header__wrapper {
    gap: 16px;
  }
  .logo {
    font-size: 24px;
    line-height: 1.29;
  }
  .header-login {
    padding: 8px 32px;
  }
  .menu__button-mobile {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .menu {
    padding-right: 0;
  }
  .menu__button {
    display: none;
  }
  .footer__inner {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    row-gap: 16px;
  }
  .footer__inner > .logo {
    width: 100%;
  }
  .footer__copy {
    font-size: 14px;
    line-height: 1.17;
    width: 155px;
  }
  .popup {
    padding-left: 20px;
    padding-right: 20px;
  }
  .popup-tab__inner {
    margin-bottom: 0px;
  }
  .popup__content {
    width: 100%;
    padding: 50px 20px 60px;
  }
  .popup__title {
    font-size: 20px;
    line-height: 1.23;
    margin-bottom: 30px;
  }
  .button.popup__button {
    width: 100%;
  }
  .popup-warning__subtitle {
    font-size: 16px;
    line-height: 1.19;
    margin-bottom: 30px;
  }
  .popup-warning__subtitle > span::after {
    top: -2px;
  }
  .popup-warning__subtitle > span {
    margin-left: 8px;
  }
  .popup-warning__button {
    width: 100%;
  }
  .popup__close {
    top: 16px;
    right: 16px;
    width: 16px;
    height: 16px;
    background-size: cover;
  }
  .g-recaptcha {
    margin: 20px 0;
  }
  .popup-log__input-wrapper + .popup-log__input-wrapper,
  .popup-regist__input-wrapper + .popup-regist__input-wrapper {
    margin-top: 8px;
  }
  .home-default {
    padding-top: 40px;
  }
  .home-default__title {
    font-size: 48px;
  }
  .home-default__subtitle {
    font-size: 16px;
  }
  .home-default__inner {
    width: 100%;
  }
  .home-default__list {
    margin-top: 60px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .telegram-subscription {
    min-height: 367px;
    padding: 19px 0 50px;
  }
  .telegram-subscription-absolute {
    position: relative;
    bottom: 0;
  }
  .telegram-subscription__inner {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .telegram-subscription__title {
    margin-top: 30px;
    margin-bottom: 40px;
  }
  .telegram-subscription__image {
    width: 94px;
    height: 62px;
    -webkit-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }
  .telegram-subscription__button {
    width: 335px;
  }
  .text-preloader__element--1 {
    width: 100%;
  }
  .result {
    padding-top: 62px;
  }
  .result__title {
    width: 335px;
  }
  .result__buttons {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    row-gap: 16px;
  }
  .main-page__result-button {
    width: 100%;
  }
  .result__button-transparent {
    width: 100%;
  }

  .result .container > .policy {
    width: 328px;
    text-align: left;
    margin: 16px 0 0;
  }
  .address-wrapper {
    width: 100%;
  }
  .result-item__info {
    overflow-x: scroll;
  }
  .not-found {
    padding-top: 50px;
  }
  .not-found__button {
    width: 100%;
  }
  .not-found__inner {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .not-found__title {
    font-size: 32px;
    line-height: 1.39;
    margin-bottom: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .not-found__subtitle {
    font-size: 16px;
    line-height: 1.19;
    width: 335px;
    margin-bottom: 30px;
  }
  .not-found__image {
    position: revert-layer;
    -webkit-transform: translate(0px, 90px);
    -ms-transform: translate(0px, 90px);
    transform: translate(0px, 90px);
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1;
    margin: auto;
    margin-top: -71px;
    display: block;
  }
  .main__page-result__address .result-item__descript {
    min-width: 100%;
  }
  .main__page-result__address {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}
@media (max-width: 550px) {
  .result__notfound-title {
    width: 335px;
    text-align: center;
  }
  .result__notfound-button {
    width: 100%;
  }
}
@media (max-width: 515px) {
  .home-default__form > .form-radio {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    row-gap: 30px;
  }
  .form-radio label {
    text-align: left;
  }
  .home-default__input-wrapper {
    margin-bottom: 40px;
  }
  .form-radio {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    row-gap: 30px;
  }

  .popup-buy__form {
    margin-top: 40px;
  }
}
@media (max-width: 450px) {
  .home-default__form > .button {
    width: 100%;
  }
  .home-default__list {
    row-gap: 24px;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .result-list__button {
    width: 100%;
    font-size: 16px;
    line-height: 1.24;
  }
}
@media (max-width: 428px) {
  .popup-warning__subtitle {
    padding-right: 0px;
  }
  .popup-warning__subtitle > p {
    display: block;
    margin-bottom: 16px;
  }
  .popup-warning__subtitle > span {
    margin-left: 0px;
  }
}
@media (max-width: 400px) {
}
@media (max-width: 380px) {
  .g-recaptcha > div {
    width: 100% !important;
  }
}

@media (max-width: 365px) {
  .telegram-subscription__button {
    width: 100%;
  }
  .mobile-menu {
    height: 100vh;
  }
}

@media (max-width: 330px) {
  .mobile-menu {
    max-height: 120vh;
  }
  .mobile-menu {
    height: 120vh;
  }
  .mobile-menu__wrapper {
    height: 74vh;
  }
}

.home-default__title {
  margin-bottom: 16px;
}
.home-default__subtitle {
  margin-bottom: 32px;
  max-width: 466px;
  margin-left: auto;
  margin-right: auto;
  opacity: 1;
  font-family: Roboto , sans-serif;

}
.home-default__text {
  color:#8D8D8F;
  //color:#fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 80px;
  font-family: Roboto , sans-serif;
}
.home-default__inner {
  max-width: 720px;
  width: auto;
}
.home-default__list {
  margin-top: 79px;
}
.howwork {
  padding: 40px 0 120px;
}
.title-mainpage {
  color: #ddd;
  font-size: 32px;
  font-weight: 400;
  line-height: 150%;
  text-align: center;
}
.howwork-list {
  max-width: 820px;
  margin: 0 auto;
  margin-top: 60px;
}
.howwork-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}
.howwork-item + .howwork-item {
  margin-top: 71px;
}
.howwork-item__text {
  max-width: 400px;
}

.howwork-item__num {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 100000px;
  border: 1px solid #fff;
  color: #ddd;
  font-size: 24px;
  font-weight: 400;
  line-height: 150%;
  margin-bottom: 24px;
}
.howwork-item__img {
  max-width: 260px;
}
.howwork-item__title {
  color: #ddd;
  font-size: 24px;
  font-weight: 400;
  line-height: 150%;
  margin-bottom: 8px;
}
.howwork-item__subtitle {
  color: #ddd;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  opacity: 0.7;
}
.howwork-arrow {
  max-width: 157px;
  max-height: 140px;
  margin-top: 54px;
}
.howwork-arrow--left {
  margin-left: 205px;
}
.howwork-arrow--right {
  margin-left: 43px;
}
.infonumber {
  padding: 120px 0;
}
.infonumber-container {
  max-width: 1700px;
}
.infonumber-list {
  margin-top: 80px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  gap: 62px;
}
.infonumber-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-column-gap: 16px;
  -moz-column-gap: 16px;
  column-gap: 16px;
  border-radius: 50px;
  background: #252525;
  width: 282px;
  height: 70px;
  padding: 20px;
  color: #ddd;
  font-size: 20px;
  font-weight: 400;
  line-height: 150%;
}
.infonumber-item__icon {
  width: 24px;
  height: 24px;
}
.faq {
  padding: 80px 0px 100px 0px;
  background: #252525;
}
.faq-wrapper {
  margin-top: 60px;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}
.faq-element__inner {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px;
}
.faq-element__inner + .faq-element__inner {
  margin-top: 16px;
}
.faq-element {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-column-gap: 10px;
  -moz-column-gap: 10px;
  column-gap: 10px;
}
.faq-element__question {
  color: #ddd;
  font-size: 20px;
  font-weight: 400;
  line-height: 150%;
  margin-right: 20px;
}
.faq-button {
  background-image: url("/img/icons/caret.webp");
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 24px;
  min-height: 24px;
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.faq-button.faq-button--active {
  -webkit-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  transform: rotate(0deg);
}
.faq-button:hover {
  scale: 1.2;
}
.faq__answer {
  overflow-y: hidden;
  -webkit-transition: all 0.7s ease;
  -o-transition: all 0.7s ease;
  transition: all 0.7s ease;
  color: #ddd;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  row-gap: 10px;
  opacity: 0.7;
  padding-right: 48px;
  position: relative;
  white-space: pre-line;
}
.faq-element + .container--active {
  margin-top: 10px;
}
.faq__answer-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  row-gap: 10px;
}
.faq__answer-list > li {
  padding-left: 18px;
  position: relative;
}
.faq__answer-list > li::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 7px;
  width: 8px;
  height: 8px;
  background-color: #03dac6;
  border-radius: 100%;
}
.main-page__result-button {
  color: #121212;
}
.main-page__result-button > span::after {
  background-image: url(/img/icons/darts-dark.webp);
}
.result__container {
  max-width: 1140px;
}
.header-left__list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.logo-wrapper + .header-left__item {
  margin-left: 48px;
}
.header-left__item > a {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.19;
  opacity: 0.7;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.header-left__item > a:hover {
  opacity: 1;
}
.header-left__item + .header-left__item {
  margin-left: 24px;
}
.mobile-menu__item-link--data {
  background-image: url("/img/lock.webp");
}
.mobile-menu__item-link--history {
  background-image: url("/img/history.webp");
}
.account__menu-data::after {
  background-image: url("/img/lock.webp");
}
.account__menu-history::after {
  background-image: url("/img/history.webp");
}
.history-person__none-title {
  color: #ddd;
  font-family: "Roboto";
  font-size: 32px;
  font-weight: 500;
  line-height: 1.38;
  opacity: 0.5;
  margin-bottom: 20px;
}
.history-person__none-subtitle {
  color: #ddd;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 400;
  line-height: 1.23;
  opacity: 0.5;
  margin-bottom: 40px;
}
.history-person__none-button {
  display: block;
  width: 259px;
  height: 66px;
  color: #121212;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.7;
}
.button:active {
  color: #fff;
}
@media (max-width: 1705px) {
  .infonumber-list {
    gap: 20px;
  }
  .infonumber-container {
    max-width: 1268px;
  }
  .infonumber-item {
    width: 292px;
  }
  .home-default__title {
    margin-bottom: 24px;
  }
  .home-default__subtitle {
    margin-bottom: 24px;
  }
  .home-default__text {
    margin-bottom: 60px;
  }
}
@media (max-width: 1275px) {
  .infonumber-list {
    max-width: 728px;
    margin-right: auto;
    margin-left: auto;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-top: 60px;
  }
  .infonumber-item {
    width: 347px;
  }
  .infonumber {
    padding: 80px 0;
  }
}
@media (max-width: 1160px) {
  .history-person__button {
    width: 56px;
    height: 40px;
  }
}
@media (max-width: 870px) {
  .howwork-item__img {
    max-width: 230px;
    object-fit: contain;
    aspect-ratio: auto;
  }
  .howwork-arrow {
    max-width: 120px;
    max-height: 100px;
    margin-top: 30px;
  }
  .howwork-item + .howwork-item {
    margin-top: 30px;
  }
  .howwork-arrow--left {
    margin-left: 209px;
  }
  .howwork-arrow--right {
    margin-left: -43px;
  }
  .faq__answer {
    padding-right: 0px;
  }
  .faq {
    padding: 60px 0 80px;
  }
  .logo-wrapper + .header-left__item {
    margin-left: 46px;
  }
}
@media (max-width: 761px) {
  .infonumber-list {
    max-width: 728px;
  }
  .infonumber-item {
    width: 335px;
  }
  .header-left__item {
    display: none;
  }
}
@media (max-width: 737px) {
  .infonumber {
    padding: 60px 0;
  }
  .infonumber-item {
    -webkit-column-gap: 8px;
    -moz-column-gap: 8px;
    column-gap: 8px;
  }
  .infonumber-list {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 40px;
  }
  .result {
    padding-bottom: 30px;
  }
  .howwork {
    padding: 30px 0 60px;
  }
  .howwork-list {
    margin-top: 40px;
  }
  .howwork-item {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 335px;
    margin: 0 auto;
    row-gap: 10px;
  }
  .title-mainpage {
    font-size: 24px;
  }
  .howwork-item__num {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  .howwork-item__title {
    font-size: 20px;
  }
  .howwork-item__subtitle {
    font-size: 14px;
  }
  .howwork-item__text {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-column-gap: 16px;
    -moz-column-gap: 16px;
    column-gap: 16px;
  }
  .howwork-item__wrapper {
    width: 267px;
  }
  .howwork-arrow {
    max-width: 65px;
    max-height: 72px;
    margin-top: 19px;
  }
  .howwork-item + .howwork-item {
    margin-top: 31px;
  }
  .howwork-arrow--left {
    margin-left: 127px;
  }
  .howwork-arrow--right {
    margin-left: 179px;
  }

  .howwork-item--1 > .howwork-item__img {
    -webkit-box-ordinal-group: 0;
    -ms-flex-order: -1;
    order: -1;
  }
  .howwork-item--3 > .howwork-item__img {
    -webkit-box-ordinal-group: 0;
    -ms-flex-order: -1;
    order: -1;
  }
  .history-person__none-title {
    font-size: 24px;
    line-height: 1.28;
  }
  .history-person__none-subtitle {
    font-size: 16px;
    line-height: 1.19;
  }
}
@media (max-width: 664px) {
  .faq-element__question {
    margin-right: 0px;
  }
  .faq-wrapper {
    margin-top: 30px;
  }
  .home-default__subtitle {
    max-width: 335px;
  }
  .history-person__button {
    width: 40px;
    height: 40px;
  }
  .history-person__none-button {
    width: 100%;
  }
}

@media (max-width: 370px) {
  .howwork-item__text {
    -webkit-column-gap: 10px;
    -moz-column-gap: 10px;
    column-gap: 10px;
  }
  .policy {
    width: 100%;
  }
}
@media (max-width: 365px) {
  .result__title {
    width: 100%;
    font-size: 21px;
  }
  .home-default__title {
    font-size: 44px;
  }
  .howwork-item__num {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
  .howwork-item__text {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .howwork-item__wrapper {
    width: 225px;
  }
  .howwork-item__title {
    font-size: 18px;
    margin-bottom: 4px;
  }
  .howwork-item__subtitle {
    font-size: 12px;
  }
  .howwork-arrow--left {
    margin-left: 42px;
  }
  .howwork-arrow--right {
    margin-left: 78px;
  }
  .infonumber-item {
    font-size: 18px;
    height: 60px;
  }
  .infonumber-list {
    gap: 15px;
  }
  .history-person__none-title {
    font-size: 20px;
  }
  .history-person__none-subtitle {
    font-size: 14px;
    margin-bottom: 30px;
  }
}
</style>
