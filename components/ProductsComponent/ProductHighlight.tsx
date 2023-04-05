/* library package */
import { FC } from 'react'
import { ProductHighlights } from '@sirclo/nexus'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/WidgetHomePage.module.scss'

export type ProductHighlightType = {
  i18n: any
  classPlaceholder: any
  classProducts: any
  classProductsCategory: any
  display?: "Display1" | "Display2"
  isLastSection?: boolean
  itemPerPage: number
  tooglePopupSuccessNotifyme?: () => void
  handleSuccessAddToCart?: () => void
  tooglePopupErrorAddCart?: () => void
  handleMultipleVariant: (
    type: "add-to-cart" | "buy-now",
    productSlug: string,
    isQuickView: boolean
  ) => void
}

const ProductHighlight: FC<ProductHighlightType> = ({
  i18n,
  classProducts,
  classProductsCategory,
  display,
  isLastSection,
  itemPerPage,
  tooglePopupSuccessNotifyme,
  handleSuccessAddToCart,
  tooglePopupErrorAddCart,
  handleMultipleVariant        
}) => {
  const size = useWindowSize()

  return (
    <div className={styles.widget_productsContainer}>
      <LazyLoadComponent>
        <ProductHighlights 
          item={itemPerPage}
          classes={classProducts}
          sectionProductHighlight={display}
          isFlipImage
          lazyLoadedImage={false}
          withAddToCartButton
          withBuyNowButton
          cartIcon={<span>{i18n.t("product.addToCart")}</span>}
          withCategory
          productCategoryClasses={classProductsCategory}
          categoryLength={1}
          withRating
          onCompleteMsg={tooglePopupSuccessNotifyme}
          onComplete={handleSuccessAddToCart}
          onError={tooglePopupErrorAddCart}
          onHandleMultiVariant={handleMultipleVariant}
          fullPath={`product/{id}`}
          pathPrefix={`product`}
          thumborSetting={{
            width: size.width < 768 ? 300 : 500,
            quality: 85,
            format: 'webp'
          }}
          emptyStateComponent={
            <div
              className={
                isLastSection ? styles.productsComponent_lastSection : ""
              }
            ></div>
          }
          loadingComponent={
            <div className={styles.products_placholderContainer}>
              {[0, 1, 2, 3].map((_, i) => (
                <div key={i} className="ml-2">
                  <Placeholder
                    classes={{
                      placeholderImage: styles.products_placeholderFlexNoWrap,
                      placeholderList: styles.products_placeholderList,
                    }}
                    withImage
                    withList
                  />
                </div>
              ))}
            </div>
          }
        />
      </LazyLoadComponent>
    </div>
  )
}

export default ProductHighlight