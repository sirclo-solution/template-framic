/* library package */
import { FC, useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  useI18n,
  Blogs,
  BlogCategories,
  getBlogHeaderImage,
  isBlogAllowed,
  useAuthToken
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import { GRAPHQL_URI } from 'components/Constants'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/pages/Blog.module.scss'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

const classesBlogs = {
  blogContainerClassName: styles.blog_item,
  categoryClassName: styles.blog_itemCategory,
  imageContainerClassName: styles.blog_itemImageContainer,
  imageClassName: styles.blog_itemImage,
  descriptionClassName: `row container ${styles.blog_itemContent}`,
  titleClassName: styles.blog_itemTitle,
  authorClassName: styles.blog_itemAuthor,
  contentContainerClassName: styles.blog_itemDescription,
  descriptionInnerFooterClassName: styles.blog_itemInnerFooter,
  dateClassName: styles.blog_itemInnerFooterDate,
  authorPicClassName: "d-none"
}

const classesBlogCategories = {
  containerClassName: styles.blog_category,
  categoryClassName: styles.blog_categoryItem,
  linkClassName: styles.blog_categoryLink,
}

const classesEmptyComponent = {
  emptyContainer: styles.blog_empty,
  emptyTitle: styles.blog_emptyTitle
};

const classesPagination = {
  pagingClassName: styles.blog_pagination,
  activeClassName: styles.blog_paginationActive,
  itemClassName: styles.blog_paginationItem
}

const classesPlaceholderBlogs = {
  placeholderImage: styles.blog_item
}


const Blog: FC<any> = ({
  lng,
  lngDict,
  headerImage,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();
  const [totalCategories, setTotalCategories] = useState(null)

  const BlogAllowed = isBlogAllowed();
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("blog.title")}`]


  return (
    <Layout
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={BlogAllowed}
      setSEO={{
        title: i18n.t("blog.title")
      }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.blog_parent}>
        <div className="w-100">
          <h1 className={styles.blog_headerTitle}>
            {i18n.t("blog.title")}
          </h1>
        </div>
        <div className={styles.blog_listContent}>
          <img className={styles.blog_headerImageBlogList} src={headerImage} />
          <Blogs
            classes={classesBlogs}
            paginationClasses={classesPagination}
            withPagination
            itemPerPage={4}
            thumborSetting={{
              width: size.width < 768 ? 375 : 512,
              format: "webp",
              quality: 85,
            }}
            LoadingComponent={
              <>
                <Placeholder classes={classesPlaceholderBlogs} withImage />
                <Placeholder classes={classesPlaceholderBlogs} withImage />
                <Placeholder classes={classesPlaceholderBlogs} withImage />
              </>
            }
            emptyStateComponent={
              <div className={styles.blog_emptyContainer}>
                <EmptyComponent
                  classes={classesEmptyComponent}
                  title={i18n.t("blog.isEmpty")}
                />
                <div
                  onClick={() => Router.push('/[lng]', `/${lng}`)}
                  className={styles.blog_backButton}
                >
                  {i18n.t("global.back")}
                </div>
              </div>
            }
          />
        </div>
        {(totalCategories > 0 || totalCategories === null) &&
          <div className={styles.blog_listCategory}>
            <h2 className={styles.blog_titleSide}>
              {i18n.t("blog.categories")}
            </h2>
            <BlogCategories
              classes={classesBlogCategories}
              getCategoriesCount={(categoriesCount) => setTotalCategories(categoriesCount)}
            />
          </div>
        }
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const [brand, headerImage] = await Promise.all([
    useBrand(req),
    getBlogHeaderImage(GRAPHQL_URI(req)),
    useAuthToken({ req, res, env: process.env })
  ])
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id';
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`);

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      headerImage,
      brand: brand || ""
    },
  };
}

export default Blog;