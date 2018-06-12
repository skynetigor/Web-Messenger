import { RoomModel, MessageModel } from "../../models";
import { MessengerAction, MessengerActionType } from "../actions";


export interface MessengerState {
    rooms: RoomModel[];
    currentRoom: RoomModel;
    currentRoomMessages: MessageModel[];
}

const initialState: MessengerState = {
    rooms: null,
    currentRoomMessages: [],
    currentRoom: null
}

export function messengerReducer(state = initialState, action: MessengerAction): MessengerState {
    switch (action.type) {
        case MessengerActionType.UpdateRooms: {
            return {
                ...state,
                rooms: action.payload
            }
        }
        default: return state;
    }
}
