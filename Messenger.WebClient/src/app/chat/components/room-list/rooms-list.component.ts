import { Component } from '@angular/core';
import { RoomService } from '../../services';
import { RoomModel } from '../../models';

@Component({
    moduleId: module.id,
    selector: 'rooms-list',
    templateUrl: 'rooms-list.component.html',
    styleUrls: ['rooms-list.css'],
})

export class RoomsListComponent {
    public isModalOpened = false;

    public get currentRoomId(): string {
        const roomId = this.roomService.currentRoomId;
        if (roomId) {
            return roomId;
        }
        return '';
    }

    constructor(private roomService: RoomService) { }

    public get roomList(): RoomModel[] {
        return this.roomService.rooms;
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
