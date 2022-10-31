/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router, { useRouter } from 'next/router'
import { useI18n } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* component */
import Layout from 'components/Layout/Layout'
import ProductsComponent from 'components/ProductsComponent'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Products.module.scss'
import stylesWidget from 'public/scss/components/WidgetHomePage.module.scss'

import ProductFilterSort from 'components/ProductFilterSort'

const ProductHighlightPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const size = useWindowSize()
  const { query } = useRouter()
  const [openFilterSort, setOpenFilterSort] = useState<boolean>(false)
  const [filterProduct, setFilterProduct] = useState({})
  const [totalProduct, setTotalProduct] = useState<string>('0')

  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("product.all")]

  const handleFilter = (selectedFilter: any) => setFilterProduct(selectedFilter)
  const handeClear = () => Router.replace(`/${lng}/products`)
  const handleOpenSortFilter = () => setOpenFilterSort(!openFilterSort)

  const generateTotalProducts = (total: string = '0') => {
    const label = i18n.t('product.showingProduct')
    return label.replace('{TOTAL}', total)
  }

  const hasQuery = () => {
    const { lng, ...allquery } = query
    return JSON.stringify(allquery) === "{}" ? false : true
  }


  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: i18n.t("product.products") }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.products_container}>
        <div className={`${styles.products_listWrapper} ${styles.products_productHighlightListWrapper}`}>
          <div className={`${styles.products_list} ${styles.products_productHighlightlist}`}>
            {/* Container Products List */}
            <ProductsComponent
              i18n={i18n}
              lng={lng}
              getTotalProduct={setTotalProduct}
              filterProduct={filterProduct}
              isProductHighlightBySlug
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
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const brand = await useBrand(req)
  const { slug } = params
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
