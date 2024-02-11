<template>
  <div class="faq-element__inner">
    <div class="faq-element">
      <p class="faq-element__question">
        {{ question }}
      </p>
      <button
          type="button"
          class="faq-button"
          :class="{'faq-button--active': opened}"
          @click="toggle"
          aria-label="toggle"
      ></button>
    </div>
    <div
        class="faq__answer"
        ref="faqAnswer"
        :style="{'max-height': maxHeight + 'px'}"
        :class="{'container--active': opened}"
    >
      <p>
        {{ answer }}
      </p>
      <ul class="faq__answer-list" v-if="answerList">
        <li v-for="answer_ in answerList">
          {{ answer_ }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    answerList: {
      type: Array,
      required: false,
      default: null
    }
  },
  data() {
    return {
      opened: false,
      maxHeight: 0
    }
  },
  methods: {
    toggle() {
      this.opened = !this.opened
      if (this.opened) {
        this.maxHeight = this.$refs.faqAnswer.scrollHeight
      } else {
        this.maxHeight = 0
      }
    }
  }
}
</script>

<style scoped>

</style>