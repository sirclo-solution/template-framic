/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useI18n, useCart } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import CartDetailsComponent from 'components/CartDetails'
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import ProductsComponent from 'components/ProductsComponent'
/* styles */
import styles from 'public/scss/pages/Cart.module.scss'
import OrderSummaryBox from 'components/OrderSummaryBox'

interface CartPropType {
  lngDict: any
  brand: string
  lng: string
};

const Cart: FC<CartPropType> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const { data: dataCart } = useCart()
  const [SKUs, setSKUs] = useState<Array<string>>(null)
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("cart.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: `${i18n.t("cart.title")}` }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />

      <div className={styles.cart_container}>
        <h3 className={styles.cart_title}>{i18n.t("cart.title")}</h3>

        <div className={styles.cart_detailsContainer}>
          <CartDetailsComponent
            lng={lng}
            getSKU={setSKUs}
          />
        </div>

        {dataCart?.totalItem > 0 &&
          <div className={styles.cart_orderSummaryContainer}>
            <OrderSummaryBox page="cart" lng={lng} />
          </div>
        }
      </div>

      <ProductsComponent
        type="recomendation"
        i18n={i18n}
        SKUs={SKUs}
        lng={lng}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const brand = await useBrand(req);
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id';
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`);

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ''
    }
  }
}

export default Cart