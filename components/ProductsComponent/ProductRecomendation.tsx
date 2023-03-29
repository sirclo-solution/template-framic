/* library package */
import { FC } from 'react'
import {
  Products,
  isProductRecommendationAllowed
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/ProductRecomendation.module.scss'

export type Iprops = {
  i18n: any
  slug?: string | string[]
  SKUs?: Array<string>
  classProducts: classesProductType
  classProductsCategory: classProductsCategoryType
  classPlaceholder: classesPlaceholderType
  setTotalProducts: (data: any) => void
  tooglePopupSuccessNotifyme?: () => void
  handleSuccessAddToCart?: () => void
  tooglePopupErrorNotifyme?: () => void
  tooglePopupErrorAddCart?: () => void
  handleMultipleVariant: (
    type: "add-to-cart" | "buy-now",
    productSlug: string,
    isQuickView: boolean
  ) => void
}

type classesProductType = {
  buttonClassName?: string
  outOfStockLabelClassName?: string
  productContainerClassName?: string
  productImageClassName?: string
  productImageContainerClassName?: string
  productLabelContainerClassName?: string
  productPriceClassName?: string
  productTitleClassName?: string
  saleLabelClassName?: string
  salePriceClassName?: string
  priceClassName?: string
  stickerContainerClassName?: string
  comingSoonLabelClassName?: string
  openOrderLabelClassName?: string
  preOrderLabelClassName?: string
  newLabelClassName?: string
}

type classProductsCategoryType = {
  categoryContainerClassName?: string
  parentCategoryClassName?: string
  categoryItemClassName?: string
  categoryValueContainerClassName?: string
  categoryValueClassName?: string
  categoryNameClassName?: string
}

type classesPlaceholderType = {
  placeholderImage?: string
  placeholderTitle?: string
  placeholderList?: string
}

const classesPaggination = {
  pagingClassName: styles.productrecomendation_paging,
  itemClassName: styles.productrecomendation_item
}

const ProductRecomendation: FC<Iprops> = ({
  i18n,
  classProducts,
  classPlaceholder,
  classProductsCategory,
  setTotalProducts,
  tooglePopupSuccessNotifyme,
  handleSuccessAddToCart,
  tooglePopupErrorNotifyme,
  tooglePopupErrorAddCart,
  handleMultipleVariant,
  slug = null,
  SKUs = null
}) => {

  const size = useWindowSize()
  const allowedProductRecommendation = isProductRecommendationAllowed()

  if (!allowedProductRecommendation) return <></>
  if (!slug && !SKUs) return <></>

  let productsProps: any
  if (SKUs) productsProps = { 
    SKUs, 
    getCrossSellPageInfo: (pageInfo: any) => setTotalProducts(pageInfo.totalItems) 
  }
  else productsProps = { 
    slug, 
    getPageInfo: (pageInfo: any) => setTotalProducts(pageInfo.totalItems) 
  }

  return (
    <div className={styles.productrecomendation_container}>
      <h3 className={styles.productrecomendation_title}>{i18n.t("product.related")}</h3>
      <Products
        {...productsProps}
        classes={classProducts}
        paginationClasses={classesPaggination}
        filter={{ openOrderScheduled: false, published: true }}
        fullPath={`product/{id}`}
        pathPrefix={`product`}
        isFlipImage
        withAddToCartButton
        withBuyNowButton
        withCategory
        productCategoryClasses={classProductsCategory}
        categoryLength={1}
        withRating
        onCompleteMsg={tooglePopupSuccessNotifyme}
        onComplete={handleSuccessAddToCart}
        onErrorMsg={tooglePopupErrorNotifyme}
        onError={tooglePopupErrorAddCart}
        onHandleMultiVariant={handleMultipleVariant}
        cartIcon={<span>{i18n.t("product.addToCart")}</span>}
        itemPerPage={4}
        newPagination
        buttonNext={<span className={styles.productrecomendation_nextIcon} />}
        buttonPrev={<span className={styles.productrecomendation_prevIcon} /> }
        loadingComponent={
          <Placeholder classes={classPlaceholder} withList listMany={4} />
        }
        thumborSetting={{
          width: size.width < 768 ? 200 : 800,
          format: "webp",
          quality: 85
        }}
      />
    </div>
  )
}

export default ProductRecomendation