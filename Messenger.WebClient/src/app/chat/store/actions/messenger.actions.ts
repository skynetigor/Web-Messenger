import { Action } from '@ngrx/store';

import { RoomModel } from '../../models';

export const MessengerActionType = {
    RequestRooms: '[Messenger] Request Rooms',
    RequestEnteringRoom: '[Messenger] Request Entering Room',
    RequestCreatingRoomAction: '[Messenger] Request Creating Room',
    RequestMessages: '[Messenger] Request Messages',
    RequestSendingMessage: '[Messenger] Request Sending Message',

    EnteredToRoomSuccess: '[Messenger] Entered To Room Success',
    CreatedRoomSuccess: '[Messenger] Created To Room Success',
    UpdateRooms: '[Messenger] Update Rooms',
    UserCountChanged: '[Messenger] User Count Changed',
    GetMessage: '[Messenger] Get Message',
    LoadMessages: '[Messenger] Load Messages',
};

export class RequestRoomsAction implements Action {
    readonly type = MessengerActionType.RequestRooms;

    constructor() { }
}

export class RequestEnteringRoomAction implements Action {
    readonly type = MessengerActionType.RequestEnteringRoom;

    constructor(public payload: string) { }
}

export class RequestCreatingRoomAction implements Action {
    readonly type = MessengerActionType.RequestCreatingRoomAction;

    constructor(public payload: string) { }
}

export class RequestMessagesAction implements Action {
    readonly type = MessengerActionType.RequestMessages;

    constructor(public payload = null) { }
}

export class RequestSendingMessageAction implements Action {
    readonly type = MessengerActionType.RequestSendingMessage;

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

export class LoadMessagesAction implements Action {
    readonly type = MessengerActionType.LoadMessages;

    constructor(public payload: any) { }
}

export class GetMessageAction implements Action {
    readonly type = MessengerActionType.GetMessage;

    constructor(public payload: any | any[]) {
        payload = Array.isArray(payload) ? payload : [payload];
    }
}

export declare type MessengerAction =
    EnteredToRoomSuccessAction
    | CreatedRoomSuccessAction
    | UpdateRoomsAction
    | GetMessageAction
    | LoadMessagesAction;
