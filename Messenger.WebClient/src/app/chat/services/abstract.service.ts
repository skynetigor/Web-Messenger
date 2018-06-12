import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

import { HttpCustomClient } from '../../account';
import { State } from '../store';
import { ConnectionResolver } from './connection-resolver';

export class AbstractService implements OnDestroy {
    private subscription: Subscription[] = [];

    constructor(
        protected connectionResolver: ConnectionResolver,
        protected httpClient: HttpCustomClient,
        protected store: Store<State>
    ) { }

    public ngOnDestroy(): void {
        this.subscription.forEach(subscription => subscription.unsubscribe());
    }

    protected updateStateFromEvent<T>(eventName: string, action: ((t: T) => any)) {
        return this.updateStateFromObservable(this.connectionResolver.listenServerEvent(eventName), action);
    }

    protected updateStateFromObservable<T>(observable: Observable<T>, action: ((t: T) => any)) {
        const subject = new Subject<T>();

        this.subscription.push(observable.subscribe(t => {
            this.store.dispatch(action(t));
            subject.next(t);
        }));

        return subject.asObservable();
    }
}
