<template>
  <form
      action=""
      class="home-default__form">
    <div class="form-radio">
      <label :class="{'name-label': true, 'label--active': currentSearchType === 0}"
      >По номеру телефону
        <input
            value="phone"
            type="radio"
            name="radio"
            checked
            autocomplete="off"
            @click="setSearchByPhone"
        />
        <span></span>
      </label>
      <label :class="{'name-label': true, 'label--active': currentSearchType === 1}"
      >По ФИО + дате рождения
        <input
            value="birth"
            type="radio"
            name="radio"
            @click="setSearchByFullname"
        />
        <span></span>
      </label>
    </div>
    <!-- если выбрали по номеру телефона -->
    <div
        :class="{'home-default__input-wrapper': true, 'phone__input': true, 'input--active': currentSearchType === 0}"
    >
      <label
          for="input-phone"
          class="label-hidden label-phone"
      >Телефон:</label>
    <phone-input v-model:phoneNumber="phoneNumber"></phone-input>
      <p class="errorpass">
        {{ phoneError }}
      </p>

    </div>
    <!-- если выбрали по фио и дате рождения  -->
    <div :class="{'home-default__input-wrapper': true, 'name__input': true, 'input--active': currentSearchType === 1}">
      <div class="home-default__input-item">
        <label
            for="input-name"
            class="label-hidden"
        >ФИО:</label
        >
        <input
            type="text"
            id="input-name"
            name="input-name"
            class="input home-default__input"
            placeholder="ФИО"
            autocomplete="off"
            v-model="fullname"
        />
      </div>
      <p class="errorpass">
        {{ fullNameError }}
      </p>
      <div class="home-default__input-item">
        <label
            for="input-date"
            class="label-hidden"
        >Дата рождения:</label
        >
        <date-input ref="birthday"></date-input>
      </div>
    </div>
    <button
        type="button"
        class="button home-default__form-button"
        id="search" @click="onSearch">
      Найти
    </button>
  </form>
</template>

<script>
import PhoneInput from "@/components/PhoneInput.vue";
import DateInput from "@/components/DateInput.vue";
export default {
  data() {
    return {
      phoneNumber: "",
      fullname: "",
      currentSearchType: 0, // 0 - By phone number, 1 - By fullname + birthDay
      phoneError: "",
      fullNameError: "",
      birthday: ""
    }
  },
  methods: {
    setSearchByPhone() {
      this.currentSearchType = 0
      this.$emit("update:currentSearchType", 0)
    },
    setSearchByFullname() {
      this.currentSearchType = 1
      this.$emit("update:currentSearchType", 1)
    },
    onSearch() {
      if (this.currentSearchType === 0) {
        const phone = this.phoneNumber.replace(/\D/g, '')
        if (phone.length !== 11 || phone[0] !== '7') {
          this.phoneError = "Введите номер в формате +7 (999) 999-99-99"
        } else {
          this.phoneError = ""
          return this.$emit('search')
        }
      } else {
        let error = false
        this.birthday = this.$refs.birthday.dateValue
        if (!this.$refs.birthday.isValidDate()) {
          this.$refs.birthday.isValid = false
          error = true
        }
        if (this.fullname.split(" ").length !== 3) {
          this.fullNameError = "Неверный формат ФИО: Фамилия Имя Отчество"
          error = true
        }
        if (!error) {
          this.$emit("search")
        }
      }
    }
  },
  components: {
    PhoneInput, DateInput
  },
}
</script>

<style scoped>

</style>