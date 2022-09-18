<template>
    <Navbar />
    <div class="layout-main-container mt-20">
        <div class="layout-main mx-auto md:max-w-7xl max-w-sm">
            <Toast />
            <slot />
        </div>
    </div>
</template>

<script setup>
import Navbar from '../Navbar.vue';
</script>