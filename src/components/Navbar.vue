<template>
    <div>
        <Menubar :model="menuList">
            <template #start>
                <img alt="logo" src="https://www.primefaces.org/primevue/img/logo.d32bce0e.svg" class="h-10 mr-2">
            </template>
            <template #end>
                <Dropdown v-model="$i18n.locale" :options="languages" optionLabel="label" optionValue="code"
                    @change="changeLocale($event)" class="mr-2">
                    <template #value="slotProps">
                        <img :src="'/images/flags/'+slotProps.value+'.png'" :alt="slotProps.value" class="h-8" />
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center justify-center">
                            <img :src="'/images/flags/'+slotProps.option.code+'.png'" :alt="slotProps.option.code"
                                class="h-8" />
                        </div>
                    </template>
                </Dropdown>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import Menubar from 'primevue/menubar';
import ConfirmPopup from 'primevue/confirmpopup';
import Dropdown from 'primevue/dropdown';
import { useAuthStore } from '../stores/authStore';
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
    useAuthStore()
})

const authStore = useAuthStore()

const { t } = useI18n()

let isOpen = ref(false)

const isLoggedIn = computed(() => {
    return authStore.isLoggedIn
})

const languages = [
    { label: 'English', code: 'en' },
    { label: 'Türkçe', code: 'tr' },
]

function logout() {
    authStore.logout()
}

function changeLocale(ev) {
    return localStorage.setItem('lang', ev.value)
}

const menuList = computed(() => {
    return [
        {
            label: t('menu.home'),
            to: '/',
            icon: 'pi pi-prime',
        },
        {
            label: t('menu.profile'),
            to: '/profile',
            icon: 'pi pi-user',
            visible: () => authStore.isLoggedIn

        },
        {
            label: t('menu.login'),
            icon: 'pi pi-sign-in',
            to: '/login',
            visible: () => !authStore.isLoggedIn

        },
        {
            label: t('menu.logout'),
            icon: 'pi pi-sign-out',
            command: () => {
                logout()
            },
            visible: () => authStore.isLoggedIn

        }
    ]
})
</script>