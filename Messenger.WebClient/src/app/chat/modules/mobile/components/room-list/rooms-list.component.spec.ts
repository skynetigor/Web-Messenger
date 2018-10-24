import { FormsModule } from '@angular/forms';
import { ModalComponent } from './../modal/modal.component';
import { RoomServiceStub } from './../chat-box/chat-box.component.spec';
import { IRoomService } from './../../../services/room.service';
import { AccountServiceStub } from './../message-form/message-form.spec';
import { IAccountService } from './../../../services/account.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsListComponent } from './rooms-list.component';

describe('rooms-list', () => {
    let comp: RoomsListComponent;
    let fixture: ComponentFixture<RoomsListComponent>;
    let roomService: IRoomService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RoomsListComponent, ModalComponent],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: IAccountService, useClass: AccountServiceStub },
                { provide: IRoomService, useClass: RoomServiceStub }
            ]
        });
        fixture = TestBed.createComponent(RoomsListComponent);
        comp = fixture.componentInstance;
        roomService = fixture.debugElement.injector.get(IRoomService);
    });

    it('schould get rooms', () => {
        for (let index = 0; index < 3; index++) {
            roomService.createRoom('room' + index);
        }
        expect(comp.roomList.length).toEqual(3);
    });
})
