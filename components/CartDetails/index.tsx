/* library package */
import { FC, useState } from 'react'
import {
  CartDetails,
  useCart,
  useI18n
} from '@sirclo/nexus'
import dynamic from "next/dynamic";
import Router from 'next/router'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/CartDetails.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
/* dynamic import */
const Popup = dynamic(() => import("components/Popup/Popup"));

type CartDetailsComponentType = {
  lng: string
  getSKU: (SKUs: Array<string>) => void;
}

const classesCartDetails = {
  cartHeaderClassName: styles.cartdetails_cartHeader,
  itemClassName: styles.cartdetails_cartItem,
  itemImageClassName: styles.cartdetails_itemImage,
  itemTitleClassName: styles.cartdetails_itemTitle,
  itemPriceClassName: styles.cartdetails_itemPrice,
  itemRegularPriceClassName: styles.cartdetails_itemRegularPrice,
  itemSalePriceClassName: styles.cartdetails_itemSalePrice,
  itemQtyClassName: styles.cartdetails_itemQty,
  itemRemoveClassName: styles.cartdetails_itemRemove,
  itemAmountClassName: styles.cartdetails_itemAmount,
  itemRegularAmountClassName: styles.cartdetails_itemRegularAmount,
  qtyBoxClassName: styles.cartdetails_qtyBox,
  cartFooterTitleClassName: styles.cartdetails_cartFooterTitle,
  itemDiscountNoteClassName: styles.cartdetails_discNote,
  cartFooterTextareaClassName: stylesForm.form_input,
  errorClassName: styles.cartdetails_error
}

const classesPlaceholder = {
  placeholderList: styles.cartdetails_placeholder
}

const CartDetailsComponent: FC<CartDetailsComponentType> = ({
  lng,
  getSKU
}) => {
  const i18n: any = useI18n()
  const { data: dataCart } = useCart()
  const size: any = useWindowSize()
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)
  const [invalidMsg, setInvalidMsg] = useState<string>(null)
  const tooglePopupErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart)

  const generateTotalItems = (total: string = '0') => {
    const label = i18n.t('cart.total')
    return label.replace('{TOTAL}', total)
  }

  return (
    <>
      {dataCart?.totalItem > 0 &&
        <div className={styles.cartdetails_header}>
          <h3 className={styles.cartdetails_headerTitle}>
            {generateTotalItems(dataCart?.totalItem)}
          </h3>
          <button
            className={styles.cartdetails_headerShop}
            onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}>
            {i18n.t("cart.shopAgain")}
          </button>
        </div>
      }

      {invalidMsg && <h3 className={styles.cartdetails_invalidMsg}>{invalidMsg}</h3>}

      <CartDetails
        classes={classesCartDetails}
        getSKU={(SKUs: Array<string>) => getSKU(SKUs)}
        itemRedirectPathPrefix="product"
        onErrorMsg={tooglePopupErrorAddToCart}
        onInvalidMsg={(msg) => setInvalidMsg(msg)}
        removeIcon={<span className={styles.cartdetails_itemRemoveIcon} />}
        loadingComponent={
          <Placeholder classes={classesPlaceholder} withList listMany={3} />
        }
        emptyCartPlaceHolder={
          <div className={styles.cartdetails_emptyContainer}>
            <EmptyComponent
              icon={<span className={styles.cartdetails_emptyIcon} />}
              title={i18n.t("cart.isEmpty")}
            />
          </div>
        }
        thumborSetting={{
          width: size.width < 768 ? 200 : 400,
          format: "webp",
          quality: 85,
        }}
      />

      {/* PopUp ErrorAddToCart */}
      <Popup
        setPopup={tooglePopupErrorAddToCart}
        isOpen={showModalErrorAddToCart}
        title={i18n.t("cart.errorSKUTitle")}
        withClose={false}
        maxWidth="340px"
      >
        <p className={styles.cartdetails_errorSKUDes}>{i18n.t("cart.errorSKUDesc")}</p>
        <button
          className={stylesButton.btn_textLong}
          onClick={tooglePopupErrorAddToCart}
        >{i18n.t("global.back")}</button>
      </Popup>
    </>
  )
}
export default CartDetailsComponent
