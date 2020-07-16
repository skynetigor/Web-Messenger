import { IAccountService } from 'app/services/account.service';
import { SignInModel, RegisterModel } from './../../../models/account.models';
import { UserModel } from './../../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { MessageModel } from './../../../models/message.model';
import { Subject } from 'rxjs/Subject';
import { IMessageService } from './../../../services/message.service';
import { FormsModule } from '@angular/forms';
import { Component, Injectable } from '@angular/core';
import { MessageFormComponent } from './message-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('message-form', () => {
    let comp: MessageFormComponent;
    let fixture: ComponentFixture<MessageFormComponent>;
    let messageService: IMessageService;
    let accountService: IAccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MessageFormComponent],
            imports: [FormsModule],
            providers: [
                { provide: IAccountService, useClass: AccountServiceStub },
                { provide: IMessageService, useClass: MessageServiceStub },
            ]
        });
        fixture = TestBed.createComponent(MessageFormComponent);
        comp = fixture.componentInstance;
        messageService = fixture.debugElement.injector.get(IMessageService);
        accountService = fixture.debugElement.injector.get(IAccountService);
    });

    it('should sendMessage', () => {
        messageService.messagesObservable.subscribe((m) => {
            expect(m.text).toEqual('l');
        });
        comp.text = 'l';
        comp.sendMessage();
    });

    it('if message sended, should clear text input', () => {
        messageService.messagesObservable.subscribe((m) => {
            expect(m.text).toEqual('l');
        });
        comp.text = 'l';
        comp.sendMessage();
        expect(comp.text).toEqual('');
    });

    it('if user is not in room, not should send message', () => {
accountService.isInRoom = false;
        messageService.messagesObservable.subscribe((m) => {
            throw Error('message schould not be sended')
        });
        comp.text = 'l';
        comp.sendMessage();
        expect(comp.text).toEqual('l');
    });
});

@Injectable()
export class MessageServiceStub implements IMessageService {
    private messageSubject: Subject<MessageModel>;

    public get messagesObservable(): Observable<MessageModel> {
        return this.messageSubject.asObservable();
    }

    constructor() {
        this.messageSubject = new Subject<MessageModel>();
    }

    public sendMessage(message: string) {
        const m = new MessageModel();
        m.text = message;
        this.messageSubject.next(m);
    }
}

export class AccountServiceStub implements IAccountService {
    public errors: string[];
    public isInRoom = true;
    public currentUser: UserModel;
    public signIn(model: SignInModel): void {
        throw new Error('Method not implemented.');
    }
    public register(model: RegisterModel): void {
        throw new Error('Method not implemented.');
    }
    public signOut(): void {
        throw new Error('Method not implemented.');
    }

}
