<template>
    <section class="preloader__result" ref="loader">
      <!-- прелоадер линия  -->
      <div class="line-preloader">
        <div class="line-preloader--active"></div>
      </div>
      <!-- прелоадер строк -->

      <ul class="text-preloader">
        <li
            class="text-preloader__element text-preloader__element--1"
        ></li>
        <li class="line"></li>
        <li
            class="text-preloader__element text-preloader__element--2"
        ></li>
        <li
            class="text-preloader__element text-preloader__element--3"
        ></li>
        <li
            class="text-preloader__element text-preloader__element--4"
        ></li>
        <li
            class="text-preloader__element text-preloader__element--5"
        ></li>
        <li
            class="text-preloader__element text-preloader__element--6"
        ></li>
        <li
            class="text-preloader__element text-preloader__element--7"
        ></li>
      </ul>
    </section>
</template>

<script>
export default {
  methods: {
    scroll() {
      this.$refs.loader.scrollIntoView({ block: 'center', inline: 'center' })
    }
  }
}
</script>

<style scoped>

</style>