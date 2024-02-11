<template>
  <footer class="footer" style="padding: 0 0 20px">
    <slot></slot>
    <div class="container footer__inner" style="padding-top: 20px">
      <a
          @click="this.$router.push({name: 'index'})"
          href="#"
          class="logo"
      >Unmasking<span>™</span></a
      >
      <p class="footer__copy">
        © 2023-2024 Unmasking. All rights reserved.
      </p>
      <a
          href="#"
          class="footer__telegram"
      ><img
          width="40"
          height="40"
          src="/img/icons/telegram.webp"
          alt="телеграм"
      /></a>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>

</style>