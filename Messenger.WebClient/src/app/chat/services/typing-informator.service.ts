import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ConnectionResolver } from './connection-resolver';
import { CustomTimer } from '../models';
import { UserModel } from 'app/account';

const delay = 500;

@Injectable()
export class TypingInformatorService {
    private timerAndUsers: { timer: CustomTimer, user: UserModel }[] = [];
    private _writingUsers = new Subject<string[]>();

    public writingUsers() {
        return this._writingUsers.asObservable();
    }

    constructor(connectionResolver: ConnectionResolver) {
        connectionResolver.listenServerEvent<UserModel>('onUserWriting').subscribe(user => {
            const existingUser = this.timerAndUsers.find(t => t.user.id === user.id)
            if (existingUser) {
                existingUser.timer.extendDelay(delay);
            } else {
                const timer = new CustomTimer(delay, () => {
                    const e = this.timerAndUsers.findIndex(t => t.timer === timer);
                    this.timerAndUsers.splice(e, 1);
                    this._writingUsers.next(this.timerAndUsers.map(t => t.user.userName));
                })
                this.timerAndUsers.push({ timer: timer, user: user })
                this._writingUsers.next(this.timerAndUsers.map(t => t.user.userName));
            }
        });
    }
}
