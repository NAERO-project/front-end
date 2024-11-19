import { useNavigate } from "react-router-dom";

function Product({
    product: { productCode, productName, productPrice, productImg, smallCategoryId },
}){

    const navigate = useNavigate();

    const onClickProductHandler = (productCode) => {
        navigate(`/product/${productCode}`, {replace: false});
    };

    return(
        <div 
            onClick={() => onClickProductHandler(productCode)}
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                margin: '10px 0',
                cursor: 'pointer'
            }}
        >
            <div>
                <img 
                    src={productImg} 
                    alt={productName}
                    style={{
                        width: '100%',
                        maxWidth: '200px',
                        height: 'auto'
                    }}
                />
            </div>
            <div>
                <div>
                    <p style={{ fontWeight: 'bold' }}>{productName}</p>
                    <p>0</p>
                    <p>0</p> 
                </div>
                <div>
                    <p>{productPrice.toLocaleString()}원</p>
                    <p>카테고리: {smallCategoryId}</p>
                </div>
            </div>
        </div>
    );
}

export default Product;