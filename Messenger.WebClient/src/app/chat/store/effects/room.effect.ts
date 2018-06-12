import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';

import { ConnectionResolver } from '../../services';
import { CreatedRoomSuccessAction, EnteredToRoomSuccessAction, MessengerActionType } from '../actions';

@Injectable()
export class MessengerEffects {
    constructor(
        private actions$: Actions,
        private connectionResolver: ConnectionResolver
    ) { }

    @Effect()
    enterRoom$: Observable<Action> = this.actions$
        .ofType(MessengerActionType.RequestEnteringRoom).pipe(
        mergeMap(action => this.connectionResolver.invokeServerMethod('EnterRoom', (<any>action).payload, 10)),
        map(response => new EnteredToRoomSuccessAction(response)));

    @Effect()
    createRoom$: Observable<Action> = this.actions$
        .ofType(MessengerActionType.RequestCreatingRoomAction).pipe(
        mergeMap(action => this.connectionResolver.invokeServerMethod('CreateRoom', (<any>action).payload)),
        map(response => new CreatedRoomSuccessAction(response)));

}
