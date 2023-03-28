/* library package */
import { FC, useState } from 'react'
import Link from 'next/link'
import { Products } from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/WidgetHomePage.module.scss'

export type ProductsWidgetType = {
  i18n: any
  lng: string
  classProducts: any
  classProductsCategory: any
  classPlaceholder: any
  tagName?: string
  itemPerPage: number
  setTotalProducts: (total: number) => void
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
const ProductsWidget: FC<ProductsWidgetType> = ({
  classProducts,
  classProductsCategory,
  classPlaceholder,
  i18n,
  tagName,
  setTotalProducts,
  tooglePopupSuccessNotifyme,
  handleSuccessAddToCart,
  tooglePopupErrorNotifyme,
  tooglePopupErrorAddCart,
  handleMultipleVariant,
  itemPerPage,
  lng
}) => {
  const size = useWindowSize()

  return (
    <div>
      <div className={styles.widget_productsHeader}>
        <h2 className={styles.widget_productsLabel}>
          {i18n.t("product.featuredProducts")}
        </h2>
        <Link href='/[lng]/products' as={`/${lng}/products?tagname=${tagName}`}>
          <span className={styles.widget_productsLink}>
            {i18n.t("product.seeAll")}
          </span>
        </Link>
      </div>
      <div className={`${styles.widget_productsContainer} ${styles.widget_productsTagContainer}`}>
        <Products
          itemPerPage={itemPerPage}
          getPageInfo={(pageInfo: any) => setTotalProducts(pageInfo.totalItems)}
          tagName={tagName}
          isButton
          fullPath={`product/{id}`}
          pathPrefix={`product`}
          isFlipImage
          withAddToCartButton
          withBuyNowButton
          cartIcon={<span>{i18n.t("product.addToCart")}</span>}
          withCategory
          productCategoryClasses={classProductsCategory}
          categoryLength={1}
          withRating
          onCompleteMsg={tooglePopupSuccessNotifyme}
          onComplete={handleSuccessAddToCart}
          onErrorMsg={tooglePopupErrorNotifyme}
          onError={tooglePopupErrorAddCart}
          onHandleMultiVariant={handleMultipleVariant}
          lazyLoadedImage={false}
          classes={classProducts}
          loadingComponent={
            <Placeholder 
              classes={classPlaceholder}
              withList 
              listMany={itemPerPage} 
            />
          }
          thumborSetting={{
            width: size.width < 768 ? 300 : 500,
            quality: 85,
            format: 'webp'
          }}
        />
      </div>
    </div>
  )
}

export default ProductsWidget