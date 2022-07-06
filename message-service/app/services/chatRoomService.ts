import ChatRoom, { IChatRoom } from '@app/models/ChatRoom';
import { customAlphabet } from 'nanoid';

/**
 * Make a nanoid generator using string pool and size
 * @date 2022-06-25
 * @returns {string} Random string generator
 */
const nanoid = customAlphabet('1234567890', 10);

/**
 * Generate UUID for ChatRoom
 * @date 2022-06-25
 * @returns {string} UUID
 */
export function generateIdentifier(): string {
  //implement logic

  return nanoid();
}

/**
 * Get a ChatRoom by UUID. If not found then a error is thrown
 * @date 2022-06-25
 * @param {string} uuid:string
 * @returns {Promise<IChatRoom>} Promise<IChatRoom>
 */
export async function getChatRoomByUUID(uuid: string){
  try{
    const chatRoom = await ChatRoom.findOne({
      uuid
    }).exec();
    if(!chatRoom) throw({ message: 'Data not found', statusCode: 401 });
    return chatRoom;
  }catch(err){
    throw err;
  }
}

/**
 * Insert a ChatRoom. Incase validation failed then error is thrown
 * @date 2022-06-25
 * @param {IChatRoom} data:IChatRoom
 * @returns {Promise<IChatRoom>} Promise<IChatRoom>
 */
export async function insertChatRoom(data: IChatRoom){
  try{
    const chatRoom = new ChatRoom(data);
    chatRoom.uuid = generateIdentifier();
    return await chatRoom.save();
  }catch(err){
    throw err;
  }
}