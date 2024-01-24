<template>
  <div class="popup-buy popup" v-if="buyPopupOpened">
    <div class="popup-buy__content popup__content">
      <button class="popup__close popup-byu__close" @click="closePopup"></button>
      <h4 class="popup-buy__title popup__title">Покупка пробивов</h4>
      <form
          action=""
          class="popup-buy__form"
      >
        <div class="form-radio">
          <label :class="{'form-radio__label-card': true, 'label--active': this.paymentMethod===0}"
          >Банковская карта РФ
            <input
                value="card"
                type="radio"
                name="radio"
                checked
                @click="this.paymentMethod=0"
            />
            <span></span>
          </label>
          <label :class="{'form-radio__label-cript': true, 'label--active': this.paymentMethod===1}"
          >Криптовалюта
            <input
                value="crypto"
                type="radio"
                name="radio"
                @click="this.paymentMethod=1"
            />
            <span></span>
          </label>
        </div>

        <div
            class="popup-buy__form-select select"
            data-state=""
            ref="buySelect"
        >
          <div
              class="select__title"
              data-default="Option 0"
              @click="selectHandler"
          >

            <p class="select__title-quantity">
              {{ selectedTariff.title }}
            </p>
            <div class="select__title-price">
              <p class="select__title-price-new-price" v-if="selectedTariff.newPrice">{{ selectedTariff.newPrice }}₽</p>
              <p class="select__title-price-old-price" v-if="selectedTariff.oldPrice">{{ selectedTariff.oldPrice }}₽</p>
            </div>
          </div>

          <div class="select__content" ref="selectContent">
            <div class="select__content-wrapper">
              <div v-for="tariff in tariffs">
                <input
                    :value="tariff.id"
                    class="select__input"
                    type="radio"
                    name="singleSelect"
                    :id="'select' + tariff.id"
                    @click="selectTariff"
                />
                <label
                    :for="'select' + tariff.id"
                    class="select__label"
                >
                  <p class="select__label-quantity">
                    {{ tariff.title }}
                  </p>
                  <div class="select__label-price">
                    <p class="new-price">{{ tariff.newPrice }}₽</p>
                    <p class="old-price">{{ tariff.oldPrice }}₽</p>
                  </div>
                </label>

              </div>
            </div>
          </div>
        </div>

        <button
            type="button"
            class="button popup__button"
            @click="buy"
        >
          Пополнить
        </button>
      </form>
      <div class="policy">
        <span>Нажимая кнопку, вы подтверждаете согласие с </span>
        <a href="#">Условиями предоставления услуги</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buyPopupOpened: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      paymentMethod: 0,
      personData: {
      },
      selectedTariff: {
        title: "Выберите количество",
        oldPrice: "",
        newPrice: "",
      },
      tariffs: [
        {
          id: 0,
          title: "3 пробива",
          oldPrice: 149,
          newPrice: 99,
        },
        {
          id: 1,
          title: "10 пробивов",
          oldPrice: 349,
          newPrice: 239,
        },
        {
          id: 2,
          title: "50 пробивов",
          oldPrice: 899,
          newPrice: 549,
        },
        {
          id: 3,
          title: "100 пробивов",
          oldPrice: 1499,
          newPrice: 899,
        }
      ]
    }
  },
  methods: {
    selectHandler() {
      this.$refs.selectContent.classList.toggle("select__content--active")
      if ('active' === this.$refs.buySelect.getAttribute("data-state")) {
        this.$refs.buySelect.setAttribute('data-state', '')
      } else {
        this.$refs.buySelect.setAttribute('data-state', 'active')
      }
    },
    selectTariff(e) {
      this.selectedTariff = this.tariffs.find(tariff => tariff.id === Number(e.target.value))
      this.$refs.selectContent.classList.toggle("select__content--active")
    },
    closePopup() {
      this.$emit('update:buy-popup-opened', false)
    },
    async buy() {
      const token = localStorage.getItem("token")
      const endpoint = this.$config.public.API_BASE_URL + 'buy-searches/'
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        body: JSON.stringify({
          tariff: this.selectedTariff.id,
          top_up_method: this.paymentMethod
        })
      })
      const data = await response.json()
      if (data.link) {
        window.location.replace(data.link)
      }
    }
  }
}
</script>

<style scoped>

</style>