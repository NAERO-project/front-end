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

    const onClickProductHandler = (optionId) => {
        // optionId로 productId 조회
        dispatch(callGetProductIdByOptionIdApi(optionId));
    };

    useEffect(() => {
        if (productId && typeof productId === 'number') {
            navigate(`/products/${productId}`, { replace: false });
        } 
    }, [productId]); // productId가 변경될 때마다 실행

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
                        <p>주문 상품 금액: {product.amount.toLocaleString("ko-KR")}원</p>
                        <p>주문 상품 수량: {product.count}</p>
                    </div>
                ))
            ) : (
                <div>상품이 없습니다.</div>
            )}
        </div>
    );
}


export default OrderProductList;