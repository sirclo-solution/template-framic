/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { 
  useI18n, 
  usePaymentLink, 
  useAuthToken
} from '@sirclo/nexus'
import { AlertCircle, XCircle } from 'react-feather'
/* library template */
import { useBrandCommon } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
/* styles */
import styles from 'public/scss/pages/PaymentStatus.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'

type TypePaymentStatus = {
  title?: string
  contentDesc?: string
}

const PaymentStatus: FC<any> = ({
  lng,
  lngDict,
  brand,
  orderID,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router = useRouter()
  const { data } = usePaymentLink(orderID)

  let paymentStatus: TypePaymentStatus

  if (data === undefined || status === null) status = 'orderNotFound'

  switch (status) {
    case 'failed':
      paymentStatus = {
        title: i18n.t('paymentStatus.titleFailed'),
        contentDesc: i18n.t('paymentStatus.failedDesc'),
      }
      break
    case 'unfinish':
      paymentStatus = {
        title: i18n.t('paymentStatus.titleUnfinish'),
        contentDesc: i18n.t('paymentStatus.unfinishDesc'),
      }
      break
    default:
      paymentStatus = {
        title: i18n.t('paymentStatus.orderNotFound'),
        contentDesc: i18n.t('paymentStatus.orderNotFoundDesc'),
      }
  }

  return (
    <Layout
      lngDict={lngDict}
      lng={lng}
      brand={brand}
      setSEO={{ title: i18n.t("paymentStatus.title") }}
    >
      <section>
        <div className={styles.paymentStatus_heading}>
          {status !== 'unfinish' ? (
            <XCircle color='#F44444' />
          ) : (
            <AlertCircle color='#FBC02D' />
          )}
          <h6 className={styles.paymentStatus_title}>{paymentStatus?.title}</h6>
        </div>
        <div className={styles.paymentStatus_parent}>
          <div className={styles.paymentStatus_container}>
            <div className={styles.paymentStatus_content}>
              <p className={styles.paymentStatus_contentDesc}>
                {paymentStatus?.contentDesc}
              </p>
            </div>
            <div className={styles.paymentStatus_action}>
              {status !== 'orderNotFound' && (
                <div className={styles.paymentStatus_actionButton}>
                  <button
                    className={stylesButton.btn_primaryLong}
                    onClick={() => {
                      window.location.href = data.orders[0].paymentLinks[0]
                    }}
                  >
                    {i18n.t('paymentStatus.tryAgain')}
                  </button>
                </div>
              )}
              {status !== 'unfinish' && (
                <div className='paymentStatus_actionButton'>
                  <button
                    className={stylesButton.btn_textLong}
                    onClick={() =>
                      router.push('/[lng]/products', `/${lng}/products`)
                    }
                  >
                    {i18n.t('paymentStatus.continueShopping')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const tokenData = await useAuthToken({ req, res, env: process.env }); 
  const token = tokenData.value;
  const { brand }= await useBrandCommon(req, params, token);
  
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id';
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)
  const [orderID, status] = params?.orderID as string[]

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || '',
      orderID: orderID || '',
      status: status || '',
    },
  }
}

export default PaymentStatus
