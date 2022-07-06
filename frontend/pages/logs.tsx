import Head from 'next/head'
import Log from '../components/Log'
import { NextPageWithLayout } from './_app'


const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Logs</title>
      </Head>
      <Log />
    </>
  )
}

export default Page