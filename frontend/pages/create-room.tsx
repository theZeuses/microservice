import Head from 'next/head'
import CreateRoomForm from '../components/CreateRoomForm'
import { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Chatroom</title>
      </Head>
      <CreateRoomForm />
    </>
  )
}

export default Page