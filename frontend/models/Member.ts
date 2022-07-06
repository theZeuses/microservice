class Member
{
    nickname!: string;
    uuid?: string;
    avatar?: string;
    password!: string;
    room_uuid!: string;
    _id!: string;

    constructor({ _id, uuid, nickname, avatar, password, room_uuid}: Member){
        this._id = _id;
        this.uuid = uuid;
        this.nickname = nickname;
        this.avatar = avatar;
        this.password = password;
        this.room_uuid = room_uuid;
    }
}

export default Member;