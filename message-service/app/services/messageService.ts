import Message, { IMessage } from '@app/models/Message';
import { customAlphabet } from 'nanoid';
import { getChatRoomByUUID } from './chatRoomService';
import { getMemberByNickName, getMemberByUUID } from './memberService';

/**
 * Make a nanoid generator using string pool and size
 * @date 2022-06-25
 * @returns {string} Random string generator
 */
const nanoid = customAlphabet('1234567890', 10);

/**
 * Generate UUID for Message
 * @date 2022-06-25
 * @returns {string} UUID
 */
export function generateIdentifier(): string {
  //implement logic

  return nanoid();
}

/**
 * Get a Message by UUID. If not found then a error is thrown
 * @date 2022-06-25
 * @param {string} uuid:string
 * @returns {Promise<IMessage>} Promise<IMessage>
 */
export async function getMessageByUUID(uuid: string){
  try{
    const message = await Message.findOne({
      uuid
    }).exec();
    if(!message) throw({ message: 'Data not found', statusCode: 404 });
    return message;
  }catch(err){
    throw err;
  }
}

/**
 * Get array of Messages of a ChatRoom. If ChatRoom not found then a error is thrown.
 * @date 2022-06-25'
 * @param {string} room_uuid:string
 * @returns {Promise<IMessage[]>} Promise<IMessage[]>
 */
export async function getMessagesByChatRoomUUID(room_uuid: string){
    try{
        const room = await getChatRoomByUUID(room_uuid);
        if(!room) throw { message: 'Room not found', code: 'INVALID_ROOM_ID', statusCode: 404 };

        const messages = await Message.find({
            room_uuid
        }).exec();
        return messages;
    }catch(err){
        throw err;
    }
}

/**
 * Get array of Messages of a Member. If Member not found then a error is thrown.
 * @date 2022-06-25'
 * @param {string} member_uuid:string
 * @returns {Promise<IMessage[]>} Promise<IMessage[]>
 */
export async function getMessagesByMemberUUID(member_uuid: string){
    try{
        const member = await getMemberByUUID(member_uuid);
        if(!member) throw { message: 'Member not found', code: 'INVALID_MEMBER_ID', statusCode: 404 };

        const messages = await Message.find({
            member_uuid
        }).exec();
        return messages;
    }catch(err){
        throw err;
    }
}

/**
 * Get array of Messages of a Member. If Member not found then a error is thrown.
 * @date 2022-06-25'
 * @param {string} nickname:string
 * @returns {Promise<IMessage[]>} Promise<IMessage[]>
 */
export async function getMessagesByMemberNickName(nickname: string){
    try{
        const member = await getMemberByNickName(nickname);
        if(!member) throw { message: 'Member not found', code: 'INVALID_NICKNAME', statusCode: 404 };

        const messages = await Message.find({
            member_uuid: member.uuid
        }).exec();
        return messages;
    }catch(err){
        throw err;
    }
}

/**
 * Get a Message by filtering one or more column. If not found then a error is thrown
 * @date 2022-06-25
 * @param {object} filter:object
 * @returns {Promise<IMessage[]>} Promise<IMessage[]>
 */
export async function getMessagesByFiltering(filter: object){
    try{
      const members = await Message.find(filter).populate('owner').exec();
      return members;
    }catch(err){
      throw err;
    }
}

/**
 * Insert a Message. Incase validation failed then error is thrown
 * @date 2022-06-25
 * @param {IMessage} data:IMessage
 * @returns {Promise<IMessage>} Promise<IMessage>
 */
export async function insertMessage(data: IMessage){
  try{
    const member = await getMemberByUUID(data.member_uuid);
    if(!member) throw { message: 'Member not found', code: 'INVALID_MEMBER_ID', statusCode: 404 };
    const message = new Message(data);
    message.uuid = generateIdentifier();
    message.owner = member._id;
    return await (await message.save()).populate('owner');
  }catch(err){
    throw err;
  }
}