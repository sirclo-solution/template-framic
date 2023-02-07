/* library package */
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  withBrand,
  Newsletter,
  useI18n
} from '@sirclo/nexus'
import Head from 'next/head'
import { X as XIcon } from 'react-feather'
import useWindowSize from 'lib/useWindowSize'
/* component */
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SEO from '../SEO'
import PageNotFound from 'components/PageNotFound'
import GoogleTagManager from 'components/GoogleTagManager'
// styles
import stylesNewsLetter from 'public/scss/components/Newsletter.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButtons from 'public/scss/components/Button.module.scss'

type LayoutPropType = {
  lngDict: any
  lng: string
  layoutClassName?: string
  withHeader?: boolean
  withFooter?: boolean
  withAllowed?: boolean | undefined
  setSEO?: {
    title?: string
    description?: string
    keywords?: string
    image?: string
    url?: string
  }
  [otherProp: string]: any
};

const classesNewsletterPopup = {
  newsLetterWrapperClassName: stylesNewsLetter.newsletter_wrapper,
  newsLetterContainerClassName: stylesNewsLetter.newsletter_container,
  newsLetterCloseButtonClassName: stylesNewsLetter.newsletter_close,
  newsLetterContentContainerClassName: stylesNewsLetter.contentContainer,
  newsLetterContentClassName: stylesNewsLetter.newsletter_content,
  newsLetterImageContainerClassName: stylesNewsLetter.newsletter_imageContainer,
  newsLetterImageClassName: stylesNewsLetter.newsletter_image,
  newsLetterNoThanksButtonClassName: stylesNewsLetter.button,
  newsLetterFormContainerClassName: stylesNewsLetter.newsletter_form,
  newsLetterFormLabelClassName: 'd-none',
  newsLetterFormInputClassName: stylesForm.form_inputLong,
  newsLetterFormButtonClassName: stylesButtons.btn_primaryLong,
}

const Layout: React.FC<LayoutPropType> = ({
  lngDict,
  lng,
  layoutClassName = "",
  withHeader = true,
  withFooter = true,
  withAllowed = true,
  brand,
  setSEO,
  ...props
}) => {
  const i18n: any = useI18n()
  const size = useWindowSize()
  const getToken = (): string => {
    const googleAdsWebsiteMetaToken = brand?.googleAdsWebsiteMetaToken
    const token: string = googleAdsWebsiteMetaToken.replace(/.*content="([^"]*)".*/, "$1")
    return token
  }

  useEffect(() => {
    i18n?.locale(lng, lngDict);
  }, [lng, lngDict]);

  useEffect(() => {
    if (brand?.googleAdsWebsiteMetaToken) getToken()
  }, [brand])

  return (
    <GoogleTagManager
      containerID={brand?.settings?.googleTagManager?.specs?.containerId}
    >
      <Head>

        {/* SEO Heading */}
        <SEO
          title={
            setSEO?.title ||
            brand?.settings?.websiteTitle
          }
          description={
            setSEO?.description ||
            brand?.settings?.websiteDescription
          }
          image={
            setSEO?.image ||
            brand?.logoURL
          }
          keywords={setSEO?.keywords}
          url={setSEO?.url}
        />

        {/* default heading */}
        {brand?.googleAdsWebsiteMetaToken &&
          <meta name="google-site-verification" content={getToken()} />
        }
        {brand?.settings?.googleSearchConsole?.metaTagCode && (
          <meta
            name="google-site-verification"
            content={brand?.settings?.googleSearchConsole?.metaTagCode}
          />
        )}
        <title>{brand?.settings?.websiteTitle} {setSEO?.title && "-"} {setSEO?.title}</title>
        <link
          rel="shortcut icon"
          href={brand?.settings?.faviconURL}
          type="image/x-icon"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preload"
          href="webfonts/Roboto-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="webfonts/Roboto-Black.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="webfonts/Roboto-Medium.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://thumbor.sirclocdn.com" />
        <link rel="preconnect" href="https://storage.googleapis.com" />
      </Head>

      {withHeader &&
        <Header
          lng={lng}
          brand={brand}
        />
      }
      <main className={layoutClassName}>
        {withAllowed ?
          props.children :
          <PageNotFound i18n={i18n} />
        }
      </main>
      <ToastContainer />
      <div className={stylesNewsLetter.newsletter_overlay}>
        <Newsletter
          classes={classesNewsletterPopup}
          closeButton={<XIcon color="black" size="18" />}
          withForm
          buttonComponent={i18n.t("newsletter.subscribe")}
          onComplete={() => toast.success(i18n.t("newsletter.submitSuccess"))}
          onError={() => toast.error(i18n.t("newsletter.submitError"))}
          thumborSetting={{
            width: size.width < 768 ? 512 : 800,
            format: 'webp',
            quality: 85,
          }}
        />
      </div>
      <Footer withFooter={withFooter} />
    </GoogleTagManager>
  );
};

export default withBrand(Layout);
