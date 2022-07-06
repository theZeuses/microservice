import ChatRoom from "../models/ChatRoom";

const chatRoomMapper = {
    mapChatRooms: (chatRooms: any) => {
        let list: ChatRoom[] = []
        chatRooms.forEach((chatRoom: any) => {
            list.push(new ChatRoom(chatRoom))
        });
        return list;
    },
    mapChatRoom: (chatRoom: any) => {
        if (chatRoom) {
            return new ChatRoom(chatRoom);
        }
        return null;
    }
}

export default chatRoomMapper;