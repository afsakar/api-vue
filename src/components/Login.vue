<template>
    <form @submit.prevent="login">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 mx-auto">
            <div class="text-center mb-5">
                <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>

                <ul class="space-y-1 my-4 text-left">
                    <li v-for="(message, key) in response['errors']" :key="key" v-show="!response['status']"
                        class="text-md text-red-600">
                        <span>{{ message[0] }}</span>
                    </li>
                </ul>
            </div>

            <div>
                <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                <InputText id="email1" type="text" class="w-full mb-3" v-model="user.email" />

                <label for="password1" class="block text-900 font-medium mb-2">Password</label>
                <InputText id="password1" type="password" class="w-full mb-3" v-model="user.password" />

                <Button label="Sign In" icon="pi pi-user" class="w-full" type="submit"></Button>
            </div>
        </div>
    </form>
</template>
<script>
import { useAuthStore } from '../stores/authStore'

export default {
    created() {
        if (this.isLoggedIn) {
            this.$router.push('/')
        }
    },
    data() {
        return {
            store: useAuthStore(),
            user: {
                email: "",
                password: "",
            },
            response: {}
        }
    },
    computed: {
        isLoggedIn: function () {
            return this.store.isLoggedIn
        },
    },
    methods: {
        login: function () {
            this.store.login(this.user)
                .then(() => this.$router.push('/'))
                .catch(err => {
                    this.response = JSON.parse(err.request.response)
                })
        }
    }
}
</script>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>