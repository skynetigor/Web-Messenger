import { UserModel } from '../../../account';
import { MessageModel, RoomModel } from '../../models';
import { MessengerAction, MessengerActionType } from '../actions';

export interface MessengerState {
    rooms: RoomModel[];
    currentRoomId: string;
    currentRoomMessages: MessageModel[];
    messagesCurrentPage: number;
    messagesTotalPages: number;
    areMessagesRequested: boolean;
    users: UserModel[];
}

const initialState: MessengerState = {
    rooms: [],
    currentRoomMessages: [],
    currentRoomId: null,
    messagesCurrentPage: 0,
    messagesTotalPages: 0,
    areMessagesRequested: false,
    users: []
};

export function messengerReducer(state = initialState, action: MessengerAction): MessengerState {
    switch (action.type) {
        case MessengerActionType.EnteredToRoomSuccess: {
            const messageModel = action.payload.messagesModel ? action.payload.messagesModel : {};

            return {
                ...state,
                currentRoomId: action.payload.roomId,
                users: action.payload.users,
                messagesCurrentPage: 1,
                currentRoomMessages: messageModel.messages ? messageModel.messages : [],
                messagesTotalPages: messageModel.totalPages
            };
        }
        case MessengerActionType.CreatedRoomSuccess: {
            return {
                ...state,
                currentRoomId: action.payload.roomId,
                users: action.payload.users,
                rooms: action.payload.rooms,
                currentRoomMessages: [],
                messagesCurrentPage: 1,
                messagesTotalPages: 1
            };
        }
        case MessengerActionType.UpdateRooms: {
            return {
                ...state,
                rooms: action.payload.filter(t => t)
            };
        }
        case MessengerActionType.UserCountChanged: {
            return {
                ...state,
                users: action.payload
            };
        }
        case MessengerActionType.GetMessage: {
            return {
                ...state,
                currentRoomMessages: state.currentRoomMessages.concat(action.payload)
            };
        }
        case MessengerActionType.LoadMessages: {
            return {
                ...state,
                areMessagesRequested: false,
                currentRoomMessages: action.payload.messages.concat(state.currentRoomMessages),
                messagesCurrentPage: state.messagesCurrentPage + 1
            };
        }

        default: return state;
    }
}
