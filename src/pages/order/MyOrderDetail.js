import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OrderProductList from "./OrderProductList";
import { decodeJwt } from "../../utils/tokenUtils";

import { callOrderDetailApi, callCancelOrderApi } from "../../apis/OrderApiCall";
import { callPaymentDetailApi } from "../../apis/PaymentApiCall";
import { callUserDetailAPI } from "../../apis/UserApiCall";

function MyOrderDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const orderDetail = useSelector((state) => state.orderReducer);
    const paymentDetail = useSelector((state) => state.paymentReducer);
    const userDetail = useSelector((state) => state.userReducer.data || {});

    const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인
    const username = isLogin ? decodeJwt(isLogin).sub : null; // JWT에서 사용자 ID 추출

    useEffect(() => {
        dispatch(
            callOrderDetailApi({
                orderId: params.orderId,
            })
        );

        console.log("orderDetail 뭘 갖고 왔나???", orderDetail);
    }, []);

    useEffect(() => {
        dispatch(
            callPaymentDetailApi({
                orderId: params.orderId,
            })
        );

        console.log("paymentDetail 뭘 갖고 왔나???", paymentDetail);
    }, []);

    useEffect(() => {
        dispatch(
            callUserDetailAPI({
                username: username,
            })
        );

        console.log("userDetail 뭘 갖고 왔나???", userDetail);
    }, []);

    const onClickCancelOrderHandler = (paymentId) => {
        let answer = window.confirm("주문 취소 하시겠습니까?");
        if (answer) {
            dispatch(
                callCancelOrderApi({
                    paymentId
                })
            ).then(() => {
                alert("주문이 취소되었습니다."); // 주문 취소 완료 알림
                window.location.reload(); // 페이지 리로딩
            }).catch((error) => {
                console.error("주문 취소 중 오류 발생:", error);
                alert("주문이 취소 실패. 관리자에게 문의하세요.");
            });
        }
    };

    return (
        <>
            {orderDetail && paymentDetail && userDetail && (
                <div className="">
                    <div className="">
                        <h3>주문 내역</h3>
                        <p>결제 번호: {paymentDetail.impUid}</p>
                        <OrderProductList
                            key={orderDetail.orderId}
                            orderId={orderDetail.orderId}
                        />
                    </div>
                    -----------------
                    <div>
                        <h3>주문자 정보</h3>
                        <p>주문자: {userDetail?.user?.userFullName}</p>
                        <p>전화번호: {userDetail?.user?.userPhone}</p>
                        <p>이메일: {userDetail?.user?.userEmail}</p>
                    </div>
                    -----------------
                    <div>
                        <h3>배송 정보</h3>
                        <p>수령자: {orderDetail?.recipientName}</p>
                        <p>전화번호: {orderDetail?.recipientPhoneNumber}</p>
                        <p>우편번호: {orderDetail?.postalCode}</p>
                        <p>
                            배송주소: {orderDetail?.addressRoad}{" "}
                            {orderDetail?.addressDetail
                                ? orderDetail?.addressDetail
                                : ""}
                        </p>
                    </div>
                    -----------------
                    <div>
                        <h3>결제 정보</h3>
                        <p>
                            결제 수단:{" "}
                            {paymentDetail?.paymentMethod === "BANK_TRANSFER"
                                ? "무통장입금"
                                : paymentDetail?.paymentMethod === "EASY_PAY"
                                ? "간편결제"
                                : paymentDetail?.paymentMethod === "CARD"
                                ? "신용카드"
                                : paymentDetail?.paymentMethod === "TRANSFER"
                                ? "실시간 계좌이체"
                                : ""}
                        </p>
                        <p>총 결제 금액: {paymentDetail?.amount?.toLocaleString()}원</p>
                        <p>총 배송비: {orderDetail?.deliveryFee?.toLocaleString()}원</p>
                        <p>총 포인트 할인: {orderDetail?.pointDiscount?.toLocaleString()}원</p>
                        <p>총 쿠폰 할인: {orderDetail?.couponDiscount ? orderDetail?.couponDiscount.toLocaleString() : 0}원</p>
                        <p>결제 생성 일시: {paymentDetail?.createdAt ? new Date(paymentDetail?.createdAt).toLocaleString() : '정보 없음'}</p>
                    </div>
                    {orderDetail?.deliveryStatus === "sent" && (
                        <div>
                            <button onClick="">배송조회</button>
                        </div>
                    )}
                    {orderDetail?.deliveryStatus === "pending" && (
                        <div>
                            <button style={{ color: "red" }} onClick={() => {onClickCancelOrderHandler(paymentDetail?.paymentId)}}>
                                주문 취소
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default MyOrderDetail;
