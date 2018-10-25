import { Injectable } from '@angular/core';
import { ISignalRConnection, SignalR, SignalRConfiguration } from 'ng2-signalr';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, tap } from 'rxjs/operators';

import { AccountService } from '../../account';
import { ApiUrls } from '../../api-urls';

@Injectable()
export class ConnectionResolver {
    private readonly connectionObservable: Observable<ISignalRConnection>;
    private connection: ISignalRConnection;
    private _isConnectionExist: boolean;

    public get isConnectionExist() { return this._isConnectionExist; }

    constructor(private accountService: AccountService, signalR: SignalR) {
        const config = this.createConfig();

        if (config) {
            this.connectionObservable = fromPromise(signalR.createConnection(this.createConfig()).start()).pipe(tap(con => {
                this.connection = con;
                this._isConnectionExist = true;
            }));
        }
    }

    private helper<T>(action: (connnection: ISignalRConnection) => Observable<T>) {
        if (!this.connection) {
            return this.connectionObservable.pipe(switchMap(t => action(t)));
        }

        return action(this.connection);
    }

    public invokeServerMethod(methodName: string, ...parameters: any[]): Observable<any> {
        return this.helper(connection => fromPromise(connection.invoke(methodName, ...parameters)));
    }

    public listenServerEvent<T>(eventName: string): Observable<T> {
        return this.helper(connection => connection.listenFor(eventName));
    }

    private createConfig(): SignalRConfiguration {
        const c = new SignalRConfiguration();
        const user = this.accountService.currentUser;

        if(!user) {
            return null;
        }

        const token = user.token;
        c.hubName = ApiUrls.hubName;
        c.qs = { token: token };
        c.url = ApiUrls.chatHub;
        c.logging = true;
        return c;
    }
}
