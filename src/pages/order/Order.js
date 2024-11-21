import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";

import { callOrderPageApi } from "../../apis/OrderApiCall";

function Order() {
    const location = useLocation();
    const cartItems = location.state.cartItems; // ProductDetail.js에서 전달된 cartItems
    const dispatch = useDispatch();
    const orderData = useSelector((state) => state.orderReducer) || {};

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    useEffect(() => {
        const startOrder = () => {
            if (cartItems && cartItems.length > 0) {
                dispatch(
                    callOrderPageApi({
                        cartItems: cartItems,
                        username: username,
                    })
                );
            } else {
                console.log("주문할 상품이 없습니다."); // 디버깅을 위한 로그
            }
        };

        startOrder();
    }, []);

    // useEffect(() => {
    //     const startOrder = () => {
    //         if (cartItems && cartItems.length > 0) {
    //             dispatch(
    //                 callOrderPageApi({
    //                     cartItems: cartItems,
    //                     username: username,
    //                 })
    //             );
    //         } else {
    //             console.log("주문할 상품이 없습니다."); // 디버깅을 위한 로그
    //         }
    //     };

    //     startOrder();
    // }, [cartItems, username, dispatch]);

    return (
        <div>
            <h1>주문 페이지</h1>
            <h3>주문자 정보</h3>
            <br></br>
            <p>{orderData.userDTO?.userFullName || ""}</p>
            <p>{orderData.userDTO?.userPhone || ""}</p>
            <p>{orderData.userDTO?.userEmail || ""}</p>
            <p>---------------------------------------</p>
            <h3>배송지 정보</h3>
            <br></br>
            {/* 주소찾기 API 기능 구현할 곳....... */}
            <p>{orderData.orderDTO?.recipientName || ""}</p>
            <p>{orderData.orderDTO?.recipientPhoneNumber || ""}</p>
            <p>{orderData.orderDTO?.addressName || ""}</p>
            <p>{orderData.orderDTO?.postalCode || ""}</p>
            <p>{orderData.orderDTO?.addressRoad || ""}</p>
            <p>{orderData.orderDTO?.addressDetail || ""}</p>
            <p>---------------------------------------</p>
            <h3>할인 정보</h3>
            <p>쿠폰 적용</p>
            <button>쿠폰 찾기</button>
            <p>포인트 적용</p>
            <p>---------------------------------------</p>
            <h3>결제 정보</h3>
            {/* Portone API 기능 구현할 곳 */}
            <p>---------------------------------------</p>
            <h3>결제 금액</h3>
            <p>주문 금액: {orderData.orderDTO?.orderTotalAmount || ""}</p>
            <p>배송비: {orderData.orderDTO?.deliveryFee || 0}</p>
            <p>포인트 할인: {orderData.orderDTO?.pointDiscount || 0}</p>
            <p>쿠폰 할인: {orderData.orderDTO?.couponDiscount || 0}</p>
            <p>최종 주문 금액: </p>
        </div>
    );
}

export default Order;
