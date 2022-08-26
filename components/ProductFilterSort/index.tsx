/* library package */
import { FC, useState } from 'react'
import { ChevronDown } from 'react-feather'
import {
  ProductFilter,
  ProductSort,
  ProductCategory
} from '@sirclo/nexus'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import stylesProductsSortFilter from 'public/scss/components/ProductSortFilter.module.scss'

type ProductFilterSortType = {
  i18n: any
  size: any
  handleFilter: (data: any) => void
  handleOpenSortFilter: () => void
}

const classesProductFilter = {
  filterVariantClassName: stylesProductsSortFilter.filter_filterVariantName,
  filterNameClassName: stylesProductsSortFilter.filter_filterName,
  filterOptionClassName: stylesProductsSortFilter.filter_filterOption,
  filterColorInputClassName: stylesProductsSortFilter.filter_filterColorInput,
  filterColorActiveClassName: stylesProductsSortFilter.filter_filterColorActive,
  filterActiveClassName: stylesProductsSortFilter.filter_filterColorActive,
  filterInputClassName: stylesProductsSortFilter.filter_filterInput,
  filterColorLabelClassName: stylesProductsSortFilter.filter_filterColorLabel,
  filterColorPreviewClassName: stylesProductsSortFilter.filter_filterColorPreview,
  filterClassName: stylesProductsSortFilter.filter_filterContainer,
  filterSliderClassName: stylesProductsSortFilter.filter_filterSlider,
  filterSliderRailClassName: stylesProductsSortFilter.filter_filterSliderRail,
  filterSliderHandleClassName: stylesProductsSortFilter.filter_filterSliderHandle,
  filterSliderTrackClassName: stylesProductsSortFilter.filter_filterSliderTrack,
  filterPriceLabelClassName: stylesProductsSortFilter.filter_filterPriceLabel,
  minPriceLabelClassName: stylesProductsSortFilter.filter_minPriceLabel,
  maxPriceLabelClassName: stylesProductsSortFilter.filter_maxPriceLabel,
  filterPriceInputClassName: stylesProductsSortFilter.filter_filterPriceInput,
  filterPriceClassName: stylesProductsSortFilter.filter_filterPrice,
  filterSliderTooltipContainerClassName: stylesProductsSortFilter.filter_filterSliderTooltipContainer,
  filterSliderTooltipClassName: stylesProductsSortFilter.filter_filterSliderTooltip,
  filterSliderTooltipTextClassName: stylesProductsSortFilter.filter_filterSliderTooltipText,
}

const classesProductSort = {
  sortClassName: stylesProductsSortFilter.sort_container,
  sortOptionsClassName: stylesProductsSortFilter.sort_options,
  sortOptionClassName: stylesProductsSortFilter.sort_option,
  sortOptionButtonClassName: stylesProductsSortFilter.sort_optionsButton,
  sortActiveClassName: stylesProductsSortFilter.sort_optionsButtonActive
}

const classesProductCategory = {
  parentCategoryClassName: stylesProductsSortFilter.category_categorParent,
  categoryValueClassName: stylesProductsSortFilter.category_categoryValue,
  categoryNameClassName: stylesProductsSortFilter.category_categoryName,
  childCategoryClassName: stylesProductsSortFilter.category_categoryChild,
  categoryValueContainerClassName: stylesProductsSortFilter.category_categoryValueContainer,
  selectedCategoryClassName: stylesProductsSortFilter.category_categorySelectedCategory,
  dropdownIconClassName: stylesProductsSortFilter.category_categoryDropdownIcon,
}

const classesPlaceholderSort = {
  placeholderList: stylesProductsSortFilter.products_sortOption
}

const ProductFilterSort: FC<ProductFilterSortType> = ({
  i18n,
  handleFilter,
  handleOpenSortFilter,
  size
}) => {
  const [limitCategory, setLimitCategory] = useState<number>(15)
  const [lengthCategory, setLengthCategory] = useState<number>(0)
  const [showSeeMore, setShowSeeMore] = useState<boolean>(true)

  const handleSeeMoreCategory = () => {
    setShowSeeMore(true)
    setLimitCategory(lengthCategory)
  }

  const handleSetLengthCategory = (data: any) => {
    setLengthCategory(data?.length)
    if (data?.length <= limitCategory) setShowSeeMore(false)
    else setShowSeeMore(true)
  }

  return (
    <div className={stylesProductsSortFilter.filterSort_wrapper}>
      { size.width < 767 &&
        <div className={stylesProductsSortFilter.filterSort_background}  onClick={handleOpenSortFilter}/>
      }
      <div className={stylesProductsSortFilter.filterSort_container}>
        <div className={stylesProductsSortFilter.filterSort_header}>
          <p className={stylesProductsSortFilter.filter_filterName}>
            {i18n.t('product.sort')}
          </p>
          <button
            className={stylesProductsSortFilter.filterSort_close}
            onClick={handleOpenSortFilter}
          />
        </div>
        <ProductSort
          classes={classesProductSort}
          loadingComponent={
            <Placeholder
              classes={classesPlaceholderSort}
              listMany={4}
              withList
            />
          }
        />
        <p className={stylesProductsSortFilter.filter_filterName} style={{ marginTop: "50px" }}>
          {i18n.t('blog.categories')}
        </p>
        <ProductCategory
          classes={classesProductCategory}
          dropdownIcon={<ChevronDown />}
          getData={handleSetLengthCategory}
          itemPerPage={limitCategory}
          productCategoryType={'LIMIT'}
          loadingComponent={
            <Placeholder
              classes={classesPlaceholderSort}
              listMany={4}
              withList
            />
          }
        />
        {
          showSeeMore &&
          <div className={stylesProductsSortFilter.category_categorySeeMore} onClick={handleSeeMoreCategory}>
            {i18n.t('product.seeAllCategory')}
          </div>
        }
        <ProductFilter
          sortType={"list"}
          withPriceMinimumSlider
          withPriceValueLabel
          withPriceInput
          withTooltip
          handleFilter={handleFilter}
          classes={classesProductFilter}
          loadingComponent={
            <Placeholder
              classes={classesPlaceholderSort}
              listMany={4}
              withList
            />
          }
        />
      </div>
    </div>
  )
}

export default ProductFilterSort