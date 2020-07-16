import { Component } from '@angular/core';

import { ChatBoxComponent } from '../../../../components';
import { MessageService, RoomService } from '../../../../services';
import { MessageBusService } from 'src/app/shared';
import { Observable } from 'rxjs';

const messageCount = 10;
const scrollingPersent = 10;
const scrollingBan = 1;
const pulsarDelay = 500;

@Component({
    selector: 'chat-box-mobile',
    templateUrl: 'chat-box.component.html',
    styleUrls: ['chat-box.css']
})

export class ChatBoxMobileComponent extends ChatBoxComponent {
    constructor(messageService: MessageService, roomService: RoomService, private messageBusService: MessageBusService) {
        super(messageService, roomService);
    }

    public openRooms() {
        this.messageBusService.send('isRoomsShowed', true);
    }
}
