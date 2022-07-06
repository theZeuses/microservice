import apiMessages from './api/MessageApi';
import messageMapper from '../mappers/MessageMapper';
import { AxiosRequestConfig } from 'axios';

const messageService = {
    getMessages: async (query: any) => {
        const requestConfig: AxiosRequestConfig = {
            params: query
        }
        try {
            return apiMessages.getBatch(requestConfig).then((data) => {
                return {
                    status: 'success',
                    data: messageMapper.mapMessages(data)
                };

            }).catch((error) => {
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
    },
    insertMessage: async (body: any) => {
        try {
            return apiMessages.post(body).then((data: any) => {
                return {
                    status: 'success',
                    data: messageMapper.mapMessage(data.data)
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

export default messageService;