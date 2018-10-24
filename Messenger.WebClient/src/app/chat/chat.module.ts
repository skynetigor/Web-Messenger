import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';

import { ChatRouter } from './chat-router';
import { ChatDesktopModule } from './modules';
import { ConnectionResolver, MessageService, RoomService, TypingInformatorService } from './services';
import { reducers } from './store';
import { MessagesEffects, RoomEffects } from './store/effects';
import { ChatRootComponent } from './components';
import { ChatMobileModule } from './modules/mobile/chat-mobile.module';

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
        EffectsModule.forRoot([RoomEffects, MessagesEffects]),
        ChatDesktopModule,
        ChatMobileModule
    ],
    declarations: [ChatRootComponent],
    providers: [
        ConnectionResolver,
        TypingInformatorService,
        MessageService,
        RoomService
    ],
})

export class ChatModule { }
