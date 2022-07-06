import { ApiCore } from "./utilities/core";

const url = 'members';

class ApiMember extends ApiCore {    
    // Add custom api call logic here
}

// plural and single may be used for message logic if needed in the ApiCore class.
const apiMember = new ApiMember({
    getBatch: false,
    getCount: false,
    getById: false,
    post: true,
    put: false,
    patch: false,
    remove: false,
    url: url
});

export default apiMember;