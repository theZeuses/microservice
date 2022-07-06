class MessagingLog
{
    member_uuid!: string;
    room_uuid!: string;
    timestamp!: string;
    _id?: string;

    constructor({ _id, member_uuid, room_uuid, timestamp}: MessagingLog){
        this._id = _id;
        this.member_uuid = member_uuid;
        this.room_uuid = room_uuid;
        this.timestamp = timestamp;
    }
}

export default MessagingLog;