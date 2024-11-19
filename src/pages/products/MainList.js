import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callProductListPreviewApi } from "../../apis/ProductApiCall";
import MainProductNav from "../../components/products/MainProductNav";
import Product from "../../components/products/Product";

function MainList(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 옵셔널 체이닝(?.)을 이용해 undefined일 때 에러가 나지 않도록 처리
    const previewList = useSelector(state => state.productReducer?.data);

    useEffect(() => {
            fetchData();
        },[]);

    const fetchData = async () => {
        try {
            await dispatch(callProductListPreviewApi());
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
        
    };
    

    useEffect(()=>{
        console.log(previewList,"확인")
    },[previewList]);

    return(
            // previewList.length > 0 && previewList.map((list) => (<Product key={ list.productCode } product={ list } />))     (첫번째 시도)
            // Array.isArray(previewList) > 0 && previewList.map((list) => (<Product key={ list.productCode } product={ list } />))     (두번째 시도)
            // previewList?.length > 0 && previewList.map((list) => (<Product key={ list.productCode } product={ list } />))
        <>
            <MainProductNav/>
            <div>
                {previewList && previewList.map((list) => (
                    <Product key={list.productCode} product={list}/>
                ))}
            </div>
        </>
            
    );
}

export default MainList;