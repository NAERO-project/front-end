import { useNavigate } from "react-router-dom";
import ProductCSS from './Product.module.css';
import { FaRegHeart } from "react-icons/fa6";

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
                    <p><FaRegHeart/></p>
                    <p>0</p>
                </div>
                <div>
                    <p>{productPrice.toLocaleString()}원</p>
                    <p>{smallCategoryId}</p>
                </div>
            </div>
        </div>
    );
}

export default Product;