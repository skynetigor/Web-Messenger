import { Component } from '@angular/core';

import { AccountService } from '../../../../../account';
import { UsersListComponent } from '../../../../components';
import { RoomService } from '../../../../services';

@Component({
    selector: 'users-list-mobile',
    templateUrl: 'users-list.component.html',
    styleUrls: ['users-list.css']
})
export class UsersListMobileComponent extends UsersListComponent {
    constructor(roomService: RoomService, accountService: AccountService) {
        super(roomService, accountService);
    }
}
