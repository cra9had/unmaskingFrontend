<template>
  <div
       :class="{'account__content-history': true, 'account__content--active': this.currentTab === 1}"
  >
    <div v-if="this.searches.length > 0">
      <ul class="account__content-history__list">
        <li>Номер</li>
        <li>Дата</li>
        <li>Статус</li>
      </ul>
      <div :class="{'history-person': true, 'no-border': search.opened}" v-for="search in searches">
        <div class="history-person__row">
          <p class="history-person__row-phone">
            {{ search.phone_number }}
          </p>
          <span class="history-person__row-date"
          >{{ search.date_created }}</span
          >
          <!-- если телефон найден  -->
          <div class="history-person__row-found" v-if="search.status===2">
            <div class="history-person__row-status">
              <!-- если статус "оплачено"-->
              <p class="paid" v-if="search.paid">Оплачено</p>

              <p class="not-paid" v-else>Не оплачено</p>
            </div>
            <button
                type="button"
                :class="{'transparent-button': true, 'history-person__button': true,
                'history-person__button--active': search.opened}"
                :value="search.id"
                @click="checkSearch"
            >
              Смотреть
            </button>
          </div>
          <!-- если телефон не найден  -->
          <div
              class="history-person__row-notfound"
              v-else-if="search.status===1"
          >
            <div class="history-person__row-status">
              Не найдено
            </div>
          </div>
          <div
              class="history-person__row-notfound"
              v-else-if="search.status===0"
          >
            <div class="history-person__row-status">
              В процессе
            </div>
          </div>
        </div>

        <div :class="{'history-person__list': true, 'container--active': search.opened}" :id="'searchData'+search.id">
          <div class="history-person__list__inner" v-if="search.personData">
            <ul class="result-list">
              <li class="result-item__title">
                <h5>Персональная информация</h5>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.fullname">
                <p class="result-item__descript">
                  ФИО:
                </p>
                <div class="address-wrapper">
                  <span class="result-item__info">
                    {{ search.personData.fullname }}
                  </span>
                </div>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.birthday">
                <p class="result-item__descript">
                  Дата рождения:
                </p>
                <div class="address-wrapper">
                  <span class="result-item__info">
                    {{ search.personData.birthday }}
                  </span>
                </div>
              </li>

              <li class="result-item main__page-result__address" v-if="search.personData.email">
                <p class="result-item__descript">
                  Почта:
                </p>
                <div class="address-wrapper">
                  <span class="result-item__info">
                    {{ search.personData.email }}
                  </span>
                </div>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.car_number">
                <p class="result-item__descript">
                  Водительские права:
                </p>
                <div class="address-wrapper">
                  <span class="result-item__info">
                    {{ search.personData.car_number }}
                  </span>
                </div>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.passport">
                <p class="result-item__descript">
                  Паспорт:
                </p>
                <div class="address-wrapper">
                  <span class="result-item__info">
                    {{ search.personData.passport }}
                  </span>
                </div>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.insurance">
                <p class="result-item__descript">
                  СНИЛС:
                </p>
                <div class="address-wrapper">
                  <span class="result-item__info">
                    {{ search.personData.insurance }}
                  </span>
                </div>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.inn">
                <p class="result-item__descript">
                  ИНН:
                </p>
                <div class="address-wrapper">
                <span class="result-item__info">
                  {{ search.personData.inn }}
                </span>
                </div>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.possibles_addresses">
                <address class="result-item__descript">
                  Возможные адреса:
                </address>
                <div class="address-wrapper">
                  <span class="result-item__info">
                    {{ search.personData.possibles_addresses }}
                  </span>
                </div>
              </li>
            </ul>
            <ul class="result-list">
              <li class="result-item__title">
                <h5>Социальные сети</h5>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.whatsapp">
                <p class="result-item__descript">
                  WhatsApp:
                </p>
                <div class="address-wrapper">
                <span class="result-item__info">
                  {{ search.personData.whatsapp }}
                </span>
                </div>
              </li>
              <li class="result-item main__page-result__address" v-if="search.personData.telegram">
                <p class="result-item__descript">
                  Telegram:
                </p>
                <div class="address-wrapper">
                <span class="result-item__info">
                  {{ search.personData.telegram }}
                </span>
                </div>
              </li>
            </ul>
            <button
                class="button result-list__button"
                :value="search.id"
                @click="buySearchClicked"
                v-if="!search.paid"
            >
              Открыть за <span>1</span>
            </button>
          </div>
        </div>
      </div>
      <button
          type="button"
          class="white-button account__content-button"
          v-if="nextExist"
          @click="loadHistory"
      >
        Показать еще
      </button>
    </div>
    <div class="history-person__none" v-else>
      <h3 class="history-person__none-title">
        История побивов пока пуста
      </h3>
      <p class="history-person__none-subtitle">
        Все пробивы будут отображаться в вашем
        аккаунте
      </p>
      <a
          href="#"
          class="button history-person__none-button"
          @click="this.$router.push({'name': 'index'})"
      >
        Пробить
      </a>
    </div>
  </div>
  <buy-search v-model:warning-popup-opened="warningPopupOpened"
              :current-search-pk="currentSearchPk"
              :user-details="UserDetails"
              @updateUserDetails="updateUserDetails"
              @updateData="updateData"
  ></buy-search>
  <buy-popup v-model:buy-popup-opened="buyPopupOpened"></buy-popup>
