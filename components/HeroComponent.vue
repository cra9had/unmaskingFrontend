<template>
  <NuxtImg
    class="left-mask"
    src="/img/left-mask.webp"
    alt="пробив"
  />

  <NuxtImg
    class="right-mask"
    src="/img/right-mask.webp"
    alt="пробить номер"
  />

  <div class="home-default__title">{{title}}</div>
  <div class="home-default__subtitle">{{sub_title}}</div>
  <div class="home-default__text">{{text}}</div>
</template>

<script>
export default {
  name: "HeroComponent",
  data() {
    return {
      title: "Кто звонил?",
      sub_title: "   Определите звонившего по номеру телефона за пару минут",
      text: `Неизвестные номера часто вызывают у нас беспокойство. Если вы хотите
    узнать, кто звонил, воспользуйтесь нашим сервисом проверки. Обширная
    база данных позволит вам быстро и легко определить, кому он
    принадлежит.`,
    };
  },
};
</script>

<style scoped></style>
