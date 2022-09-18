<template>
    <Navbar />
    <slot />
</template>

<script setup>
/*
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
*/
import Navbar from '../Navbar.vue';
</script>