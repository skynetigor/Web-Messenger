import { Input, Component } from '@angular/core';
import { MessageModel } from '../../models';
import { AccountService } from '../../../account';

export class MessageComponent {
    public message: MessageModel;
    protected _isPlayNotification: boolean;

    @Input() public set setMessage(value) {
        this.message = value;
    }

    public get isCurrentUser(): boolean {
        return this.message.userName === this.account.currentUser.userName;
    }

    constructor(private account: AccountService) { }
}
