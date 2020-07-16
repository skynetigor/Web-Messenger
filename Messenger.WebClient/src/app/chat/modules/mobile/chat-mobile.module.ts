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
        components.ChatPageMobileComponent,
        components.ChatBoxMobileComponent,
        components.MessageMobileComponent,
        components.MessageFormMobileComponent,
        components.ModalMobileComponent,
        components.RoomsListMobileComponent,
        components.TypingInformatorMobileComponent,
        components.UsersListMobileComponent,
        components.UsersListInlineMobileComponent
    ],
    exports: [components.ChatPageMobileComponent]
})

export class ChatMobileModule { }
