/* library package */
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import Router from 'next/router'
import {
  useI18n,
  OrderSummary,
  CartSummary
} from '@sirclo/nexus'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/OrderSummaryBox.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesCart from 'public/scss/components/CartDetails.module.scss'

export type OrderSummaryBoxPropsType = {
  lng: string
  page: "cart"
  | "place_order"
  | "shipping_method"
  | "payment_method",
}

const classesOrderSummary = {
  containerClassName: styles.ordersummary_container,
  headerClassName: styles.ordersummary_header,
  subTotalClassName: styles.ordersummary_subTotal,
  expandedDivClassName: styles.ordersummary_expandedDiv,
  subTotalTextClassName: styles.ordersummary_subTotalText,
  subTotalPriceClassName: styles.ordersummary_subTotalPrice,
  footerClassName: styles.ordersummary_footer,
  expandedLabelClassName: styles.ordersummary_expandedLabel,
  expandedPriceClassName: styles.ordersummary_expandedPrice,
  voucherTextClassName: styles.ordersummary_voucherText,
  voucherButtonClassName: styles.ordersummary_voucherButton,
  voucherButtonAppliedClassName: styles.ordersummary_voucherButtonApplied,
  voucherAppliedTextClassName: styles.ordersummary_voucherAppliedText,
  submitButtonClassName: stylesButton.btn_primaryLong,
  expandButtonClassName: styles.ordersummary_expandButton,

  popupClassName: styles.ordersummary_popup,
  voucherContainerClassName: styles.ordersummary_voucherContainer,
  closeButtonClassName: styles.ordersummary_closeButton,
  voucherFormClassName: styles.ordersummary_voucherForm,
  voucherInputClassName: stylesForm.form_inputLong,
  voucherSubmitButtonClassName: stylesButton.btn_primary,
  voucherListHeaderClassName: styles.ordersummary_voucherListHeader,
  voucherDetailClassName: styles.ordersummary_voucherDetail,
  voucherClassName: styles.ordersummary_voucher,
  voucherDetailHeaderClassName: styles.ordersummary_voucherDetailHeader,
  voucherDetailEstimateClassName: styles.ordersummary_voucherDetailEstimate,
  voucherDetailDescClassName: styles.ordersummary_voucherDetailDesc,
  voucherDetailTitleClassName: styles.ordersummary_voucherDetailTitle,
  voucherDetailCodeClassName: styles.ordersummary_voucherDetailCode,
  voucherDetailEstimateDescClassName: styles.ordersummary_voucherDetailEstimateDesc,
  voucherListClassName: styles.ordersummary_voucherList,
  deductionPriceClassName: styles.ordersummary_deductionPrice,

  pointsButtonClassName: styles.ordersummary_pointsButton,
  pointsTextClassName: styles.ordersummary_pointsText,
  pointsContainerClassName: styles.ordersummary_pointsContainer,
  numberOfPointsClassName: styles.ordersummary_numberOfPoints,
  pointLabelClassName: styles.ordersummary_pointLabel,
  totalPointsClassName: styles.ordersummary_totalPoints,
  pointValueClassName: styles.ordersummary_pointValue,
  pointsFormClassName: styles.ordersummary_pointsForm,
  changePointsClassName: styles.ordersummary_changePoints,
  pointsWarningClassName: styles.ordersummary_pointsWarning,
  continueShoppingClassName: styles.ordersummary_continueShopping,
  pointsSubmitButtonClassName: stylesButton.btn_primaryLong,
}

const classesCartDetails = {
  className: styles.ordersummary_className,
  cartBodyClassName: styles.ordersummary_cartBody,
  itemRemoveClassName: `${stylesCart.cartdetails_itemRemove} ${styles.ordersummary_itemRemove}`,
  itemQtyClassName: `${stylesCart.cartdetails_itemQty} ${styles.ordersummary_itemQty}`,
  itemPriceClassName: `${stylesCart.cartdetails_itemPrice} ${styles.ordersummary_itemPrice}`,
  itemRegularAmountClassName: `${stylesCart.cartdetails_itemRegularAmount} ${styles.ordersummary_itemRegularAmount}`,
  itemAmountClassName: `${stylesCart.cartdetails_itemAmount} ${styles.ordersummary_itemAmount}`,
  itemClassName: `${stylesCart.cartdetails_cartItem} ${styles.ordersummary_cartItem}`,
  cartHeaderClassName: stylesCart.cartdetails_cartHeader,
  itemImageClassName: stylesCart.cartdetails_itemImage,
  itemTitleClassName: stylesCart.cartdetails_itemTitle,
  itemRegularPriceClassName: stylesCart.cartdetails_itemRegularPrice,
  itemSalePriceClassName: stylesCart.cartdetails_itemSalePrice,
  qtyBoxClassName: stylesCart.cartdetails_qtyBox,
  cartFooterTitleClassName: stylesCart.cartdetails_cartFooterTitle,
  itemDiscountNoteClassName: stylesCart.cartdetails_discNote,
  cartFooterTextareaClassName: stylesForm.form_input,
}

