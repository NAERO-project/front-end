import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";

import { callProducerOrderProductListApi } from "../../apis/OrderApiCall";

function ProducerOrderProductList({ orderId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const producerUsername = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    const orderProducts = useSelector((state) => state.orderReducer.producerProducts);
    
    useEffect(() => {
        dispatch(callProducerOrderProductListApi({ orderId, producerUsername }));
        console.log('왜 안나오니...', orderProducts)
    }, [dispatch, orderId]);

    if (!orderProducts || !Array.isArray(orderProducts)) {
        return <div>로딩중...</div>;
    }

    return (
        <div className=''>
            {orderProducts.length > 0 ? (
                orderProducts.map(product => (
                    <div className='' key={product.optionId}>
                        <img src={product.productImg} alt="주문상품 이미지" />
                        <p>상품 이름: {product.productName}</p>
                        <p>주문 금액: {product.amount.toLocaleString("ko-KR")}원</p>
                        <p>주문 수량: {product.count.toLocaleString("ko-KR")}</p>
                        <p>송장번호: {product.shippingId}</p>
                    </div>
                ))
            ) : (
                <div>상품이 없습니다.</div>
            )}
            <div>
                <button onClick={() => {}}>송장등록</button>
            </div>
        </div>
    );
}


export default ProducerOrderProductList;