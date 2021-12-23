/* library package */
import { FC } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import {
  Logo,
  CollapsibleNav,
  isCopyrightAllowed,
  Widget,
  useLogout,
  useCart
} from '@sirclo/nexus'
import {
  ChevronDown,
  ChevronUp,
} from 'react-feather'
/* component */
import Search from './Search'
import Placeholder from 'components/Placeholder'

import styles from 'public/scss/components/SideMenu.module.scss'

const PrivateComponent = dynamic(() => import("@sirclo/nexus").then((mod) => mod.PrivateComponent));

type SideMenuPropsType = {
  withClose?: boolean
  withTitle?: boolean,
  withLogo?: boolean,
  logo?: any,
  openSide: any,
  toogleSide: any,
  brand: any,
  size: any,
  i18n: any,
  lng: string,
  positionSide: string
}

const classesCollapsibleNav = {
  parentNavClassName: styles.sidemenu_parentNav,
  navValueClassName: styles.sidemenu_navValue,
  navValueContainerClassName: styles.sidemenu_navValueContainer,
  navValueActiveClassName: styles.sidemenu_active,
  childNavClassName: styles.sidemenu_navChildNav,
  subChildNavClassName: styles.sidemenu_navChildNav,
};

const classesSearch = {
  searchContainer: styles.sidemenu_search,
  searchForm: styles.sidemenu_searchForm,
  searchInputContainer: styles.sidemenu_searchInputContainer,
  searchInput: styles.sidemenu_searchInput,
  searchClear: styles.sidemenu_searchInputClear,
  searchButton: styles.sidemenu_searchIcon,
}

const classesPlaceholderCollapsibleNav = {
  placeholderList: styles.sidemenu_placeholder
}

const classesPlaceholderLogo = {
  placeholderImage: styles.sidemenu_placeholderLogo
}


const SideMenu: FC<SideMenuPropsType> = ({
  size,
  openSide,
  toogleSide,
  brand,
  i18n,
  lng,
  positionSide
}) => {
  const allowedCopyright = isCopyrightAllowed();
  const { data: dataCart } = useCart();
  const router = useRouter();
  const logout = useLogout('login')

  const handleCart = () => {
    if (router.pathname !== "/[lng]/payment_notif/[[...orderID]]") Router.push("/[lng]/cart", `/${lng}/cart`);
  }

  const searchProduct = (val: any) => {
    if (val !== "" && typeof val !== "undefined") {
      Router.push(`/${lng}/products?q=${val}`);
    } else {
      Router.push(`/${lng}/products`);
    }
  };

  return (
    <>
      <div className={`
        ${styles.sidemenu} 
        ${openSide ? `${styles[positionSide]}` : ""} 
      `}>
        <div className={styles.sidemenu_body}>
          <div className={styles.sidemenu_header}>
          <LazyLoadComponent
            placeholder={
              <Placeholder classes={classesPlaceholderLogo} withImage={true} />
            }
          >
            <Logo
              imageClassName={styles.sidemenu_logo}
              thumborSetting={{
                width: size.width < 575 ? 200 : 400,
                format: "webp",
                quality: 90,
              }}

              lazyLoadedImage={false}
            />
          </LazyLoadComponent>

            <span className={styles.sidemenu_headerClose} onClick={toogleSide} />
            <div
              className={styles.sidemenu_headerCart}
              onClick={handleCart}
            >
              <span className={styles.sidemenu_headerCartIcon} />
              <label className={styles.sidemenu_headerCartLabel}>{dataCart?.totalItem}</label>
            </div>
          </div>
          <Search
            classes={classesSearch}
            searchProduct={searchProduct}
          />
          <CollapsibleNav
            dropdownIcon={<ChevronDown className={styles.icon_down_mobile__svg} />}
            dropdownOpenIcon={<ChevronUp className={styles.icon_down_mobile__svg} />}
            classes={classesCollapsibleNav}
            loadingComponent={
              <div>
                <Placeholder
                  classes={classesPlaceholderCollapsibleNav}
                  withList={true}
                  listMany={6}
                />

              </div>
            }
          />
          <div className={styles.sidemenu_account}>
            <h3 className={styles.sidemenu_title}>{i18n.t("account.account")}</h3>
            <PrivateComponent
              Auth={
                <>
                  <Link href="/[lng]/account" as={`/${lng}/account`}>
                    <a className={styles.sidemenu_accountLinkAccount}>{i18n.t("account.myAccount")}</a>
                  </Link>
                  <span onClick={logout}>
                    <a className={styles.sidemenu_accountLinkLogout}>{i18n.t("account.logout")}</a>
                  </span>
                </>
              }
              NoAuth={
                <Link href="/[lng]/login" as={`/${lng}/login`}>
                  <a className={styles.sidemenu_accountLinkLogin}>{i18n.t("login.login")}</a>
                </Link>
              }
            />
          </div>
          <div className={styles.sidemenu_footer}>
            {allowedCopyright ?
              <>
                {brand?.settings?.websiteTitle || ""}
                {(brand?.settings?.websiteTitle && allowedCopyright) && ` - `}
                POWERED BY&nbsp;<a href="https://store.sirclo.com" target="_blank">SIRCLO</a>
              </>
              :
              <Widget
                pos="copyright-and-policy"
                thumborSetting={{
                  width: 1,
                  format: 'webp',
                  quality: 5,
                }}
              />
            }
          </div>
        </div>
      </div>
      <div className={styles.sidemenu_background} style={{ display: openSide ? 'block' : 'none' }} onClick={toogleSide}></div>
    </>
  )
}

export default SideMenu