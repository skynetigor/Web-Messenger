import { Action } from '@ngrx/store';

import { RoomModel } from '../../models';

export const MessengerActionType = {
    RequestEnteringRoom: '[Messenger] Request Entering Room',
    RequestCreatingRoomAction: '[Messenger] Request Creating Room',
    EnteredToRoomSuccess: '[Messenger] Entered To Room Success',
    CreatedRoomSuccess: '[Messenger] Created To Room Success',
    UpdateRooms: '[Messenger] Update Rooms',
    UserCountChanged: '[Messenger] User Count Changed'
};

export class RequestEnteringRoomAction implements Action {
    readonly type = MessengerActionType.RequestEnteringRoom;

    constructor(public payload: string) { }
}

export class RequestCreatingRoomAction implements Action {
    readonly type = MessengerActionType.RequestCreatingRoomAction;

    constructor(public payload: string) { }
}

export class EnteredToRoomSuccessAction implements Action {
    readonly type = MessengerActionType.EnteredToRoomSuccess;

    constructor(public payload: any) { }
}

export class CreatedRoomSuccessAction implements Action {
    readonly type = MessengerActionType.CreatedRoomSuccess;

    constructor(public payload: any) { }
}

export class UpdateRoomsAction implements Action {
    readonly type = MessengerActionType.UpdateRooms;

    constructor(public payload: any) { }
}

export class UserCountChangedAction implements Action {
    readonly type = MessengerActionType.UserCountChanged;

    constructor(public payload: any) { }
}

export declare type MessengerAction = EnteredToRoomSuccessAction | CreatedRoomSuccessAction | UpdateRoomsAction;
