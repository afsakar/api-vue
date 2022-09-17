import router from "../routes";
import axios from "axios";
import { defineStore } from "pinia";

export const useLocaleStore = defineStore('locale', {
    state: () => ({
        currentLocale: localStorage.getItem('lang') || "tr",
        translations: {}
    }),
    actions: {
        setLocale(code) {
            localStorage.setItem('lang', code)
        },
        setTranslations(file) {
            import('../locales/' + this.currentLocale + '/' + file + '.json').then(data => {
                return this.translations = data.default;
            })
        }
    },
    getters: {
        getLocale: state => state.currentLocale,
        getTranslations: state => state.translations
    },
});