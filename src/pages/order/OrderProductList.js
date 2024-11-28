import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { callMyPageOrderProductListApi } from "../../apis/OrderApiCall";
import { callGetProductIdByOptionIdApi } from "../../apis/ProductApiCall";

function OrderProductList({ orderId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderProducts = useSelector((state) => state.orderReducer.products || []);
    const productId = useSelector((state) => state.productReducer.data);
    
    useEffect(() => {
        
            console.log("orderId 제대로 보내주고 있어??:", orderId);
            dispatch(callMyPageOrderProductListApi({ orderId }));
        
    }, [dispatch, orderId]);

    useEffect(() => {
        console.log("이상한걸 fetch 하네???????????", orderProducts);
    }, [orderProducts]);

    const onClickProductHandler = (optionId) => {
        if (optionId) {
            dispatch(callGetProductIdByOptionIdApi(optionId));
        }
    };

    useEffect(() => {
        if (productId && typeof productId === 'number') {
            console.log("Navigating to productId:", productId);
            navigate(`/products/${productId}`, { replace: false });
        }
    }, [productId]);

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