import Head from 'next/head'
import { Main } from 'templates'
import { Header, HighscoresGrid } from 'modules/Statistics'
import { HistoryStatisticsClient } from 'services'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { buildUrl } from 'utils'
import { routes, jsonld } from 'Constants'
import { common, statistics } from 'locales'

const pageUrl = buildUrl(routes.HIGHSCORES)

export default function Highscores({
  statisticsData,
}: {
  statisticsData: StatisticsData
}) {
  const { translations } = useTranslations()

  return (
    <>
      <Head>
        <title>{translations.statistics.Meta.Highscores.title}</title>
        <meta
          name="title"
          content={translations.statistics.Meta.Highscores.title}
        />
        <meta
          property="og:title"
          content={translations.statistics.Meta.Highscores.title}
        />
        <meta
          property="twitter:title"
          content={translations.statistics.Meta.Highscores.title}
        />

        <meta
          name="description"
          content={translations.statistics.Meta.Highscores.description}
        />
        <meta
          property="twitter:description"
          content={translations.statistics.Meta.Highscores.description}
        />
        <meta
          property="og:description"
          content={translations.statistics.Meta.Highscores.description}
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.HIGHSCORES, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.HIGHSCORES, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.HIGHSCORES, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <main>
          <Header />
          <HighscoresGrid statisticsData={statisticsData} />
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const statisticsData = await HistoryStatisticsClient.fetchStatisticsData()

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
        statistics: statistics[locale as RegisteredLocale],
      },
      statisticsData,
    },
    revalidate: 6000,
  }
}
