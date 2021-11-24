/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
/* library template */
import { Lookbook, isLookbookAllowed, useI18n } from '@sirclo/nexus'
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* component */
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
/* styles */
import styles from 'public/scss/pages/Lookbook.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'

const classesLookbook = {
  containerClassName: styles.lookBook_container,
  rowClassName: styles.lookBook_itemParent,
  lookbookContainerClassName: styles.lookBook_item,
  imageClassName: styles.lookBook_itemImage,
  labelClassName: styles.lookBook_label,
  linkClassName: styles.lookBook_link,
}

const classesPlaceholderLookbook = {
  placeholderList: `${styles.lookBook_item} ${styles.lookBook_imagePlaceholder}`,
}

const LookbookCategory: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const size = useWindowSize()
  const LookbookAllowed = isLookbookAllowed()
  const linksBreadcrumb = [i18n.t("header.home"), i18n.t("lookbook.title")]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={LookbookAllowed}
    >
      <div>
        <Breadcrumb links={linksBreadcrumb} lng={lng} />
        <h1 className={styles.lookBook_title}>{i18n.t("lookbook.title")}</h1>
        <Lookbook
          classes={classesLookbook}
          linkText={i18n.t('lookbook.seeCollection')}
          pathPrefix={`lookbook/categories`}
          loadingComponent={
            <div className={styles.lookBook_container}>
              <div className={styles.lookBook_itemParent}>
                <Placeholder
                  classes={classesPlaceholderLookbook}
                  withList
                  listMany={5}
                />
              </div>
            </div>
          }
          emptyStateComponent={
            <EmptyComponent
              title={i18n.t("lookbook.empty")}
            />
          }
          errorComponent={
            <div className={styles.lookBook_container}>
              <h3 className={styles.lookBook_titleError}>{i18n.t('lookbook.errorTitle')}</h3>
              <p className={styles.lookBook_textError}>{i18n.t('lookbook.errorDesc')}</p>
              <div>
                <div
                  onClick={() => Router.push('/[lng]', `/${lng}`)}
                  className={stylesButton.btn_textLong}
                >
                  {i18n.t('lookbook.errorButton')}
                </div>
              </div>
            </div>
          }
          thumborSetting={{
            width: size.width < 768 ? 400 : 600,
            format: 'webp',
            quality: 85,
          }}
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
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

export default LookbookCategory
