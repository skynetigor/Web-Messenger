import { Component } from '@angular/core';

import { RoomsListComponent } from '../../../../components';
import { RoomService } from '../../../../services';

@Component({
    selector: 'rooms-list-desktop',
    templateUrl: 'rooms-list.component.html',
    styleUrls: ['rooms-list.css'],
})

export class RoomsListDesktopComponent extends RoomsListComponent {
    constructor(roomService: RoomService) {
        super(roomService);
    }
}
