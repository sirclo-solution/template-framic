/* library package */
import { FC, ReactElement } from 'react'
import {
  useI18n,
  getProductDetail,
  useAuthToken
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
import { NextPageWithLayout } from 'lib/commonTypes'
/* component */
import Layout from 'components/Layout/Layout'
import { GRAPHQL_URI } from 'components/Constants'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import ProductDetailComponent from 'components/ProductDetailComponent'
import ProductsComponent from 'components/ProductsComponent'

interface ProductProps {
  lng?: string
  slug?: string
  data?: any
  urlSite?: string
}

const Product: FC<ProductProps> & NextPageWithLayout = ({
  lng,
  slug,
  data,
  urlSite
}) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, data?.published && data?.details[0]?.name || ""]

  return (
    <>
      <Breadcrumb
        links={linksBreadcrumb}
        lng={lng}
      />

      <ProductDetailComponent
        slug={slug}
        lng={lng}
        data={data}
        urlSite={urlSite}
      />

      <ProductsComponent
        type="recomendation"
        slug={slug}
        i18n={i18n}
        lng={lng}
      />
    </>
  )
}

export async function getServerSideProps({ req, res, params }) {
  const { slug } = params
  const [data, brand] = await Promise.all([
    getProductDetail(GRAPHQL_URI(req), slug),
    useBrand(req),
    useAuthToken({ req, res, env: process.env })
  ])
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)
  const urlSite = `https://${req.headers.host}/${params.lng}/product/${slug}`

  return {
    props: {
      lng: defaultLanguage,
      slug,
      lngDict,
      data: data || null,
      brand: brand || "",
      urlSite: urlSite,
    },
  }
}

Product.getLayout = (page: ReactElement) => {
  const layoutProps = {
    lng: page.props?.lng,
    lngDict: page.props?.lngDict,
    brand: page.props?.brand,
    setSEO: {
      title: page.props?.data?.details[0]?.name || "",
      description: page.props?.data?.SEOs[0]?.description || "",
      keywords: page.props?.data?.SEOs[0]?.keywords?.join(", ") || "",
      image: page.props?.data?.imageURLs[0] || ""
    }
  }
  return <Layout {...layoutProps}>{page}</Layout>
}

export default Product
