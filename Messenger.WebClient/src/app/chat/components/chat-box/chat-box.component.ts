import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RoomService, MessageService } from '../../services';
import { MessageModel } from '../../models';

const messageCount = 10;
const scrollingPersent = 10;
const scrollingBan = 1;
const pulsarDelay = 500;

@Component({
    selector: 'chat-box',
    templateUrl: 'chat-box.component.html',
    styleUrls: ['chat-box.css']
})

export class ChatBoxComponent implements OnInit, AfterViewChecked {
    public throttle = 5;
    public scrollUpDistance = 1;
    private page = 2;
    private disableScrollDown = false;
    @ViewChild('scroll') private myScrollContainer: ElementRef;
    @ViewChild('audioNotification') private audioNotification: ElementRef;

    private m: MessageModel[] = [];
    constructor(private messageService: MessageService, private roomService: RoomService) {
        messageService.getMessage.subscribe(message => {
            this.m.push(message);
            this.audioNotification.nativeElement.play();
        });
        messageService.getOwnMessage.subscribe(message => {
            this.m.push(message);
        });
        messageService.messagesLoading.subscribe(messages => {
            this.m = messages.concat(this.m);
        });

        // roomService.roomChangedEvent.subscribe(model => {
        //     if (model.messages) {
        //         this.m = model.messages;
        //     } else {
        //         this.m = [];
        //     }
        //     try {
        //         this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 100;
        //     } catch (err) { }
        // });
    }

    public ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    public ngOnInit(): void {
        this.scrollToBottom();
    }

    public onScroll() {
        const element = this.myScrollContainer.nativeElement;
        const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
        const scrollLoading = element.clientHeight * scrollingPersent / 100;
        if (element.scrollTop <= scrollingBan) {
            element.scrollTop = scrollingBan;
        }

        if (element.scrollTop <= scrollLoading && element.scrollTop !== 0) {
            this.messageService.getMessages();
        }

        if (atBottom) {
            this.disableScrollDown = false;
        } else {
            this.disableScrollDown = true;
        }
    }

    public get messages(): MessageModel[] {
        return this.m;
    }

    private scrollToBottom(): void {
        if (this.disableScrollDown) {
            return;
        }
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 100;
        } catch (err) { }
    }
}
