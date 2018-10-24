import { Component } from '@angular/core';

import { ChatBoxComponent } from '../../../../components';
import { MessageService, RoomService } from '../../../../services';

const messageCount = 10;
const scrollingPersent = 10;
const scrollingBan = 1;
const pulsarDelay = 500;

@Component({
    selector: 'chat-box-desktop',
    templateUrl: 'chat-box.component.html',
    styleUrls: ['chat-box.css']
})

export class ChatBoxDesktopComponent extends ChatBoxComponent {

    constructor(messageService: MessageService, roomService: RoomService) {
        super(messageService, roomService);
    }
}
