/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import {
  Logo,
  useCart,
  Widget,
  useI18n
} from '@sirclo/nexus'
/* component */
import Placeholder from '../Placeholder'
import SideMenu from '../SideMenu/SideMenu'
/* library template */
import useWindowSize from 'lib/useWindowSize'

import styles from 'public/scss/components/Header.module.scss'

const classesPlaceholderLogo = {
  placeholderImage: styles.header_placeholderLogo
}

const classesPlaceholderWidget = {
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_header__widget}`
}

const Header: FC<any> = ({ 
  lng, 
  brand 
}) => {
  const i18n: any = useI18n();
  const { data: dataCart } = useCart();
  const router = useRouter();
  const size: any = useWindowSize();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [countWidgetAnnouncement, setCountWidgetAnnouncement] = useState(null);
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    setOpenMenu(false)
  }, [router.query])

  const toogleMenu = () => setOpenMenu(!openMenu)

  const handleCart = () => {
    if (router.pathname !== "/[lng]/payment_notif/[[...orderID]]") Router.push("/[lng]/cart", `/${lng}/cart`);
  }

  const handleScroll = () => {
    let offset = window.scrollY
    setScrolled(offset > 32)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  return (
    <>
      {(countWidgetAnnouncement === null || countWidgetAnnouncement > 0) &&
        <div className={styles.header_announce}>
          <Widget
            getItemCount={(itemCount: number) => setCountWidgetAnnouncement(itemCount)}
            pos="header-announcements"
            widgetClassName={styles.header_announceItem}
            loadingComponent={<Placeholder classes={classesPlaceholderWidget} withTitle />}
          />
        </div>
      }
      <header className={`${styles.header_wrapper}  ${scrolled ? "scrolled" : ""}`}>
        <div className={`${styles.header_container} ${scrolled ? "scrolled" : ""}`}>
          <span className={styles.header_menu} onClick={toogleMenu} />
          <div className={styles.header_logoContainer}>
            <LazyLoadComponent
              placeholder={
                <Placeholder classes={classesPlaceholderLogo} withImage={true} />
              }
            >
              <Logo
                imageClassName={styles.header_logo}
                thumborSetting={{
                  width: size.width < 575 ? 300 : 400,
                  quality: 90
                }}
                lazyLoadedImage={false}
              />
            </LazyLoadComponent>
          </div>
          <div
            className={styles.header_cartContainer}
            onClick={handleCart}
          >
            <span className={styles.header_cartIcon} />
            <label className={styles.header_cartLabel}>{dataCart?.totalItem || 0}</label>
          </div>

        </div>

        {openMenu &&
          <SideMenu
            i18n={i18n}
            lng={lng}
            openSide={openMenu}
            toogleSide={toogleMenu}
            positionSide="left"
            withLogo
            size={size}
            brand={brand}
            withClose
          />
        }
      </header>
    </>
  );
};

export default Header;