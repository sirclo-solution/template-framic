/* library package */
import { 
  FC, 
  useEffect, 
  useState 
} from 'react'
import Link from 'next/link'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { 
  getBanner, 
  useI18n, 
  useAuthToken
} from '@sirclo/nexus'
import { ChevronRight } from 'react-feather';
/* component */
import Layout from 'components/Layout/Layout'
import WidgetHomepageTop from 'components/Widget/WidgetHomepageTop'
import WidgetHomepageBottom from 'components/Widget/WidgetHomepageBottom'
import Instagram from 'components/Instagram'
import BannerComponent from 'components/BannerComponent'
import ProductsComponent from 'components/ProductsComponent';
/* library template */
import { GRAPHQL_URI } from 'lib/Constants'
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'

import styles from 'public/scss/pages/Home.module.scss'

const Home: FC<any> = ({
  lng,
  lngDict,
  brand,
  dataBanners,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize()
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!isReady) setIsReady(true);
  }, [isReady]);

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: i18n.t("header.home") }}
    >
      <section className={styles.homepage_container}>
        <BannerComponent
          dataBanners={dataBanners?.data}
          isReady={isReady}
        />
        <ProductsComponent 
          type='category'
          lng={lng}
          i18n={i18n}
        />
        {/* <ProductsComponent
          lng={lng}
          i18n={i18n}
          type="widget"
          tagName="featured"
          itemPerPage={4}
        /> */}
        <ProductsComponent 
          lng={lng}
          i18n={i18n}
          type="highlight 1"
          itemPerPage={4}
        />
        <WidgetHomepageTop />
        <ProductsComponent 
          lng={lng}
          i18n={i18n}
          type="highlight 2"
          itemPerPage={4}
        />
        <WidgetHomepageBottom />
        <Link
          href='/[lng]/products'
          as={`/${lng}/products`}
        >
          <div className={styles.homepage_linkAllProduct}>
            <img src='/images/product.svg' />
            <p className={styles.homepage_textSeeProduct}>
              {i18n.t('product.seeAllProduct')}
            </p>
            <ChevronRight className={styles.homepage_rightArrow} />
          </div>
        </Link>
      </section>

      <Instagram
        size={size}
        i18n={i18n}
        brand={brand}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}: any) => {

  const [brand, dataBanners] = await Promise.all([
    useBrand(req),
    getBanner(GRAPHQL_URI(req)),
    useAuthToken({ req, res, env: process.env })
  ])
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)
  const allowedUri: Array<string> = ['en', 'id', 'graphql', 'favicon.ico'];

  if (allowedUri.indexOf(params.lng.toString()) == -1) {
    res.writeHead(307, {
      Location: `/${defaultLanguage}/` + params.lng
    })
    res.end()
  }

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || '',
      dataBanners
    },
  };
};

export default Home;
