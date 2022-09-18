<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => {
  return (route.meta.layout || 'main') + '-layout'
})
</script>

<template>

  <component :is="layout">
    <router-view></router-view>
  </component>

</template>