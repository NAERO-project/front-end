import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import MainProductNav from "../../components/common/products/MainProductNav";
import Product from "../../components/common/products/Product";
import MainListCSS from "./MainList.module.css";
import { callProductListPreviewApi, callProductPreviewFashionApi } from "../../apis/ProductApiCall";
import ButtonCSS from "../../components/common/Button.module.css";

function MainFashionList(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useParams();

    const previewList = useSelector(state => state.productReducer);
    console.log("previewList", previewList);
    useEffect(() => {
            fetchData();
        },[category]);

    const fetchData=()=>{dispatch(callProductPreviewFashionApi(category))}

    useEffect(()=>{
        console.log('category:', category);
        console.log(previewList,"확인");
    },[previewList]);

    return(
        <div className={MainListCSS.main_list}>
            <MainProductNav/>
            <div className={MainListCSS.main_product_box}>
                {Array.isArray(previewList) && previewList.map((product) => (
                    <Product key={product.productCode} product={product}/>
                ))}
            </div>

            <div className={MainListCSS.more_button}>
                <NavLink to="/products/more" className={ButtonCSS.main_button}>
                    <span>더보기</span>
                    <span className={ButtonCSS.icon01}>-&gt;</span>
                </NavLink>
            </div>
        </div>
            
    );
}

export default MainFashionList;