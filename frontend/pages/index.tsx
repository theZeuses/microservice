import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { isLoggedIn, memberId, roomId } from '../helpers/authHelper'
import { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  useEffect(() => {
    if(isLoggedIn()){
      if(!router.query.room) router.push(`http://localhost:3000/room?room=${roomId()}&member=${memberId()}`)
    }else{
      router.push(`http://localhost:3000`)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Chatroom</title>
      </Head>
      <LoginForm />
    </>
  )
}

export default Page
