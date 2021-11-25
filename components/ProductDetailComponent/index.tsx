/* library package */
import { FC, useState } from 'react'
import Router from 'next/router'
import {
  ProductDetail,
  Tabs,
  useI18n
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
import formatPrice from 'lib/formatPrice'
/* component */
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import SocialShare from 'components/SocialShare'
import Placeholder from 'components/Placeholder'
import Popup from 'components/Popup/Popup'
import ProductDetailReviews from './ProductDetailReviews'
/* styles */
import styles from 'public/scss/components/ProductDetail.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

type ProductDetailComponentType = {
  data: any
  lng: string,
  slug: string | string[]
  urlSite: string
}

interface IDataAddToCart {
  imageURL: string
  title: string
  discount: { value: number }
  price: { value: number }
  salePrice: { value: number }
}

const classesProductDetail = {
  productDetailParentDivClassName: styles.productdetail_wrapper,
  rowClassName: styles.productdetail_container,
  imageRowClassName: styles.productdetail_imageRow,
  propertyRowClassName: styles.productdetail_propertyRow,
  mainImageClassName: styles.productdetail_mainImage,
  thumbnailImageClassName: styles.productdetail_thumbnailImage,
  arrowClassName: styles.productdetail_arrow,
  detailTitleStarClassName: styles.productdetail_detailTitleStar,
  detailTitleStarNumberClassName: styles.productdetail_detailTitleStarNumber,
  detailTitleClassName: styles.productdetail_detailTitle,
  salePriceClassName: styles.productdetail_salePrice,
  priceClassName: styles.productdetail_priceSale,
  variantOptionsContainerClassName: styles.productdetail_variantOptionsContainer,
  propertyInnerContainerClassName: styles.productdetail_propertyInnerContainer,
  propertyFooterContainerClassname: styles.productdetail_propertyFooterContainer,
  variantLabelClassName: styles.productdetail_variantLabel,
  variantOptionsClassName: styles.productdetail_variantOption,
  descriptionClassName: styles.productdetail_description,
  additionalInfoClassName: "d-none",
  qtyBoxClassName: styles.productdetail_qtyBox,
  addToCartBtnClassName: styles.productdetail_addToCartBtn,
  buyNowBtnClassName: styles.productdetail_buyNowBtn,
  dotClassName: styles.productdetail_dot,

  // OpenOrder
  openOrderClassName: styles.productdetail_openOrder,
  openOrderTitleClassName: styles.productdetail_openOrderTitle,
  countDownContainerClassName: styles.productdetail_countDownContainer,
  countDownItemClassName: styles.productdetail_countDownItem,
  countDownItemTextClassName: styles.productdetail_countDownItemText,
  openOrderContainerClassName: styles.productdetail_openOrderContainer,
  openOrderDateClassName: styles.productdetail_openOrderDate,
  openOrderTimeClassName: styles.productdetail_openOrderTime,
  openOrderTimeoutClassName: styles.productdetail_openOrderTimeout,
  openOrderTimeoutDescClassName: styles.productdetail_openOrderTimeoutDesc,
  openOrderTimeoutBtnClassName: stylesButton.btn_secondaryLong,
  notifyMeLabelWrapperClassName: styles.productdetail_notifyMeLabelWrapper,
  notifyMeInputClassName: stylesForm.form_inputLong,
  notifyMeSubmitClassName: `${stylesButton.btn_primaryLong} ${styles.productdetail_notifyMeSubmit}`,
  // Estimate Shipping
  estimateShippingWrapperClassName: styles.productdetail_estimateShippingWrapper,
  estimateShippingTitleClassName: styles.productdetail_estimateShippingTitle,
  estimateShippingDetailClassName: styles.productdetail_estimateShippingDetail,
  estimateShippingLogoImgClassName: styles.productdetail_estimateShippingLogoImg,
  estimateShippingCostClassName: styles.productdetail_estimateShippingCost,
  estimateShippingShowCourierClassName: styles.productdetail_estimateShippingShowCourier,
  estimateShippingPopupContainerClassName: styles.productdetail_estimateShippingPopupContainer,
  estimateShippingPopupContentClassName: styles.productdetail_estimateShippingPopupContent,
  estimateShippingPopupProviderImgClassName: styles.productdetail_estimateShippingPopupProviderImg,
  estimateShippingPopupHeaderClassName: styles.productdetail_estimateShippingPopupHeader,
  estimateShippingPopupTitleClassName: styles.productdetail_estimateShippingPopupTitle,
  estimateShippingPopupButtonCloseClassName: styles.productdetail_estimateShippingPopupButton,
  estimateShippingPopupBodyClassName: styles.productdetail_estimateShippingPopupBody,
  estimateShippingPopupLineInfoClassName: styles.productdetail_estimateShippingPopupLineInfo,
  estimateShippingPopupLabelClassName: styles.productdetail_estimateShippingPopupLabel,
  estimateShippingPopupValueClassName: styles.productdetail_estimateShippingPopupValue,
  estimateShippingPopupLineProviderClassName: styles.productdetail_estimateShippingPopupLineProvider,
  estimateShippingPopupProviderValueClassName: styles.productdetail_estimateShippingPopupProviderValue,
  estimateShippingPopupProviderLabelClassName: styles.productdetail_estimateShippingPopupProviderLabel,
  estimateShippingPopupProviderClassName: styles.productdetail_estimateShippingPopupProvider,
}

const classesTabs = {
  tabContainerClassName: styles.productdetail_tabContainer,
  tabNavGroupClassName: styles.productdetail_tabNavGroup,
  tabNavClassName: styles.productdetail_tabNav,
  tabInnerClassName: styles.productdetail_tabInner,
}

const classesPlaceholder = {
  placeholderImage: styles.productdetail_placeholderImage,
  placeholderList: styles.productdetail_placeholderList
}

const ProductDetailComponent: FC<ProductDetailComponentType> = ({
  data,
  slug,
  lng,
  urlSite
}) => {
  // variables
  const i18n: any = useI18n()
  const size = useWindowSize()
  const enableArrowDots = size.width && size.width < 768 ? true : false
  const IS_PROD = process.env.IS_PROD;

  // state
  const [productID, setProductID] = useState<string>("")
  const [showPopupSuccessAddCart, setShowPopupSuccessAddCart] = useState<boolean>(false)
  const [showPopupSuccessNotify, setShowPopupSuccessNotify] = useState<boolean>(false)
  const [showPopupErrorAddCart, setShowPopupErrorAddCart] = useState<boolean>(false)
  const [showPopupErrorNotify, setShowPopupErrorNotify] = useState<boolean>(false)
  const [additionalInfo, setadditionalInfo] = useState<string>("")
  const [dataAddToCart, setDataAddToCart] = useState<IDataAddToCart>({
    imageURL: null,
    title: null,
    discount: { value: null },
    price: { value: null },
    salePrice: { value: null }
  })

  // function
  const tooglePopupSuccessAddCart = () => setShowPopupSuccessAddCart(!showPopupSuccessAddCart)
  const tooglePopupErrorAddCart = () => setShowPopupErrorAddCart(!showPopupErrorAddCart)
  const tooglePopupSuccessNotifyme = () => setShowPopupSuccessNotify(!showPopupSuccessNotify)
  const tooglePopupErrorNotifyme = () => setShowPopupErrorNotify(!showPopupErrorNotify)
  const handleSuccessAddToCart = (dataProduct: any) => {
    const dataAs = dataProduct?.saveCart?.lineItems || dataProduct?.saveCartByMemberID?.lineItems
    const detailProduct = dataAs?.filter((data: any) => data?.slug === slug)
    setDataAddToCart(detailProduct[0])
    tooglePopupSuccessAddCart()
  }

  if (!data?.published || !data) return <EmptyComponent title={i18n.t("product.isEmpty")} />

  return (
    <>
      <ProductDetail
        slug={slug}
        withButtonBuyNow
        lazyLoadedImage={false}
        classes={classesProductDetail}
        isButton={{ 0: true, 1: true }}
        enableArrow={enableArrowDots}
        enableDots={enableArrowDots}
        enableTabs
        getProductID={setProductID}
        onCompleteMsg={tooglePopupSuccessNotifyme}
        onComplete={handleSuccessAddToCart}
        onErrorMsg={tooglePopupErrorNotifyme}
        onError={tooglePopupErrorAddCart}
        getAdditionalInfo={setadditionalInfo}
        prevIcon={<span className={styles.productdetail_arrowPrev} />}
        nextIcon={<span className={styles.productdetail_arrowNext} />}
        thumborSetting={{
          width: size.width < 768 ? 500 : 700,
          format: "webp",
          quality: 85
        }}
        customTabsComponent={
          <Tabs
            classes={classesTabs}
            tabs={[
              {
                tab: <p>{i18n.t("product.additionalInfo")}</p>,
                tabPanel: (
                  <div
                    className={styles.productdetail_tabAdditionalInfo}
                    dangerouslySetInnerHTML={{ __html: additionalInfo }}
                  />
                ),
              },
              {
                tab: <p>{i18n.t("product.review")}</p>,
                tabPanel: (
                  <ProductDetailReviews
                    slug={slug}
                    productID={productID}
                  />
                )
              },
            ]}
          />
        }
        customDetailComponent={
          <div className={styles.productdetail_share}>
            <label className={styles.productdetail_shareTitle}>{i18n.t("product.shareProduct")}</label>
            <SocialShare urlSite={urlSite} />
          </div>
        }
        loadingComponent={
          <div>
            <div className={styles.productdetail_container}>
              <div>
                <Placeholder classes={classesPlaceholder} withImage />
              </div>
              <div>
                <Placeholder classes={classesPlaceholder} withList listMany={5} />
              </div>
            </div>
          </div>
        }
        withEstimateShipping={IS_PROD === "false" ? true : false}
        openOrderIconDate={<span className={styles.productdetail_openOrderDateIcon} />}
        openOrderIconTime={<span className={styles.productdetail_openOrderTimeIcon} />}
      />

      {/* PopUp Succes Add To Cart */}
      <Popup
        setPopup={tooglePopupSuccessAddCart}
        isOpen={showPopupSuccessAddCart}
        title={i18n.t("product.successAddToCart")}
        withClose={false}
      >
        <div className={styles.productdetail_popUpCartProductContainer}>
          <img
            src={dataAddToCart?.imageURL}
            className={styles.productdetail_popUpCartProductImage}
          />
          <div>
            <h3 className={styles.productdetail_popUpCartProductTitle}>
              {dataAddToCart?.title}
            </h3>
            <div className={styles.productdetail_popUpCartProductPriceContainer}>
              {dataAddToCart?.discount?.value !== 0 &&
                <p className={styles.productdetail_popUpCartProductPrice}>
                  {formatPrice(dataAddToCart?.price?.value, "IDR")}
                </p>
              }
              <p className={styles.productdetail_popUpCartProductSalePrice}>
                {formatPrice(dataAddToCart?.salePrice?.value, "IDR")}
              </p>
            </div>
          </div>
        </div>
        <button
          className={stylesButton.btn_primaryLongSmall}
          onClick={() => {
            tooglePopupSuccessAddCart()
            Router.push("/[lng]/cart", `/${lng}/cart`)
          }}>
          {i18n.t("orderSummary.viewCart")}
        </button>
        <button
          className={stylesButton.btn_textLongSmall}
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
        <div className={styles.productdetail_popUpNotifymeContainer}>
          <p className={styles.productdetail_popUpNotifymeDesc}>{i18n.t("cart.errorSKUDesc")}</p>
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
        <div className={styles.productdetail_popUpNotifymeContainer}>
          <p className={styles.productdetail_popUpNotifymeDesc}>{i18n.t("product.notifySuccess")}</p>
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
        <div className={styles.productdetail_popUpNotifymeContainer}>
          <p className={styles.productdetail_popUpNotifymeDesc}>{i18n.t("product.notifyError")}</p>
          <button
            className={stylesButton.btn_primaryLongSmall}
            onClick={tooglePopupSuccessNotifyme}>
            {i18n.t("paymentStatus.tryAgain")}
          </button>
        </div>
      </Popup>
    </>
  )
}

export default ProductDetailComponent