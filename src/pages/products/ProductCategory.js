import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/common/products/Product";
import { callProductLargeCategoryListApi } from "../../apis/ProductApiCall";
import ProductMoreCSS from "./css/ProductMore.module.css";
// import ProductMediumNav from "../../components/common/products/ProductMediumNav";
import ProductPreviewNav from "../../components/common/products/ProductPreviewNav";
import ProductMore from "../products/ProductMore";
import Footer from "../../components/common/Footer";

function ProductCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector(state => state.productReducer);
    const productList = product.data;

    const params = useParams(); // URL에서 파라미터 가져오기
    const [largeId, setLargeId] = useState(); // 상태로 설정
    const [mediumId, setMediumId] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = product.pageInfo;
    const pageNumber = [];

    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [largeId]);

    useEffect(() => {
        const { largeId: paramLargeId, mediumId: paramMediumId } = params;
        setLargeId(Number(paramLargeId) || 1); // URL에서 가져온 값 또는 기본값
        setMediumId(Number(paramMediumId) || 1);
    }, [params]);

    useEffect(() => {
        fetchData();
    }, [currentPage, largeId, mediumId]);

    const fetchData = () => {
        console.log("Fetching data with:", { currentPage, largeId, mediumId }); // 추가된 로그
        dispatch(callProductLargeCategoryListApi({
            currentPage,
            largeId,
            mediumId,
        }));
    };

    useEffect(() =>{
        console.log("largeId22222222", largeId);
    })

    return (
        <div>
            <ProductPreviewNav state={largeId} setState={setLargeId} />
            {largeId === 1 ? (
                <ProductMore />
            ) : (
                <>
                    <div className={ProductMoreCSS.main_product_box}>
                        {Array.isArray(productList) && productList.map((product) => (
                            <Product key={product.productId} product={product} />
                        ))}
                    </div>
                    
                    <div className={ProductMoreCSS.product_paging}>
                        {Array.isArray(productList) &&
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>}
                        {pageNumber.map((num) => (
                            <li key={num} style={
                                currentPage === num
                                    ? { backgroundColor: "#546E7A" }
                                    : null
                            } onClick={() => setCurrentPage(num)}>
                                <button
                                style={
                                    currentPage === num
                                        ? { color: "#fff", fontWeight: '500' }
                                        : null
                                }
                                >{num}</button>
                            </li>
                        ))}
                        {Array.isArray(productList) &&
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}>&gt;</button>
                        }
                    </div>
                    <Footer/>
                </>
            )}
        </div>
            
    );
}

export default ProductCategory;