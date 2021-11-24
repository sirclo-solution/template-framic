/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ChevronUp, ChevronDown, Copy } from 'react-feather'
import { ThankYou, useI18n } from '@sirclo/nexus'
import { toast } from 'react-toastify'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
/* styles */
import stylesButton from 'public/scss/components/Button.module.scss'
import styles from 'public/scss/pages/ThankYou.module.scss'

const classesThankYouPage = {
  thankYouClassName: styles.thankYou_container,
  buttonClassName:  `${stylesButton.btn_primaryLong} ${styles.thankYou_btnConfirm}`, 
  bankAccountLogoClassName: styles.thankYou_bankAccountLogo,
  bankAccountTitleClassName: styles.thankYou_bankAccountTitle,
  bankAccountTitleSectionClassName: styles.thankYou_bankAccountTitleSection,
  bankAccountHeaderClassName: styles.thankYou_bankAccountHeader,
  bankAccountIconCollapseClassName: styles.thankYou_bankAccountIconCollapse,
  bankAccountBodyClassName: styles.thankYou_bankAccountBody,
  bankAccountNumberSectionClassname: styles.thankYou_bankAccountNumberSection,
  bankAccountCopyButtonClassName: styles.thankYou_bankAccountCopyButton,
  bankAccountNumberClassName: styles.thankYou_bankAccountNumber,
  bankAccountLabelAccountNameClassName: styles.thankYou_bankAccountLabelAccountName,
  thankYouMessageClassName: styles.thankYou_message,
  bankAccountContainerClassName: styles.thankYou_bankAccountContainer,
  detailHeaderClassName: styles.thankYou_detailHeader,
  detailTitleClassName: styles.thankYou_detailTitle,
  detailStatusClassName: styles.thankYou_detailStatus,
  detailHeaderDropdownClassName: styles.thankYou_detailHeaderDropdown,
  detailDropdownClassName: styles.thankYou_detailDropdown,
  detailTotalAmountClassName: styles.thankYou_detailTotalAmount,
  detailItemImgClassName: styles.thankYou_detailItemImg,
  detailItemClassName: styles.thankYou_detailItem,
  detailItemLabelClassName: styles.thankYou_detailItemLabel,
  detailItemPriceClassName: styles.thankYou_detailItemPrice,
  detailFieldClassName: styles.thankYou_detailField,
  detailPriceBreakdownClassName: styles.thankYou_detailPriceBreakdown,
  detailTotalFieldClassName: styles.thankYou_detailTotalField
}

const ThankYouPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <ThankYou
        thankYouImageURL={<img className={styles.thankYou_imageSuccess} src="/images/icon-success.png"/>}
        classes={classesThankYouPage}
        withDelay
        onSuccessMsg={(msg: string) => toast.success(msg)}
        withOrderDetails
        icon={{
          chevronUp: <ChevronUp />,
          chevronDown: <ChevronDown />,
          copy: <Copy />,
        }}
      />
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

export default ThankYouPage
