/* library package */
import { FC } from 'react'
import {
  ProductReviews,
  useI18n
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/ProductDetailReviews.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesPaggination from 'public/scss/components/Paggination.module.scss'

type ProductDetailReviewsType = {
  productID: string | null
  slug: any
}

const classesReview = {
  reviewImageContainerClassName: styles.productreviews_reviewImageContainer,
  reviewImageClassName: styles.productreviews_reviewImage,
  sortClassName: styles.productreviews_sort,
  filtersClassName: styles.productreviews_filters,
  filterClassName: styles.productreviews_filter,
  filterLabelClassName: styles.productreviews_filterLabel,
  filterInputClassName: styles.productreviews_filterInput,
  sortOptionsClassName: stylesForm.form_input,
  activeFilterClassName: styles.productreviews_activeFilter,
  itemPerPageClassName: styles.productreviews_itemPerPage,

  // /* Review List */
  reviewListContainerClassName: styles.productreviews_reviewListContainer,
  reviewListDescriptionClassName: styles.productreviews_reviewListDescription,
  reviewListImageContainerClassName: styles.productreviews_reviewListImageContainer,
  reviewListImageClassName: styles.productreviews_reviewListImage,
  reviewListFooterClassName: styles.productreviews_reviewListFooter,
  reviewListStarContainerClassName: styles.productreviews_reviewListStarContainer,
  reviewListDateClassName: styles.productreviews_reviewListDate,
  reviewListAuthorClassName: styles.productreviews_reviewListAuthor,
  itemPerPageLabelClassName: styles.productreviews_itemPerPageLabel,
  itemPerPageOptionsClassName: styles.productreviews_itemPerPageOptions,

  // /* Review Popup */
  reviewPopupContainerClassName: styles.productreviews_reviewPopupContainer,
  reviewPopupContentClassName: styles.productreviews_reviewPopupContent,
  reviewPopupImagePopupClassName: styles.productreviews_reviewPopupImagePopup,
  reviewPopupPreviewClassName: styles.productreviews_reviewPopupPreview,
  reviewPopupImagePreviewClassName: styles.productreviews_reviewPopupImagePreview,
  reviewPopupRightButtonClassName: styles.productreviews_reviewPopupRightButton,
  reviewPopupLeftButtonClassName: styles.productreviews_reviewPopupLeftButton,
}

const classesPaggination = {
  pagingClassName: `${stylesPaggination.pagination_paging} ${styles.productreviews_paggination}`,
  activeClassName: stylesPaggination.pagination_active,
  itemClassName: stylesPaggination.pagination_item,
}

const classesPlaceholder = {
  placeholderImage: styles.productreviews_placeholderImage,
}


const ProductDetailReviews: FC<ProductDetailReviewsType> = ({
  productID,
  slug
}) => {
  const size = useWindowSize()
  const i18n: any = useI18n()

  return (
    <div className={styles.productreviews_wrapper}>
      <ProductReviews
        productID={productID}
        productName={slug}
        classes={classesReview}
        reviewsPaginationClasses={classesPaggination}
        itemPerPageOptions={[5, 10, 25, 50]}
        iconClose={<span  className={styles.productreviews_iconClose} />}
        iconLeft={<span className={styles.productreviews_iconLeft} />}
        iconRight={<span className={styles.productreviews_iconRight} />}
        reviewsNextLabel={<span className={styles.productreviews_reviewsNextLabel} />}
        reviewsPrevLabel={<span className={styles.productreviews_reviewsPrevLabel}/>}
        thumborSetting={{
          width: size.width < 575 ? 350 : 500,
          quality: 85,
          format: 'webp'
        }}
        customEmptyComponentReviews={
          <p className={styles.productreviews_emptyReview}>{i18n.t("product.isEmptyReview")}</p>
        }
        loadingComponent={
          <Placeholder classes={classesPlaceholder} withImage />
        }
      />
    </div>
  )
}

export default ProductDetailReviews