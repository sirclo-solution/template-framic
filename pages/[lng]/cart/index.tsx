/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { Check } from 'react-feather'
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
import stylesPopup from 'public/scss/components/Popup.module.scss'

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

  // function
  const tooglePopupSuccessAddCart = () => setShowPopupSuccessAddCart(showPopupSuccessAddCart => !showPopupSuccessAddCart)
  const tooglePopupErrorAddCart = () => setShowPopupErrorAddCart(showPopupErrorAddCart => !showPopupErrorAddCart)
  const tooglePopupSuccessNotifyme = () => setShowPopupSuccessNotify(showPopupSuccessNotify => !showPopupSuccessNotify)
  const toggleChooseVariant = () => setIsOpenChooseVariantDialog(isOpenChooseVariantDialog => !isOpenChooseVariantDialog);

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

      {/* PopUp Succes Add To Cart */}
      <Popup
        setPopup={tooglePopupSuccessAddCart}
        isOpen={showPopupSuccessAddCart}
        withClose={false}
      >
        <div className={stylesPopup.popup_checkIconContainer}>
          <div className={stylesPopup.popup_checkIconWrapper}>
            <Check color="white" size={40} />
          </div>
          <p>{i18n.t("product.successAddToCartGeneral")}</p>
        </div>
        <button
          className={`${stylesButton.btn_primaryLongSmall} mb-3`}
          onClick={() => {
            tooglePopupSuccessAddCart()
            Router.push("/[lng]/cart", `/${lng}/cart`)
          }}>
          {i18n.t("home.close")}
        </button>
      </Popup>

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