import { Injectable } from '@angular/core';
import { ISignalRConnection, SignalR, SignalRConfiguration } from 'ng2-signalr';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap, tap } from 'rxjs/operators';

import { AccountService } from '../../account';
import { ApiUrls } from '../../api-urls';

@Injectable()
export class ConnectionResolver {
    private readonly connectionObservable: Observable<ISignalRConnection>;
    private _isConnectionExist: boolean;

    public get isConnectionExist() { return this._isConnectionExist; }

    constructor(private accountService: AccountService, signalR: SignalR) {
        const config = this.createConfig();
        this.connectionObservable = fromPromise(signalR.createConnection(config).start()).pipe(tap(con => {
            this._isConnectionExist = true;
        }));
    }

    public invokeServerMethod(methodName: string, ...parameters: any[]): Observable<any> {
        return this.connectionObservable.pipe(mergeMap(connection => connection.invoke(methodName, ...parameters)));
    }

    public listenServerEvent<T>(eventName: string): Observable<T> {
        return this.connectionObservable.pipe(mergeMap(connection => connection.listenFor<T>(eventName)));
    }

    private createConfig(): SignalRConfiguration {
        const c = new SignalRConfiguration();
        const token = this.accountService.currentUser.token;
        c.hubName = ApiUrls.hubName;
        c.qs = { token: token };
        c.url = ApiUrls.chatHub;
        c.logging = true;
        return c;
    }
}
