/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import {
  ListPaymentMethod,
  PrivateRoute,
  useI18n,
  useAuthToken,
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
import { useWhatsAppOTPSetting } from 'lib/useAuthMethod'
/* component */
import Layout from 'components/Layout/Layout'
import ChekoutComponent from 'components/ChekoutComponent'
import Loader from 'components/Loader/Loader'
/* styles */
import styles from 'public/scss/pages/PaymentMethod.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesOrderSummaryBox from 'public/scss/components/OrderSummaryBox.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

const LoaderPages = dynamic(() => import("components/Loader/LoaderPages"))

const classesListPaymentMethod = {
  paymentItemEnabledClassName: styles.paymentmethod_paymentItemEnabled,
  paymentItemDisabledClassName: `${styles.paymentmethod_paymentItemDisabled} ${styles.paymentmethod_paymentItemEnabled}`,
  paymentWarningTextClassName: styles.paymentmethod_paymentWarningText,
  paymentTypeClassName: styles.paymentmethod_paymentType,
  paymentImgClassName: styles.paymentmethod_paymentImg,
  paymentMethodDetailsClassName: styles.paymentmethod_paymentMethodDetails,
  selectedPaymentMethodClassName: styles.paymentmethod_selectedPaymentMethod,
  paymentSummaryClassName: styles.paymentmethod_paymentSummary,
  paymentDetailsRowClassName: styles.paymentmethod_paymentDetailsRow,
  paymentDetailsLabelClassName: styles.paymentmethod_paymentDetailsLabel,
  paymentDetailsValueClassName: styles.paymentmethod_paymentDetailsValue,
  basePriceClassName: styles.paymentmethod_basePrice,
  salePriceClassName: styles.paymentmethod_salePrice,
  agreementContainerClassName: styles.paymentmethod_agreementContainer,
  promotionButtonGroupClassName: styles.paymentmethod_promotionButtonGroup,
  buttonClassName: stylesButton.btn_primaryLong,

  travelokaPayLaterHeaderClassName: styles.paymentmethod_travelokaPayLaterHeader,
  travelokaPayLaterFooterClassName: styles.paymentmethod_travelokaPayLaterFooter,
  travelokaPayLaterFooterTextClassName: styles.paymentmethod_travelokaPayLaterFooterText,
  travelokaPayLaterFooterImgClassName: styles.paymentmethod_travelokaPayLaterFooterImg,
  travelokaPayLaterFooterLinkClassName: styles.paymentmethod_travelokaPayLaterFooterLink,

  couponButtonClassName: `${stylesOrderSummaryBox.ordersummary_voucherButton} ${styles.paymentmethod_voucherButton}`,
  popupClassName: stylesOrderSummaryBox.ordersummary_popup,
  voucherContainerClassName: stylesOrderSummaryBox.ordersummary_voucherContainer,
  closeButtonClassName: stylesOrderSummaryBox.ordersummary_closeButton,
  voucherFormClassName: stylesOrderSummaryBox.ordersummary_voucherForm,
  voucherFormContainerClassName: stylesOrderSummaryBox.ordersummary_voucherFormContainer,
  voucherInputClassName: stylesForm.form_inputLong,
  voucherSubmitButtonClassName: stylesButton.btn_primary,
  voucherListHeaderClassName: stylesOrderSummaryBox.ordersummary_voucherListHeader,
  voucherDetailClassName: stylesOrderSummaryBox.ordersummary_voucherDetail,
  voucherClassName: stylesOrderSummaryBox.ordersummary_voucher,
  voucherDetailHeaderClassName: stylesOrderSummaryBox.ordersummary_voucherDetailHeader,
  voucherDetailEstimateClassName: stylesOrderSummaryBox.ordersummary_voucherDetailEstimate,
  voucherDetailDescClassName: stylesOrderSummaryBox.ordersummary_voucherDetailDesc,
  voucherDetailTitleClassName: stylesOrderSummaryBox.ordersummary_voucherDetailTitle,
  voucherDetailCodeClassName: 'd-none',
  voucherDetailEstimateDescClassName: stylesOrderSummaryBox.ordersummary_voucherDetailEstimateDesc,
  voucherListClassName: stylesOrderSummaryBox.ordersummary_voucherList,
  voucherListHeaderIconClassName: stylesOrderSummaryBox.ordersummary_voucherListHeaderIcon,
  voucherDetailInvalidClassName: stylesOrderSummaryBox.ordersummary_voucherDetailInvalid,
  voucherTitleClassName: 'd-none',
  voucherListItemsClassName: stylesOrderSummaryBox.ordersummary_voucherListItems,
  voucherBankLogoContainerClassName: stylesOrderSummaryBox.ordersummary_voucherBankContainer,
  voucherBankLogoImageClassName: stylesOrderSummaryBox.ordersummary_voucherBankImage,
  voucherShipperLogoContainerClassName: stylesOrderSummaryBox.ordersummary_voucherShippingContainer,
  voucherShipperLogoImageClassName: stylesOrderSummaryBox.ordersummary_voucherShippingImage,
  voucherButtonRemoveClassName: styles.paymentmethod_voucherButtonRemove,
  voucherAppliedTextClassName: styles.paymentmethod_voucherAppliedText,
  voucherDetailViewDetailsClassName: stylesOrderSummaryBox.ordersummary_voucherDetailViewDetails,
  voucherDetailPopUpContainerClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpContainer,
  voucherDetailPopUpBackgroundClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpHeader,
  voucherDetailPopUpBodyClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpBody,
  voucherDetailPopUpHeaderClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpHeader,
  voucherDetailPopUpHeaderTitleClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpHeaderTitle,
  voucherDetailPopUpCloseClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpClose,
  voucherDetailPopUpDescContainerClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpDescContainer,
  voucherDetailPopUpDescDateClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpDescDate,
  voucherDetailPopUpCodeContainerClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpCodeContainer,
  voucherDetailPopUpCodeTitleClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpCodeTitle,
  voucherDetailPopUpCodeCopyContainerClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpCodeCopyContainer,
  voucherDetailPopUpCodeCopyTitleClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpCodeCopyTitle,
  voucherDetailPopUpCodeCopyButtonClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpCodeCopyButton,
  voucherDetailPopUpUseCouponClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpUseCoupon,
  voucherDetailPopUpTermsContainerClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpTermsContainer,
  voucherDetailPopUpTermsItemsClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpTermsItems,
  voucherDetailPopUpTermsTitleClassName: stylesOrderSummaryBox.ordersummary_voucherDetailPopUpTermsTitle,
  voucherDetailApplyedClassName: stylesOrderSummaryBox.ordersummary_voucherDetailApplied,
  voucherValidListClassName: stylesOrderSummaryBox.ordersummary_voucherValidList,
  voucherInvalidListClassName: stylesOrderSummaryBox.ordersummary_voucherInvalidList,
  voucherTitleInputClassName: stylesOrderSummaryBox.ordersummary_voucherTitleInput,
  voucherSubTitleInputClassName: stylesOrderSummaryBox.ordersummary_voucherSubTitleInput,
  voucherInputContainerClassName: stylesOrderSummaryBox.ordersummary_voucherInputContainer,
  voucherShowMoreContainerClassName: stylesOrderSummaryBox.ordersummary_voucherShowMoreContainer,
  voucherShowMoreButtonClassName: stylesOrderSummaryBox.ordersummary_voucherShowMoreButton,

  pointButtonRemoveClassName: styles.paymentmethod_pointButtonRemove,
  pointButtonClassName: `${stylesOrderSummaryBox.ordersummary_pointsButton} ${styles.paymentmethod_pointsButton}`,
  pointsTextClassName: stylesOrderSummaryBox.ordersummary_pointsText,
  pointsContainerClassName: stylesOrderSummaryBox.ordersummary_pointsContainer,
  numberOfPointsClassName: stylesOrderSummaryBox.ordersummary_numberOfPoints,
  pointLabelClassName: stylesOrderSummaryBox.ordersummary_pointLabel,
  totalPointsClassName: stylesOrderSummaryBox.ordersummary_totalPoints,
  pointValueClassName: stylesOrderSummaryBox.ordersummary_pointValue,
  pointsFormClassName: stylesOrderSummaryBox.ordersummary_pointsForm,
  changePointsClassName: stylesOrderSummaryBox.ordersummary_changePoints,
  pointsWarningClassName: stylesOrderSummaryBox.ordersummary_pointsWarning,
  continueShoppingClassName: stylesOrderSummaryBox.ordersummary_continueShopping,
  pointsSubmitButtonClassName: stylesButton.btn_primaryLong,

  radioButtonClassName: styles.paymentmethod_radioButton
}

type PrivateComponentPropsType = {
  children: any
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="payment_method"
    loadingComponent={<LoaderPages />}
  >
    {children}
  </PrivateRoute>
)

const PaymentMethods: FC<any> = ({
  lng,
  lngDict,
  hasOtp,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  return (
    <PrivateRouteWrapper>
      <Layout
        i18n={i18n}
        lng={lng}
        lngDict={lngDict}
        brand={brand}
        withHeader={false}
        withFooter={false}
        setSEO={{ title: i18n.t("payment.title") }}
      >
        <ChekoutComponent
          lng={lng}
          page="payment_method"
        >
          <ListPaymentMethod
            isCouponAccordion
            withCouponTitle
            withNotificationOptInModal={hasOtp}
            classes={classesListPaymentMethod}
            onErrorMsg={(msg: string) => toast.error(msg)}
            onErrorMsgCoupon={(msg: string) => toast.error(msg)}
            onSuccessCopyCodeCoupon={() => toast.success(i18n.t("coupon.successCopyCode"))}
            closeButtonIcon={<span className={stylesOrderSummaryBox.ordersummary_closeIcon}></span>}
            copyIcon={<span className={stylesOrderSummaryBox.ordersummary_copyIcon}></span>}
            pointAppliedIcon={<span className={stylesOrderSummaryBox.ordersummary_voucherIconApplied}></span>}
            pointIcon={<span className={stylesOrderSummaryBox.ordersummary_pointsIcon}></span>}
            voucherIcon={<span className={stylesOrderSummaryBox.ordersummary_voucherIcon}></span>}
            voucherAppliedIcon={<span className={stylesOrderSummaryBox.ordersummary_voucherIconApplied}></span>}
            removePointIcon={<span className={stylesOrderSummaryBox.ordersummary_voucherIconRemove}></span>}
            removeVoucherIcon={<span className={stylesOrderSummaryBox.ordersummary_voucherIconRemove}></span>}
            expand={<span className={stylesOrderSummaryBox.ordersummary_detailExpandIcon}></span>}
            collapse={<span className={stylesOrderSummaryBox.ordersummary_detailCollapseIcon}></span>}
            couponLoadingComponent={
              <div className={stylesOrderSummaryBox.ordersummary_couponLoading}>
                <Loader color="text-dark" withText/>
              </div>
            }
            loaderElement={
              <p className={styles.paymentmethod_loaderElement}>{i18n.t("global.loading")}</p>
            }
            popupLoader={
              <div className={styles.paymentmethod_loaderPages}>
                <LoaderPages />
              </div>
            }
          />
        </ChekoutComponent>
      </Layout>
    </PrivateRouteWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const [brand, ] = await Promise.all([
    useBrand(req),
    useAuthToken({ req, res, env: process.env }),
  ]);
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)
  const hasOtp = await useWhatsAppOTPSetting(req);

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      hasOtp,
      brand: brand || ""
    }
  }
}

export default PaymentMethods
