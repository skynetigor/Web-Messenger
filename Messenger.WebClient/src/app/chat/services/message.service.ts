import 'rxjs/add/operator/ToPromise';

import { Injectable } from '@angular/core';
import { AccountService } from '../../account';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { MessageModel } from '../models';
import { ConnectionResolver } from './connection-resolver';
import { RoomService } from './room.service';
import { Store } from '@ngrx/store';

@Injectable()
export class MessageService {
    public messagesLoading: Observable<MessageModel[]>;
    public getMessage: Observable<MessageModel>;
    public getOwnMessage: Observable<MessageModel>;
    private messageLoadingSubj: ReplaySubject<MessageModel[]>;
    private getMessageSubj: ReplaySubject<MessageModel>;
    private getOwnMessageSubj: ReplaySubject<MessageModel>;
    private page = 2;
    private totalPages: number;
    private isRequestSended = false;

    public get isLastPage(): boolean {
        return this.page === this.totalPages;
    }

    constructor(
        private roomService: RoomService,
        private connectionResolver: ConnectionResolver,
        private accountService: AccountService) {

        this.messageLoadingSubj = new ReplaySubject<MessageModel[]>();
        this.getMessageSubj = new ReplaySubject<MessageModel>();
        this.messagesLoading = this.messageLoadingSubj.asObservable();
        this.getMessage = this.getMessageSubj.asObservable();
        this.getOwnMessageSubj = new ReplaySubject<MessageModel>();
        this.getOwnMessage = this.getOwnMessageSubj.asObservable();

        connectionResolver.listenServerEvent('ongetmessage').subscribe((message: MessageModel) => {
            this.getMessageSubj.next(message);
        });
    }

    public getMessages(): void {
        if (this.isRequestSended) {
            return;
        }
        if (this.page <= this.totalPages || this.totalPages === undefined) {
            const roomId = this.roomService.currentRoomId;
            this.isRequestSended = true;
            this.connectionResolver.invokeServerMethod('GetMessage', roomId, 10, this.page).subscribe(model => {
                if (model.messages) {
                    this.totalPages = model.totalPages;
                    this.messageLoadingSubj.next(model.messages);
                }
                this.isRequestSended = false;
                this.page++;
            });
        }
    }

    public invokeWritinMessageEvent(roomId: string): void {
        if (this.connectionResolver.isConnectionExist) {
            this.connectionResolver.invokeServerMethod('UserTyping', roomId);
        }
    }

    public sendMessage(roomId: string, message: string) {
        if (this.connectionResolver.isConnectionExist) {
            this.connectionResolver.invokeServerMethod('SendMessage', roomId, message).subscribe((m: MessageModel) => {
                this.getOwnMessageSubj.next(m);
            });
        }
    }
}
