<script>
import { useAuthStore } from './stores/authStore';
import Menubar from 'primevue/menubar';
import ConfirmPopup from 'primevue/confirmpopup';
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    Menubar,
    ConfirmPopup,
    Dropdown
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          useAuthStore().logout()
        }
        throw err;
      });
    });
    this.user = useAuthStore().userInfo
  },
  data() {
    return {
      store: useAuthStore(),
      isOpen: false,
      active: 'text-gray-800 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium',
      languages: [
        { label: 'English', code: 'en' },
        { label: 'Türkçe', code: 'tr' },
      ],
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.store.isLoggedIn
    },
    menuList: function () {
      return [
        {
          label: this.$t('menu.home'),
          to: '/',
          icon: 'pi pi-prime',
        },
        {
          label: this.$t('menu.profile'),
          to: '/profile',
          icon: 'pi pi-user',
          visible: () => this.isLoggedIn

        },
        {
          label: this.$t('menu.login'),
          icon: 'pi pi-sign-in',
          to: '/login',
          visible: () => !this.isLoggedIn

        },
        {
          label: this.$t('menu.logout'),
          icon: 'pi pi-sign-out',
          command: () => {
            this.logout()
          },
          visible: () => this.isLoggedIn

        }
      ]
    }
  },
  methods: {
    logout() {
      this.store.logout()
    },
    changeLocale(ev) {
      return localStorage.setItem('lang', ev.value)
    }
  },
}
</script>

<template>

  <div>
    <Menubar :model="menuList">
      <template #start>
        <img alt="logo" src="https://www.primefaces.org/primevue/img/logo.d32bce0e.svg" class="h-10 mr-2">
      </template>
      <template #end>
        <Dropdown v-model="$i18n.locale" :options="languages" optionLabel="label" optionValue="code"
          @change="changeLocale($event)" class="mr-2" />
      </template>
    </Menubar>
  </div>
  <div class="layout-main-container mt-20">
    <div class="layout-main mx-auto md:max-w-7xl max-w-sm">
      <Toast />
      <router-view />
    </div>
  </div>

</template>