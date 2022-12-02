/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
/* library template */
import {
  isLookbookAllowed,
  LookbookSingle,
  useI18n,
  useAuthToken
} from '@sirclo/nexus'
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* component */
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import SocialShare from 'components/SocialShare'
/* styles */
import styles from 'public/scss/pages/Lookbook.module.scss'

const classesLookbookSingle = {
  containerClassName: styles.lookBook_container,
  rowClassName: styles.lookBookDetail_itemParent,
  imageClassName: styles.lookBookDetail_imageDetail,
}

const classesPlaceholderLookbook = {
  placeholderList: `${styles.lookBook_item} ${styles.lookBook_imagePlaceholder}`,
}

const LookbookSinglePage: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
  urlSite
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router = useRouter()
  const size = useWindowSize()
  const LookbookAllowed = isLookbookAllowed()

  const [title, setTitle] = useState<string>('')
  const linksBreadcrumb = [i18n.t("header.home"), i18n.t("lookbook.title"), title]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={LookbookAllowed}
      setSEO={{ title: title }}
    >
      <div>
        <Breadcrumb links={linksBreadcrumb} lng={lng} />
        <h1 className={styles.lookBook_title}>{title}</h1>
        <LookbookSingle
          classes={classesLookbookSingle}
          slug={slug}
          getTitle={setTitle}
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
            <div className={styles.lookBook_container}>
              <EmptyComponent
                title={i18n.t("lookbook.empty")}
              />
            </div>
          }
          thumborSetting={{
            width: size.width < 768 ? 400 : 600,
            format: 'webp',
            quality: 85,
          }}
        />

        <div className={styles.lookBook_container}>
          <div className={styles.lookBookDetail_shareParent}>
            <h5>
              {i18n.t('lookbook.share')}
            </h5>
            <SocialShare urlSite={urlSite} />
          </div>
          <div className={styles.lookBookDetail_backParent}>
            <div>
              <img src="/images/back.svg" />
            </div>
            <div className={styles.lookBookDetail_back} onClick={() => router.back()}>{i18n.t('lookbook.back')}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
  req
}) => {
  const [brand] = await Promise.all([
    useBrand(req),
    useAuthToken({ req, res, env: process.env })
  ])
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)
  const urlSite = `https://${req.headers.host}/${params.lng}/lookbook/categories/${params.slug}`

  return {
    props: {
      lng: defaultLanguage,
      slug: params.slug,
      lngDict,
      brand: brand || '',
      urlSite: urlSite,
    },
  }
}

export default LookbookSinglePage
