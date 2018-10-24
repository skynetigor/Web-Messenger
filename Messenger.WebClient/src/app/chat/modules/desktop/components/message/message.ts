import { Component } from '@angular/core';

import { AccountService } from '../../../../../account';
import { MessageComponent } from '../../../../components';

@Component({
    selector: 'message-desktop',
    templateUrl: 'message.component.html',
    styleUrls: ['message.css']
})
export class MessageDesktopComponent extends MessageComponent {
    constructor(account: AccountService) {
        super(account);
    }
}
