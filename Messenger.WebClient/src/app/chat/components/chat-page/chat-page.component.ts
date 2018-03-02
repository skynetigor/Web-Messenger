import { Component } from '@angular/core';
import { UserModel, AccountService } from 'app/account';
import { ConnectionResolver } from 'app/chat/services';

@Component({
    moduleId: module.id,
    selector: 'chat-page',
    templateUrl: 'chat-page.component.html',
    styleUrls: ['chat-page.css'],
})

export class ChatPageComponent {
    public get isConnectionExist(): boolean {
        return !this.connectionResolver.isConnectionExist;
    }

    public get currentUser(): UserModel {
        return this.accountService.currentUser;
    }

    public get isInRoom(): boolean {
        return this.accountService.isInRoom;
    }

    constructor(private connectionResolver: ConnectionResolver, private accountService: AccountService) { }

}
