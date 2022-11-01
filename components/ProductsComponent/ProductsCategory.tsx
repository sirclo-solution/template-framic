/* library package */
import { FC } from 'react'
import { ProductCategory } from '@sirclo/nexus'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/WidgetHomePage.module.scss'

export type ProductsCategoryType = {
  i18n: any
  classProducts: any
  classPlaceholder: any
}
const ProductsCategory: FC<ProductsCategoryType> = ({
  i18n,
  classProducts,
  classPlaceholder
}) => {
  const size = useWindowSize()

  return (
    <LazyLoadComponent>
      <div className={styles.widget_productsHeader}>
        <h2 className={styles.widget_productsLabel}>
          {i18n.t("categories.categories")}
        </h2>
      </div>
      <ProductCategory
        itemPerPage={4}
        classes={classProducts}
        productCategoryType="LIMIT"
        showImages={true}
        thumborSetting={{
          width: size.width < 768 ? 375 : 512,
          format: "webp",
          quality: 85,
        }}
        loadingComponent={
          <div className="row mb-5">
            {[0, 1, 2, 3].map((_, i) => (
              <div key={i} className="col-6 col-md-3">
                <Placeholder
                  classes={classPlaceholder}
                  withImage
                />
              </div>
            ))}
          </div>
        }
        imageFallback={
          <img
            className={styles.ProductCategoryImg}
            src="/images/image-category-placeholder.webp"
            alt="Placeholder"
          />
        }
      />
    </LazyLoadComponent>
  )
}

export default ProductsCategory