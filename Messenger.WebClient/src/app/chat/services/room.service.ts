import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService, HttpCustomClient, UserModel } from '../../account';
import { State } from '../store';
import {
    RequestCreatingRoomAction,
    RequestEnteringRoomAction,
    RequestRoomsAction,
    UpdateRoomsAction,
    UserCountChangedAction,
} from '../store/actions';
import { RoomModel } from './../models/room.model';
import { AbstractService } from './abstract.service';
import { ConnectionResolver } from './connection-resolver';

const currentRoom = 'currentRoom';

@Injectable()
export class RoomService extends AbstractService {
    public rooms$: Observable<RoomModel[]>;
    public users$: Observable<UserModel[]>;

    public currentRoom$: Observable<RoomModel>;

    public currentRoomId: string;

    constructor(
        private accountService: AccountService,
        connectionResolver: ConnectionResolver,
        private httpClient: HttpCustomClient,
        store: Store<State>
    ) {
        super(connectionResolver, store);

        store.dispatch(new RequestRoomsAction());

        this.users$ = store.select(t => t.messenger.users);
        this.rooms$ = store.select(t => t.messenger.rooms);

        const roomIdFromLocalStorage = localStorage.getItem(currentRoom);

        if (roomIdFromLocalStorage) {
            this.enterRoom(roomIdFromLocalStorage);
        }

        this.updateStateFromEvent('OnUserCountChanged', t => new UserCountChangedAction(t));
        this.updateStateFromEvent('onRoomsCountChange', t => new UpdateRoomsAction(t));

        this.currentRoom$ = combineLatest(this.rooms$, store.select(t => t.messenger.currentRoomId))
            .pipe(
            map(([rooms, currentRoomId]) => rooms.find(t => t.id === currentRoomId)));

        this.subscribe(this.currentRoom$, room => {
            if (room && (this.currentRoomId !== room.id || !this.currentRoomId)) {
                this.currentRoomId = room.id;
                localStorage.setItem(currentRoom, this.currentRoomId);
            }
        });
    }

    public enterRoom(id: string): void {
        this.store.dispatch(new RequestEnteringRoomAction(id));
    }

    public createRoom(name: string): void {
        this.store.dispatch(new RequestCreatingRoomAction(name));
    }
}
