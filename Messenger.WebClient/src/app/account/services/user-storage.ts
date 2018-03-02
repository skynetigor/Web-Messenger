import { UserModel } from './../models/user.model';
const userKey = 'user';

export class UserStorage {
    public setUser(user: UserModel): void {
        const str = JSON.stringify(user);
        localStorage.setItem(userKey, str);
    }

    public getUser(): UserModel {
        const str = localStorage.getItem(userKey);
        return JSON.parse(str);
    }

    public clearUser(): void {
        localStorage.removeItem(userKey)
    }
}
