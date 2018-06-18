import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HttpCustomClient } from '../../account';
import { MessageModel } from '../models';
import { State } from '../store';
import { GetMessageAction, RequestMessagesAction, RequestSendingMessageAction } from '../store/actions';
import { AbstractService } from './abstract.service';
import { ConnectionResolver } from './connection-resolver';

@Injectable()
export class MessageService extends AbstractService {
    public readonly messages$: Observable<MessageModel[]>;

    constructor(
        connectionResolver: ConnectionResolver,
        store: Store<State>, httpclient: HttpCustomClient) {

        super(connectionResolver, store);

        this.messages$ = store.select(t => t.messenger.currentRoomMessages);

        this.updateStateFromEvent('onGetMessage', t => new GetMessageAction(t));
    }

    public loadMessages(): void {
        this.store.dispatch(new RequestMessagesAction());
    }

    public invokeWritinMessageEvent(roomId: string): void {
        if (this.connectionResolver.isConnectionExist) {
            this.connectionResolver.invokeServerMethod('UserTyping', roomId);
        }
    }

    public sendMessage(message: string) {
        this.store.dispatch(new RequestSendingMessageAction(message));
    }
}
