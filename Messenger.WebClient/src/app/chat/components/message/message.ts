import { Input, Component } from '@angular/core';
import { MessageModel } from '../../models';
import { AccountService } from '../../../account';

@Component({
    selector: 'message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.css']
})
export class MessageComponent {
    protected message: MessageModel;
    protected _isPlayNotification: boolean;

    @Input() public set setMessage(value) {
        this.message = value;
    }

    public get isCurrentUser(): boolean {
        return this.message.userName === this.account.currentUser.userName;
    }

    constructor(private account: AccountService) { }
}
