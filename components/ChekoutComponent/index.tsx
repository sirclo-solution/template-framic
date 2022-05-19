/* library package */
import { FC, ReactNode } from 'react'
import Link from 'next/link'
import {
  useI18n,
  Logo,
  CustomerDetail,
  useShippingMethod,
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
import formatPrice from 'lib/formatPrice'
/* component */
import OrderSummaryBox from 'components/OrderSummaryBox'
/* styles */
import styles from 'public/scss/components/CheckoutComponent.module.scss'

type ChekoutComponentType = {
  lng: string
  page: "place_order"
  | "shipping_method"
  | "payment_method"
  children: ReactNode
}

const classesCustomerDetail = {
  customerDetailBoxClass: styles.checkout_customerDetailBox,
  addressValueClassName: styles.checkout_addressValue
};

const ChekoutComponent: FC<ChekoutComponentType> = ({
  children,
  lng,
  page
}) => {
  const i18n: any = useI18n()
  const size: any = useWindowSize();
  const { data } = useShippingMethod();

  const stepsItem = [
    { page: 'place_order', title: i18n.t("placeOrder.userInformation") },
    { page: 'shipping_method', title: i18n.t("shipping.shippingMethod") },
    { page: 'payment_method', title: i18n.t("account.paymentMethod") }
  ]

  return (
    <div>
      <div className={styles.checkout_headerContainer}>
        <Logo
          imageClassName={styles.checkout_headerLogo}
          thumborSetting={{
            width: size.width < 575 ? 200 : 400,
            quality: 90
          }}
          lazyLoadedImage={false}
        />
      </div>

      <div className={styles.checkout_stepsContainer}>
        <ol className={styles.checkout_steps}>
          {stepsItem.map((value, index) => (
            <li
              key={index}
              className={`
                ${styles.checkout_stepsItem} 
                ${stepsItem.findIndex(value => value.page === page) >= index && "active"}
              `}
            >{value.title}</li>
          ))}
        </ol>
        {stepsItem.map((value, index) => value.page === page && (
          <>
            <h3 key={index} className={styles.checkout_stepsTitle}>{value.title}</h3>
            {(stepsItem.length - 1) !== index &&
              <p key={index} className={styles.checkout_stepsTitleNext}>{i18n.t("product.next")}:&nbsp;{stepsItem[index + 1].title}</p>
            }
          </>
        ))}
      </div>

      <div className={styles.checkout_body}>
        <div className={styles.checkout_bodyChildren}>
          {page !== "place_order" &&
            <div className={styles.checkout_customerDetailBoxWrapper}>
              <div className={styles.checkout_customerDetailBoxContainer}>
                <div className={styles.checkout_customerDetailBoxHeader}>
                  <label className={styles.checkout_customerDetailBoxHeaderLabel}>
                    {i18n.t("placeOrder.userInformation")}
                  </label>
                  <Link href={`/id/${stepsItem[0].page}`} as={`/${lng}/${stepsItem[0].page}`}>
                    <a className={styles.checkout_customerDetailBoxHeaderLink}>
                      {i18n.t("global.changes")}
                    </a>
                  </Link>
                </div>
                <div className={styles.checkout_customerDetailBoxInfoContainer}>
                  <div>
                    <label className={styles.checkout_customerDetailContactInfoLabel}>
                      {i18n.t("shipping.contactInfo")}
                    </label>
                    <CustomerDetail
                      classes={classesCustomerDetail}
                      isBilling={true}
                    />
                  </div>
                  <div>
                    <label className={styles.checkout_customerDetailShippingLabel}>
                      {i18n.t("shipping.shipTo")}
                    </label>
                    <CustomerDetail
                      classes={classesCustomerDetail}
                      isBilling={false}
                    />
                  </div>
                </div>
              </div>
              {page === "payment_method" &&
                <div className={styles.checkout_customerDetailBoxContainer}>
                  <div className={styles.checkout_customerDetailBoxHeader}>
                    <label className={styles.checkout_customerDetailBoxHeaderLabel}>
                      {i18n.t("shipping.shippingMethod")}
                    </label>
                    <Link href={`/id/${stepsItem[1].page}`} as={`/${lng}/${stepsItem[1].page}`}>
                      <a className={styles.checkout_customerDetailBoxHeaderLink}>
                        {i18n.t("global.changes")}
                      </a>
                    </Link>
                  </div>
                  <div className={styles.checkout_customerDetailBoxShippingContainer}>
                    <h3 className={styles.checkout_customerDetailBoxShippingText}>
                      {data?.shippingMethod?.shippingProvider}{" "}{data?.shippingMethod?.shippingService}
                      <span>
                        {formatPrice(data?.shippingMethod?.shippingCost, "IDR")}
                      </span>
                    </h3>
                  </div>
                </div>
              }
            </div>
          }
          {children}
        </div>
        <div className={styles.checkout_bodyOrderSummaryBox}>
          <OrderSummaryBox page={page} lng={lng} />
        </div>
      </div>
    </div>
  )
}

export default ChekoutComponent