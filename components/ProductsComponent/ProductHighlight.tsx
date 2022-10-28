/* library package */
import { FC } from 'react'
import { ProductHighlights } from '@sirclo/nexus'
import { LazyLoadComponent } from "react-lazy-load-image-component";
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/WidgetHomePage.module.scss'

export type ProductHighlightType = {
  classPlaceholder: any
  classProducts: any
  display?: "Display1" | "Display2";
  isLastSection?: boolean;
  itemPerPage: number
}

const ProductHighlight: FC<ProductHighlightType> = ({
  classProducts,
  display,
  isLastSection,
  itemPerPage              
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
          withCategory={false}
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