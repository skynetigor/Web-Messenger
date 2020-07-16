import { Observable } from 'rxjs';

import { AccountService, UserModel } from '../../../account';
import { RoomService } from '../../services';

export class UsersListComponent {
    public users$: Observable<UserModel[]>;

    public get currentUser(): UserModel {
        return this.accountService.currentUser;
    }

    constructor(private roomService: RoomService, private accountService: AccountService) {
        this.users$ = roomService.users$;
    }

    public signOut() {
        this.accountService.signOut();
    }
}
