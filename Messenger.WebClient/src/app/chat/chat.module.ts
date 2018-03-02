import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { ChatRouter } from 'app/chat/chat-router';
import {
    ChatBoxComponent,
    ChatPageComponent,
    MessageComponent,
    MessageFormComponent,
    ModalComponent,
    RoomsListComponent,
    TypingInformatorComponent,
    UsersListComponent,
} from 'app/chat/components';
import { ConnectionResolver, MessageService, RoomService, TypingInformatorService } from 'app/chat/services';
import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';

export function createConfig(): SignalRConfiguration {
    const c = new SignalRConfiguration();
    c.logging = true;
    return c;
}

@NgModule({
    imports: [
        CommonModule,
        ChatRouter,
        FormsModule,
        SignalRModule.forRoot(createConfig),
        InfiniteScrollModule,
    ],
    declarations: [
        ChatBoxComponent,
        MessageFormComponent,
        RoomsListComponent,
        UsersListComponent,
        ChatPageComponent,
        MessageComponent,
        ModalComponent,
        TypingInformatorComponent
    ],
    providers: [
        ConnectionResolver,
        TypingInformatorService,
        MessageService,
        RoomService
    ],
})

export class ChatModule { }
