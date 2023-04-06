/* library package */
import { FC, useEffect, useState } from 'react'
import { Products } from '@sirclo/nexus'
/* library template */
import useInfiniteScroll from 'lib/useInfiniteScroll'
import useWindowSize from 'lib/useWindowSize'
import useQuery from 'lib/useQuery'
/* component */
import Placeholder from 'components/Placeholder'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'

type ProductsListType = {
  i18n: any
  classProducts: classesProductType
  classProductsCategory: classProductsCategoryType
  classPlaceholder: classesPlaceholderType
  collectionSlug: string
  filterProduct: any
  getTotalProduct: (data: any) => void
  getTotalProductPerPage?: (data: any) => void
  isProductHighlight?: boolean
  productHighlightSlug?: string
  getTitleProductHighlight?: (value: string) => void
  tooglePopupSuccessNotifyme?: () => void
  handleSuccessAddToCart?: () => void
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

const ProductsList: FC<ProductsListType> = ({
  classProducts,
  classProductsCategory,
  classPlaceholder,
  i18n,
  getTotalProduct,
  getTotalProductPerPage,
  filterProduct,
  isProductHighlight,
  productHighlightSlug,
  getTitleProductHighlight,
  tooglePopupSuccessNotifyme,
  handleSuccessAddToCart,
  tooglePopupErrorAddCart,
  handleMultipleVariant    
}) => {
  const size = useWindowSize()
  const categories: string = useQuery("categories")
  const tagname: string = useQuery('tagname')

  
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: isProductHighlight ? 8 : 6,
    totalItems: 0,
    totalItemPerPage: 0
  })

  const [currTotalItems, setCurrTotalItems] = useState<number>(0)
  
  const totalPage = Math.ceil(pageInfo.totalItems / pageInfo.itemPerPage)
  const { currPage, setCurrPage } = useInfiniteScroll(pageInfo, 'products_list:last-child')

  const handleScroll = () => {
    const lastTestimonial = document.querySelector(
      ".product_container:last-child"
    ) as HTMLElement

    if (lastTestimonial) {
      const lastTestimonialOffset =
        lastTestimonial.offsetTop + lastTestimonial.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight
      if (pageOffset > lastTestimonialOffset) {
        if (currPage < totalPage - 1) {
          setCurrPage(currPage + 1)
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  useEffect(() => {
    if(isProductHighlight) {
      getTotalProductPerPage(currTotalItems)
    }
  },[currTotalItems])

  const handlePageInfo = (data: any) => {
    setPageInfo(data)
    setCurrTotalItems(currTotalItems + data?.totalItemPerPage)
    getTotalProduct(data?.totalItems)
  }

  return (
    <>
      {Array.from(Array(currPage + 1)).map((_, i) => (
        <Products
          key={i}
          pageNumber={i}
          itemPerPage={isProductHighlight ? 8 : 6}
          isProductSectionHighlight={isProductHighlight}
          getTitleProductSection={getTitleProductHighlight}
          getPageInfo={(data: any) => handlePageInfo(data)}
          slug={productHighlightSlug}
          collectionSlug={categories}
          tagName={tagname || ""}
          filter={filterProduct}
          productCategoryClasses={classProductsCategory}
          isFlipImage
          withAddToCartButton
          cartIcon={<span>{i18n.t("product.addToCart")}</span>}
          withCategory
          categoryLength={1}
          withRating
          withBuyNowButton
          onCompleteMsg={tooglePopupSuccessNotifyme}
          onComplete={handleSuccessAddToCart}
          onError={tooglePopupErrorAddCart}
          onHandleMultiVariant={handleMultipleVariant}
          withSeparatedVariant={true}
          fullPath={`product/{id}`}
          pathPrefix={`product`}
          lazyLoadedImage={false}
          classes={classProducts}
          thumborSetting={{
            width: size.width < 768 ? 400 : 600,
            quality: 85,
            format: 'webp'
          }}
          emptyStateComponent={
            <EmptyComponent title={i18n.t("product.isEmpty")} />
          }
          loadingComponent={
            <Placeholder classes={classPlaceholder} withList listMany={isProductHighlight ? 8 : 6} />
          }
        />
      ))}
    </>
  )
}

export default ProductsList