<template>
    <Card class="mt-20 mx-auto">
        <template #content>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr class="text-left table-auto border-b">
                            <th class="px-3 py-2">Adı Soyadı</th>
                            <th class="px-3 py-2">Email</th>
                            <th class="px-3 py-2">Kayıt Tarihi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class=" px-3 py-2">{{ user.name }}</td>
                            <td class="px-3 py-2">{{ user.email }}</td>
                            <td class="px-3 py-2">{{ $moment(user.created_at).fromNow() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </Card>
</template>

<script setup>
let user = JSON.parse(localStorage.getItem('userInfo')) || {}
</script>

<style>

</style>