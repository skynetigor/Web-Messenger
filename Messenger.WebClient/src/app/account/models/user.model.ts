import { Observable, Subscription } from 'rxjs/Rx';

export class UserModel {
    private userTyping: boolean;
    public token: string;
    public id: string;
    public userName: string;

    public get isUserTyping(): boolean {
        return this.userTyping;
    }

    public set isUserTyping(value: boolean) {

    }
}
