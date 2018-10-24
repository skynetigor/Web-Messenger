import { Observable, ReplaySubject } from 'rxjs';

export class MessageBusService {
    private subjects = {};

    private getOrCreateSubject(name: string): ReplaySubject<any> {
        let subject: ReplaySubject<any> = this.subjects[name];

        if (!subject) {
            subject = new ReplaySubject<any>();
            this.subjects[name] = subject;
        }

        return subject;
    }

    send(name: string, data?): void {
        this.getOrCreateSubject(name).next(data);
    }

    event<T>(name: string): Observable<T> {
        return this.getOrCreateSubject(name).asObservable();
    }
}
