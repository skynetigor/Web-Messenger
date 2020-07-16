import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { never, Observable } from 'rxjs';
import { first, map, mergeMap, switchMap } from 'rxjs/operators';

import { State } from '..';
import { HttpCustomClient } from '../../../account';
import { ApiUrls } from '../../../api-urls';
import { ConnectionResolver } from '../../services/connection-resolver';
import { GetMessageAction, LoadMessagesAction, MessengerActionType } from '../actions';

@Injectable()
export class MessagesEffects {

    private isRequestSent: boolean;

    constructor(
        private actions$: Actions,
        private httpClient: HttpCustomClient,
        private store: Store<State>,
        private connectionResolver: ConnectionResolver
    ) { }

    @Effect()
    loadMessages$: Observable<Action> = this.actions$
        .ofType(MessengerActionType.RequestMessages).pipe(
        switchMap(action => this.store.select(t => t.messenger).pipe(first(), map(state => ({ action: action, state: state })))),
        mergeMap((t) => {
            if (!this.isRequestSent && t.state.messagesCurrentPage < t.state.messagesTotalPages) {
                this.isRequestSent = true;
                const url = ApiUrls.getMessages + `?roomId=${t.state.currentRoomId}&messageCount=${10}&messagePage=${t.state.messagesCurrentPage + 1}`;
                return this.httpClient.get(url);
            }
            return never();
        }),
        map((response: any) => {
            this.isRequestSent = false;
            return new LoadMessagesAction(response);
        }));

    @Effect()
    sendMessage$: Observable<Action> = this.actions$
        .ofType(MessengerActionType.RequestSendingMessage).pipe(
        switchMap(action => this.store.select(t => t.messenger).pipe(first(), map(state => ({ action: action, state: state })))),
        mergeMap((t) => {
            return this.connectionResolver.invokeServerMethod('SendMessage', t.state.currentRoomId, (<any>t.action).payload);
        }),
        map((response: any) => {
            this.isRequestSent = false;
            return new GetMessageAction(response);
        }));
}
