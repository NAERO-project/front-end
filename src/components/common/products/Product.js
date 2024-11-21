import { useNavigate } from "react-router-dom";
import ProductCSS from './Product.module.css';
import { FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import GlobalCSS from "../../common/Global.module.css";

function Product({
    product: { productCode, productName, productPrice, productImg, smallCategoryId },
}){

    const navigate = useNavigate();

    const onClickProductHandler = (productCode) => {
        navigate(`/product/${productCode}`, {replace: false});
    };

    return(
        <div
        className={ProductCSS.ProductBox}
        onClick={() => onClickProductHandler(productCode)}>
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
                    <h5 className={GlobalCSS.ProductTag}>{smallCategoryId}</h5>
                </div>
            </div>
        </div>
    );
}

export default Product;