import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RoomModel } from '../../models';
import { RoomService } from '../../services';

export abstract class RoomsListComponent {
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
