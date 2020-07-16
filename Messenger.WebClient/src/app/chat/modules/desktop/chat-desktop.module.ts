import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as components from './components';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        components.ChatPageDesktopComponent,
        components.ChatBoxDesktopComponent,
        components.MessageDesktopComponent,
        components.MessageFormDesktopComponent,
        components.ModalDesktopComponent,
        components.RoomsListDesktopComponent,
        components.TypingInformatorDesktopComponent,
        components.UsersListDesktopComponent
    ],
    exports: [components.ChatPageDesktopComponent]
})

export class ChatDesktopModule { }
