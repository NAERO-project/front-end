import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callBrandProductListPageApi } from "../../../../apis/ProductApiCall";
import Product from "../Product";
import ProductNav from "../ProductNav";
import ProductMediumNav from "../ProductMediumNav";
import MainListCSS from "../../../../pages/products/css/MainList.module.css";
import ProductProducerNav from "../ProductProducerNav";
import Footer from "../../Footer";

function BrandProducer({
    // producer: {producerId, producerName}
}){

    const dispatch = useDispatch();
    const brand = useSelector(state => state.productReducer);
    const brandList = brand.data || [];
    const params = useParams();
    const producerId = params.producerId;
    const largeId = params.largeId; // largeId를 URL 파라미터로 가져옴
    console.log("brandList:", brandList);

    const pageInfo = brand.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];

    if(pageInfo){
        for(let i =1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    useEffect(() =>{
        fetchData();
    },[currentPage, producerId, largeId]);

    const fetchData = () =>{
        dispatch(callBrandProductListPageApi({
            currentPage: currentPage,
            producerId: producerId,
            largeId: largeId
        }));
    };

    return(
        <div>
            <div>
                {/* <h3>{producerName}</h3> */}
            </div>
            <div>
                <img src="" alt="" />
            </div>
            {/* <ProductProducerNav/> */}
            {/* <ProductMediumNav/> */}
            <div className={MainListCSS.main_product_box}>
                {Array.isArray(brandList) && brandList.map((product) => (
                    <Product key={product.productId} product={product}/>
                ))}
            </div>
            <Footer/>
        </div>
    );
}

export default BrandProducer;