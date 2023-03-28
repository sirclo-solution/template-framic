/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { 
  useI18n, 
  useCart, 
  useAuthToken 
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import CartDetailsComponent from 'components/CartDetails'
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import ProductsComponent from 'components/ProductsComponent'
import OrderSummaryBox from 'components/OrderSummaryBox'
import ChooseVariant from 'components/ChooseVariant'
import Popup from 'components/Popup/Popup'
/* styles */
import styles from 'public/scss/pages/Cart.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesProductDetail from 'public/scss/components/ProductDetail.module.scss'

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
  const [slug, setSlug] = useState<string>("");
  const [isOpenChooseVariantDialog, setIsOpenChooseVariantDialog] =
  useState<boolean>(false);
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [hasQuickViewFeature, setHasQuickViewFeature] = useState<boolean>(false);
  const [showPopupSuccessAddCart, setShowPopupSuccessAddCart] = useState<boolean>(false)
  const [showPopupSuccessNotify, setShowPopupSuccessNotify] = useState<boolean>(false)
  const [showPopupErrorAddCart, setShowPopupErrorAddCart] = useState<boolean>(false)
  const [showPopupErrorNotify, setShowPopupErrorNotify] = useState<boolean>(false)

  // function
  const tooglePopupSuccessAddCart = () => {
    Router.push("/[lng]/cart", `/${lng}/cart`)
    setShowPopupSuccessAddCart(!showPopupSuccessAddCart)
  }
  const tooglePopupErrorAddCart = () => setShowPopupErrorAddCart(!showPopupErrorAddCart)
  const tooglePopupSuccessNotifyme = () => setShowPopupSuccessNotify(!showPopupSuccessNotify)
  const tooglePopupErrorNotifyme = () => setShowPopupErrorNotify(!showPopupErrorNotify)
  const toggleChooseVariant = () => setIsOpenChooseVariantDialog(!isOpenChooseVariantDialog);

  const handleMultipleVariant = (
    type: "add-to-cart" | "buy-now",
    productSlug: string,
    isQuickView: boolean
  ) => {
    setSlug(productSlug);
    setIsAddToCart(type === "add-to-cart");
    setHasQuickViewFeature(isQuickView);
    setIsOpenChooseVariantDialog(true);
  };

  const toggleFailedAddToCart = () => {
    setIsOpenChooseVariantDialog(false);
    tooglePopupErrorAddCart();
  };
  const toggleCompleteNotifyMe = () => {
    setIsOpenChooseVariantDialog(false);
    tooglePopupSuccessNotifyme()
  };
  const handleSuccessAddToCart = () => {
    setIsOpenChooseVariantDialog(false)
    tooglePopupSuccessAddCart()
  }

  return (
    <Layout
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: `${i18n.t("cart.title")}` }}
    >
      {isOpenChooseVariantDialog && slug && (
        <Popup
            setPopup={toggleChooseVariant}
            title={i18n.t("product.selectVariant")} 
            isOpen={isOpenChooseVariantDialog}
            withClose
        >
          <ChooseVariant
            lng={lng}
            slug={slug}
            toggleFailedAddToCart={toggleFailedAddToCart}
            toggleCompleteAddToCart={handleSuccessAddToCart}
            toggleCompleteNotifyMe={toggleCompleteNotifyMe}
            isOpenChooseVariantDialog={isOpenChooseVariantDialog}
            isAddToCart={isAddToCart}
            hasQuickViewFeature={hasQuickViewFeature}
          />
        </Popup>
      )}

      {/* PopUp Error Add To Cart  */}
      <Popup
        setPopup={tooglePopupErrorAddCart}
        isOpen={showPopupErrorAddCart}
        title={i18n.t("cart.errorSKUTitle")}
        withClose={false}
        maxWidth="308px"
      >
        <div className={stylesProductDetail.productdetail_popUpNotifymeContainer}>
          <p className={stylesProductDetail.productdetail_popUpNotifymeDesc}>{i18n.t("cart.errorSKUDesc")}</p>
          <button
            className={stylesButton.btn_primaryLongSmall}
            onClick={tooglePopupErrorAddCart}>
            {i18n.t("paymentStatus.tryAgain")}
          </button>
        </div>
      </Popup>

      {/* PopUp Success Notifyme */}
      <Popup
        setPopup={tooglePopupSuccessNotifyme}
        isOpen={showPopupSuccessNotify}
        title={i18n.t("product.notifyTitleSuccess")}
        withClose={false}
        maxWidth="308px"
      >
        <div className={stylesProductDetail.productdetail_popUpNotifymeContainer}>
          <p className={stylesProductDetail.productdetail_popUpNotifymeDesc}>{i18n.t("product.notifySuccess")}</p>
          <button
            className={stylesButton.btn_primaryLongSmall}
            onClick={tooglePopupSuccessNotifyme}>
            {i18n.t("global.continueShopping")}
          </button>
        </div>
      </Popup>

      {/* PopUp Error Notifyme */}
      <Popup
        setPopup={tooglePopupErrorNotifyme}
        isOpen={showPopupErrorNotify}
        title={i18n.t("product.notifyTitleError")}
        withClose={false}
        maxWidth="308px"
      >
        <div className={stylesProductDetail.productdetail_popUpNotifymeContainer}>
          <p className={stylesProductDetail.productdetail_popUpNotifymeDesc}>{i18n.t("product.notifyError")}</p>
          <button
            className={stylesButton.btn_primaryLongSmall}
            onClick={tooglePopupSuccessNotifyme}>
            {i18n.t("paymentStatus.tryAgain")}
          </button>
        </div>
      </Popup>
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
        handleMultipleVariant={handleMultipleVariant}
        tooglePopupErrorAddCart={tooglePopupErrorAddCart}
        tooglePopupErrorNotifyme={tooglePopupErrorNotifyme}
        handleSuccessAddToCart={handleSuccessAddToCart}
        tooglePopupSuccessNotifyme={tooglePopupSuccessNotifyme}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const [brand] = await Promise.all([
    useBrand(req),
    useAuthToken({ req, res, env: process.env })
  ])
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