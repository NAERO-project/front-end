import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Product from "../../components/products/Product";
import { callProductListApi } from "../../apis/ProductApiCall";
import MainListCSS from "./MainList.module.css";
import ProductNav from "../../components/products/ProductNav";
import ProductMoreCSS from "./ProductMore.module.css";

 
 function ProductMore(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { category } = useParams();
    const products = useSelector(state => state.productReducer);
    const productList = products.data;
    console.log("productList", productList);

    const pageInfo = products.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i =1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    // useEffect(
    //     () =>{
    //         dispatch(callProductListApi({
    //             currentPage: currentPage
    //         }))
    //     },[currentPage]
    // );

    useEffect(() => {
            fetchData();
        },[currentPage]);

    const fetchData=()=>{dispatch(callProductListApi({currentPage: currentPage}))}

    useEffect(()=>{
        console.log(productList,"확인");
    },[productList]);

    return(
        <div className={MainListCSS.main_list}>
            <ProductNav/>
            <div className={ProductMoreCSS.main_product_box}>
                {Array.isArray(productList) && productList.map((product) => (
                    <Product key={product.productCode} product={product}/>
                ))}
            </div>

            <div className={ProductMoreCSS.product_paging}>
                {Array.isArray(productList) &&
                <button onClick={() =>setCurrentPage(currentPage -1)} disabled={currentPage === 1} >&lt;</button>}
                {pageNumber.map((num) =>(
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button>{num}</button>
                    </li>
                ))}
                {Array.isArray(productList) &&
                <button onClick={() => setCurrentPage(currentPage +1)} disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}>&gt;</button>
                }
            </div>
        </div>
            
    );
 }

 export default ProductMore;