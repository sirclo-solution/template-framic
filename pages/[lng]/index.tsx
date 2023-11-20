/* library package */
import {
  FC,
  useEffect,
  useState
} from 'react'
import Router from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  TemplateFeatures,
  FeaturesType,
  getBanner,
  useI18n,
  useAuthToken,
  useGetHomepageSection
} from '@sirclo/nexus'
import { Check } from 'react-feather';
/* component */
import Layout from 'components/Layout/Layout'
import WidgetHomepageTop from 'components/Widget/WidgetHomepageTop'
import WidgetHomepageBottom from 'components/Widget/WidgetHomepageBottom'
import Instagram from 'components/Instagram'
import BannerComponent from 'components/BannerComponent'
import ProductsComponent from 'components/ProductsComponent';
import Popup from 'components/Popup/Popup';
import ChooseVariant from 'components/ChooseVariant';
/* library template */
import { GRAPHQL_URI } from 'lib/Constants'
import { useBrandCommon } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'

import styles from 'public/scss/pages/Home.module.scss'
import stylesProductDetail from 'public/scss/components/ProductDetail.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesPopup from 'public/scss/components/Popup.module.scss'


const Home: FC<any> = ({
  lng,
  lngDict,
  brand,
  dataBanners,
  isMenuCategorySectionActive = true,
  isAllProductsSectionActive = false
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize()
  const [isReady, setIsReady] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>("");
  const [isOpenChooseVariantDialog, setIsOpenChooseVariantDialog] = useState<boolean>(false);
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

  useEffect(() => {
    if (!isReady) setIsReady(true);
  }, [isReady]);

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
      setSEO={{ title: i18n.t("header.home") }}
    >
      <section className={styles.homepage_container}>
        <BannerComponent
          dataBanners={dataBanners?.data}
          isReady={isReady}
        />
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

        <TemplateFeatures
          id={FeaturesType.PRODUCT_HIGHLIGHT}
          defaultChildren={
            // OLD VERSION
            <>
              <ProductsComponent
                type="category"
                lng={lng}
                i18n={i18n}
              />
              <ProductsComponent
                lng={lng}
                i18n={i18n}
                type="widget"
                handleMultipleVariant={handleMultipleVariant}
                tooglePopupErrorAddCart={tooglePopupErrorAddCart}
                handleSuccessAddToCart={handleSuccessAddToCart}
                tooglePopupSuccessNotifyme={tooglePopupSuccessNotifyme}
                tagName="featured"
                itemPerPage={4}

              />
              <WidgetHomepageTop />
              <WidgetHomepageBottom />
              <ProductsComponent
                type="product all"
                lng={lng}
                i18n={i18n}
                handleMultipleVariant={handleMultipleVariant}
                tooglePopupErrorAddCart={tooglePopupErrorAddCart}
                handleSuccessAddToCart={handleSuccessAddToCart}
                tooglePopupSuccessNotifyme={tooglePopupSuccessNotifyme}
              />
            </>
          }
        >
          {/* NEW VERSION */}
          {isMenuCategorySectionActive && (
            <ProductsComponent
              type="category"
              lng={lng}
              i18n={i18n}
            />
          )}
          <ProductsComponent
            lng={lng}
            i18n={i18n}
            handleMultipleVariant={handleMultipleVariant}
            type="highlight 1"
            tooglePopupErrorAddCart={tooglePopupErrorAddCart}
            handleSuccessAddToCart={handleSuccessAddToCart}
            tooglePopupSuccessNotifyme={tooglePopupSuccessNotifyme}
            itemPerPage={4}
          />
          <WidgetHomepageTop />
          <ProductsComponent
            lng={lng}
            i18n={i18n}
            type="highlight 2"
            tooglePopupErrorAddCart={tooglePopupErrorAddCart}
            handleSuccessAddToCart={handleSuccessAddToCart}
            tooglePopupSuccessNotifyme={tooglePopupSuccessNotifyme}
            handleMultipleVariant={handleMultipleVariant}
            itemPerPage={4}
          />
          <WidgetHomepageBottom />
          {isAllProductsSectionActive && (
            <ProductsComponent
              type="product all"
              lng={lng}
              i18n={i18n}
              handleMultipleVariant={handleMultipleVariant}
              tooglePopupErrorAddCart={tooglePopupErrorAddCart}
              handleSuccessAddToCart={handleSuccessAddToCart}
              tooglePopupSuccessNotifyme={tooglePopupSuccessNotifyme}
            />
          )}
        </TemplateFeatures>
      </section>

      <Instagram
        size={size}
        i18n={i18n}
        brand={brand}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}: any) => {
  const tokenData = await useAuthToken({res, req, env: process.env});
  const token = tokenData.value;
  const [{ brand }, { isAllProductsSectionActive, isMenuCategorySectionActive }] = await Promise.all([
    useBrandCommon(req, params, token),
    useGetHomepageSection(GRAPHQL_URI(req), token)
  ]);

  const dataBanners = await getBanner(GRAPHQL_URI(req), token);
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)
  const allowedUri: Array<string> = ['en', 'id', 'graphql', 'favicon.ico'];

  if (allowedUri.indexOf(params.lng.toString()) == -1) {
    res.writeHead(307, {
      Location: `/${defaultLanguage}/` + params.lng
    })
    res.end()
  }

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || '',
      dataBanners: dataBanners || [],
      isMenuCategorySectionActive,
      isAllProductsSectionActive
    },
  };
};

export default Home;
