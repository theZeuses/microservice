import { Socket } from 'socket.io-client';
import { memberId } from '../../helpers/authHelper';
import { useEffect, useRef } from 'react';
import { useSockets } from '../../context/socket.context';
import EventType from '../../enums/EventType';
import { useRouter } from 'next/router';
import messageService from '../../services/MessageService';
import { useState } from 'react';

type MessageListProps = {
    messages: {
        image?: string,
        uuid: string,
        text: string,
        member_uuid: string,
        chat_room_uuid: string,
        id: string
    }[],
    socket: Socket | undefined
}
function MessageList() {
    const { socket, messages, setMessages } = useSockets();
    const router = useRouter();
    const messageEndRef = useRef<any>(null);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const listener = (data: any) => { 
            setMessages((msgs: any) => [...msgs, data]);
        }
        socket.on(EventType.ROOM.MESSAGE.RECEIVED, listener);
        return () => {
            socket.off(EventType.ROOM.MESSAGE.RECEIVED, listener);
        }
    }, []);

    useEffect(() => {
        if(router.query.member && router.query.room){
            messageService.getMessages({
                member: router.query.member,
                room: router.query.room
            }).then((res) => {
                return res.data
            }).then((loadedMsgs: any) => {
                setMessages((msgs: any) => [...msgs, ...loadedMsgs]);
            }).catch(err => {
                setErrorMessage('Service Unavailable');
            });
        }
        return () => {
            setMessages((msgs: any) => messages);
        }
    }, [router]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  return (
    <div className="relative w-full p-6 overflow-y-auto h-[30rem]">
        <ul className="space-y-2" id="message-list">
        <>{
            errorMessage ? 
            <div role="alert">
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 my-2 text-red-700">
                    <p>{errorMessage}</p>
                </div>
            </div> 
            : messages?.map((message: any) => {
                return (<li className={`${router.query.member == message.member_uuid ? `flex justify-end` : `flex justify-start`}`} key={message.uuid}>
                    <div className={`relative max-w-xl px-4 py-2 ${router.query.member == message.member_uuid ? `text-green-700` : `text-red-700`} rounded shadow`} >
                        <span className={`block ${router.query.member == message.member_uuid ? `text-green-700` : `text-red-700`}-700`}>{message.text}</span>
                    </div>
                </li>)
            })
        }</>
        </ul>
        <div ref={messageEndRef} />
    </div>
  )
}

export default MessageList