import { getChatRoomByUUID } from '@services/chatRoomService';
import { getMembersByFiltering } from './memberService';
import { IChatRoom } from '@models/ChatRoom';
import { IMember } from '@app/models/Member';
import { comparePassword } from '@app/helpers/authHelper';
import { generateToken } from '@helpers/jwtHelper';

async function attemptLogin(room: IChatRoom, member: IMember, password: string){
    if(room.uuid != member.room_uuid) throw { message: 'Authorization failed', code: 'MEMBER_NOT_IN_ROOM', statusCode: 403 };
    if(comparePassword(password, member.password)){
        return generateToken({
            member_uuid: member.uuid,
            room_uuid: room.uuid
        }, '10d');
    }else{
        throw { message: 'Authentication failed', code: 'INVALID_CREDENTIALS', statusCode: 401 };
    }
}
export async function login(room_uuid: string, nickname: string, password: string){
    try{
        const room = await getChatRoomByUUID(room_uuid);
        if(!room) throw { message: 'Room not found', code: 'INVALID_ROOM_ID', statusCode: 404 };
        const members = await getMembersByFiltering({
            room_uuid,
            nickname
        });
        if(members.length < 1) throw { message: 'Member not found', code: 'INVALID_MEMBER_ID', statusCode: 404 };
        const token = await attemptLogin(room, members[0], password);
        return {
            accessToken: token,
            data: members[0]
        }
    }catch(err){
        throw err;
    }
}