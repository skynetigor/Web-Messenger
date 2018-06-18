import { ArrayLikeObservable } from 'rxjs-compat/observable/ArrayLikeObservable';
import { Component } from '@angular/core';
import { TypingInformatorService } from '../../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const pulsarDelay = 500;

@Component({
    selector: 'typing-informator',
    templateUrl: './typing-informator.component.html',
    providers: [TypingInformatorService]
})

export class TypingInformatorComponent {
    protected pulsar: string;

    public writersInfo$: Observable<string>;

    private timer: any;

    constructor(private writingInfo: TypingInformatorService) {
        this.writersInfo$ = writingInfo.writers$.pipe(map(userNames => {
            if (userNames.length > 0) {
                this.runPulsar();
                return userNames.join(', ') + ' ' + (userNames.length > 1 ? 'are' : 'is') + ' typing';
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
