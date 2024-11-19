import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callProductListPreviewApi } from "../../apis/ProductApiCall";
import MainProductNav from "../../components/products/MainProductNav";
import Product from "../../components/products/Product";
import MainListCSS from "./MainList.module.css";

function MainList(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useParams();

    const previewList = useSelector(state => state.productReducer);
    console.log("previewList", previewList);
    useEffect(() => {
            fetchData();
        },[category]);

    const fetchData=()=>{dispatch(callProductListPreviewApi(category))}

    useEffect(()=>{
        console.log('category:', category);
        console.log(previewList,"확인");
    },[previewList]);

    return(
        <>
            <MainProductNav/>
            <div className={MainListCSS.MainProductBox}>
                {Array.isArray(previewList) && previewList.map((product) => (
                    <Product key={product.productCode} product={product}/>
                ))}
            </div>
        </>
            
    );
}

export default MainList;