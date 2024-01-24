<template>
  <div class="popup-warning popup" v-if="warningPopupOpened">
    <div class="popup-warning__content popup__content">
      <button class="popup__close popup__close-warning" @click="this.$emit('update:warningPopupOpened')"></button>
      <h4 class="popup-warning__title popup__title">
        Предупреждение
      </h4>
      <div
          class="popup-warning__subtitle popup__subtitle darts-element"
      >
        <p>Спишется со счета пробивов:</p>
        <span>1</span>
      </div>
      <button
          type="button"
          class="button popup__button"
          @click="buyFullData"
      >
        Пробить
      </button>
      <button class="popup-warning__button" @click="this.$emit('update:warningPopupOpened')">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    warningPopupOpened: {
      type: Boolean,
      default: false
    },
    currentSearchPk: {
      type: Number,
      required: true,
      default:null,
    },
    userDetails: {
      type: Object,
      required: true
    }
  },
  methods: {
    async buyFullData() {
      const token = localStorage.getItem("token")
      const endpoint = this.$config.public.API_BASE_URL + 'buy-full-data/'
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        body: JSON.stringify({
          pk: this.currentSearchPk
        })
      })
      if (response.status === 200) {
        const data = await response.json()
        this.$emit('UpdateData', data.result)
        this.$emit('update:warningPopupOpened')
        let newUserDetails = {...this.userDetails}
        newUserDetails.available_searches = this.userDetails.available_searches - 1
        this.$emit('updateUserDetails', newUserDetails)
      }
    }
  }
}
</script>

<style scoped>

</style>