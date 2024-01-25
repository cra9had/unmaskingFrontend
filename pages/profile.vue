<template>


      <navbar :IsAuthenticated="IsAuthenticated" v-if="!pageLoading" @auth="$emit('auth')" @openBuyPopup="openBuyPopup"
              :UserDetails="UserDetails" ref="navbar" :currentTab="currentTab" @updateCurrentTab="updateCurrentTab"></navbar>


      <h1 class="label-hidden">
        Unmasking - это уникальный проект, в котором Вы можете найти
        подробную информацию о человеке по его номеру и не только. В нашей
        базе только лица из РФ
      </h1>
  <ClientOnly>
      <main>
        <section class="account">
          <div class="container account__inner">
            <!-- для мобильной версии заголовки -->
            <!-- <h2 class="account__mobile-title">История пробивов</h2> -->
            <h2 class="account__mobile-title">Персональные данные</h2>
            <aside class="account__menu">
              <div class="account-name">
                <img
                    src="@/assets/img/icons/mask.webp"
                    alt="маска"
                />
                {{ UserDetails.username }}
              </div>
              <button
                  @click="setCurrentTab(0)"
                  :class="{'account__menu-data': true, 'account__menu--active': this.currentTab===0}"
              >
                Персональные данные
              </button>
              <button @click="setCurrentTab(1)"
                      :class="{'account__menu-history': true, 'account__menu--active': this.currentTab===1}">
                История пробивов
              </button>
            </aside>

            <section class="account__content">
              <user-menu :current-tab="currentTab"></user-menu>
              <search-history :current-tab="currentTab" @updateUserDetails="updateUserDetails" :UserDetails="UserDetails"></search-history>
            </section>
          </div>
        </section>
      </main>

    </ClientOnly>
  <buy-popup v-model:buy-popup-opened="buyPopupOpened"></buy-popup>


  <Footer style="position: absolute; bottom: 0; right: 0; left: 0;" ></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import UserMenu from "@/components/UserMenu.vue"
import SearchHistory from "@/components/SearchHistory.vue";
import BuyPopup from "@/components/BuyPopup.vue";

export default {
  components: {UserMenu, Footer, Navbar, SearchHistory, BuyPopup},
  props: {
    pageLoading: {
      type: Boolean,
      default: false
    },
    IsAuthenticated: {
      type: Boolean,
      default: false,
    },
    UserDetails: {
      type: Object
    },
  },
  data() {
    return {
      currentTab: 0, // 0 - User menu, 1 - Search History
      buyPopupOpened: false,
    }
  },
  methods: {
    updateCurrentTab(tab) {
      this.currentTab = tab
    },
    updateUserDetails(details) {
      this.$emit('update:UserDetails', details)
    },
    setCurrentTab(index) {
      this.currentTab = index
    },
    openBuyPopup() {
      this.buyPopupOpened = true
    }
  },
  mounted() {
    if (this.$route.query.tab) {
      this.currentTab = Number(this.$route.query.tab)
    }
  },
  beforeMount() {
    if (!this.IsAuthenticated) {
      this.$router.push({
        "name": "index"
      })
    }
  }
}
</script>

<style scoped>

</style>