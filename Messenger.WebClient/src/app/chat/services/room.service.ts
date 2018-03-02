import { RoomChangingModel } from './../models/roomChangingModel';
import { MessageModel } from './../models/message.model';
import { ConnectionResolver } from './connection-resolver';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { ISignalRConnection } from 'ng2-signalr';
import { RoomModel } from './../models/room.model';
import { UserModel, AccountService, HttpClient } from 'app/account';
import { ApiUrls } from 'app/api-urls';

const currentRoom = 'currentRoom';

@Injectable()
export class RoomService {

    private roomchanged = new ReplaySubject<RoomChangingModel>(1);
    public rooms: RoomModel[] = [];
    public users: UserModel[] = [];

    private get getRoomChangingModel(): RoomChangingModel {
        const roomChanignModel = new RoomChangingModel();
        roomChanignModel.messages = [];
        roomChanignModel.page = 1;
        roomChanignModel.totalPages = 1;
        return roomChanignModel;
    }

    public get currentRoomId(): string {
        const strNumber = localStorage.getItem(currentRoom);
        if (strNumber) {
            return strNumber;
        }
        return null;
    }

    public set currentRoomId(value: string) {
        localStorage.setItem(currentRoom, value);
    }

    public get roomChangedEvent(): Observable<RoomChangingModel> {
        return this.roomchanged.asObservable();
    }

    constructor(
        private accountService: AccountService,
        private connectionResolver: ConnectionResolver,
        private httpClient: HttpClient
    ) {
        const rooms = this.rooms;
        const users = this.users;
            httpClient.post(ApiUrls.getRooms, null).subscribe(r => {
                const data = r.json();
                this.rooms = data;
            });
            this.connectionResolver.listenServerEvent<RoomModel[]>('onRoomsCountChange').subscribe(model => {
                this.rooms = model;
            });
            this.connectionResolver.listenServerEvent<UserModel[]>('onUserCountChanged').subscribe(model => {
                this.users = model;
            });

            if (this.currentRoomId) {
                this.enterRoom(this.currentRoomId);
            }
    }

    public enterRoom(id: string): void {
        this.connectionResolver.invokeServerMethod('EnterRoom', id, 10).subscribe(model => {
            if (model) {
                this.users = model.users;
                if (model.messagesModel) {
                    model.messagesModel.page = 1;
                    this.roomchanged.next(model.messagesModel);
                }else {
                    this.roomchanged.next(this.getRoomChangingModel);
                }
                this.accountService.isInRoom = true;
                this.currentRoomId = model.roomId;
            }
        });
    }

    public createRoom(name: string): void {
        this.connectionResolver.invokeServerMethod('CreateRoom', name).subscribe(model => {
            if (model) {
                this.rooms = model.rooms;
                this.users = model.users;
                this.accountService.isInRoom = true;
                this.currentRoomId = model.roomId;
                this.roomchanged.next(this.getRoomChangingModel)
            }
        });
    }
}
