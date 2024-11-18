import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callProductListPreviewApi } from "../../apis/ProductApiCall";
import Product from "../../components/common/products/Product";

function PreviewList(){

    const dispatch = useDispatch();
    const previewList = useSelector(state => state.productReducer);

    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const fetchData = async () => {
        try {
            await dispatch(callProductListPreviewApi());
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
        
    };
    
    

    useEffect(()=>{
        console.log(previewList,"확인")
    },[previewList])
    console.log('previewList:', previewList); // 디버깅용

    return(
        <div>
            {
                // previewList.length > 0 && previewList.map((list) => (<Product key={ list.productCode } product={ list } />))
                Array.isArray(previewList) && previewList.length > 0 && 
                previewList.map((list) => (<Product key={ list.productCode } product={ list } />))
            }
        </div>
    );
}

export default PreviewList;