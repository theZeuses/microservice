import { ApiCore } from "./utilities/core";
import apiProvider from './utilities/provider';
import { AxiosRequestConfig } from 'axios';

const url = 'auth';

class ApiAuth extends ApiCore {    
    // Add custom api call logic here
    login(credentials: any, requestConfig?: AxiosRequestConfig): Promise<any>{
        return apiProvider.post(`${url}/login`, credentials, requestConfig);
    }
}

// plural and single may be used for message logic if needed in the ApiCore class.
const apiAuth = new ApiAuth({
    getBatch: false,
    getCount: false,
    getById: false,
    post: false,
    put: false,
    patch: false,
    remove: false,
    url: url
});

export default apiAuth;