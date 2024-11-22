import { useNavigate } from "react-router-dom";
import ProductCSS from "./css/Product.module.css"
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import ButtonCSS from "../../common/Button.module.css";

function Product({
    product: { productId, productName, productPrice, productImg, smallCategory: { smallCategoryName } }
    
}){

    const navigate = useNavigate();

    const onClickProductHandler = (productId) => {
        navigate(`/products/${productId}`, {replace: false});
    };

    return(
        <div
        className={ProductCSS.ProductBox}
        onClick={() => onClickProductHandler(productId)}>
            <div className={ProductCSS.productImgBox}>
                <img src={productImg} alt={productName}/>
            </div>
            <div className={ProductCSS.ProductTextBox}>
                <div>
                    <p>{productName}</p>
                    <div className={ProductCSS.ProductIconBox}>
                        <p><FaRegHeart/></p>
                        <p><LuShoppingCart/></p>
                    </div>
                </div>
                <div>
                    <p>{productPrice.toLocaleString()}원</p>
                    <h5 className={ButtonCSS.product_tag}>{smallCategoryName}</h5>
                </div>
            </div>
        </div>
    );
}

export default Product;