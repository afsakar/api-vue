import router from "../routes";
import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";

export const useBookStore = defineStore('books', {
    state: () => ({
        status: '',
        book: {},
        allBooks: {},
        errors: {},
        toast: useToast(),
    }),
    actions: {
        async getAllBooks() {
            this.resp_loading()
            return new Promise((resolve, reject) => {
                axios.get('api/books').then(resp => {
                    const list = resp.data
                    this.resp_success(list)
                    resolve(resp)
                }).catch(err => {
                    this.resp_error()
                    reject(err)
                })
            })
        },
        /* Crud Actions */
        async createBook(book) {
            await axios.get('sanctum/csrf-cookie').then(() => {
                axios.post('api/books', book).then(resp => {
                    router.push('/')
                    this.toast.add({severity:'success', summary: 'Success!', detail:'Book created successfully.', life: 3000})
                }).catch(err => {
                    this.resp_error(err.response.data.errors)
                    return err.response.data.errors
                })
            })
        },
        async readBook(id) {
            axios.get('api/books/' + id).then(resp => {
                    let book = resp.data.data
                    this.resp_setBook(book)
                }).catch(err => {
                    this.resp_error(err)
                })
        },
        async updateBook(id, book) {
            await axios.get('sanctum/csrf-cookie').then(() => {
                axios.put('api/books/book/' + id, book).then(resp => {
                    router.push('/')
                    this.toast.add({severity:'success', summary: 'Success!', detail:'Book updated successfully.', life: 3000})
                }).catch(err => {
                    this.resp_error(err)
                    return err
                })
            })
        },
        async deleteBook(bookID) {
            await axios.get('sanctum/csrf-cookie').then(() => {
                axios.delete('api/books/' + bookID, {
                    _method: 'DELETE'
                }).then(resp => {
                    console.log(resp)
                    this.toast.add({severity:'success', summary: 'Success!', detail:'Book deleted successfully.', life: 3000})
                }).catch(err => {
                    console.log(err)
                })
            })
        },
        /* Crud Actions */

        /* Mutations */
        resp_loading() {
          this.status = 'loading'  
        },
        resp_success(list) {
            this.status = 'success'
            this.allBooks = {...list}
        },
        resp_error(errors) {
            this.status = 'error'
            this.errors = errors
        },
        resp_setBook(book) {
            this.status = 'success'
            this.book = book
        }
        /* Mutations */
    },
    getters: {
        bookResponse(state) {
            return state.allBooks
        },
        singleBook(state) {
            return state.book
        }
    },
});