import { useNavigate } from "react-router-dom";

function Product({
    product: { productCode, productName, productPrice, productImg, smallCategoryId },
}){

    const navigate = useNavigate();

    const onClickProductHandler = (productCode) => {
        navigate(`/product/${productCode}`, {replace: false});
    };

    return(
        <div onClick={() => onClickProductHandler(productCode)}>
            <div>
                <img src={productImg} alt="test"/>
            </div>
            <div>
                <div>
                    <p>{productName}</p>
                    <p>0</p>
                    <p>0</p> 
                </div>
                <div>
                    <p>{productPrice}</p>
                    <p>{smallCategoryId}</p>
                </div>
            </div>
        </div>
    );
}

export default Product;