import { Model } from 'pinia-orm'
import { useBookStore } from '../stores/bookStore';
import User from './userModel';

export default class Book extends Model {
    static entity = 'books'

    static fields() {
        return {
            id: this.number(),
            user_id: this.number(),
            title: this.string(),
            description: this.string(),
            created_at: this.string(),
            updated_at: this.string(),
            user: this.belongsTo(User, 'user_id')
        }
    }

}