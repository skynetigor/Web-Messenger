import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { HttpCustomClient } from '../../../account';
import { ApiUrls } from '../../../api-urls';
import { ConnectionResolver } from '../../services';
import { CreatedRoomSuccessAction, EnteredToRoomSuccessAction, MessengerActionType, UpdateRoomsAction } from '../actions';

@Injectable()
export class RoomEffects {
    constructor(
        private actions$: Actions,
        private connectionResolver: ConnectionResolver,
        private httpClient: HttpCustomClient
    ) { }

    @Effect()
    enterRoom$: Observable<Action> = this.actions$
        .ofType(MessengerActionType.RequestEnteringRoom).pipe(
        mergeMap(action => {
            debugger;
            return this.connectionResolver.invokeServerMethod('EnterRoom', (<any>action).payload, 10)
        }),
        filter(t => t),
        map(response => new EnteredToRoomSuccessAction(response)));

    @Effect()
    createRoom$: Observable<Action> = this.actions$
        .ofType(MessengerActionType.RequestCreatingRoomAction).pipe(
        mergeMap(action => this.connectionResolver.invokeServerMethod('CreateRoom', (<any>action).payload)),
        map(response => new CreatedRoomSuccessAction(response)));

    @Effect()
    requestRooms$: Observable<Action> = this.actions$
        .ofType(MessengerActionType.RequestRooms).pipe(
        mergeMap(action => this.httpClient.get(ApiUrls.getRooms)),
        map(response => new UpdateRoomsAction(response)));
}
