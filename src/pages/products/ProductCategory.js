import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/common/products/Product";
import { callProductLargeCategoryListApi } from "../../apis/ProductApiCall";
import ProductMoreCSS from "./css/ProductMore.module.css"
import ProductMediumNav from "../../components/common/products/ProductMediumNav";
import ProductNav from "../../components/common/products/ProductNav";
import MainList from "./MainList";
import Banner from "../../components/common/banner/Banner";
import BrandBanner from "../banner/BrandBanner";
import ProductMore from "./ProductMore";
import SimpleBanner from "../../components/common/banner/SimpleBanner";

function ProductCategory(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer);
    const productList = products.data;
    const params = useParams();                 //URL에서 파라미터 가져오기
    const largeId = params.largeId;     //largeId를 가져온다
    const mediumCategoryId = params.mediumId;
    console.log("productList", productList);

    const pageInfo = products.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];

    if(pageInfo){
        for(let i =1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    useEffect(() => {
            fetchData();
        },[currentPage, largeId]);

    const fetchData=()=>{dispatch(callProductLargeCategoryListApi({
        currentPage: currentPage,
        largeId
    }));
};

    useEffect(()=>{
        console.log(productList,"확인");
    }, [productList]);

    return(
        <div>
            <SimpleBanner/>
            <ProductNav/>
            <ProductMediumNav/>
            {largeId === '1' ? (
                <ProductMore/>
            ) : (
                <div className={ProductMoreCSS.main_product_box}>
                    {Array.isArray(productList) && productList.map((product) => (
                        <Product key={product.productId} product={product}/>
                    ))}
                </div>
            )}
            
            <div className={ProductMoreCSS.product_paging}>
                {Array.isArray(productList) &&
                <button onClick={() =>setCurrentPage(currentPage -1)} disabled={currentPage === 1} >&lt;</button>}
                {pageNumber.map((num) =>(
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button>{num}</button>
                    </li>
                ))}
                {Array.isArray(productList) &&
                <button onClick={() => setCurrentPage(currentPage +1)} disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}>&gt;</button>
                }
            </div>
        </div>
    );
}

export default ProductCategory;