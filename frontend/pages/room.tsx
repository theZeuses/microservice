import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import ChatRoomLayout from '../layouts/ChatRoomLayout'
import { NextPageWithLayout } from './_app'
import ChatRoom from '../components/ChatRoom/index';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'
import { roomId, isLoggedIn, memberId } from '../helpers/authHelper';
import { useRouter } from 'next/router';
import SocketsProvider, { useSockets } from '../context/socket.context';
import EventType from '../enums/EventType';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { socket } = useSockets();
  socket.emit(EventType.ROOM.USER.CONNECTED, {room_uuid: router.query.room, member_uuid: router.query.member});
  
  useEffect(() => {
    if(isLoggedIn()){
      if(!router.query.room) router.push(`http://localhost:3000/room?room=${roomId()}&member=${memberId()}`)
    }else{
      router.push(`http://localhost:3000`)
    }
  }, [])
  
  return (
    <SocketsProvider>
        <Head>
            <title>Room</title>
        </Head>
        <ChatRoom />
    </SocketsProvider>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <ChatRoomLayout>
      {page}
    </ChatRoomLayout>
  )
}

export default Page
