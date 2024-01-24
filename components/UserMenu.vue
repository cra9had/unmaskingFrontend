<template>
  <div
      :class="{'account__content-data': true, 'account__content--active': this.currentTab === 0}"
  >
    <h4 class="account__content-data__title">
      Изменение пароля
    </h4>
    <form
        action=""
        class="account__content-data__form"
    >
      <div>
        <label
            for="account-old_password"
            class="label-hidden"
        >Старый пароль</label
        >
        <input
            id="account-old_password"
            type="password"
            class="input account__content__input"
            placeholder="Старый пароль"
            v-model="oldPassword"
        />
        <password-eye @showPassword="showPassword"></password-eye>
        <p
            class="errorpass"
            id="errorpass"
        >
          {{ oldPasswordError }}
        </p>

      </div>
      <div>
        <label
            for="account-password"
            class="label-hidden"
        >Пароль</label
        >
        <input
            id="account-password"
            type="password"
            class="input account__content__input password old-password"
            placeholder="Новый пароль"
            v-model="newPassword"

        />
        <password-eye @showPassword="showPassword"></password-eye>
        <p
            class="errorpass"
        >
          {{ newPasswordError }}
        </p>
      </div>
      <div>
        <label
            for="account-new_password"
            class="label-hidden"
        >Новый пароль</label
        >
        <input
            id="account-new_password"
            type="password"
            class="input account__content__input new-password"
            placeholder="Новый пароль"
            v-model="newPasswordConfirm"
            @input="validatePasswordConfirm"
        />
        <password-eye @showPassword="showPassword"></password-eye>
        <p
            class="errorpass"
        >
          {{ newPasswordConfirmError }}
        </p>
      </div>
      <button
          type="submit"
          class="white-button account__content-data__button"
          @click.prevent="changePassword"
      >
        Принять изменения
      </button>
    </form>
  </div>
</template>

<script>
import PasswordEye from "@/components/PasswordEye.vue";
export default {
  components: {PasswordEye},
  props: {
    currentTab: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      oldPasswordError: "",
      newPasswordError: "Пароль должен состоять минимум из 8 символов",
      newPasswordConfirmError: "",
    }
  },
  methods: {
    showPassword(button) {
      const inputEl = button.previousElementSibling
      if (inputEl) {
        const currentType = inputEl.type;

        inputEl.type = currentType === 'password' ? 'text' : 'password';
      }
    },
    validatePasswordConfirm() {
      if (this.newPassword !== this.newPasswordConfirm) {
        this.newPasswordConfirmError = "Пароли не совпадают"
      } else {
        this.newPasswordConfirmError = ""
      }
    },
    async changePassword() {
      if (this.newPassword !== this.newPasswordConfirm || !this.oldPassword) {
        return
      }
      const token = localStorage.getItem("token")
      const endpoint = this.$config.public.API_BASE_URL + 'auth/change-password/'
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        body: JSON.stringify({
          old_password: this.oldPassword,
          new_password: this.newPassword
        })
      })
      const data = await response.json()
      if (response.status === 400) {
        if (data["old_password"]) {
          this.oldPasswordError = data["old_password"][0]
        } else {
          this.oldPasswordError = ""
        }

        if (data["new_password"]) {
          this.newPasswordError = data["new_password"][0]
        } else {
          this.newPasswordError = ""
        }
      } else {
        this.newPasswordError = ""
        this.oldPasswordError = ""
        this.newPasswordConfirmError = "Пароль сменен успешно!"
      }
    }
  },
}
</script>

<style scoped>

</style>