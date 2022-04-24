
import type { AppProps } from 'next/app'
import App from "next/app"
import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import { AppContext } from '../context'
import appStore from '../stores/appStore'
import I18nEntry from '../model/I18nEntry'
// import JSBridge from '../utils/JSBridge'
import Head from 'next/head'
// import Script from 'next/script'
import { useRouter } from 'next/router'
// import Router from 'next/router'
import '../assets/css/globals.scss'
import '../es/index-all.min.css'
import '../assets/css/index.scss'


const DynamicComponentWithNoSSR = dynamic(
  () => import('../model/noSsr'),
  { ssr: false }
)



const MyApp = ({ Component, pageProps }: AppProps) => {
  const { publicRuntimeConfig } = getConfig()

  const route:any=useRouter()
  let lang='zh-CN'
  if(route.query && route.query.lang){
    lang=route.query.lang
  }

  pageProps = {
    ...pageProps,
    ...publicRuntimeConfig.ROOT,
    i18n: I18nEntry[lang]
  }


  return <AppContext.Provider value={appStore}>
    <Head>
      <meta name="viewport" content="width=750, user-scalable=no" />
    </Head>
    <DynamicComponentWithNoSSR />
    <Component {...pageProps} />
  </AppContext.Provider>
}
MyApp.getInitialProps = async (ctx: any) => {
  // console.log('getInitialProps----');
  //


  return {
    pageProps: {
     
    }
  }
}
export default MyApp



