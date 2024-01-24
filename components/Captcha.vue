<template>
  <vue-recaptcha :sitekey="sitekey"
                 theme="dark"
                 @verify="recaptchaVerified"
                 @expire="recaptchaExpired"
                 ref="vueRecaptcha"
                  >

  </vue-recaptcha>
</template>

<script>
import vueRecaptcha from 'vue3-recaptcha2';

export default {
  props: {
    token: {
      type: String
    }
  },
  data() {
    return {
      sitekey: "6Lc170QpAAAAAHEHwTJrouf8ppagXg8jZ3JOiUKP"
    }
  },
  components: {
    vueRecaptcha
  }, methods: {
    recaptchaVerified(token) {
      this.$emit('update:token', token)
    },
    recaptchaExpired() {
      this.$refs.vueRecaptcha.reset();
      this.$emit('update:token', '')
    },
  }
}

</script>

<style scoped>

</style>