import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountService, UserModel } from '../../../account';
import { RoomService } from '../../services';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.component.html',
    styleUrls: ['users-list.css']
})
export class UsersListComponent {
    public users$: Observable<UserModel[]>;

    public get currentUser(): UserModel {
        return this.accountService.currentUser;
    }

    // public get users(): UserModel[] {
    //     // return this.roomService.users;
    // }

    constructor(private roomService: RoomService, private accountService: AccountService) {
        this.users$ = roomService.users$;
    }

    public signOut() {
        this.accountService.signOut();
    }
}
