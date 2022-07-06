import MessagingLog from "../models/MessagingLog";

const messagingLogMapper = {
    mapMessagingLogs: (messagingLogs: any) => {
        let list: MessagingLog[] = []
        messagingLogs.forEach((messagingLog: any) => {
            list.push(new MessagingLog(messagingLog))
        });
        return list;
    },
    mapMessagingLog: (messagingLog: any) => {
        if (messagingLog) {
            return new MessagingLog(messagingLog);
        }

        return null;
    }
}

export default messagingLogMapper;