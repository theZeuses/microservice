import { ApiCore } from "./utilities/core";

const url = 'messaging-logs';

class ApiMessagingLog extends ApiCore {    
    // Add custom api call logic here
}

// plural and single may be used for message logic if needed in the ApiCore class.
const apiMessagingLog = new ApiMessagingLog({
    getBatch: true,
    getCount: false,
    getById: false,
    post: false,
    put: false,
    patch: false,
    remove: false,
    url: url
});

export default apiMessagingLog;