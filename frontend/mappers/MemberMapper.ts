import Member from "../models/Member";

const memberMapper = {
    mapMembers: (members: any) => {
        let list: Member[] = []
        members.forEach((member: any) => {
            list.push(new Member(member))
        });
        return list;
    },
    mapMember: (member: any) => {
        if (member) {
            return new Member(member);
        }

        return null;
    }
}

export default memberMapper;