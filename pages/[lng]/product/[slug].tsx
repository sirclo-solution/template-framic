/* library package */
import { FC, ReactElement, useState } from 'react'
import Router from 'next/router'
import { Check } from 'react-feather'
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
import ChooseVariant from 'components/ChooseVariant'
import Popup from 'components/Popup/Popup'
/* styles */
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesProductDetail from 'public/scss/components/ProductDetail.module.scss'
import stylesPopup from 'public/scss/components/Popup.module.scss'

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
  const [isOpenChooseVariantDialog, setIsOpenChooseVariantDialog] =
  useState<boolean>(false);
  const [slugRecommendation, setSlugRecommendation] = useState<string>("");
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
    setSlugRecommendation(productSlug);
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
    <>
    {isOpenChooseVariantDialog && slug && (
        <Popup
            setPopup={toggleChooseVariant}
            title={i18n.t("product.selectVariant")} 
            isOpen={isOpenChooseVariantDialog}
            withClose
        >
          <ChooseVariant
            lng={lng}
            slug={slugRecommendation}
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
          {i18n.t("orderSummary.viewCart")}
        </button>
        <button
          className={`${stylesButton.btn_textLongSmall} ${stylesPopup.popup_btCcontinueShopping}`}
          onClick={tooglePopupSuccessAddCart}>
          {i18n.t("global.continueShopping")}
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
        tooglePopupErrorAddCart={tooglePopupErrorAddCart}
        handleSuccessAddToCart={handleSuccessAddToCart}
        tooglePopupSuccessNotifyme={tooglePopupSuccessNotifyme}
        handleMultipleVariant={handleMultipleVariant}
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