const classesPlaceholder = {
  placeholderList: stylesCart.cartdetails_placeholder
}

const OrderSummaryBox: FC<OrderSummaryBoxPropsType> = ({
  page,
  lng
}) => {
  const i18n: any = useI18n()
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)

  const classesOrderSum = () => {
    return {
      ...classesOrderSummary,
      containerClassName: `${styles.ordersummary_container} ${page === "payment_method" ? "none" : ""}`
    }
  }

  return page === "cart" ? (
    <OrderSummary
      classes={classesOrderSummary}
      currency="IDR"
      submitButtonLabel={i18n.t("orderSummary.placeOrder")}
      continueShoppingLabel={i18n.t("orderSummary.continueShopping")}
      page={page}
      onSaveCartError={() => toast.error(i18n.t("global.error"))}
      onErrorMsg={() => setShowModalErrorAddToCart(!showModalErrorAddToCart)}
      onErrorMsgCoupon={(msg: string) => toast.error(msg)}
      isAccordion
      onAddressInvalid={(e) => toast.error(e)}
      icons={{
        voucher: <span className={styles.ordersummary_voucherIcon} />,
        points: <span className={styles.ordersummary_pointsIcon} />,
        pointsApplied: <span className={styles.ordersummary_voucherIconApplied} />,
        close: <span className={styles.ordersummary_closeIcon} />,
        voucherApplied: <span className={styles.ordersummary_voucherIconApplied} />,
        voucherRemoved: <span className={styles.ordersummary_voucherIconRemove} />,
        expand: <span className={styles.ordersummary_detailExpandIcon} />,
        collapse: <span className={styles.ordersummary_detailCollapseIcon} />,
      }}
      loadingComponent={<div className="spinner-border" />}
    />
  ) : (
    <>
      <div className={stylesCart.cartdetails_headerChange}>
        <h3 className={stylesCart.cartdetails_headerChangeTitle}>{i18n.t("cart.title")}</h3>
        <button
          className={stylesCart.cartdetails_headerChangeLink}
          onClick={() => Router.push("/[lng]/cart", `/${lng}/cart`)}>
          {i18n.t("global.changes")}&nbsp;{i18n.t("cart.title")}
        </button>
      </div>
      <CartSummary
        cartProps={{
          classes: classesCartDetails,
          withoutQtyInput: false,
          onErrorMsg: (msg) => toast.error(msg),
          loadingComponent: <Placeholder classes={classesPlaceholder} withList listMany={3} />
        }}
        orderSummaryProps={{
          classes: classesOrderSum(),
          withoutButton: page === "payment_method",
          isAccordion: true,
          page: page,
          currency: "IDR",
          submitButtonLabel: i18n.t("orderSummary.placeOrder"),
          onErrorMsg: () => setShowModalErrorAddToCart(!showModalErrorAddToCart),
          onErrorMsgCoupon: (msg: string) => toast.error(msg),
          loadingComponent: <div className="spinner-border" />,
          icons: {
            pointsApplied: <span className={styles.ordersummary_voucherIconApplied} />,
            voucher: <span className={styles.ordersummary_voucherIcon} />,
            points: <span className={styles.ordersummary_pointsIcon} />,
            close: <span className={styles.ordersummary_closeIcon} />,
            voucherApplied: <span className={styles.ordersummary_voucherIconApplied} />,
            voucherRemoved: <span className={styles.ordersummary_voucherIconRemove} />,
            expand: <span className={styles.ordersummary_detailExpandIcon} />,
            collapse: <span className={styles.ordersummary_detailCollapseIcon} />,
          }
        }}
      />
    </>
  )
}

export default OrderSummaryBox
