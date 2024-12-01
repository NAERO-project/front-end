import { useNavigate, useParams } from "react-router-dom";
import ProductCSS from "./css/Product.module.css"
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";

function Product({
    product: { productId, productName, productPrice, productImg, smallCategory: {smallCategoryName}}
}){

    const navigate = useNavigate();

    const onClickProductHandler = (productId) => {
        navigate(`/products/${productId}`, {replace: false});
    };

    return(
        <div
        className={ProductCSS.product_box}
        onClick={() => onClickProductHandler(productId)}>
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
                    <p>{productPrice.toLocaleString()}원</p>
                    <span 
                        style={{padding: '4px 10px', borderRadius: '10px', fontWeight: '300', color: '#fff', backgroundColor: '#bbdefb'}}
                    >{smallCategoryName}</span>
                </div>
            </div>
        </div>
    );
}

export default Product;