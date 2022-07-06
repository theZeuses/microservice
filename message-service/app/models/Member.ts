
import mongoose, { Schema, Document } from 'mongoose';

export interface IMember {
    nickname: string;
    uuid: string;
    avatar: string;
    password: string;
    room_uuid: string;
    _id: Schema.Types.ObjectId;
}

const MemberSchema: Schema = new Schema({
    nickname: { type: String, required: true },
    uuid: { type: String, required: true },
    avatar: { type: String, required: false },
    password: { type: String, required: true },
    room_uuid: { type: String, required: true },
});

export default mongoose.model<IMember>('Member', MemberSchema);