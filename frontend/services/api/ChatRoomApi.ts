import { ApiCore } from "./utilities/core";

const url = 'rooms';

class ApiChatRoom extends ApiCore {    
    // Add custom api call logic here
}

// plural and single may be used for message logic if needed in the ApiCore class.
const apiChatRoom = new ApiChatRoom({
    getBatch: false,
    getCount: false,
    getById: false,
    post: true,
    put: false,
    patch: false,
    remove: false,
    url: url
});

export default apiChatRoom;