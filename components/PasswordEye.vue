<template>
  <button
      type="button"
      :class="{'input-password__control': true, 'input-password__control--open': opened}"
      @click="showPassword"
      ref="eye"
  ></button>
</template>

<script>
export default {
  data() {
    return {
      opened: false
    }
  },
  methods: {
    showPassword() {
      this.opened = !this.opened
      this.$emit('showPassword', this.$refs.eye)
    }
  }
}
</script>


<style scoped>

</style>