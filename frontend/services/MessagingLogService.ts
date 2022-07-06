import apiMessagingLogs from './api/MessagingLogApi';
import messagingLogMapper from '../mappers/MessagingLogMapper';
import { AxiosRequestConfig } from 'axios';

const messagingLogService = {
    getMessagingLogs: async (query?: any) => {
        const requestConfig: AxiosRequestConfig = {
            params: query
        }
        try {
            return apiMessagingLogs.getBatch(requestConfig).then((data) => {
                return {
                    status: 'success',
                    data: messagingLogMapper.mapMessagingLogs(data)
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
    insertMessagingLog: async (body: any) => {
        try {
            return apiMessagingLogs.post(body).then((data: any) => {
                return {
                    status: 'success',
                    data: messagingLogMapper.mapMessagingLog(data.data)
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

export default messagingLogService;