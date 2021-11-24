/* library package */
import { FC, useState } from 'react'
/* component */
import ProductsWidget from './ProductsWidget'
import ProductsList from './ProductsList'
import ProductRecomendation from './ProductRecomendation'
/* styles */
import styles from 'public/scss/components/Product.module.scss'

export type ProductsComponentType = {
  type: "list" | "widget" | "recomendation"
  i18n: any
  lng: string
  slug?: string | string[]
  SKUs?: Array<string>
  collectionSlug?: string
  tagName?: string
  itemPerPage?: number
  filterProduct?: any
  getTotalProduct?: any
}

const classesProducts = {
  productContainerClassName: `${styles.product_container} product_container`,
  productImageContainerClassName: styles.product_imageContainer,
  productImageClassName: styles.product_imageItem,
  productLabelContainerClassName: styles.product_labelContainer,
  productTitleClassName: styles.product_title,
  productPriceClassName: styles.product_price,
  salePriceClassName: styles.product_priceSale,
  priceClassName: styles.product_priceText,
  stickerContainerClassName: styles.product_stickerContainer,
  outOfStockLabelClassName: styles.product_stickerItemOutOfStock,
  openOrderLabelClassName: styles.product_stickerItemOpenOrder,
  comingSoonLabelClassName: styles.product_stickerItemComingSoon,
  saleLabelClassName: styles.product_stickerItemSale,
  preOrderLabelClassName: styles.product_stickerItemPreOrder,
  newLabelClassName: styles.product_stickerItemNew,
}

const classesPlaceholderProducts = {
  placeholderList: styles.product_placeholder
}

const ProductsComponent: FC<ProductsComponentType> = ({
  type = "list",
  i18n,
  tagName,
  slug,
  SKUs,
  itemPerPage = 4,
  collectionSlug,
  filterProduct,
  getTotalProduct,
  lng
}) => {
  const [totalProducts, setTotalProducts] = useState(null)

  if (totalProducts === 0 && type !== "list") return <></>
  
  return type === "list" ? (
    <ProductsList
      i18n={i18n}
      getTotalProduct={getTotalProduct}
      classProducts={classesProducts}
      classPlaceholder={classesPlaceholderProducts}
      collectionSlug={collectionSlug}
      filterProduct={filterProduct}
    />
  ) : type === "widget" ? (
    <ProductsWidget
      i18n={i18n}
      lng={lng}
      tagName={tagName}
      itemPerPage={itemPerPage}
      classPlaceholder={classesPlaceholderProducts}
      classProducts={classesProducts}
      setTotalProducts={setTotalProducts}
    />
  ) : type === "recomendation" ? (
    <ProductRecomendation
      i18n={i18n}
      slug={slug}
      SKUs={SKUs}
      classProducts={classesProducts}
      classPlaceholder={classesPlaceholderProducts}
      setTotalProducts={setTotalProducts}
    />
  ) : (<></>)
}

export default ProductsComponent