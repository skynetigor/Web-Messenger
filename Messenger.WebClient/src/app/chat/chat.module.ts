import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';

import { ChatRouter } from './chat-router';
import {
    ChatBoxComponent,
    ChatPageComponent,
    MessageComponent,
    MessageFormComponent,
    ModalComponent,
    RoomsListComponent,
    TypingInformatorComponent,
    UsersListComponent,
} from './components';
import { ConnectionResolver, MessageService, RoomService, TypingInformatorService } from './services';
import { reducers } from './store';
import { RoomEffects, MessagesEffects } from './store/effects';

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
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([RoomEffects, MessagesEffects])
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
