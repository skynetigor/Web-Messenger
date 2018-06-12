import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, combineLatest, never } from 'rxjs';

import { AccountService, HttpCustomClient } from '../../account';
import { MessageModel } from '../models';
import { State } from '../store';
import { ConnectionResolver } from './connection-resolver';
import { RoomService } from './room.service';
import { AbstractService } from './abstract.service';
import { GetMessageAction, LoadMessagesAction } from 'src/app/chat/store/actions';
import { mergeMap } from 'rxjs/operators';
import { tap, switchMap, first } from 'rxjs/operators';


@Injectable()
export class MessageService extends AbstractService {
    public messagesLoading: Observable<MessageModel[]>;
    public getMessage: Observable<MessageModel>;
    public getOwnMessage: Observable<MessageModel>;
    private messageLoadingSubj: ReplaySubject<MessageModel[]>;
    private getMessageSubj: ReplaySubject<MessageModel>;
    private getOwnMessageSubj: ReplaySubject<MessageModel>;
    private page = 2;
    private totalPages: number;
    private isRequestSended = false;


    public readonly messages$: Observable<MessageModel[]>;

    public get isLastPage(): boolean {
        return this.page === this.totalPages;
    }

    constructor(
        private roomService: RoomService,
        connectionResolver: ConnectionResolver,
        private accountService: AccountService, store: Store<State>, httpclient: HttpCustomClient) {

        super(connectionResolver, httpclient, store);

        this.messageLoadingSubj = new ReplaySubject<MessageModel[]>();
        this.getMessageSubj = new ReplaySubject<MessageModel>();
        this.messagesLoading = this.messageLoadingSubj.asObservable();
        this.getMessage = this.getMessageSubj.asObservable();
        this.getOwnMessageSubj = new ReplaySubject<MessageModel>();
        this.getOwnMessage = this.getOwnMessageSubj.asObservable();



        this.messages$ = store.select(t => t.messenger.currentRoomMessages);

        this.updateStateFromEvent('onGetMessage', t => new GetMessageAction(t));
        connectionResolver.listenServerEvent('ongetmessage').subscribe((message: MessageModel) => {
            console.log(message);
        });
    }

    public getMessages(): void {
        if (!this.isRequestSended) {
            this.isRequestSended = true;
            const observable = this.store
                .select<[number, number, string]>(t => [t.messenger.messagesTotalPages, t.messenger.messagesCurrentPage, t.messenger.currentRoomId])
                .pipe(first(), switchMap(([messagesTotalPages, messagesCurrentPage, currentRoomId], index) => {
                    // messagesCurrentPage++;
                    if (messagesCurrentPage <= messagesTotalPages) {
                        return this.connectionResolver.invokeServerMethod('GetMessage', currentRoomId, 10, messagesCurrentPage)
                            .pipe(tap(() => this.isRequestSended = false));
                    }
                    return never();
                }));

            this.updateStateFromObservableAndUnsubscribe(observable, t => new LoadMessagesAction(t));
        }
        // if (this.page <= this.totalPages || this.totalPages === undefined) {
        //     const roomId = this.roomService.currentRoomId;
        //     this.isRequestSended = true;
        //     this.connectionResolver.invokeServerMethod('GetMessage', roomId, 10, this.page).subscribe(model => {
        //         if (model.messages) {
        //             this.totalPages = model.totalPages;
        //             this.messageLoadingSubj.next(model.messages);
        //         }
        //         this.isRequestSended = false;
        //         this.page++;
        //     });
        // }


    }

    public invokeWritinMessageEvent(roomId: string): void {
        if (this.connectionResolver.isConnectionExist) {
            this.connectionResolver.invokeServerMethod('UserTyping', roomId);
        }
    }

    public sendMessage(roomId: string, message: string) {
        this.updateStateFromObservableAndUnsubscribe(
            this.store.select(currentRoomId => currentRoomId.messenger.currentRoomId).pipe(
                mergeMap(t => this.connectionResolver.invokeServerMethod('SendMessage', t, message))),
            t => new GetMessageAction(t));
    }
}
