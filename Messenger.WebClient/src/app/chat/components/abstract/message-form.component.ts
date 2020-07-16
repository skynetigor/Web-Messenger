import { Component } from '@angular/core';
import { MessageService, RoomService } from '../../services';
import { AccountService } from '../../../account';

export abstract class MessageFormComponent {
    public text: string;
    constructor(private messageService: MessageService, private accountService: AccountService, private roomservice: RoomService) { }

    public sendMessage(): void {
        if (this.text.length > 0) {
            this.messageService.sendMessage(this.text);
            this.text = '';
        }
    }

    public keyPress(event: any): boolean {
        if (event.code === 'Enter') {
            this.sendMessage();
            return false;
        }
        this.messageService.invokeWritinMessageEvent(this.roomservice.currentRoomId);
    }
}
