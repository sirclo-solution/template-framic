/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  Account,
  useI18n,
  useAuthToken
} from '@sirclo/nexus'
import { toast } from 'react-toastify'
import {
  X as XIcon,
  CheckCircle,
  Crosshair,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Edit
} from 'react-feather'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import { useBrandCommon } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Account.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import styleMapLocation from 'public/scss/components/MapLocation.module.scss'
import stylesPassword from 'public/scss/components/PasswordStrength.module.scss'
import stylesPaggination from 'public/scss/components/Paggination.module.scss'
import stylesShipmentTracker from 'public/scss/components/ShipmentTracker.module.scss'

const ACTIVE_CURRENCY = "IDR"

const classesAccount = {
  tabClassName: styles.account_tab,
  tabItemClassName: styles.account_tabItem,
  linkTabItemClassName: styles.account_linkTabItem,
  linkTabItemActiveClassName: styles.account_linkTabItemActive,
  /* my account classes */
  myAccountBodyClassName: styles.account_myAccountBody,
  myAccountLabelClassName: styles.account_myAccountLabel,
  myAccountFieldClassName: styles.account_myAccountField,
  myAccountValueClassName: styles.account_myAccountValue,
  inputContainerClassName: stylesForm.form_control,
  datePickerInputClassName: stylesForm.form_datePickerInput,
  datePickerCalendarClassName: stylesForm.form_datePickerCalendar,
  buttonClassName: `${stylesButton.btn_primaryLong} ${styles.account_button}`,
  // map
  mapSelectAreaClassName: stylesButton.btn_secondary,
  mapPopupClassName: styleMapLocation.mapPopup,
  mapNoteClassName: styleMapLocation.mapNote,
  mapAreaClassName: styleMapLocation.mapArea,
  mapPopupBackgroundClassName: styleMapLocation.mapPopupContainer,
  mapClassName: `${styleMapLocation.mapPopupMaps} ${styleMapLocation.mapPopupMapsAccount}`,
  mapHeaderWrapperClassName: styleMapLocation.mapPopupHeader,
  mapHeaderTitleClassName: styleMapLocation.mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styleMapLocation.mapPopupClose,
  mapHeaderNoteClassName: styleMapLocation.mapPopupNote,
  mapLabelAddressClassName: styleMapLocation.mapPopupLabelAddress,
  mapCenterButtonClassName: styleMapLocation.mapPopupCenterButton,
  mapButtonFooterClassName: `${stylesButton.btn_primary} ${styleMapLocation.mapButtonFooter} ${styleMapLocation.mapButtonFooterShipping}`,
  mapPinPointIconClassName: styleMapLocation.mapPinPointIcon,
  /* change password clases */
  inputLabelClassName: styles.account_edit__label,
  inputClassName: stylesForm.form_inputLong,
  changePasswordClassName: styles.account_changePassword,
  passwordContainerClassName: stylesForm.form_control,
  passwordInputClassName: styles.account_changePassword,
  passwordStrengthBarContainerClassName: stylesPassword.passwordStrength,
  passwordStrengthBarClassName: stylesPassword.passwordStrength_bar,
  passwordStrengthLabelClassName: stylesPassword.passwordStrength_label,
  passwordCriteriaClassName: stylesPassword.passwordStrength_criteriaItem,
  passwordCriteriaListClassName: stylesPassword.passwordStrength_criteria,
  /* Membership History */
  loyaltyPointContainerClassName: styles.account_loyalty,
  membershipStatusClassName: styles.membership_status,
  accordionClassName: styles.membership_accordion,
  accordionToggleClassName: styles.membership_accordionToggle,
  accordionIconClassName: styles.membership_accordionIcon,
  totalPointsClassName: styles.membership_totalPoints,
  membershipProgressClassName: styles.membership_progress,
  membershipPromptClassName: styles.membership_prompt,
  membershipGroupStatusClassName: styles.membership_group,
  membershipGroupClassName: styles.membership_group_title,
  totalGroupPointsClassName: styles.membership_points,
  linkContinueClassName: styles.membership_linkContinue,
  membershipHistoryClassName: styles.membership_history,
  pointHistoryItemClassName: styles.membership_historyItem,
  orderIDClassName: styles.membership_orderID,
  transactionTypeClassName: styles.membership_transactionType,
  transactionDateClassName: styles.membership_transactionDate,
  pointDeltaClassName: styles.membership_point,
  membershipPaginationClassName: styles.membership_pagination,
  itemPerPageClassName: styles.membership_itemPerPage,
  itemPerPageLabelClassName: styles.membership_itemPerPageLabel,
  itemPerPageOptionsClassName: styles.membership_itemPerPageOptions,
  buttonContinueClassName: `btn ${styles.btn_primary} ${styles.btn_long}`,
  //order history info
  checkPaymentOrderContainerClassName: styles.orderhistory_checkPaymentOrderContainer,
  checkPaymentOrderContainerBodyClassName: styles.orderhistory_checkPaymentOrderContainerBody,
  checkPaymentOrderHeaderClassName: styles.orderhistory_checkPaymentOrderHeader,
  checkPaymentOrderTitleClassName: styles.orderhistory_checkPaymentOrderTitle,
  checkPaymentOrderCloseButtonClassName: styles.orderhistory_checkPaymentOrderCloseButton,
  checkPaymentOrderDescriptionClassName: styles.orderhistory_checkPaymentOrderDescription,
  checkPaymentOrderInputTitleClassName: stylesForm.form_label,
  checkPaymentOrderInputClassName: styles.orderhistory_checkPaymentOrderInput,
  checkPaymentOrderSubmitButtonClassName: stylesButton.btn_primaryLong,
  orderInfoContainerClassName: styles.orderhistory_orderInfoContainer,
  orderInfoLabelClassName: styles.orderhistory_orderInfoLabel,
  OrderInfoSearchHereClassName: styles.orderhistory_orderInfoSearchHere,
  orderItemClassName: styles.orderhistory_orderItem,
  orderedItemsClassName: styles.orderhistory_orderedItems,
  orderedItemImageClassName: styles.orderhistory_orderedItemImage,
  orderedItemClassName: styles.orderhistory_orderedItem,
  orderedItemDetailTitleClassName: styles.orderhistory_orderedItemDetailTitle,
  orderedItemDetailPriceClassName: styles.orderhistory_orderedItemDetailPrice,
  productNotesClassName: styles.orderhistory_productNotes,
  orderTitleClassName: styles.orderhistory_orderTitle,
  orderHeaderClassName: styles.orderhistory_orderHeader,
  orderDateClassName: styles.orderhistory_orderDate,
  orderInnerHeaderClassName: styles.orderhistory_orderInnerHeader,
  orderBodyClassName: styles.orderhistory_orderBody,
  detailPriceSectionClassName: styles.orderhistory_detailPriceSection,
  detailPriceLineClassName: styles.orderhistory_detailPriceLine,
  detailTotalPriceLineClassName: styles.orderhistory_detailTotalPriceLine,
  orderFooterClassName: styles.orderhistory_orderFooter,
  totalCostClassName: styles.orderhistory_totalCost,
  orderedItemsContainer: styles.orderhistory_orderedItemsContainer,
  buyerNoteContainerClassName: styles.orderhistory_buyerNoteContainer,
  shippingContainerClassName: styles.orderhistory_shippingContainer,
  shippingDetailsClassName: styles.orderhistory_shippingDetails,
  shippingMethodContainerClassName: styles.orderhistory_shippingMethodContainer,
  paymentMethodContainerClassName: styles.orderhistory_paymentMethodContainer,
  buyerNoteLabelClassName: styles.orderhistory_buyerNoteLabel,
  shippingDetailsLabelClassName: styles.orderhistory_shippingDetailsLabel,
  shippingMethodLabelClassName: styles.orderhistory_shippingMethodLabel,
  paymentMethodLabelClassName: styles.orderhistory_paymentMethodLabel,
  shippingDetailsValueClassName: styles.orderhistory_shippingDetailsValue,
  shippingMethodValueClassName: styles.orderhistory_shippingMethodValue,
  orderControlClassName: styles.orderhistory_orderControl,
  popupConfirmationOrderContainerClassName: styles.orderhistory_popupConfirmationOrderContainer,
  popupConfirmationOrderContentClassName: styles.orderhistory_popupConfirmationOrderContent,
  popupConfirmationOrderTitleClassName: styles.orderhistory_popupConfirmationOrderTitle,
  popupConfirmationOrderNoteClassName: styles.orderhistory_popupConfirmationOrderNote,
  popupConfirmationOrderDescriptionClassName: styles.orderhistory_popupConfirmationOrderDescription,
  popupConfirmationOrderWrapButtonClassName: styles.orderhistory_popupConfirmationOrderWrapButton,
  popupConfirmationOrderButtonConfirmClassName: stylesButton.btn_secondaryLong,
  popupConfirmationOrderButtonNoClassName: stylesButton.btn_primaryLong,
  orderedItemsLabelClassName: styles.orderhistory_orderedItemsLabel,
  orderedItemDetailUploadReceiptClassName: styles.orderhistory_orderedItemDetailUploadReceipt,
  orderedItemDetailWrapperNeedReviewClassName: styles.orderhistory_orderedItemDetailWrapper,
  orderedItemDetailNeedReviewClassName: styles.orderhistory_orderedItemDetailNeedReview,
  orderedItemDetailReviewedClassName: styles.orderhistory_orderedItemDetailReviewed,
  /* tracking */
  shipmentTrackingClassName: styles.orderhistory_shipmentTracking,
  shipmentHeaderTextClassName: styles.orderhistory_shipmentHeaderText,
  shipmentHeaderClassName: stylesShipmentTracker.shipmenttracker_shipmentHeader,
  shipmentBodyClassName: stylesShipmentTracker.shipmenttracker_shipmentBody,
  shipmentFooterClassName: stylesShipmentTracker.shipmenttracker_shipmentFooter,
  shipmentTextClassName: stylesShipmentTracker.shipmenttracker_shipmentText,
  shipmentNoteClassName: stylesShipmentTracker.shipmenttracker_shipmentNote,
  shipmentListClassName: stylesShipmentTracker.shipmenttracker_shipmentList,
  shipmentListWrapperClassName: stylesShipmentTracker.shipmenttracker_shipmentListWrapper,
  shipmentCloseIconClassName: stylesShipmentTracker.shipmenttracker_shipmentCloseIcon,
  shipmentTrackButtonClassName: stylesShipmentTracker.shipmenttracker_shipmentTrackButton,
  /* payment method */
  paymentMethodDetailOptionClassName: styles.orderhistory_paymentMethodDetailOption,
  paymentMethodDetailWrapperClassName: styles.orderhistory_paymentMethodDetailWrapper,
  paymentMethodDetailCardClassName: styles.orderhistory_paymentMethodDetailCard,
  paymentMethodDetailTextClassName: styles.orderhistory_paymentMethodDetailText,
  paymentMethodDetailCodeClassName: styles.orderhistory_paymentMethodDetailCode,
  paymentMethodDetailInstructionContainerClassName: styles.orderhistory_paymentMethodDetailInstructionContainer,
  paymentMethodDetailInstructionTextClassName: styles.orderhistory_paymentMethodDetailInstructionText,
  paymentMethodDetailSeeMoreContainerClassName: styles.orderhistory_paymentMethodDetailSeeMoreContainer,
  paymentMethodDetailSeeMoreLinkClassName: styles.orderhistory_paymentMethodDetailSeeMoreLink,
  paymentMethodDetailQrClassName: styles.orderhistory_paymentMethodDetailQr,
  paymentMethodDetailQrDownloadBtnClassName: styles.orderhistory_paymentMethodDetailQrDownloadBtn,
  paymentMethodDetailBankListClassName: styles.orderhistory_paymentMethodDetailBankList,
  paymentMethodDetailBankInfoClassName: styles.orderhistory_paymentMethodDetailBankInfo,
  paymentMethodDetailCopyCodeButtonClassName: styles.orderhistory_paymentMethodDetailCopyCodeButton,
  paymentMethodDetailExpiryContainerClassName: styles.orderhistory_paymentMethodDetailExpiryContainer,
  paymentMethodDetailExpiryWarningTextClassName: styles.orderhistory_paymentMethodDetailExpiryWarningText,
  paymentMethodDetailExpiryDateClassName: styles.orderhistory_paymentMethodDetailExpiryDate,
  /* setting notification */
  settingNotifContainer: "notification",
  settingNotifHeader: "d-none",
  settingNotifDescription: styles.notification_desc,
  settingNotifMediaDisabled: styles.notification_mediaDisable,
  mediaParent: styles.notification_mediaParent,
  mediaLabelContainer: styles.notification_mediaLabelContainer,
  mediaLabel: styles.notification_mediaLabel,
  mediaInnerLabelContainer: styles.notification_mediaInnerLabel,
  mediaDescription: styles.notification_mediaDesc,
  mediaCheckboxContainer: styles.notification_mediaCheckboxContainer,
  mediaCheckbox: styles.notification_mediaCheckbox,
  mediaCheckboxSlider: styles.notification_mediaCheckboxSlider,
  mediaDetailContainer: styles.notification_mediaDetailContainer,
  mediaDetailLabel: styles.notification_mediaDetailLabel,
  mediaDetailCheckboxContainer: styles.notification_mediaDetailCheckboxContainer,
  mediaDetailCheckbox: styles.notification_mediaDetailCheckbox,
  mediaDetailCheckboxLabel: styles.notification_mediaDetailCheckboxLabel
}

