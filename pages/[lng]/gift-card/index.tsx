/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { GiftCard, useI18n } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/GiftCard.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

const classesGiftCard = {
  labelClassName: styles.giftCard_label,
  inputClassName: stylesForm.form_input,
  buttonClassName: `${stylesButton.btn_primaryLong} ${styles.giftCard_buttonContainer}`,
}

const GiftCardPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [i18n.t('header.home'), i18n.t('giftCard.title')]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: i18n.t("giftCard.title") }}
    >
      <div className={styles.giftCard_container}>
        <Breadcrumb links={linksBreadcrumb} lng={lng} />
        <div>
          <div className={styles.giftCard_form}>
            <h4 className={styles.giftCard_title}>{i18n.t('giftCard.title')}</h4>
            <p className={styles.giftCard_content}>{i18n.t('giftCard.desc')}</p>
            <GiftCard classes={classesGiftCard} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const brand = await useBrand(req)
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ''
    }
  }
}

export default GiftCardPage
