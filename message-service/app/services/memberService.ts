import { hashPassword } from '@app/helpers/authHelper';
import Member, { IMember } from '@app/models/Member';
import { customAlphabet } from 'nanoid';

/**
 * Make a nanoid generator using string pool and size
 * @date 2022-06-25
 * @returns {string} Random string generator
 */
const nanoid = customAlphabet('1234567890', 10);

/**
 * Generate UUID for Member
 * @date 2022-06-25
 * @returns {string} UUID
 */
export function generateIdentifier(): string {
  //implement logic

  return nanoid();
}

/**
 * Get a Member by UUID. If not found then a error is thrown
 * @date 2022-06-25
 * @param {string} uuid:string
 * @returns {Promise<IMember>} Promise<IMember>
 */
export async function getMemberByUUID(uuid: string){
  try{
    const member = await Member.findOne({
      uuid
    }).exec();
    if(!member) throw({ message: 'Data not found', statusCode: 401 });
    return member;
  }catch(err){
    throw err;
  }
}

/**
 * Get a Member by NickName. If not found then a error is thrown
 * @date 2022-06-25
 * @param {string} nickname:string
 * @returns {Promise<IMember>} Promise<IMember>
 */
export async function getMemberByNickName(nickname: string){
  try{
    const member = await Member.findOne({
      nickname
    }).exec();
    if(!member) throw({ message: 'Data not found', statusCode: 401 });
    return member;
  }catch(err){
    throw err;
  }
}

/**
 * Get a Member by filtering one or more column. If not found then a error is thrown
 * @date 2022-06-25
 * @param {object} filter:object
 * @returns {Promise<IMember[]>} Promise<IMember[]>
 */
export async function getMembersByFiltering(filter: object){
  try{
    const members = await Member.find(filter).exec();
    return members;
  }catch(err){
    throw err;
  }
}

/**
 * Insert a Member. Incase validation failed then error is thrown
 * @date 2022-06-25
 * @param {IMember} data:IMember
 * @returns {Promise<IMember>} Promise<IMember>
 */
export async function insertMember(data: IMember){
  try{
    const member = new Member(data);
    member.uuid = generateIdentifier();
    const error = member.validateSync();
    if(error) throw error;
    const members = await getMembersByFiltering({
      room_uuid: member.room_uuid,
      nickname: member.nickname
    });
    if(members.length > 0) throw { message: 'Nickname already taken', code: 'DUPLICATE_NICKNAME', statusCode: 400 };
    member.password = hashPassword(member.password);
    return await member.save();
  }catch(err){
    throw err;
  }
}