import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/common/products/Product";
import { callProductListApi } from "../../apis/ProductApiCall";
import ProductMoreCSS from "./css/ProductMore.module.css";
import ProductNav from "../../components/common/products/ProductNav";
import Footer from "../../components/common/Footer";
 
 function ProductMore(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer);
    const productList = products.data;
    const params = useParams();
    console.log("productList", productList);

    const pageInfo = products.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i =1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    // 컴포넌트가 처음 렌더링될 때 데이터 fetching
    useEffect(() => {
        fetchData(); // 초기 데이터 fetching
    }, []); // 빈 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 호출

    useEffect(() => {
            fetchData();
        },[currentPage]);

    const fetchData=()=>{dispatch(callProductListApi({
        currentPage: currentPage,
        largeId: params.largeCategoryId
    }))}

    useEffect(()=>{
        console.log(productList,"확인");
    },[productList]);

    return(
        <div>
            <div className={ProductMoreCSS.main_product_box}>
                {Array.isArray(productList) && productList.map((product) => (
                    <Product key={product.productId} product={product} />
                ))}
            </div>

            <div className={ProductMoreCSS.product_paging}>
                {Array.isArray(productList) &&
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button>{num}</button>
                    </li>
                ))}
                {Array.isArray(productList) &&
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}>&gt;</button>
                }
            </div>
            <Footer/>
        </div>   
    );
 }

 export default ProductMore;