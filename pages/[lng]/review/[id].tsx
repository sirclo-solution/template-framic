/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import {
  OrderReview,
  useI18n,
  useAuthToken
} from '@sirclo/nexus'
import useWindowSize from 'lib/useWindowSize'
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Review.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesPaggination from 'public/scss/components/Paggination.module.scss'

const classesOrderReview = {
  titleContainerClassName: styles.orderReview_titleContainer,
  titleClassName: styles.orderReview_title,
  subTitleClassName: styles.orderReview_subtitle,
  orderInfoContainerClassName: styles.orderReview_orderInfoContainer,
  orderInfoLineClassName: styles.orderReview_orderInfoLine,
  buyerInfoContainerClassName: styles.orderReview_buyerInfoContainer,
  buyerNameLabelClassName: styles.orderReview_buyerNameLabel,
  buyerNameClassname: stylesForm.form_inputLong,
  buyerHideNameContainerClassName: styles.orderReview_buyerHideContainer,
  reviewTabContainerClassName: styles.orderReview_reviewTabContainer,
  needsReviewTabContainerClassName: styles.orderReview_needsReviewTabContainer,
  reviewedTabContainerClassName: styles.orderReview_reviewedTabContainer,
  activeTabClassName: styles.orderReview_activeTab,
  needsReviewTabLabelClassName: styles.orderReview_needsReviewTabLabel,
  reviewedTabLabelClassName: styles.orderReview_reviewedTabLabel,
  productInfoContainerClassName: styles.orderReview_productInfoContainer,
  productImageClassName: styles.orderReview_productImage,
  productDetailContainerClassName: styles.orderReview_productDetailContainer,
  productNameClassName: styles.orderReview_productDetailName,
  yourRatingTextClassName: styles.orderReview_yourRatingText,
  productReviewButtonContainerClassName: styles.orderReview_productReviewButtonContainer,
  writeReviewButtonClassName: stylesButton.btn_primarySmall,
  itemPerPageClassName: styles.orderReview_itemPerPage,
  itemPerPageOptionsClassName: styles.orderReview_itemPerPageOptions,
  formContainerClassName: styles.orderReview_formContainer,
  formGroupClassName: styles.orderReview_formGroup,
  formLabelClassName: styles.orderReview_formLabel,
  starContainerClassName: styles.orderReview_starContainer,
  starClassName: styles.orderReview_star,
  imagesContainerClassName: styles.orderReview_mediaImages,
  mediaContainerClassName: styles.orderReview_mediaThumbnail,
  imgClassName: styles.orderReview_mediaImage,
  mediaRemoverClassName: styles.orderReview_mediaRemove,
  imgUploadClassName: styles.orderReview_mediaUpload,
  uploadIconClassName: styles.orderReview_uploadIcon,
  containerClassName: styles.orderReview_media,

  popupConfirmationSubmitContainerClassName: styles.orderReview_popupConfirmationSubmitContainer,
  popupConfirmationSubmitContentClassName: styles.orderReview_popupConfirmationSubmitContent,
  popupConfirmationSubmitTitleClassName: styles.orderReview_popupConfirmationSubmitTitle,
  popupConfirmationSubmitDescriptionClassName: styles.orderReview_popupConfirmationSubmitDescription,
  popupConfirmationSubmitWrapButtonClassName: styles.orderReview_popupConfirmationSubmitWrapButton,
  popupConfirmationSubmitButtonConfirmClassName: stylesButton.btn_secondaryLong,
  popupConfirmationSubmitButtonNoClassName: stylesButton.btn_primaryLong,

  openReviewButtonClassName: styles.orderReview_openReviewButton,
  reviewCardContainerClassName: styles.orderReview_reviewCardContainer,
  tileRatingClassName: styles.orderReview_tileRating,
  ratingContentClassName: styles.orderReview_ratingContent,
  ratingDescriptionClassName: styles.orderReview_ratingDescription,
  titleDescriptionClassName: styles.orderReview_titleDescription,
  descriptionContentClassName: styles.orderReview_descriptionContent,
  titleImageClassName: styles.orderReview_titleImage,
  imageContentClassName: styles.orderReview_imageContent,
  imageListClassName: styles.orderReview_imageList,
  reviewPopupContainerClassName: styles.orderReview_reviewPopupContainer,
  reviewPopupContentClassName: styles.orderReview_reviewPopupContent,
  reviewPopupButtonCloseClassName: styles.orderReview_reviewPopupButtonClose,
  reviewPopupImagePopupClassName: styles.orderReview_reviewPopupImagePopup,
  reviewPopupLeftButtonClassName: styles.orderReview_reviewPopupLeftButton,
  reviewPopupRightButtonClassName: styles.orderReview_reviewPopupRightButton,
  reviewPopupPreviewClassName: styles.orderReview_reviewPopupPreview,
  reviewPopupImagePreviewClassName: styles.orderReview_reviewPopupImagePreview
};

const paginationClasses = {
  pagingClassName: stylesPaggination.pagination_paging,
  activeClassName: stylesPaggination.pagination_active,
  itemClassName: stylesPaggination.pagination_item,
}

const ReviewPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const router = useRouter();
  const size = useWindowSize();
  const { id } = router.query;
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("orderReview.writeReview")}`]

  const newClassesOrderReview = {
    ...classesOrderReview,
    ...paginationClasses
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: i18n.t("orderReview.title") }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.orderReview_wrapper}>
        <div className={styles.orderReview_container}>
          <OrderReview
            classes={newClassesOrderReview}
            orderID={id as string}
            itemPerPageOptions={[5, 10, 15]}
            arrowIconDown={<span className={styles.orderReview_arrowIconDown} />}
            arrowIconUp={<span className={styles.orderReview_arrowIconUp} />}
            onSuccessMsg={(msg) => toast.success(msg)}
            onErrorMsg={(msg) => toast.error(msg)}
            thumborSetting={{
              width: size.width < 768 ? 375 : 500,
              format: "webp",
              quality: 85,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const [brand] = await Promise.all([
    useBrand(req),
    useAuthToken({ req, res, env: process.env })
  ])
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ''
    },
  };
};

export default ReviewPage;