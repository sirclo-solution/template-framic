/* library package */
import { FC, useState } from 'react'
/* component */
import ProductsList from './ProductsList'
import ProductsWidget from './ProductsWidget'
import ProductHighlight from './ProductHighlight'
import ProductsCategory from './ProductsCategory'
import ProductRecomendation from './ProductRecomendation'
/* styles */
import styles from 'public/scss/components/Product.module.scss'

export type ProductsComponentType = {
  type: "list" | "widget" | "recomendation" | "category" | "highlight 1" | "highlight 2"
  i18n: any
  lng: string
  slug?: string | string[]
  SKUs?: Array<string>
  collectionSlug?: string
  tagName?: string
  itemPerPage?: number
  filterProduct?: any
  getTotalProduct?: any
  getTotalProductPerPage?: any
  isProductHighlightBySlug?: boolean
  productHighlightListSlug?: string
  getTitleSectionProductHighlight?: (value: string) => void;
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
  /* Product Highlight */
  productHighlightContainerClassName: styles.productHighlight_Container,
  productHighlightTitleContainerClassName: styles.productHighlight_TitleContainer,
  productHighlightTitleClassName: styles.productHighlight_Title,
  productSectionContainerClassName: styles.productHighlight_productSectionContainer,
  productHighlightSeeAllClassName: styles.productHighlight_SeeAll,
  /* Product Category */
  parentCategoryClassName: styles.category_productCategory,
  categoryItemClassName: `${styles.category_items} col-6 col-md-3`,
  categoryValueClassName: styles.category_itemsValue,
  dropdownIconClassName: "d-none",
  imgContainerClassName: styles.category_imageContainer,
  imgClassName: styles.category_itemsImage,
  categoryNameClassName: styles.category_itemsImagesName
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
  getTitleSectionProductHighlight,
  isProductHighlightBySlug,
  productHighlightListSlug,
  getTotalProductPerPage,
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
      isProductHighlight={isProductHighlightBySlug}
      productHighlightSlug={productHighlightListSlug}
      getTitleProductHighlight={getTitleSectionProductHighlight}
      getTotalProductPerPage={getTotalProductPerPage}
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
  ) : type === "category" ? (
    <ProductsCategory
      i18n={i18n}
      classProducts={classesProducts}
      classPlaceholder={classesPlaceholderProducts}
    />
  ) : type === "highlight 1" ? (
    <ProductHighlight
      itemPerPage={itemPerPage}
      classProducts={classesProducts}
      classPlaceholder={classesPlaceholderProducts}
      display={'Display1'}
    />
  ) :  type === "highlight 2" ? (
    <ProductHighlight
      itemPerPage={itemPerPage}
      classProducts={classesProducts}
      classPlaceholder={classesPlaceholderProducts}
      display={'Display2'}
    />
  ) :(<></>)
}

export default ProductsComponent