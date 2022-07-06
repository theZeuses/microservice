import apiMembers from './api/MemberApi';
import memberMapper from '../mappers/MemberMapper';

const memberService = {
    insertMember: async (body: any) => {
        try {
            return apiMembers.post(body).then((data: any) => {
                return {
                    status: 'success',
                    data: memberMapper.mapMember(data.data)
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

export default memberService;