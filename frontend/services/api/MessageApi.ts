import { ApiCore } from "./utilities/core";

const url = 'messages';

class ApiMessage extends ApiCore {    
    // Add custom api call logic here
}

// plural and single may be used for message logic if needed in the ApiCore class.
const apiMessage = new ApiMessage({
    getBatch: true,
    getCount: false,
    getById: false,
    post: false,
    put: false,
    patch: false,
    remove: false,
    url: url
});

export default apiMessage;