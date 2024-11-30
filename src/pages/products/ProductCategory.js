import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/common/products/Product";
import { callProductLargeCategoryListApi } from "../../apis/ProductApiCall";
import ProductMoreCSS from "./css/ProductMore.module.css";
import ProductPreviewNav from "../../components/common/products/ProductPreviewNav";
import ProductMore from "../products/ProductMore";
import ProductMediumNav from "../../components/common/products/ProductMediumNav";

function ProductCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector(state => state.productReducer);
    const productList = product.data;

    const params = useParams(); // URL에서 파라미터 가져오기
    const [largeId, setLargeId] = useState(); // 상태로 설정
    const [mediumId, setMediumId] = useState(1);
    const [currentPage, setCurrentPage] = useState(1); // 페이지 상태

    const pageInfo = product.pageInfo;
    const pageNumber = [];

    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    // URL 파라미터가 변경될 때 largeId와 mediumId를 설정
    useEffect(() => {
        const { largeId: paramLargeId, mediumId: paramMediumId } = params;
        setLargeId(Number(paramLargeId) || 1); // URL에서 가져온 값 또는 기본값
        setMediumId(Number(paramMediumId) || 1);
    }, [params]); // params가 변경될 때마다 실행

    // largeId가 변경될 때 currentPage를 1로 초기화
    useEffect(() => {
        setCurrentPage(1); // largeId가 변경될 때 currentPage를 1로 초기화
    }, [largeId]); // largeId가 변경될 때마다 실행

    // currentPage, largeId, mediumId가 변경될 때마다 fetchData 호출
    useEffect(() => {
        fetchData();
    }, [currentPage, largeId, mediumId]);

    const fetchData = () => {
        console.log("Fetching data with:", { currentPage, largeId, mediumId }); // 추가된 로그
        dispatch(callProductLargeCategoryListApi({
            currentPage,
            largeId,
            mediumId
        }));
    };

    // ProductCategory 컴포넌트가 마운트될 때 로그 출력
    useEffect(() => {
        console.log("ProductCategory component mounted"); // 추가된 로그
        console.log("largeId 확인222222", largeId);
        console.log("mediumId 확인222222", mediumId);
    }, [largeId, mediumId]);

    return (
        <div>
            <ProductPreviewNav state={largeId} setState={setLargeId} />
            {/* <ProductMediumNav state={mediumId} setState={setMediumId} /> */}
            {largeId === 1 ? (
                <ProductMore />
            ) : (
                <>
                    <div className={ProductMoreCSS.main_product_box}>
                        {Array.isArray(productList) && productList
                        .filter(product => product.smallCategory.mediumCategoryId === mediumId) // mediumId에 해당하는 제품만 필터링
                        .map((product) => (
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
                </>
            )}
        </div>
    );
}

export default ProductCategory;