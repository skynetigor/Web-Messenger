import { OnDestroy } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { State } from '../store';
import { ConnectionResolver } from './connection-resolver';

export class AbstractService implements OnDestroy {
    private subscription: Subscription[] = [];

    constructor(
        protected connectionResolver: ConnectionResolver,
        protected store: Store<State>
    ) { }

    public ngOnDestroy(): void {
        this.subscription.forEach(subscription => subscription.unsubscribe());
    }

    protected updateStateFromEvent<T>(eventName: string, action: (t: T) => Action) {
        return this.subscribe(this.connectionResolver.listenServerEvent<T>(eventName), t => this.store.dispatch(action(t)));
    }

    protected subscribe<T>(observable: Observable<T>, action: (t: T) => void) {
        const subscription = observable.subscribe(action);
    }
}
