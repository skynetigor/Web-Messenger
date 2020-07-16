import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TypingInformatorService } from '../../services';

const pulsarDelay = 500;

export abstract class TypingInformatorComponent {
    public pulsar: string;

    public writersInfo$: Observable<string>;

    private timer: any;

    constructor(private writingInfo: TypingInformatorService) {
        this.writersInfo$ = writingInfo.writers$.pipe(map(userNames => {
            if (userNames.length > 0) {
                this.runPulsar();
                return userNames.join(', ') + ' ' + (userNames.length > 1 ? 'are' : 'is') + ' typing';
            } else {
                clearInterval(this.timer);
                this.timer = false;
                this.pulsar = '';
            }
        }));
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
