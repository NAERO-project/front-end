import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Product from "../../components/common/products/Product";
import ProductMoreCSS from "./css/ProductMore.module.css"
import MainList from "./MainList";

import MainListCSS from "./css/MainList.module.css";
import ButtonCSS from "../../components/common/Button.module.css";
import ProductPreviewNav from "../../components/common/products/ProductPreviewNav";
import { callProductLargeCategoryPreviewListApi } from "../../apis/ProductApiCall";

function MainListPreview(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productReducer);
    console.log("productList", productList);

    const params = useParams();                 //URL에서 파라미터 가져오기
    const [largeId, setLargeId] = useState(1)     //largeId를 가져온다
    const mediumCategoryId = params.mediumId;

    
    useEffect(()=>{
        fetchData()
    },[]);

    // console.log("largeCategoryId", largeId);

    useEffect(() => {
        console.log("largeId변경", largeId)
            fetchData();
        },[largeId]);

    const fetchData=()=>{
        dispatch(callProductLargeCategoryPreviewListApi(
        largeId
    ));
};

    useEffect(()=>{
        console.log(productList,"확인");
    }, [productList]);

    const onClickHandler= ()=>{
        console.log("더보기 페이지로 이동")
        navigate(`/products/more/${largeId}`);
    }

    return(
        <div>
            <ProductPreviewNav state={largeId} setState={setLargeId}/>
            {largeId === 1 ? (
                <MainList/>
            ) : (
                <div className={ProductMoreCSS.main_product_box}>
                    {Array.isArray(productList) && productList.map((product) => (
                        <Product key={product.productId} product={product}/>
                    ))}
                </div>
            )}
            <div className={MainListCSS.more_button}>
                {/* <button className={ButtonCSS.main_button} onClick={() =>onClickHandler}>
                    <span>더보기</span>
                    <span className={ButtonCSS.icon01}>-&gt;</span>
                </button> */}
                <NavLink to={`/products/more/${largeId}`} className={ButtonCSS.main_button}>
                    <span>더보기</span>
                    <span className={ButtonCSS.icon01}>-&gt;</span>
                </NavLink>
            </div>
        </div>
    );
}

export default MainListPreview;