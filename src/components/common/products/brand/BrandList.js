import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callProducerProductListApi } from "../../../../apis/ProductApiCall";
import BrandListCSS from "./css/BrandList.module.css";
import ButtonCSS from "../../Button.module.css";
import BrandProduct from "./BrandProduct";
import { Link } from "react-router-dom";

function BrandList({ brand: { producerId, producerName } }) {
    const dispatch = useDispatch();
    const brandList = useSelector(state => state.productReducer);

    useEffect(() => {
        fetchData();
    }, [producerId]);

    const fetchData = () => {
        dispatch(callProducerProductListApi(producerId));
    };

    // producerId에 맞는 상품만 필터링
    const filteredProducts = brandList.filter(product => product.producerId === producerId);

    return (
        <div className={BrandListCSS.box}>
            <div className={BrandListCSS.txt_box}>
                <h1>{producerName}</h1>
                <Link to={`/products/brand/${producerId}`} className={`${ButtonCSS.more_button} ${BrandListCSS.more_button}`}>
                    더보기
                    <span className={ButtonCSS.icon01}>&gt;</span>
                </Link>
            </div>
            <div className={BrandListCSS.product_box}>
                {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
                    <BrandProduct key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
}

export default BrandList;