</template>

<script>
import BuyPopup from "@/components/BuyPopup.vue";
import BuySearch from "@/components/BuySearch.vue";


export default {
  props: {
    currentTab: {
      type: Number,
      default: 0
    },
    UserDetails: {
      type: Object,
      required: true
    }
  },
  components: {
    BuySearch, BuyPopup
  },
  data() {
    return {
      warningPopupOpened: false,
      buyPopupOpened: false,
      offset: 0,
      limit: 10,
      currentSearchPk: null,
      nextExist: true,
      searches: [

      ]
    }
  },
  methods: {
    updateData(data) {
      const searchIndex = this.searches.findIndex(item => item.id === Number(this.currentSearchPk))
      this.searches[searchIndex].personData = data
      this.searches[searchIndex].paid = true
    },
    updateUserDetails(details) {
      this.$emit('updateUserDetails', details)
    },
    buySearchClicked(e) {
      this.currentSearchPk = e.target.value
      if (this.UserDetails.available_searches > 0) {
        this.warningPopupOpened = true
      } else {
        this.buyPopupOpened = true
      }
    },
    async loadHistory() {
      const endpoint = this.$config.public.API_BASE_URL + "search/history/?limit=" + this.limit + "&offset=" + this.offset
      const token = localStorage.getItem("token")
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
      })
      const data = await response.json()
      for (const search of data.results) {
        this.searches.push({
          id: search.id,
          date_created: search.date_created,
          paid: search.paid,
          phone_number: this.formatPhoneNumber(search.search_query.phone_number),
          status: search.status,
          opened: false
        })
      }
      if (!data.next) {
        this.nextExist = false
      } else {
        this.offset += this.limit
      }
    },
    async checkSearch(e) {
      const searchPk = Number(e.target.value)
      const searchIndex = this.searches.findIndex(item => item.id === searchPk)
      if (!this.searches[searchIndex].personData) {
        const token = localStorage.getItem("token")
        const endpoint = this.$config.public.API_BASE_URL + "search/result/" + searchPk + "/"
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + token
          },
        })
        if (response.status === 200) {
          const data = await response.json()
          console.log(searchIndex)
          this.searches[searchIndex] = {
            ...this.searches[searchIndex],
            personData: data.result
          }
        }
      }
      this.searches[searchIndex].opened = !this.searches[searchIndex].opened
      this.$nextTick(() => {
      if (this.searches[searchIndex].opened) {
        document.getElementById("searchData" + searchPk).style.maxHeight =
            document.getElementById("searchData" + searchPk).children[0].scrollHeight + "px"
      } else {
        document.getElementById("searchData" + searchPk).style.maxHeight = "0px"
      }})
    },
    formatPhoneNumber(input) {
      if (!input) {
        return
      }
      const regex = /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/;
      const matches = input.match(regex);

      if (!matches) {
        return input;
      }
      const countryCode = matches[1];
      const firstPart = matches[2];
      const secondPart = matches[3];
      const thirdPart = matches[4];
      const fourthPart = matches[5];

      const formattedNumber = `+${countryCode} (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
      return formattedNumber;
    }
  },
  async beforeMount() {
    await this.loadHistory()
  }
}

</script>

<style scoped>

</style>