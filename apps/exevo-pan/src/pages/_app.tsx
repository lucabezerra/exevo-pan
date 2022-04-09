import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorBoundary from 'components/ErrorBoundary'
import { ThemeProvider } from 'contexts/useTheme'
import { TranslationsProvider } from 'contexts/useTranslation'
import { gtag } from 'utils'
import { GlobalStyles } from 'styles'
import { AppProps } from 'next/app'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { translations } = pageProps
  const router = useRouter()

  const handleRouteChange = (url: URL) => gtag.pageView(url)

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    if (typeof router.query.slug === 'string') {
      gtag.blogPostView(router.query.slug)
    }
  }, [router.query.slug])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <meta property="og:site_name" content="Exevo Pan" />
        <meta name="twitter:card" content="summary" />
        <meta
          key="preview-1"
          property="og:image"
          content="https://i.imgur.com/obDJJOI.png"
        />
        <meta
          key="preview-2"
          property="twitter:image"
          content="https://i.imgur.com/obDJJOI.png"
        />
      </Head>
      <GlobalStyles />
      <TranslationsProvider value={{ translations }}>
        <ErrorBoundary>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </ErrorBoundary>
      </TranslationsProvider>
    </>
  )
}
export default MyApp
