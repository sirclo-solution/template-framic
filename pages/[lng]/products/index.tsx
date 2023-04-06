/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router, { useRouter } from 'next/router'
import { useI18n, useAuthToken } from '@sirclo/nexus'
import { Check } from 'react-feather'
/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* component */
import Layout from 'components/Layout/Layout'
import ProductsComponent from 'components/ProductsComponent'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import ProductFilterSort from 'components/ProductFilterSort'
import ChooseVariant from 'components/ChooseVariant'
import Popup from 'components/Popup/Popup'
/* styles */
import styles from 'public/scss/pages/Products.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesPopup from 'public/scss/components/Popup.module.scss'
import stylesProductDetail from 'public/scss/components/ProductDetail.module.scss'

const ProductsPage: FC<any> = ({
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
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: i18n.t("product.products") }}
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

      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.products_container}>
        {/* Container Products Filter */}
        {(size.width > 767 || openFilterSort) &&
          <ProductFilterSort
            i18n={i18n}
            size={size}
            handleOpenSortFilter={handleOpenSortFilter}
            handleFilter={handleFilter}
          />
        }

        <div className={styles.products_listWrapper}>
          <div className={styles.products_listHeaderContainer}>
            <div className={styles.products_listAdjustContainer}>
              <h1 className={styles.products_listHeaderTitle}>
                {i18n.t('product.all')}
              </h1>
              <label
                className={styles.products_listAdjustTitle}
                onClick={handleOpenSortFilter}
              >
                <span className={styles.products_listAdjustIcon} />
                {i18n.t('product.adjust')}
              </label>
            </div>
            {hasQuery() &&
              <div className={styles.products_listClearContainer}>
                <label className={styles.products_listHeaderTotal}>
                  {generateTotalProducts(totalProduct)}
                </label>
                <button
                  className={styles.products_listClearButton}
                  onClick={handeClear}
                >{i18n.t('product.clear')}</button>
              </div>
            }
          </div>
          <div className={styles.products_list}>
            {/* Container Products List */}
            <ProductsComponent
              i18n={i18n}
              lng={lng}
              getTotalProduct={setTotalProduct}
              filterProduct={filterProduct}
              type="list"
              handleMultipleVariant={handleMultipleVariant}
              tooglePopupErrorAddCart={tooglePopupErrorAddCart}
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
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ""
    }
  }
}

export default ProductsPage
