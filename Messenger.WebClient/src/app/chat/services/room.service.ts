import { Injectable } from '@angular/core';
<<<<<<< Updated upstream
import { ISignalRConnection } from 'ng2-signalr';
import { RoomModel } from './../models/room.model';
import { UserModel, AccountService, HttpClient } from 'app/account';
=======
import { AccountService, HttpCustomClient, UserModel } from 'app/account';
>>>>>>> Stashed changes
import { ApiUrls } from 'app/api-urls';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { RoomModel } from './../models/room.model';
import { RoomChangingModel } from './../models/roomChangingModel';
import { ConnectionResolver } from './connection-resolver';

const currentRoom = 'currentRoom';

@Injectable()
export class RoomService {

    private roomchanged = new ReplaySubject<RoomChangingModel>(1);
    public rooms: RoomModel[] = [];
    public users: UserModel[] = [];

    public rooms$: Observable<RoomModel>;
    public users$: Observable<UserModel>;

    private get getRoomChangingModel(): RoomChangingModel {
        const roomChangingModel = new RoomChangingModel();
        roomChangingModel.messages = [];
        roomChangingModel.page = 1;
        roomChangingModel.totalPages = 1;
        return roomChangingModel;
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
<<<<<<< Updated upstream
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
=======
        httpClient.post(ApiUrls.getRooms, null).subscribe(r => {
            const data = <any>r;
            this.rooms = data;
        });
>>>>>>> Stashed changes

        this.rooms$ = this.connectionResolver.listenServerEvent<RoomModel[]>('onRoomsCountChange');

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
                } else {
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
