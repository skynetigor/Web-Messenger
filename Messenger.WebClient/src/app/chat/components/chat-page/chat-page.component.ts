import { Component } from '@angular/core';
import { UserModel, AccountService } from '../../../account';
import { ConnectionResolver, RoomService } from '../../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
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

    public readonly isInRoom$: Observable<boolean>;

    constructor(private connectionResolver: ConnectionResolver, private accountService: AccountService, private roomService: RoomService) {
        this.isInRoom$ = roomService.currentRoom$.pipe(map(t => t !== undefined));
    }

}
