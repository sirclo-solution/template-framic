/* library package */
import { FC, } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import {
  useI18n,
  PrivateRoute,
  ShippingMethods,
  useAuthToken
} from '@sirclo/nexus'
import {
  X as XIcon,
  Crosshair,
  ArrowLeft
} from 'react-feather'
/* library template */
import { useBrandCommon } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import ChekoutComponent from 'components/ChekoutComponent'
/* styles */
import styles from 'public/scss/pages/ShippingMethod.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import styleMapLocation from 'public/scss/components/MapLocation.module.scss'

const LoaderPages = dynamic(() => import("components/Loader/LoaderPages"))

const classesShippingMethod = {
  shippingRadioDiv: styles.shippingmethod_shippingRadioDiv,
  shippingNameClass: styles.shippingmethod_shippingName,
  shippingNameDivClass: styles.shippingmethod_shippingNameDiv,
  shippingPriceClass: styles.shippingmethod_shippingPrice,
  divInputClass: styles.shippingmethod_divInput,
  inputClass: styles.shippingmethod_inputClass,
  shippingErrorMsgClass: styles.shippingmethod_shippingErrorMsg,
  pinPointLocationClassName: `${stylesButton.btn_secondaryLongSmall} ${styles.shippingmethod_pinPointLocation}`,
  warningPinPointTextClassName: styles.shippingmethod_warningPinPointText,
  warningPinPointClassName: styles.shippingmethod_warningPinPoint,
  shippingPriceDivClass: styles.shippingmethod_shippingPriceDiv,
  shippingPriceDivDiscountedClass: styles.shippingmethod_shippingPriceDivDiscounted,
  shippingDiscountPercentageDivClass: styles.shippingmethod_shippingDiscountPercentage,
  shippingDiscountedPriceClass: styles.shippingmethod_shippingDiscountedPrice,
  moreShippingClassName: styles.shippingmethod_moreShipping,
  mapSelectAreaClassName: stylesButton.btn_secondaryLongSmall,
  mapPopupClassName: styleMapLocation.mapPopup,
  mapNoteClassName: styleMapLocation.mapNote,
  mapAreaClassName: styleMapLocation.mapArea,
  mapPopupBackgroundClassName: styleMapLocation.mapPopupContainer,
  mapClassName: styleMapLocation.mapPopupMaps,
  mapHeaderWrapperClassName: styleMapLocation.mapPopupHeader,
  mapHeaderTitleClassName: styleMapLocation.mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styleMapLocation.mapPopupClose,
  mapHeaderNoteClassName: styleMapLocation.mapPopupNote,
  mapLabelAddressClassName: styleMapLocation.mapPopupLabelAddress,
  mapSearchCloseButtonClassName: styleMapLocation.mapSearchCloseButton,
  mapCenterButtonClassName: styleMapLocation.mapPopupCenterButton,
  mapButtonFooterClassName: `${stylesButton.btn_primary} ${styleMapLocation.mapButtonFooter} ${styleMapLocation.mapButtonFooterShipping}`,
  mapPinPointIconClassName: styleMapLocation.mapPinPointIcon,
  
}

type PrivateComponentPropsType = {
  children: any
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="shipping_method"
    loadingComponent={<LoaderPages />}
    redirectCart="products"
  >
    {children}
  </PrivateRoute>
)

const ShippingMethodPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  return (
    <PrivateRouteWrapper>
      <Layout
        lng={lng}
        lngDict={lngDict}
        brand={brand}
        withHeader={false}
        withFooter={false}
        setSEO={{ title: i18n.t("shipping.title") }}
      >
        <ChekoutComponent
          lng={lng}
          page="shipping_method"
        >
          <ShippingMethods
            classes={classesShippingMethod}
            onErrorMsg={(msg) => toast.error(msg)}
            mapButtonCloseIcon={<XIcon />}
            mapCenterIcon={<Crosshair />}
            mapBackIcon={<ArrowLeft />}           
          />
        </ChekoutComponent>
      </Layout>
    </PrivateRouteWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {

  const tokenData = await useAuthToken({ req, res, env: process.env }); 
  const token = tokenData.value;
  const { brand } = await useBrandCommon(req, params, token);

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

export default ShippingMethodPage
