import { MessageModel } from './message.model';
export class RoomChangingModel {
    public page: number;
    public messages: MessageModel[];
    public totalPages: number;
}
