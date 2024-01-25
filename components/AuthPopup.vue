<template>
  <div class="popup-log popup" v-if="authPopupOpened">
    <div class="popup-log__content popup__content">
      <button
        class="popup__close popup__close-log"
        @click="$emit('close')"
      ></button>
      <div class="popup-tab__inner">
        <h4
          :class="{
            popup__title: true,
            'popup-tab': true,
            'tab-1': true,
            'popup-tab--active': loginTabOpened,
          }"
          @click="loginTabOpened = true"
        >
          Вход
        </h4>
        <h4
          :class="{
            popup__title: true,
            'popup-tab': true,
            'tab-2': true,
            'popup-tab--active': !loginTabOpened,
          }"
          @click="loginTabOpened = false"
        >
          Регистрация
        </h4>
      </div>
      <form
        @submit.prevent="login"
        :class="{
          'popup-form': true,
          'popup-log__form': true,
          'popup-content--active': loginTabOpened,
        }"
      >
        <div class="popup-log popup-log__input-wrapper">
          <label for="log-login" class="label-hidden">Логин</label>
          <input
            id="log-login"
            name="log-login"
            type="text"
            class="input"
            placeholder="Логин"
            v-model="loginUsername"
            required
          />
        </div>
        <div class="popup-log popup-log__input-wrapper input-password__wrapper">
          <label for="log-password" class="label-hidden">Пароль</label>
          <input
            id="log-password"
            name="log-password"
            type="password"
            class="input input-password password"
            placeholder="Пароль"
            v-model="loginPassword"
            required
          />
          <password-eye @showPassword="showPassword"></password-eye>
          <p class="errorpass">
            {{ loginError }}
          </p>
        </div>
                <captcha class="g-recaptcha" v-model:token="loginCaptchaToken" ref="loginCaptcha"></captcha>

        <button type="submit" class="button popup__button">Войти</button>
      </form>
      <form
        action=""
        :class="{
          'popup-form': true,
          'popup-log__form': true,
          'popup-content--active': !loginTabOpened,
        }"
        @submit.prevent="register"
      >
        <div class="popup-regist popup-regist__input-wrapper">
          <label for="regist-login" class="label-hidden">Логин</label>
          <input
            id="regist-login"
            name="regist-login"
            type="text"
            class="input"
            placeholder="Логин"
            v-model="registerUsername"
          />
          <p class="errorpass">
            {{ registerUsernameError }}
          </p>
        </div>
        <div
          class="popup-regist popup-regist__input-wrapper input-password__wrapper"
        >
          <label for="regist-password" class="label-hidden">Пароль</label>
          <input
            id="regist-password"
            name="regist-password"
            type="password"
            class="input input-password password old-password"
            placeholder="Пароль"
            v-model="registerPassword"
          />
          <password-eye @showPassword="showPassword"></password-eye>
          <p class="errorpass">
            {{ registerPasswordError }}
          </p>
        </div>
        <div
          class="popup-regist popup-regist__input-wrapper input-password__wrapper"
        >
          <label for="regist-password-confirm" class="label-hidden"
            >Пароль</label
          >
          <input
            id="regist-password-confirm"
            name="regist-password"
            type="password"
            class="input input-password password new-password"
            placeholder="Пароль"
            v-model="registerPasswordConfirm"
          />
          <password-eye @showPassword="showPassword"></password-eye>
          <p
            class="errorpass"
            v-if="
              !(registerPassword === registerPasswordConfirm) &&
              registerPasswordConfirm !== ''
            "
          >
            {{ registerPasswordConfirmError }}
          </p>
        </div>
        <captcha
          class="g-recaptcha"
          v-model:token="registerCaptchaToken"
          ref="registerCaptcha"
        ></captcha>
        <button type="submit" class="button popup__button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import PasswordEye from "@/components/PasswordEye.vue";
import Captcha from "@/components/Captcha.vue";
import store from "~/store/index.js";

export default {
  emits: ["auth"],
  components: {
    PasswordEye,
    Captcha,
  },
  props: {
    authPopupOpened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loginTabOpened: true,
      loginUsername: "",
      loginPassword: "",
      loginError: "",
      registerUsername: "",
      registerPassword: "",
      registerPasswordConfirm: "",
      registerUsernameError: "",
      registerPasswordError: "Пароль должен состоять минимум из 8 символов",
      registerPasswordConfirmError: "Пароли не совпадают",
      loginCaptchaToken:
        "",
      registerCaptchaToken: "",
    };
  },
  methods: {
    showPassword(button) {
      const inputEl = button.previousElementSibling;
      if (inputEl) {
        const currentType = inputEl.type;

        inputEl.type = currentType === "password" ? "text" : "password";
      }
    },
    async register() {
      if (
        !this.registerCaptchaToken ||
        this.registerPassword !== this.registerPasswordConfirm
      ) {
        return;
      }
      const endpoint = this.$config.public.API_BASE_URL + "auth/register/";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.registerUsername,
          password: this.registerPassword,
          password_confirm: this.registerPasswordConfirm,
          recaptcha: this.registerCaptchaToken,
        }),
      });
      const data = await response.json();
      if (response.status === 400) {
        if (data["username"]) {
          this.registerUsernameError = data["username"][0];
        } else {
          this.registerUsernameError = "";
        }
        if (data["password"]) {
          this.registerPasswordError = data["password"][0];
        } else {
          this.registerPasswordError = "";
        }
        if (data["password_confirm"]) {
          this.registerPasswordConfirmError = data["password_confirm"][0];
        } else {
          this.registerPasswordConfirmError = "";
        }
      } else {
        localStorage.setItem("token", data["token"]);
        this.registerUsername = "";
        this.$emit("auth");
        store.commit("setShow");
      }
      this.registerPassword = "";
      this.registerPasswordConfirm = "";
      this.$refs.registerCaptcha.recaptchaExpired();
    },
    async login() {
      if (!this.loginCaptchaToken) {
        return;
      }
      const endpoint = this.$config.public.API_BASE_URL + "auth/login/";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.loginUsername,
          password: this.loginPassword,
          recaptcha: this.loginCaptchaToken,
        }),
      });
      const data = await response.json();

      if (response.status === 400) {
        this.loginError = data["error"];
      } else {
        localStorage.setItem("token", data["token"]);
        this.loginUsername = "";
        this.$emit("auth");
        store.commit("setShow");
        window.location.reload();
      }
      this.loginPassword = "";
      this.$refs.loginCaptcha.recaptchaExpired();
    },
  },
};
</script>

<style scoped></style>
