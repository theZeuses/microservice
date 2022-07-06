import { login as loginHelper } from '../helpers/authHelper';
import apiAuth from './api/AuthApi';

const authService = {
    login : async ({ room_uuid, nickname, password }: { room_uuid: string, nickname: string, password: string}) => {
        try {
            return apiAuth.login({ nickname, password, room_uuid }).then((data) => {
                if(data.status == 'success'){
                    loginHelper({
                        roomId: room_uuid,
                        memberId: data.data.data.uuid,
                        bearerToken: data.data.accessToken
                    });
                    return {
                        ...data
                    }
                }else{
                    return {
                        status: 'failed'
                    }
                }
            }).catch((error) => {
                if(error?.data){
                    throw { ...error.data, statusCode: error.status };
                }else{
                    throw {
                        status: 'failed',
                        internal: true,
                        errors: [ error ]
                    };
                }
            }); 
        } catch (error) {
            throw {
                status: 'failed',
                internal: true,
                errors: [ error ]
            };
        }
    },
}

export default authService;