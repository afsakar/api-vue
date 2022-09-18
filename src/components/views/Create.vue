<template>
    <Card>
        <template #content>
            <div class="flex items-center justify-between mb-5">
                <h1 class="text-xl font-semibold">{{ t('books.createPageTitle') }}</h1>
                <router-link to="/">
                    <Button label="Go back" icon="pi pi-arrow-left" class="p-button-sm p-button-secondary"
                        @click="store.errors = {}" />
                </router-link>
            </div>
            <form @submit.prevent="save">
                <div class="md:w-[50%] md:mx-auto space-y-4">
                    <InputText v-model="book.title" class="w-full" placeholder="Enter title" />
                    <div class="text-red-400" v-if="errors['title']">{{ errors['title'][0] }}</div>
                    <Editor v-model="book.description" editorStyle="height: 10rem" />
                    <div class="text-red-400" v-if="errors['description']">{{ errors['description'][0] }}</div>
                    <Button label="Submit" class="p-button-sm w-32" type="submit" />
                </div>
            </form>
        </template>
    </Card>
</template>

<script setup>
import Textarea from 'primevue/textarea';
import Editor from 'primevue/editor';
import { computed, onMounted, ref } from 'vue';
import { useBookStore } from '../../stores/bookStore';
import { useAuthStore } from '../../stores/authStore';
import { useI18n } from 'vue-i18n'

const store = useBookStore()

onMounted(() => {
    useAuthStore()
    useBookStore()
})

let errors = computed(() => {
    return useBookStore().errors
})

let book = ref({
    title: "",
    description: "",
    user_id: useAuthStore().getUser.id
})

const { t } = useI18n()

function save() {
    store.createBook(book.value)
}
</script>