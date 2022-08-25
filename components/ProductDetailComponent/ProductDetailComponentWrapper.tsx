import React from "react";
import ProductDetailComponent from "./";

const ProductDetailComponentWrapper: any = ({ ...props }) =>
{
    const ProductDetail =
        (<ProductDetailComponent
            data={undefined} lng={""} slug={""} urlSite={""} {...props}
        />);
    
    console.log(ProductDetail);
    
    return (
        ProductDetail
    );
}

export default ProductDetailComponentWrapper;