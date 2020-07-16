import { Component } from '@angular/core';

import { AccountService } from '../../../../../../account';
import { UsersListComponent } from '../../../../../components';
import { RoomService } from '../../../../../services';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'users-list-inline-mobile',
    templateUrl: 'users-list-inline.component.html',
    styleUrls: ['users-list-inline.css']
})
export class UsersListInlineMobileComponent extends UsersListComponent {
public usersInline$: Observable<string>;

    constructor(roomService: RoomService, accountService: AccountService) {
        super(roomService, accountService);
        this.usersInline$ = this.users$.pipe(map(t => {
            return t.map(user => user.userName).join(', ');
        }));
    }
}
