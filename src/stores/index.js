import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({ // as data
        count: 0,
        name: 'Azad Furkan ŞAKAR'
    }),
    getters: { // as computed
        doubleCount: (state) => state.count * 2,
    },
    actions: { // as methods
        increment() {
            this.count++
        }
    }

})