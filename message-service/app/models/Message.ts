
import mongoose, { Schema } from 'mongoose';
import { IMember } from '@app/models/Member';

export interface IMessage {
    uuid?: string;
    image?: string;
    text: string;
    member_uuid: string;
    room_uuid: string;
    owner: IMember['_id']
}

const MessageSchema: Schema = new Schema({
    uuid: { type: String, required: true },
    image: { type: String, required: false },
    text: { type: String, required: true },
    member_uuid: { type: String, required: true },
    room_uuid: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'Member' }
});

export default mongoose.model<IMessage>('Message', MessageSchema);