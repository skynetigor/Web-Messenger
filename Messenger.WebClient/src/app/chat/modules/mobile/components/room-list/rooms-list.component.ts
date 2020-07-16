import { Component } from '@angular/core';

import { RoomsListComponent } from '../../../../components';
import { RoomService } from '../../../../services';
import { MessageBusService } from '../../../../../shared';

@Component({
    selector: 'rooms-list-mobile',
    templateUrl: 'rooms-list.component.html',
    styleUrls: ['rooms-list.css'],
})

export class RoomsListMobileComponent extends RoomsListComponent {
    constructor(roomService: RoomService, private messageBusService: MessageBusService) {
        super(roomService);
    }

    close() {
        this.messageBusService.send('isRoomsShowed', false);
    }
}
