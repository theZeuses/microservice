import apiChatRooms from './api/ChatRoomApi';
import chatRoomMapper from '../mappers/ChatRoomMapper';

const chatRoomService = {
    insertChatRoom: async (body: any) => {
        try {
            return apiChatRooms.post(body).then((data: any) => {
                return {
                    status: 'success',
                    data: chatRoomMapper.mapChatRoom(data.data)
                };
            }).catch((error: any) => {
                if (error?.data) {
                    throw { ...error.data, statusCode: error.status };
                } else {
                    throw {
                        status: 'failed',
                        internal: true,
                        errors: [error]
                    };
                }
            });
        } catch (error) {
            throw {
                status: 'failed',
                internal: true,
                errors: [error]
            };
        }
    }
}

export default chatRoomService;