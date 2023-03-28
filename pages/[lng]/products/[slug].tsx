/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import {
  useI18n,
  useAuthToken,
  TemplateFeatures,
  FeaturesType
} from '@sirclo/nexus'
import { Check } from 'react-feather'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import ProductsComponent from 'components/ProductsComponent'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Popup from 'components/Popup/Popup';
import ChooseVariant from 'components/ChooseVariant';
import Error404Page from 'pages/404'
/* styles */
import styles from 'public/scss/pages/Products.module.scss'
import stylesProductHighlight from 'public/scss/components/Product.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesPopup from 'public/scss/components/Popup.module.scss'
import stylesProductDetail from 'public/scss/components/ProductDetail.module.scss'

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
  const tooglePopupSuccessAddCart = () => setShowPopupSuccessAddCart(!showPopupSuccessAddCart)
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
                handleMultipleVariant={handleMultipleVariant}
                tooglePopupErrorAddCart={tooglePopupErrorAddCart}
                tooglePopupErrorNotifyme={tooglePopupErrorNotifyme}
                handleSuccessAddToCart={handleSuccessAddToCart}
                tooglePopupSuccessNotifyme={tooglePopupSuccessNotifyme}
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
