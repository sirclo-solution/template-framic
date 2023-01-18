/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  useI18n,
  useAuthToken,
  TemplateFeatures,
  FeaturesType
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import ProductsComponent from 'components/ProductsComponent'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Error404Page from 'pages/404'
/* styles */
import styles from 'public/scss/pages/Products.module.scss'
import stylesProductHighlight from 'public/scss/components/Product.module.scss'

const ProductHighlightPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  slugSection
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [totalProductPerPage, setTotalProductPerPage] = useState<string>('0')

  const [titleSectionProductHighlight, setTitleSectionProductHighlight] =
    useState<string>("")

  const linksBreadcrumb = [i18n.t("header.home"), titleSectionProductHighlight]

  const generateTotalProductsPerPage = (total: string = '0') => {
    const label = i18n.t('product.showingProduct')
    return label.replace('{TOTAL}', total)
  }

  return (
    <TemplateFeatures
      id={FeaturesType.PRODUCT_HIGHLIGHT}
      defaultChildren={<Error404Page />}
    >
      <Layout
        lng={lng}
        lngDict={lngDict}
        brand={brand}
        setSEO={{ title: titleSectionProductHighlight }}
        layoutClassName={styles.products_productHighlightContainer}
      >
        <Breadcrumb links={linksBreadcrumb} lng={lng} />
        <div className={styles.products_container}>
          <div className={`${styles.products_listWrapper} ${styles.products_productHighlightListWrapper}`}>
            <div className={styles.products_listHeaderContainer}>
              <div className={styles.products_listAdjustContainer}>
                <h1 className={styles.products_listHeaderTitle}>
                  {titleSectionProductHighlight}
                </h1>
              </div>
              <label className={styles.products_listHeaderTotal}>
                {generateTotalProductsPerPage(totalProductPerPage)}
              </label>
            </div>
            <div className={`${stylesProductHighlight.productHighlight_productSectionContainer}`}>
              {/* Container Products List */}
              <ProductsComponent
                i18n={i18n}
                lng={lng}
                getTotalProductPerPage={setTotalProductPerPage}
                isProductHighlightBySlug
                productHighlightListSlug={slugSection}
                getTitleSectionProductHighlight={(value: string) => setTitleSectionProductHighlight(value)}
                type="list"
              />
            </div>
            <div className={styles.products_backTopContainer}>
              <a
                href="#top"
                className={styles.products_backTopLink}
                aria-label="Scroll to Top"
              />
            </div>
          </div>
        </div>
      </Layout>
    </TemplateFeatures>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const { slug } = params
  const [brand] = await Promise.all([
    useBrand(req),
    useAuthToken({ req, res, env: process.env })
  ])
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      slugSection: slug,
      brand: brand || ""
    }
  }
}

export default ProductHighlightPage
