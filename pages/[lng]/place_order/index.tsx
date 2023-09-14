/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import {
  useI18n,
  PlaceOrderFormv2,
  PrivateRoute,
  useAuthToken
} from '@sirclo/nexus'
import {
  X as XIcon,
  ArrowLeft,
  CheckCircle,
  Crosshair,
  ChevronDown
} from 'react-feather'
/* library template */
import { useBrandCommon } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import ChekoutComponent from 'components/ChekoutComponent'
/* styles */
import styles from 'public/scss/pages/Placeorder.module.scss'
import styleMapLocation from 'public/scss/components/MapLocation.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesPassword from 'public/scss/components/PasswordStrength.module.scss'

const LoaderPages = dynamic(() => import("components/Loader/LoaderPages"))

type PrivateComponentPropsType = {
  children: any
}

const classesPlaceOrderForm = {
  formGroupClassName: stylesForm.form_control,
  inputClassName: stylesForm.form_inputLong,
  labelClassName: styles.placeorder_label,
  shippingCheckboxLabelClassName: styles.placeorder_shippingCheckboxLabel,
  signupLabelClassName: styles.placeorder_signupLabel,
  checkoutAsMemberClassName: styles.placeorder_checkoutAsMember,
  loginLabelClassName: styles.placeorder_loginLabel,
  mapContainerClassName: styles.placeorder_mapContainer,
  mapAddressContainerClassName: styles.placeorder_mapAddressContainer,
  mapFullAddressClassName: styles.placeorder_mapFullAddress,
  mapCityClassName: styles.placeorder_mapCity,
  mapPostCodeClassName: styles.placeorder_mapPostCode,
  mapChangeAddressButtonClassName: styleMapLocation.mapButtonInputManualButton,
  mapSelectAreaClassName: `${stylesButton.btn_secondaryLongSmall} ${styleMapLocation.mapSelectArea}`,
  mapSelectAreaSpanClassName: styleMapLocation.mapSelectAreaSpan,
  mapButtonInputManualContainerClassName: styleMapLocation.mapButtonInputManualContainer,  
  mapButtonInputManualTitleClassName: styleMapLocation.mapButtonInputManualTitle,
  mapButtonInputManualButtonClassName: styleMapLocation.mapButtonInputManualButton,
  mapFormAddressClassName:  styleMapLocation.mapFormAddress,
  mapDistrictLabelClassName: styleMapLocation.mapDistrictLabel,
  mapSearchBarContainerClassName: styleMapLocation.mapSearchBarContainer,
  mapSearchBarClassName: styleMapLocation.mapSearchBar,
  mapSearchCloseButtonClassName: styleMapLocation.mapSearchCloseButton,
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
  mapCenterButtonClassName: styleMapLocation.mapPopupCenterButton,
  mapButtonFooterClassName: `${stylesButton.btn_primary} ${styleMapLocation.mapButtonFooter}`,
  mapPinPointIconClassName: styleMapLocation.mapPinPointIcon,
  paymentDetailsDeductionClassName: styles.placeorder_paymentDetailsDeduction,
  shippingCheckboxContainerClassName: styles.placeorder_shippingCheckboxContainer,

  headerLabelClassName: styles.register_headerLabel,
  inputContainerClassName: stylesForm.form_control,
  buttonClassName: stylesButton.btn_primaryLong,
  verificationContainerClassName: styles.register_verificationContainer,
  labelRequiredClassName: stylesForm.form_label,

  // Address Popup
  shippingAreaPopupClassName: styleMapLocation.mapPopup,
  shippingAreaPopupBackgroundClassName: styleMapLocation.mapPopupContainer,
  shippingAreaPopupHeaderClassName: styleMapLocation.shippingAreaPopupHeader,
  shippingAreaCloseButtonClassName: styleMapLocation.shippingAreaCloseButton,
  formClassName: styleMapLocation.form,
  addressMapButtonMapContainerClassName: styles.placeorder_addressMapButtonMapContainer,
  addressMapButtonMapLabelClassName: styles.placeorder_addressMapButtonMapLabel,
  addressMapButtonMapButtonClassName: styles.placeorder_addressMapButtonMapButton,

  // Password Field
  passwordStrengthBarContainerClassName: stylesPassword.passwordStrength,
  passwordStrengthBarClassName: stylesPassword.passwordStrength_bar,
  passwordStrengthLabelClassName: stylesPassword.passwordStrength_label,
  passwordCriteriaClassName: stylesPassword.passwordStrength_criteriaItem,
  passwordCriteriaListClassName: stylesPassword.passwordStrength_criteria,
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="place_order"
    loadingComponent={<LoaderPages />}
    redirectCart="products"
  >
    {children}
  </PrivateRoute>
)

const PlaceOrderPage: FC<any> = ({
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
        setSEO={{ title: i18n.t("orderSummary.placeOrder") }}
      >
        <ChekoutComponent
          lng={lng}
          page="place_order"
        >
          <PlaceOrderFormv2
            classes={{ ...classesPlaceOrderForm, addressPopupButtonClassName: `${stylesButton.btn_primaryLong} ${styles.placeorder_addressPopupButton} ${lng}` }}
            signupLabelPosition="bottom"
            passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
            passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
            onErrorMsg={(msg) => toast.error(msg)}
            backIcon={<ArrowLeft />}
            mapButtonCloseIcon={<XIcon />}
            mapCenterIcon={<Crosshair />}
            fieldPhoneNumberProps={{
              name: 'phone_number',
              dropdownIcon: <ChevronDown className='ml-2' size={14} />,
              selectedImgOptionHeight: '24px',
              classes: {
                fieldContainerClassName: styles.placeorder_phoneContainer,
                selectCountryContainerClassName: styles.placeorder_phoneInputGroupAddOn,
                selectCountryFlagClassName: styles.placeorder_phoneSelectedCountryFlag,
                dropdownListContainerClassName: styles.placeorder_phoneDropdownListContainer,
                dropdownListClassName: styles.placeorder_phoneDropdownList,
                countryOptionClassName: styles.placeorder_phoneCountryOption,
                countryFlagClassName: styles.placeorder_phoneCountryFlag,
                countryNameClassName: styles.placeorder_phoneCountryName,
                dialCodeClassName: styles.placeorder_phoneDialCode,
                inputFieldPhoneClassName: styles.placeorder_phoneInput
              },
            }}
          />
        </ChekoutComponent>
      </Layout>
    </PrivateRouteWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const tokenData = await useAuthToken({ req, res, env: process.env }); 
  const token = tokenData.value;
  const brand= await useBrandCommon(req, params, token)

  const defaultLanguage = brand.brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ""
    }
  }
}

export default PlaceOrderPage
