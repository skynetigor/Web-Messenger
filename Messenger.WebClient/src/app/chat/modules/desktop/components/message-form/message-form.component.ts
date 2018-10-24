import { Component } from '@angular/core';

import { AccountService } from '../../../../../account';
import { MessageFormComponent } from '../../../../components';
import { MessageService, RoomService } from '../../../../services';

@Component({
    selector: 'message-form-desktop',
    templateUrl: 'message-form.component.html',
    styleUrls: ['message-form.css']
})

export class MessageFormDesktopComponent extends MessageFormComponent {
    constructor(messageService: MessageService, accountService: AccountService, roomservice: RoomService) {
        super(messageService, accountService, roomservice);
     }
}
