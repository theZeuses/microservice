class ChatRoom
{
    name: string;
    uuid?: string;
    _id: string;

    constructor({ _id, uuid, name }: ChatRoom){
        this._id = _id;
        this.uuid = uuid;
        this.name = name;
    }
}

export default ChatRoom;