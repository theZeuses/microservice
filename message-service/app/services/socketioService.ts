import EventType from "@app/enums/EventType";
import { SocketIO } from "@app/helpers/socketioHelper";
import { insertMessage } from '@services/messageService';
import { Socket } from 'socket.io';
import { publishMessagingLog } from "./rabbitmqService";

export function bootstrapSocketIoService(socketio: SocketIO){
    const io = socketio;

    const roomNamespace = io.of("/socket/rooms");

    roomNamespace.on(EventType.CONNECTION, (socket: typeof Socket) => {
        socket.on(EventType.ROOM.USER.CONNECTED, function(data: any){
            socket.join(data.room_uuid); console.log('joined', data)
        });

        socket.on(EventType.ROOM.MESSAGE.SENT, async function(data: any){ 
            const toInsert = {
                text: data.text,
                member_uuid: data.sender,
                room_uuid: data.room,
                owner: data.sender
            };
            try{
                const inserted = await insertMessage(toInsert);
                roomNamespace.in(data.room).emit(EventType.ROOM.MESSAGE.RECEIVED, inserted);
                await publishMessagingLog({
                    room_uuid: data.room,
                    member_uuid: data.sender,
                    timestamp: new Date().toISOString()
                })
            }catch(e){
                console.log(e);
            }
        });
    })
};