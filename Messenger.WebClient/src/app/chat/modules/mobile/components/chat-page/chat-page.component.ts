import { Component } from '@angular/core';

import { AccountService } from '../../../../../account';
import { ChatPageComponent } from '../../../../components';
import { ConnectionResolver, RoomService } from '../../../../services';
import { MessageBusService } from 'src/app/shared';
import { Observable } from 'rxjs';

@Component({
    selector: 'chat-page-mobile',
    templateUrl: 'chat-page.component.html',
    styleUrls: ['chat-page.css'],
})

export class ChatPageMobileComponent extends ChatPageComponent {

    public isRoomsShowed$: Observable<boolean>;

    constructor(
        connectionResolver: ConnectionResolver,
        accountService: AccountService,
        roomService: RoomService,
        private messageBusService: MessageBusService) {
        super(connectionResolver, accountService, roomService);
        this.isRoomsShowed$ = this.messageBusService.event('isRoomsShowed');
    }
}
