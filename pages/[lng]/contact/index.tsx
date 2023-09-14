/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  useI18n,
  Contact,
  Widget,
  isEnquiryAllowed,
  useAuthToken
} from '@sirclo/nexus'
/* library template */
import { useBrandCommon } from 'lib/useBrand'
import { toast } from 'react-toastify'
/* component */
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Contact.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

const classesContact = {
  mapClassName: styles.contact_map,
  titleClassName: styles.contact_titleParent,
  inputClassName: stylesForm.form_inputLong,
  labelClassName: styles.contact_label,
  buttonContainerClassName: styles.contact_buttonContainer,
  buttonClassName: stylesButton.btn_primaryLong,
  widgetClassName: styles.contact_widget,
  disclaimerMessageContainerClassName: styles.contact_disclaimer,
}

const classesPlaceholderContact = {
  placeholderList: styles.placeholderItem_contactWidget,
}

const ContactPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const allowedEnquiry = isEnquiryAllowed()
  const linksBreadcrumb = [i18n.t("header.home"), i18n.t("contact.title")]

  return (
    <Layout
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={allowedEnquiry}
      setSEO={{ title: i18n.t("contact.title") }}
    >
      <div className={styles.contact_container}>
        <Breadcrumb links={linksBreadcrumb} lng={lng} />
        <div>
          <div className={styles.contact_form}>
            <h4 className={styles.contact_title}>{i18n.t('contact.title')}</h4>
            <Widget
              pos="footer-3"
              widgetClassName={styles.contact_content}
              loadingComponent={
                <Placeholder
                  classes={classesPlaceholderContact}
                  withList
                  listMany={5}
                />
              }
            />
            <Contact
              classes={classesContact}
              isAddressDetail={false}
              onCompleted={() => toast.success(i18n.t('contact.submitSuccess'))}
              onError={() => toast.error(i18n.t('contact.submitError'))}
              widget={
                <Widget
                  pos='footer-4'
                  widgetClassName={styles.contact_info}
                  loadingComponent={
                    <Placeholder
                      classes={classesPlaceholderContact}
                      withList
                      listMany={5}
                    />
                  }
                />
              }
            />
          </div>
        </div>
      </div>
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
  const brand = await useBrandCommon(req, params, token);
  
  const defaultLanguage = brand.brand?.settings?.defaultLanguage || params.lng || 'id';
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`);

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ''
    }
  }
}

export default ContactPage
