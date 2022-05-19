/* library package */
import { FC } from 'react'
import {
  useI18n,
  getProductDetail
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import { GRAPHQL_URI } from 'components/Constants'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import ProductDetailComponent from 'components/ProductDetailComponent'
import ProductsComponent from 'components/ProductsComponent'

interface ProductProps {
  lng?: string
  lngDict?: any
  slug?: string
  data?: any
  brand?: string
  urlSite?: string
}

const Product: FC<ProductProps> = ({
  lng,
  lngDict,
  slug,
  data,
  brand,
  urlSite

}) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, data?.published && data?.details[0]?.name || ""]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{
        title: data?.details[0]?.name || "",
        description: data?.SEOs[0]?.description || "",
        keywords: data?.SEOs[0]?.keywords?.join(", ") || "",
        image: data?.imageURLs || "",
      }}
    >
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
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  const { slug } = params
  const data = await getProductDetail(GRAPHQL_URI(req), slug)
  const brand = await useBrand(req)
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

export default Product
