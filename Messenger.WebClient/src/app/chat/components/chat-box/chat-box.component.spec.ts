import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IAccountService } from 'app/services/account.service';
import { IMessageService } from 'app/services/message.service';
import { IRoomService } from 'app/services/room.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { RoomModel } from './../../../models/room.model';
import { UserModel } from './../../../models/user.model';
import { MessageFormComponent } from './../message-form/message-form.component';
import { AccountServiceStub, MessageServiceStub } from './../message-form/message-form.spec';
import { MessageComponent } from './../message/message';
import { ChatBoxComponent } from './chat-box.component';


describe('chat-box', () => {
    let comp: ChatBoxComponent;
    let fixture: ComponentFixture<ChatBoxComponent>;
    let messageService: IMessageService;
    let roomService: IRoomService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ChatBoxComponent, MessageComponent, MessageFormComponent],
            imports: [
                FormsModule,
                BrowserModule,
                HttpModule, RouterTestingModule.withRoutes([]),
            ],
            providers: [
                { provide: IAccountService, useClass: AccountServiceStub },
                { provide: IMessageService, useClass: MessageServiceStub },
                { provide: IRoomService, useClass: RoomServiceStub },
            ]
        });
        fixture = TestBed.createComponent(ChatBoxComponent);
        comp = fixture.componentInstance;
        messageService = fixture.debugElement.injector.get(IMessageService);
        roomService = fixture.debugElement.injector.get(IRoomService);
    });

    it('schould get message', () => {
        expect(comp.messages.length).toEqual(0);
        messageService.sendMessage('m');
        expect(comp.messages.length).toBeGreaterThan(0);
    });

    it('schould clear message when room changed', () => {
        messageService.sendMessage('m');
        roomService.enterRoom(1);
        expect(comp.messages.length).toEqual(0);
    });
})

export class RoomServiceStub implements IRoomService {
    public currentRoomId: number;
    public users: UserModel[];
    private roomchanged: Subject<void>;
    public rooms: RoomModel[];
    public get roomChangedEvent(): Observable<void> {
        return this.roomchanged.asObservable();
    }

    constructor() {
        this.rooms = [];
        this.roomchanged = new Subject<void>();
    }

    public enterRoom(id: number) {
        this.roomchanged.next();
    }

    public createRoom(name: string) {
        const room = new RoomModel();
        room.name = name;
        this.rooms.push(room);
        this.roomchanged.next();
    }
}
