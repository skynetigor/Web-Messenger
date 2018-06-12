import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RoomModel } from '../../models';
import { RoomService } from '../../services';
import { map } from 'rxjs/internal/operators/map';

@Component({
    selector: 'rooms-list',
    templateUrl: 'rooms-list.component.html',
    styleUrls: ['rooms-list.css'],
})

export class RoomsListComponent {
    public isModalOpened = false;

    public readonly rooms$: Observable<RoomModel[]>;
    public readonly currentRoom$: Observable<RoomModel>;

    private currentRoomId: string;

    constructor(private roomService: RoomService) {
        this.rooms$ = roomService.rooms$;
        this.currentRoom$ = roomService.currentRoom$.pipe(map(t =>  t || <any>{}), tap(t => this.currentRoomId = t.id));
    }

    public openModal() {
        this.isModalOpened = true;
    }

    public closeModal() {
        this.isModalOpened = false;
    }

    public changeRoom(id: string) {
        if (this.currentRoomId !== id) {
            this.roomService.enterRoom(id);
        }
    }

    public createRoom(name: string) {
        this.roomService.createRoom(name);
    }
}
