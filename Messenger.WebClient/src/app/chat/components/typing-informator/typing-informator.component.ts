import { Component } from '@angular/core';
import { TypingInformatorService } from '../../services';

const pulsarDelay = 500;

@Component({
    selector: 'typing-informator',
    templateUrl: './typing-informator.component.html',
    providers: [TypingInformatorService]
})

export class TypingInformatorComponent {
    protected pulsar: string;

    private timer: any;
    private _info: string;

    constructor(private writingInfo: TypingInformatorService) {
        writingInfo.writingUsers().subscribe(usersNames => {
            if (usersNames.length > 0) {
                this.runPulsar();
                this._info = usersNames.join(', ') + ' ' + (usersNames.length > 1 ? 'are' : 'is') + ' typing';
            } else {
                clearTimeout(this.timer);
                this.timer = null;
                this.pulsar = null;
                this._info = null;
            }
        });
    }

    public get info(): string {
        return this._info;
    }

    protected runPulsar() {
        if (!this.timer) {
            this.pulsar = '';
            this.timer = setInterval(() => {
                this.pulsar += '.';
                if (this.pulsar.length > 3) {
                    this.pulsar = '';
                }
            }, pulsarDelay);
        }
    }
}
