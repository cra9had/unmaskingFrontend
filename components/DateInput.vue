<template>
  <input

      type="tel"
      id="input-date"
      name="input-date"
      class="input home-default__input "
      placeholder="дд.мм.гггг"
      v-model="dateValue"
      autocomplete="off"
      @input="formatDate"
      @keydown="handleKeyDown"
      ref="dateInput"
  />
  <p
      class="errorpass" v-if="!isValid"
  >
    Неверный формат даты: дд.мм.гггг
  </p>
</template>

<script>
export default {
  data() {
    return {
      dateValue: '',
      prevCursorPosition: 0,
      isValid: true
    };
  },
  methods: {
    isValidDate() {
      const parts = this.dateValue.split('.');
      if (parts.length !== 3) {
        return false;
      }

      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      const year = parseInt(parts[2]);

      return (
          !isNaN(day) &&
          !isNaN(month) &&
          !isNaN(year) &&
          year >= 1900 &&
          year <= 2024 &&
          month >= 1 &&
          month <= 12 &&
          day >= 1 &&
          day <= 31
      );
    },
    formatDate() {
      this.prevCursorPosition = this.$refs.dateInput.selectionStart;

      this.dateValue = this.formatDateValue();
      const cursorPosition = this.calculateCursorPosition();

      if (this.$refs.dateInput) {
        this.$refs.dateInput.setSelectionRange(cursorPosition, cursorPosition);
      }
    },
    formatDateValue() {
      let formattedValue = this.dateValue.replace(/\D/g, '');
      let cursorPosition = this.$refs.dateInput.selectionStart;

      let firstLen = Math.min(2, cursorPosition)

      let secondLen = 3
      if (cursorPosition >= 3) {
        secondLen = Math.min(5, cursorPosition) - 2
      }

      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, firstLen) + '.' + formattedValue.slice(firstLen);
      }
      if (formattedValue.length > 5) {
        formattedValue = formattedValue.slice(0, firstLen+secondLen) + '.' + formattedValue.slice(firstLen+secondLen, 9);
      }
      this.isValid = this.isValidDate()
      return formattedValue;
    },
    handleKeyDown(event) {
      this.cursorPosition = this.$refs.dateInput.selectionStart;
      if (event.key === 'Backspace' && this.cursorPosition > 0) {
        event.preventDefault();
        const newValue =
            this.dateValue.slice(0, this.cursorPosition - 1) +
            this.dateValue.slice(this.cursorPosition);

        this.dateValue = newValue;

        this.$nextTick(() => {
          if (this.$refs.dateInput) {
            this.$refs.dateInput.setSelectionRange(this.cursorPosition - 1,
                this.cursorPosition - 1);
          }
        });

      }
    },
    calculateCursorPosition() {
      let cursorPosition = this.$refs.dateInput.selectionStart;

      if (
          cursorPosition > this.prevCursorPosition &&
          this.dateValue[cursorPosition - 1] === '.'
      ) {
        cursorPosition += 2;
      }

      return cursorPosition;
    },

  },


}
</script>


<style scoped>

</style>