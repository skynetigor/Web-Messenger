import { Action } from '@ngrx/store';

import { RoomModel } from '../../models';

export const MessengerActionType = {
    UpdateRooms: '[Messenger] Update Rooms'
}

export class UpdateRoomsAction implements Action {
    readonly type = MessengerActionType.UpdateRooms;

    constructor(public payload: RoomModel[]) { }
}

export declare type MessengerAction = UpdateRoomsAction;
