import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { ISignalRConnection, SignalR, SignalRConfiguration } from 'ng2-signalr';
import { Observable } from 'rxjs/Observable';
import { AccountService } from 'app/account';
import { ApiUrls } from 'app/api-urls';

@Injectable()
export class ConnectionResolver {
    private connection: ISignalRConnection;
    private connectionObservable: Observable<ISignalRConnection>;

    public get isConnectionExist(): boolean {
        return !!this.connection;
    }

    constructor(private accountService: AccountService, signalR: SignalR) {
        const config = this.createConfig();
        this.connectionObservable = Observable.fromPromise(signalR.createConnection(config).start())
            .switchMap(con => {
                this.connection = con;
                return Observable.of(con);
            });
    }

    private connectionHelper(func: (connection: ISignalRConnection) => Observable<any>) {
        if (this.connection) {
            return func(this.connection);
        }
        return this.connectionObservable.switchMap(func);
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

    public invokeServerMethod(methodName: string, ...parameters: any[]): Observable<any> {
        return this.connectionHelper(connection => Observable.fromPromise(connection.invoke(methodName, ...parameters)));
    }

    public listenServerEvent<T>(eventName: string) {
        return this.connectionHelper(connection => connection.listenFor(eventName));
    }
}
