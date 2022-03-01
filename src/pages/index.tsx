import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import React from 'react'
import TemporaryShelf from 'src/components/sections/TemporaryShelf'
import Countdown from 'src/components/sections/Countdown'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  const {
    data: { site, allStoreProduct },
    location: { pathname, host },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `https://${host}${pathname}`
  const products = allStoreProduct?.nodes

  const endTime = new Date().getTime() + 60000 * 1; // 2minutes
  const [timeLeft, setEndTime] = Countdown(endTime);

  const minutes = Math.floor(timeLeft / 60000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;

  return (
    <>
      <section className="page__section page__section-shelf / grid-section">
        <div className="page__section-content">
          <h1 className="title-section / grid-content">{`Countdown: ${minutes}:${seconds}`}</h1>
          {
            seconds > 0 &&
            <TemporaryShelf products={products?.slice(0, 5)}/>
          }
        </div>
      </section>
    </>
  )
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
      }
    }

    allStoreProduct(limit: 14) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

Page.displayName = 'Page'

export default mark(Page)
