import { useNavigate } from "react-router-dom";
import ProductCSS from "../css/Product.module.css";
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import ButtonCSS from "../../Button.module.css";
import Footer from "../../Footer";

function BrandProduct({
    product: { productId, productName, productPrice, productImg, smallCategory: {smallCategoryName}}
}){

    const navigate = useNavigate();

    const onClickProductHandler = (productId) => {
        navigate(`/products/${productId}`, {replace: false});
    };

    return(
        <div onClick={() => onClickProductHandler(productId)}
        className={ProductCSS.product_box}>
            <div className={ProductCSS.product_img_box}>
                <img src={productImg} alt={productName}/>
            </div>
            <div className={ProductCSS.product_text_box}>
                <div>
                    <p>{productName}</p>
                    <div className={ProductCSS.product_icon_box}>
                        <p><FaRegHeart/></p>
                        <p><LuShoppingCart/></p>
                    </div>
                </div>
                <div>
                <p>{productPrice ? productPrice.toLocaleString() + '원' : '가격 정보 없음'}</p>
                    {/* <span style={{padding: '4px 10px', borderRadius: '10px', fontWeight: '300', color: '#fff', backgroundColor: '#bbdefb'}}>{smallCategoryName}</span> */}
                    <span className={ButtonCSS.product_tag}>{smallCategoryName}</span>
                </div>
            </div>
        </div>
    );
}

export default BrandProduct;