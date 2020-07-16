import { Component } from '@angular/core';

import { AccountService } from '../../../../../account';
import { ChatPageComponent } from '../../../../components';
import { ConnectionResolver, RoomService } from '../../../../services';

@Component({
    selector: 'chat-page-desktop',
    templateUrl: 'chat-page.component.html',
    styleUrls: ['chat-page.css'],
})

export class ChatPageDesktopComponent extends ChatPageComponent {

    constructor(connectionResolver: ConnectionResolver, accountService: AccountService, roomService: RoomService) {
        super(connectionResolver, accountService, roomService);
    }
}
