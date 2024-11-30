import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { callProductListPreviewApi } from "../../apis/ProductApiCall";
import MainProductNav from "../../components/common/products/MainProductNav";
import Product from "../../components/common/products/Product";
import MainListCSS from "./css/MainList.module.css";
import ButtonCSS from "../../components/common/Button.module.css";
import ProductPreviewNav from "../../components/common/products/ProductPreviewNav";

function MainList(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category, productId } = useParams();

    console.log("메인 리스트 시작")
    const previewList = useSelector(state => state.productReducer);
    console.log("previewList", previewList);

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
            fetchData();
        },[category]);

    const fetchData=()=>{dispatch(callProductListPreviewApi(category, productId))}

    useEffect(()=>{
        console.log('category:', category);
        console.log(previewList,"확인");
    },[previewList]);

    return(
        <div className={MainListCSS.main_list}>
            <div className={MainListCSS.main_product_box}>
                {Array.isArray(previewList) && previewList.map((product) => (
                    <Product key={product.productId} product={product}/>
                ))}
            </div>
        </div>
            
    );
}

export default MainList;