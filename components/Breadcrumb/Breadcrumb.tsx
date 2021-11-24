import { FC } from 'react'
import Link from 'next/link'
import styles from 'public/scss/components/Breadcrumbs.module.scss'

type BreadcrumbType = {
  lng: string
  links: Array<string>
}

const Breadcrumb: FC<BreadcrumbType> = ({ links, lng }) => {

  const redirectLinks = [
    "Home",
    "Beranda",
    "Blog",
    "Lookbook",
    "Keranjang",
    "Shopping Cart"
  ];

  const directUrl = {
    "Home": '/',
    "Beranda": '/',
    "Keranjang": `/cart`,
    "Shopping Cart": `/cart`,
    "Blog": `/blog`,
    "Lookbook": `/lookbook/categories`
  };

  return (
    <section className={styles.breadcrumb_wrapper}>
      <ol className={`breadcrumb ${styles.breadcrumb_container}`}>
        {
          links.map((link: string, i: number) => {
            if (redirectLinks.includes(link)) {
              return (
                <li className={`breadcrumb-item ${styles.breadcrumb_item}`} key={i}>
                  <Link
                    href={`/[lng]${directUrl[link]}`}
                    as={`/${lng}${directUrl[link]}` || `/${lng}`}
                  >
                    <a>{link}</a>
                  </Link>
                </li>
              )
            }

            return (
              <li className={`breadcrumb-item ${styles.breadcrumb_item}`} key={i}>
                <span>{link}</span>
              </li>
            )
          })
        }
      </ol>
    </section>
  )
}

export default Breadcrumb