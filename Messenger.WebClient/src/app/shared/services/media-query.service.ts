import { Injectable, NgZone } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class MediaQueryService {
    private subjects = {};

    constructor(private zone: NgZone) {

    }

    createListener(mediaQuery: string) {
        let sbj: ReplaySubject<any> = this.subjects[mediaQuery];
        if (!sbj) {
            sbj = new ReplaySubject<any>();

            const obj = {
                subject: sbj,
                mediaQuery: window.matchMedia(mediaQuery),
                func: (t) => this.zone.run(l => obj.subject.next((t)))
            };

            obj.mediaQuery.addListener(obj.func);

            sbj.next(obj.mediaQuery);
        }

        return sbj.asObservable();
    }
}
