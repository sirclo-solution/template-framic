/* library package */
import { FC } from 'react'
import { ChevronRight } from 'react-feather';
import Link from 'next/link'
/* styles */
import styles from 'public/scss/pages/Home.module.scss'

export type ProductAll = {
  lng: string
  i18n: any
}

const ProductAll: FC<ProductAll> = ({
  i18n,
  lng
}) => {

  return (
    <Link
      href='/[lng]/products'
      as={`/${lng}/products`}
    >
      <div className={styles.homepage_linkAllProduct}>
        <img src='/images/product.svg' />
        <p className={styles.homepage_textSeeProduct}>
          {i18n.t('product.seeAllProduct')}
        </p>
        <ChevronRight className={styles.homepage_rightArrow} />
      </div>
    </Link>
  )
}

export default ProductAll