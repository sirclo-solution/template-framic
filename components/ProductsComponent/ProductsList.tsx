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
  classPlaceholder: classesPlaceholderType
  collectionSlug: string
  filterProduct: any
  getTotalProduct: (data: any) => void
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

const ProductsList: FC<ProductsListType> = ({
  classProducts,
  classPlaceholder,
  i18n,
  getTotalProduct,
  filterProduct
}) => {
  const size = useWindowSize()
  const categories: string = useQuery("categories")
  const tagname: string = useQuery('tagname')

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 6,
    totalItems: 0,
  })
  
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

  const handlePageInfo = (data: any) => {
    setPageInfo(data)
    getTotalProduct(data?.totalItems)
  }

  return (
    <>
      {Array.from(Array(currPage + 1)).map((_, i) => (
        <Products
          key={i}
          pageNumber={i}
          itemPerPage={6}
          getPageInfo={(data: any) => handlePageInfo(data)}
          collectionSlug={categories}
          tagName={tagname || ""}
          filter={filterProduct}
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
            <Placeholder classes={classPlaceholder} withList listMany={6} />
          }
        />
      ))}
    </>
  )
}

export default ProductsList