import { UserModel } from '../../../account';
import { MessageModel, RoomModel } from '../../models';
import { MessengerAction, MessengerActionType } from '../actions';

export interface MessengerState {
    rooms: RoomModel[];
    currentRoomId: string;
    currentRoomMessages: MessageModel[];
    users: UserModel[];
}

const initialState: MessengerState = {
    rooms: [],
    currentRoomMessages: [],
    currentRoomId: null,
    users: []
};

export function messengerReducer(state = initialState, action: MessengerAction): MessengerState {
    switch (action.type) {
        case MessengerActionType.EnteredToRoomSuccess: {
            return {
                ...state,
                currentRoomId: action.payload.roomId,
                users: action.payload.users
            };
        }
        case MessengerActionType.CreatedRoomSuccess: {
            return {
                ...state,
                currentRoomId: action.payload.roomId,
                users: action.payload.users,
                rooms: action.payload.rooms
            };
        }
        case MessengerActionType.UpdateRooms: {
            return {
                ...state,
                rooms: action.payload
            };
        }
        case MessengerActionType.UserCountChanged: {
            return {
                ...state,
                users: action.payload
            };
        }
        default: return state;
    }
}
