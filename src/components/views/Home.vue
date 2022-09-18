<template>
    <Card>
        <template #content>
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-semibold">{{ $t('books.listTitle') }}</h1>
                <router-link to="/create">
                    <Button v-if="user.isLoggedIn" :label="$t('datatable.addNew')" icon="pi pi-plus"
                        class="p-button-sm p-button-success" />
                </router-link>
            </div>
            <DataTable :value="bookList.data" :paginator="true" :rows="5" :loading="store.status === 'loading'"
                v-model:filters="filters" class="p-datatable-sm"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]" responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" stripedRows>
                <template #header>
                    <div class="flex justify-content-between">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="$t('datatable.search')" />
                        </span>
                    </div>
                </template>
                <template #empty>
                    <div class="flex items-center justify-center text-lg space-x-4">
                        <i class="pi pi-search"></i><span v-text="$t('books.notFound')"></span>
                    </div>
                </template>
                <Column field="id" :header="$t('books.fields.id')" />
                <Column field="title" :header="$t('books.fields.title')" sortable="" />
                <Column field="description" :header="$t('books.fields.description')">
                    <template #body="slotProps">
                        <span v-html="slotProps.data.description"></span>
                    </template>
                </Column>
                <Column field="average_rating" :header="$t('books.fields.rating')"></Column>
                <Column :header="$t('datatable.actions')">
                    <template #body="slotProps">
                        <div class="flex items-center justify-start space-x-2">
                            <router-link :to="'/edit/' + slotProps.data.id">
                                <Button icon="pi pi-pencil" class="p-button-sm" v-if="user.isLoggedIn" />
                            </router-link>
                            <Button icon="pi pi-trash" class="p-button-sm p-button-danger" v-if="user.isLoggedIn"
                                @click="deleteBook($event, slotProps.data.id, slotProps.index)" />
                            <ConfirmPopup></ConfirmPopup>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>
<script setup>
import ConfirmPopup from 'primevue/confirmpopup';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { computed, onMounted, ref } from 'vue'
import { useBookStore } from '../../stores/bookStore';
import { useAuthStore } from '../../stores/authStore';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useI18n } from 'vue-i18n';
import { provide } from 'vue'
import { useRoute } from 'vue-router';

const store = useBookStore()

onMounted(() => {
    store.getAllBooks()
    useAuthStore()
})

let filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
})

let user = computed(() => {
    return useAuthStore()
})

let bookList = computed(() => {
    return { ...store.bookResponse }
})

const { t } = useI18n()

const confirm = useConfirm();

function deleteBook(event, bookID, rowIndex) {
    confirm.require({
        target: event.currentTarget,
        message: t('deleteNotificationMessage'),
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: t('yes'),
        rejectLabel: t('no'),
        accept: () => {
            store.deleteBook(bookID).then(() => {
                store.bookResponse.data.splice(rowIndex, 1)
            })
        },
        reject: () => {
            //callback to execute when user rejects the action
        }
    });
}
</script>