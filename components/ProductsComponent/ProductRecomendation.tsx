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
  classPlaceholder: classesPlaceholderType
  setTotalProducts: (data: any) => void
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
  setTotalProducts,
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