/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
/* library template */
import { toast } from 'react-toastify'
import {
  useI18n,
  Testimonials,
  isTestimonialAllowed,
  isTestimonialFormAllowed,
  TestimonialForm,
} from '@sirclo/nexus'
import { useBrand } from 'lib/useBrand'
import ReCAPTCHA from 'react-google-recaptcha'
/* component */
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import Popup from 'components/Popup/Popup'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Testimonials.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

const classesTestimonials = {
  containerClassName: styles.testimonials_container,
  cardClassName: styles.testimonials_card,
  imgClassName: styles.testimonials_img,
  mainClassName: styles.testimonials_main,
  contentClassName: styles.testimonials_content,
  userClassName: styles.testimonials_user,
  dateClassName: styles.testimonials_date,
}

const classesTestimonalsForm = {
  backdropClassName: styles.testimonials_hide,
  testimonialHeaderClassName: styles.testimonials_hide,
  formContainerClassName: styles.testimonials_containerForm,
  inputContainerClassName: styles.testimonials_form,
  inputClassName: stylesForm.form_inputLong,
  imgUploadContainerClassName: styles.testimonials_containerImageUpload,
  imgUploadClassName: styles.testimonials_imageUpload,
  publishOptionClassName: styles.testimonials_formPublishOption,
  verificationContainerClassName: styles.testimonials_verify,
  submitBtnClassName: stylesButton.btn_primaryLong,
}

const paginationClasses = {
  pagingClassName: styles.pagination,
  activeClassName: styles.pagination_active,
  itemClassName: styles.pagination_item,
}

const classesPlaceholderTestimonials = {
  placeholderList: styles.testimonials_placeholder,
  placeholderImage: styles.testimonials_placeholderImage,
}

const TestimonialsPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const testimonialAllowed = isTestimonialAllowed()
  const testimonialFormAllowed = isTestimonialFormAllowed()

  const [totalItem, setTotalItems] = useState<number>(null)
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const toogleShowAdd = () => setShowAdd(!showAdd)
  const linksBreadcrumb = [i18n.t('header.home'), i18n.t('testimonial.title')]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={testimonialAllowed}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.testimonials_container}>
        <h4 className={styles.testimonials_title}>
          {i18n.t('testimonial.title')}
        </h4>
        <div className={styles.testimonials_header}>
          {totalItem > 0 && <p>{i18n.t('testimonial.desc')}</p>}
        </div>
        {!(totalItem > 0 || totalItem === null) ? (
          <>
            <div className={styles.testimonials_qtyAdd}>
              <p>
                {i18n.t('testimonial.weHave')}
                <strong>{totalItem}</strong>
                {i18n.t('testimonial.weHave2')}
              </p>
              <button
                className={styles.testimonials_qtyAddButton}
                onClick={toogleShowAdd}
              >
                {i18n.t('testimonial.add')}
              </button>
            </div>
            <div className={styles.testimonials_list}>
              <Testimonials
                itemPerPage={5}
                getPageInfo={(pageInfo: any) =>
                  setTotalItems(pageInfo.totalItems)
                }
                withImage={false}
                classes={classesTestimonials}
                callPagination
                paginationClasses={paginationClasses}
                loadingComponent={[1, 2, 3].map((_, i) => (
                  <div className={styles.testimonials_placeholderContainer}>
                    <Placeholder
                      key={i}
                      classes={classesPlaceholderTestimonials}
                      withImage={false}
                      withList
                      listMany={3}
                    />
                  </div>
                ))}
              />
            </div>
          </>
        ) : (
          <>
            <EmptyComponent title={i18n.t('testimonial.isEmpty')} />
            <div className={styles.testimonials_empty}>
              <div
                className={`${stylesButton.btn_primary} ${styles.testimonials_btnInput}`}
                onClick={toogleShowAdd}
              >
                {i18n.t('testimonial.add')}
              </div>
              <div
                className={`${stylesButton.btn_text} ${styles.testimonials_btnInput}`}
                onClick={() =>
                  Router.push(`/[lng]/products`, `/${lng}/products`)
                }
              >
                {i18n.t('product.back')}
              </div>
            </div>
          </>
        )}
        {showAdd && testimonialFormAllowed && (
          <Popup
            setPopup={toogleShowAdd}
            isOpen={showAdd}
            title={i18n.t('testimonial.popupTitle')}
          >
            <TestimonialForm
              classes={classesTestimonalsForm}
              uploadIcon={i18n.t('testimonial.inputImage')}
              onUploadImageCompleted={() =>
                toast.success(i18n.t('testimonial.successUpload'))
              }
              onUploadImageError={(error: any) => toast.error(error)}
              onCreateTestimonialCompleted={(_) => {
                setShowAdd(false)
                toast.success(i18n.t('testimonial.createSuccess'))
              }}
              onCreateTestimonialError={(_) =>
                toast.error(i18n.t('testimonial.createError'))
              }
              withVerification={true}
              isVerified={isVerified}
              verificationComponent={
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                  onChange={() => setIsVerified(true)}
                />
              }
            />
          </Popup>
        )}
      </div>
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

export default TestimonialsPage
