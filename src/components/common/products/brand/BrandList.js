import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callBrandProductListPageApi, callProducerProductListApi, callProductListPreviewApi } from "../../../../apis/ProductApiCall";
import BrandListCSS from "./css/BrandList.module.css";
import ButtonCSS from "../../Button.module.css";
import BrandProduct from "./BrandProduct";
import { Link } from "react-router-dom";

function BrandList({ brand: { producerId, producerName } }) {
    const dispatch = useDispatch();
    const brandList = useSelector(state => state.productProducerReducer);
    const productList = useSelector(state => state.productReducer);
    console.log("brandList", brandList);

    useEffect(() => {
        fetchData();
    }, []);

    // const fetchData = () => {
    //     dispatch(callBrandProductListPageApi({producerId}));
    // };

    const fetchData = () => {
        dispatch(callProductListPreviewApi(producerId));
    };

    // // producerId에 맞는 상품만 필터링
    // const filteredProducts = brandList?.filter(product => product.producerId === producerId);

    // // brandList가 배열인지 확인하고, producerId에 맞는 상품만 필터링
    // const filteredProducts = Array.isArray(brandList) 
    //     ? brandList.filter(product => product.producerId === producerId) 
    //     : []; // brandList가 배열이 아닐 경우 빈 배열로 초기화

         // brandList가 배열인지 확인하고, producerId에 맞는 상품만 필터링
    const filteredProducts = Array.isArray(productList) 
    ? productList.filter(product => product.producerId === producerId) 
    : []; // brandList가 배열이 아닐 경우 빈 배열로 초기화

    // 처음 4개의 상품만 선택
    const limitedProducts = filteredProducts.slice(0, 4);


        console.log("limitedProducts22222222222: ", limitedProducts)

    return (
        <div className={BrandListCSS.box}>
            <div className={BrandListCSS.txt_box}>
                <h1>{producerName}</h1>
                <Link to={`/products/brand/home/${producerId}`}
                className={`${ButtonCSS.more_button} ${BrandListCSS.more_button}`}
                producerName={producerName}>
                    더보기
                    <span className={ButtonCSS.icon01}>&gt;</span>
                </Link>
            </div>
            <div className={BrandListCSS.product_box}>
                {Array.isArray(limitedProducts) && limitedProducts.map((product) => (
                    <BrandProduct key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
}

export default BrandList;