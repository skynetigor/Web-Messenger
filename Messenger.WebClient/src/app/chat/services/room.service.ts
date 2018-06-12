import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, merge } from 'rxjs/operators';
import { MessengerState } from 'src/app/chat/store/reducers';

import { AccountService, HttpCustomClient, UserModel } from '../../account';
import { RequestCreatingRoomAction, RequestEnteringRoomAction, UpdateRoomsAction, UserCountChangedAction } from '../store/actions';
import { RoomModel } from './../models/room.model';
import { ConnectionResolver } from './connection-resolver';
import { State } from '../store';
import { ApiUrls } from 'src/app/api-urls';
import { AbstractService } from './abstract.service';

const currentRoom = 'currentRoom';

@Injectable()
export class RoomService extends AbstractService {
    public rooms$: Observable<RoomModel[]>;
    public users$: Observable<UserModel[]>;

    public currentRoom$: Observable<RoomModel>;

    public set currentRoomId(value: string) {
        localStorage.setItem(currentRoom, value);
    }

    constructor(
        private accountService: AccountService,
        connectionResolver: ConnectionResolver,
        httpClient: HttpCustomClient,
        store: Store<State>
    ) {
        super(connectionResolver, httpClient, store);

        this.users$ = store.select(t => t.messenger.users);
        this.rooms$ = store.select(t => t.messenger.rooms);

        this.updateStateFromEvent('OnUserCountChanged', t => new UserCountChangedAction(t));
        this.updateStateFromEvent('onRoomsCountChange', t => new UpdateRoomsAction(t));

        this.updateStateFromObservable(this.httpClient.post(ApiUrls.getRooms, null), t => new UpdateRoomsAction(t));

        this.currentRoom$ = combineLatest(this.rooms$, store.select(t => t.messenger.currentRoomId))
            .pipe(map(([rooms, currentRoomId]) => rooms.find(t => t.id === currentRoomId)));
    }

    public enterRoom(id: string): void {
        this.store.dispatch(new RequestEnteringRoomAction(id));
    }

    public createRoom(name: string): void {
        this.store.dispatch(new RequestCreatingRoomAction(name));
    }
}
