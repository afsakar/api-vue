import { Model } from 'pinia-orm'

export default class User extends Model {
    static entity = 'users'

    static hidden = ['password', 'remember_token']

    static fields() {
        return {
            id: this.number(),
            name: this.string(),
            email: this.string(),
            email_verified_at: this.string(),
            password: this.string(),
            remember_token: this.string(),
            created_at: this.string(),
            updated_at: this.string(),
        }
    }

}