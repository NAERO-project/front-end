import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { callMyPageOrderProductListApi } from "../../apis/OrderApiCall";
import { callGetProductIdByOptionIdApi } from "../../apis/ProductApiCall";

function OrderProductList({ orderId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderProducts = useSelector((state) => state.orderReducer.products);
    const productId = useSelector((state) => state.productReducer.data);
    
    useEffect(() => {
        dispatch(callMyPageOrderProductListApi({ orderId }));
    }, [dispatch, orderId]);

    // const onClickProductHandler = (optionId) => {
    //     navigate(`/products/${optionId}`, { replace: false });
    // };

    const onClickProductHandler = (optionId) => {
        // optionId로 productId 조회
        dispatch(callGetProductIdByOptionIdApi(optionId));
    };

    if (productId) {
        navigate(`/products/${productId}`, { replace: false });
    } else {
        console.error("상품 ID를 찾을 수 없습니다.");
    }

    if (!orderProducts || !Array.isArray(orderProducts)) {
        return <div>로딩중...</div>;
    }

    return (
        <div className=''>
            {orderProducts.length > 0 ? (
                orderProducts.map(product => (
                    <div className='' key={product.optionId} onClick={() => onClickProductHandler(product.optionId)}>
                        <img src={product.productImg} alt="주문상품 이미지" />
                        <p>{product.productName}</p>
                        <p>{product.amount.toLocaleString("ko-KR")}원</p>
                    </div>
                ))
            ) : (
                <div>상품이 없습니다.</div>
            )}
        </div>
    );
}


export default OrderProductList;