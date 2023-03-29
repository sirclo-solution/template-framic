/* Library Packages */
import dynamic from "next/dynamic";
import { ProductDetail } from "@sirclo/nexus";
import { toast } from "react-toastify";

/* Styles */
import styles from "../../public/scss/components/ChooseVariant.module.scss";
import stylesDetail from "../../public/scss/components/ProductDetail.module.scss";

/* Components */
const Loader = dynamic(() => import("components/Loader/Loader"));

export type ChooseVariantPropsType = {
  lng: string;
  slug: string;
  isOpenChooseVariantDialog?: boolean;
  isAddToCart?: boolean;
  toggleFailedAddToCart: (message: string) => void;
  toggleCompleteAddToCart: (data: any) => void;
  toggleCompleteNotifyMe: (message: string) => void;
  hasQuickViewFeature?: boolean;
};

const classesProductDetail = {
  detailTitleStarClassName: "d-none",
  detailTitleContainerClassName: "d-none",
  detailTitleClassName: "d-none",
  buyNowBtnClassName: "d-none",
  imageRowClassName: "d-none",
  descriptionClassName: "d-none",
  priceClassName: "d-none",

  productDetailParentDivClassName: styles.chooseVariant__inner,
  propertyRowClassName: styles.chooseVariant__propertyRow,
  propertyInnerContainerClassName: styles.chooseVariant__propertyInnerContainer,
  propertyFooterContainerClassname:
    styles.chooseVariant__propertyFooterContainer,
  variantContainerClassName: styles.chooseVariant__variantContainer,
  variantOptionsContainerClassName:
    styles.chooseVariant__variantOptionsContainer,
  variantLabelClassName: styles.chooseVariant__variantLabel,
  variantOptionsClassName: styles.chooseVariant__variantOptions,
  variantInputClassName: styles.chooseVariant__variantInput,
  qtyWrapperClassName: styles.chooseVariant__qtyWrapper,
  qtyBoxClassName: styles.chooseVariant__qtyBox,
  addToCartBtnClassName: styles.chooseVariant__addToCartBtn,

  notifyMeClassName: styles.chooseVariant__notifyMe,
  notifyMeLabelClassName: styles.chooseVariant__notifyMeLabel,
  notifyMeInputWrapperClassName: styles.chooseVariant__notifyMeInputWrapper,
  notifyMeInputClassName: styles.chooseVariant__notifyMeInput,
  notifyMeSubmitClassName: styles.chooseVariant__addToCartBtn,

  openOrderClassName: styles.chooseVariant__openOrder,
  openOrderTitleClassName: styles.chooseVariant__variantLabel,
  openOrderContainerClassName:
    stylesDetail.productdetail_productPropertyOpenOrderContainer,
  openOrderDateClassName:
    stylesDetail.productdetail_productPropertyOpenOrderLabel,
  openOrderTimeClassName:
    stylesDetail.productdetail_productPropertyOpenOrderLabel,
  countDownContainerClassName:
    stylesDetail.productdetail_productPropertyOpenOrderCountDown,
  countDownItemClassName:
    stylesDetail.productdetail_productPropertyOpenOrderCountDown__item,
  countDownItemTextClassName:
    stylesDetail.productdetail_productPropertyOpenOrderCountDown__text,
  openOrderTimeoutBtnClassName: `mt-3 ${stylesDetail.btn}`,
};

const ChooseVariant = ({
  lng,
  slug,
  isOpenChooseVariantDialog,
  isAddToCart,
  toggleFailedAddToCart,
  toggleCompleteAddToCart,
  toggleCompleteNotifyMe,
  hasQuickViewFeature,
}: ChooseVariantPropsType) => {
  classesProductDetail.qtyWrapperClassName = `${classesProductDetail.qtyWrapperClassName} ${lng}`;

  return (
    <div className="chooseVariant">
      <ProductDetail
        slug={slug}
        classes={classesProductDetail}
        isButton={{ 0: true, 1: true }}
        withSeparatedVariant={true}
        onError={toggleFailedAddToCart}
        onErrorMsg={(msg) => toast.error(msg)}
        onComplete={toggleCompleteAddToCart}
        onCompleteMsg={toggleCompleteNotifyMe}
        isAddToCart={isAddToCart}
        isOpenChooseVariantDialog={isOpenChooseVariantDialog}
        hasQuickViewFeature={hasQuickViewFeature}
        lazyLoadedImage={false}
        loadingComponent={
          <div className={styles.chooseVariant__inner}>
            <div className={styles.chooseVariant__loader}>
              <Loader color="#00000" />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ChooseVariant;
