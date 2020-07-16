import { Component } from '@angular/core';

import { TypingInformatorComponent } from '../../../../components';
import { TypingInformatorService } from '../../../../services';

const pulsarDelay = 500;

@Component({
    selector: 'typing-informator-desktop',
    templateUrl: './typing-informator.component.html',
    providers: [TypingInformatorService]
})

export class TypingInformatorDesktopComponent extends TypingInformatorComponent {

    constructor(writingInfo: TypingInformatorService) {
        super(writingInfo);
    }
}
