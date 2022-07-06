
import mongoose, { Schema, Document } from 'mongoose';

export interface IChatRoom {
  name: string;
  uuid: string;
}

const ChatRoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  uuid: { type: String, required: true },
});

export default mongoose.model<IChatRoom>('ChatRoom', ChatRoomSchema);