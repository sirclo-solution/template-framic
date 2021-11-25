/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ChevronUp, ChevronDown, Copy } from 'react-feather'
import {
  PaymentConfirmation,
  BanksAccount as BanksAccountList,
  useI18n,
  CheckPaymentOrder
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/PaymentNotif.module.scss'
import stylesThankyou from 'public/scss/pages/ThankYou.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'

const classesPaymentConfirmation = {
  paymentConfirmationDivClassName: styles.paymentNotif_form,
  paymentInfoUploadClassName: styles.paymentNotif_info,
  inputContainerClassName: styles.paymentConfirmation_inputContainer,
  inputClassName: styles.paymentConfirmation_inputUpload,
  selectClassName: `form-control`,

  buttonConfirmClassName: `${styles.paymentConfirmation_containerButton} ${stylesButton.btn_primaryLong}`,
  detailContainerClassName: styles.paymentConfirmation_detailContainer,
  detailContentClassName: styles.paymentConfirmation_detailContent,
  detailHeaderClassName: styles.paymentConfirmation_detailHeader,
  detailTitleClassName: styles.paymentConfirmation_detailTitle,
  detailStatusClassName: styles.paymentConfirmation_detailStatus,
  detailTotalAmountClassName: styles.paymentConfirmation_detailTotalAmount,
  detailDropdownClassName: styles.paymentConfirmation_detailDropdown,
  detailItemClassName: styles.paymentConfirmation_detailItem,
  detailItemImgClassName: styles.paymentConfirmation_detailItemImg,
  detailItemLabelClassName: styles.paymentConfirmation_detailItemLabel,
  detailItemPriceClassName: styles.paymentConfirmation_detailItemPrice,
  detailPriceBreakdownClassName: styles.paymentConfirmation_detailPriceBreakdown,
  detailFieldClassName: styles.paymentConfirmation_detailField,
  detailTotalFieldClassName: styles.paymentConfirmation_detailTotalField,
  detailHeaderDropdownClassName: styles.paymentConfirmation_detailHeaderDropdown,
  detailBodyDropdownClassName: styles.paymentConfirmation_detailBodyDropdown,
}

const classesCheckPaymentOrder = {
  checkPaymentOrderCloseButtonClassName: styles.paymentConfirmation_checkPaymentOrderClose,
  checkPaymentOrderTitleClassName: styles.paymentConfirmation_title,
  checkPaymentOrderContainerClassName: styles.paymentConfirmation_checkOrderContainer,
  checkPaymentOrderDescriptionClassName: styles.paymentConfirmation_checkOrderDescription,
  checkPaymentOrderContentClassName: styles.paymentConfirmation_checkOrderContent,
  checkPaymentOrderInputTitleClassName: styles.paymentConfirmation_checkOrderTitle,
  checkPaymentOrderInputClassName: styles.paymentConfirmation_checkOrderInput,
  checkPaymentOrderSubmitButtonClassName: stylesButton.btn_primaryLong,
}

const classesBankAccount = {
  // bankAccountInformationClassName: stylesBank.thankYou_bankInformation,
  // bankAccountContainerClassName: stylesBank.thankYou_bankContainer,
  // bankAccountSectionClassName: stylesBank.thankYou_bankSection,
  // bankAccountHeaderClassName: stylesBank.thankYou_bankHeader,
  // bankAccountTitleSectionClassName: stylesBank.thankYou_bankTitleSection,
  // bankAccountLogoClassName: stylesBank.thankYou_bankLogo,
  // bankAccountTitleClassName: stylesBank.thankYou_bankTitle,
  // bankAccountIconCollapseClassName: stylesBank.thankYou_bankAccountIconCollapse,
  // bankAccountBodyClassName: stylesBank.thankYou_bankBody,
  // bankAccountInfoAccountClassName: stylesBank.thankYou_bankInfoAccount,
  // bankAccountNumberSectionClassname: stylesBank.thankYou_bankAccountNumberSection,
  // bankAccountNumberClassName: stylesBank.thankYou_bankAccountNumber,
  // bankAccountLabelAccountNumberClassName: stylesBank.thankYou_bankLabelAccount,
  // bankAccountLabelAccountNameClassName: stylesBank.thankYou_bankLabelAccountName,
  // bankAccountCopyButtonClassName: stylesBank.thankYou_bankCopyButton

  bankAccountLogoClassName: stylesThankyou.thankYou_bankAccountLogo,
  bankAccountTitleClassName: stylesThankyou.thankYou_bankAccountTitle,
  bankAccountTitleSectionClassName: stylesThankyou.thankYou_bankAccountTitleSection,
  bankAccountHeaderClassName: stylesThankyou.thankYou_bankAccountHeader,
  bankAccountIconCollapseClassName: stylesThankyou.thankYou_bankAccountIconCollapse,
  bankAccountBodyClassName: stylesThankyou.thankYou_bankAccountBody,
  bankAccountNumberSectionClassname: stylesThankyou.thankYou_bankAccountNumberSection,
  bankAccountCopyButtonClassName: stylesThankyou.thankYou_bankAccountCopyButton,
  bankAccountNumberClassName: stylesThankyou.thankYou_bankAccountNumber,
  bankAccountLabelAccountNameClassName: stylesThankyou.thankYou_bankAccountLabelAccountName,
  thankYouMessageClassName: stylesThankyou.thankYou_message,
  bankAccountContainerClassName: stylesThankyou.thankYou_bankAccountContainer
}


const PaymentConfirmationPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router = useRouter()
  const linksBreadcrumb = [i18n.t("header.home"), i18n.t("paymentConfirm.confirm")]

  let orderID = ''

  if (router.query.orderID) {
    orderID = router.query.orderID.toString()
  }

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.paymentConfirmation_container}>
        {orderID ? (
          <>
            <h3 className={styles.paymentConfirmation_title}>
              {i18n.t('paymentConfirm.heading')}
            </h3>
            <PaymentConfirmation
              orderIDProps={orderID}
              classes={classesPaymentConfirmation}
              orderDetailIcon={{
                chevronUp: <ChevronUp />,
                chevronDown: <ChevronDown />
              }}
              onErrorMsg={(msg) => toast.error(msg)}
              onSuccessMsg={(msg) => toast.success(msg)}
              loadingComponent={<Loader color='text-light' />}
              errorComponent={<div>{i18n.t('global.error')}</div>}
              withOrderDetails
              thumborSetting={{
                width: 40,
                format: 'webp',
                quality: 85,
              }}
              children={
                <BanksAccountList
                  classes={classesBankAccount}
                  loadingComponent={<div className="spinner-border" />}
                  onSuccessMsg={(msg) => toast.success(msg)}
                  icon={{
                    chevronUp: <ChevronUp />,
                    chevronDown: <ChevronDown />,
                    copy: <Copy />,
                  }}
                />
              }
            />
          </>
        ) : (
          <>
            <CheckPaymentOrder
              classes={classesCheckPaymentOrder}
              icon={{
                loading: (
                  <span className='spinner-border text-light mr-3' />
                ),
              }}
              onErrorMsg={(msg) => toast.error(msg)}
            // onSuccessMsg={(msg) => toast.success(msg)}
            />
            <BanksAccountList
              classes={classesBankAccount}
              loadingComponent={<div className="spinner-border" />}
              onSuccessMsg={(msg) => toast.success(msg)}
              icon={{
                chevronUp: <ChevronUp />,
                chevronDown: <ChevronDown />,
                copy: <Copy />,
              }}
            />
          </>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
    },
  }
}

export default PaymentConfirmationPage
