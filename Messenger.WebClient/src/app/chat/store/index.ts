import { ActionReducerMap, combineReducers, compose } from '@ngrx/store';

import * as t from './reducers';

export interface State {
  messenger: t.MessengerState;
}

export const reducers: ActionReducerMap<State> = {
    messenger: t.messengerReducer
};

export function store(state: any, action: any) {
  // tslint:disable-next-line:no-shadowed-variable
  const store = compose(combineReducers)(reducers);
  return store(state, action);
}
