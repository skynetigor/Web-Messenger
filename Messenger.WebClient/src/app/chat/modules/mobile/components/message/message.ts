import { Component } from '@angular/core';

import { AccountService } from '../../../../../account';
import { MessageComponent } from '../../../../components';

@Component({
    selector: 'message-mobile',
    templateUrl: 'message.component.html',
    styleUrls: ['message.css']
})
export class MessageMobileComponent extends MessageComponent {
    constructor(account: AccountService) {
        super(account);
    }
}