const orderHistoryPaginationClasses = {
  pagingClassName: stylesPaggination.pagination_paging,
  activeClassName: stylesPaggination.pagination_active,
  itemClassName: stylesPaggination.pagination_item,
}

interface AccountPageProps {
  lng: string
  lngDict: any
  brand: string
}

const AccountsPage: FC<AccountPageProps> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("account.account")}`]

  const [name, setName] = useState<string>("")

  const onError = (msg: string) => toast.error(msg)
  const onSuccessChPass = (msg: string) => toast.success(msg)

  const onSuccess = (msg: string, data: any) => {
    if (data && data?.upsertProfile) setName(data?.upsertProfile[0]?.firstName + " " + data?.upsertProfile[0]?.lastName)
    toast.success(msg)
  }

  const onFetchCompleted = (_: string, data: any) => {
    const { firstName, lastName } = data?.members[0]
    setName(`${firstName} ${lastName}`)
  }

  return (
    <Layout
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{
        title: i18n.t("account.myAccount")
      }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />

      <div className={styles.account_wrapper}>
        <div className={styles.account_container}>
          <h3 className={styles.account_name}>{name}</h3>
          <Account
            classes={classesAccount}
            orderHistoryType="list"
            orderHistoryPaginationClasses={orderHistoryPaginationClasses}
            currency={ACTIVE_CURRENCY}
            onFetchCompleted={onFetchCompleted}
            onErrorMsg={onError}
            onInvalidMsg={(msg: string) => toast.error(msg)}
            onSuccessMsg={onSuccess}
            onSuccessChPass={onSuccessChPass}
            onSuccessCopyPaymentNumber={() => toast.success(i18n.t('paymentMethod.copySuccess'))}
            onSuccessQrDownload={() => toast.success(i18n.t('paymentMethod.downloadQrSuccess'))}
            orderHistoryIsCallPagination={true}
            orderHistoryItemPerPage={10}
            paymentHrefPrefix="payment_notif"
            passwordViewIcon={<span className={styles.account_viewIcon} />}
            passwordHideIcon={<span className={styles.account_hideIcon} />}
            passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
            passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
            mapButtonCloseIcon={<XIcon />}
            mapCenterIcon={<Crosshair />}
            membershipPaginationClasses={orderHistoryPaginationClasses}
            membershipPaginationNextLabel={<ChevronRight />}
            membershipPaginationPrevLabel={<ChevronLeft />}
            showSettingNotification={true}
            icons={{
              accordionIcon: <ChevronDown size={20} color="#2296CB" />,
              closeIcon: <XIcon />,
              infoIcon: <span className={styles.orderhistory_infoIcon} />,
              iconTracker: <img src="/images/motorcycle.svg" alt="motorcycle" />,
              whatsApp: <img src="/images/whatsapp.png" />,
              email: <img src="/images/email.png" />,
              warningIcon: <span className={styles.orderhistory_warningIcon} />,
              checkMarkIcon: "",
              reviewIcon: <Edit size={16} color="#276EF1"  />,
            }}
          />
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
  const cookies = parseCookies(req);
  const tokenData = await useAuthToken({ req, res, env: process.env }); 
	const token = tokenData.value; 
  const [brand] = await Promise.all([
    useBrandCommon(req, params, token),
    useAuthToken({ req, res, env: process.env })
  ])
  const defaultLanguage = brand.brand?.settings?.defaultLanguage || params.lng || 'id'

  const { default: lngDict = {} } = await import(
    `locales/${defaultLanguage}.json`
  )

  if (res) {
    const auth = cookies.AUTH_KEY;

    if (!auth) {
      res.writeHead(307, {
        Location: `/${defaultLanguage || "id"}/login`,
      })
      res.end()
    }
  }

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ""
    }
  }
}

export default AccountsPage
