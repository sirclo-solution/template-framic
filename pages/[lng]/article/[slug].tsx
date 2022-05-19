/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Article, ArticleCategories, useI18n } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Article.module.scss'

const classesPlaceholderArticle = {
  placeholderImage: styles.article_content,
}

const classesArticleCategories = {
  articleCategoriesContainerClass: styles.article_categories,
  categoryTitleClass: styles.article_categoriesTitle,
  articleCategoriesUlClass: styles.article_categoriesOrder,
  articleCategoriesLiClass: styles.article_categoriesOrderList,
}

const ArticleDetail: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  const [title, setTitle] = useState<string>('')
  const linksBreadcrumb = [i18n.t('header.home'), title]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: title }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.article_container}>
        <div className={styles.article_content}>
          <h3 className={styles.article_title}>{title}</h3>
          <Article
            containerClassName={styles.article_contentBody}
            slug={slug as string}
            getTitle={setTitle}
            loadingComponent={
              <Placeholder classes={classesPlaceholderArticle} withImage />
            }
          />
        </div>
        <ArticleCategories classes={classesArticleCategories} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const brand = await useBrand(req)
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      slug: params.slug,
      brand: brand || ''
    }
  }
}

export default ArticleDetail
