import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { UserModel } from '../../account';
import { CustomTimer, } from '../models';
import { ConnectionResolver } from './connection-resolver';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const delay = 500;

@Injectable()
export class TypingInformatorService {
    private timerAndUsers: { timer: CustomTimer, user: UserModel }[] = [];

    public readonly writers$: Observable<string[]>;

    constructor(connectionResolver: ConnectionResolver) {
        const writersSubject = new ReplaySubject<string[]>();
        this.writers$ = writersSubject.asObservable();

        connectionResolver.listenServerEvent<UserModel>('onUserWriting').subscribe(user => {
            const existingUser = this.timerAndUsers.find(t => t.user.id === user.id);

            if (existingUser) {
                existingUser.timer.extendDelay(delay);
            } else {
                const timer = new CustomTimer(delay, () => {
                    const e = this.timerAndUsers.findIndex(t => t.timer === timer);
                    this.timerAndUsers.splice(e, 1);
                    writersSubject.next(this.timerAndUsers.map(t => t.user.userName));
                });
                this.timerAndUsers.push({ timer: timer, user: user });
                writersSubject.next(this.timerAndUsers.map(t => t.user.userName));
            }
        });
    }
}
