import { Component } from '@angular/core';
import { UserModel, AccountService } from 'app/account';
import { RoomService } from '../../services';

@Component({
    moduleId: module.id,
    selector: 'users-list',
    templateUrl: 'users-list.component.html',
    styleUrls: ['users-list.css']
})
export class UsersListComponent {
    public get currentUser(): UserModel {
        return this.accountService.currentUser;
    }

    public get users(): UserModel[] {
        return this.roomService.users;
    }

    constructor(private roomService: RoomService, private accountService: AccountService) {

    }

    public signOut() {
        this.accountService.signOut();
    }
}
