import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { MessageModel } from '../../models';
import { MessageService, RoomService } from '../../services';

const messageCount = 10;
const scrollingPersent = 10;
const scrollingBan = 1;
const pulsarDelay = 500;

export class ChatBoxComponent implements OnInit, AfterViewChecked {
    public throttle = 5;
    public scrollUpDistance = 1;
    private page = 2;
    private disableScrollDown = false;
    @ViewChild('scroll') private myScrollContainer: ElementRef;
    @ViewChild('audioNotification') private audioNotification: ElementRef;

    public readonly messages$: Observable<MessageModel[]>;

    constructor(private messageService: MessageService, private roomService: RoomService) {
        this.messages$ = messageService.messages$;
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
            this.messageService.loadMessages();
        }

        if (atBottom) {
            this.disableScrollDown = false;
        } else {
            this.disableScrollDown = true;
        }
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
